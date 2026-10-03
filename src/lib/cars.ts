import "server-only";

import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { cars } from "@/db/schema";
import type { Vehicle, VehicleImage } from "@/lib/vehicles";
import { CATEGORIES, TRANSMISSIONS, FUEL_TYPES } from "./car-constants";
import { getMediaSrc } from "./site-media";

export type CarRow = typeof cars.$inferSelect;

// Re-exported so server files (actions.ts, page.tsx) can import everything
// from one place. CarForm.tsx (a client component) must import directly
// from "@/lib/car-constants" instead — this module pulls in the database
// driver via "@/db" and would break the client bundle otherwise.
export * from "./car-constants";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Generates a unique slug from brand + model + year, appending -2, -3, …
 *  on collision. Called only from server actions, inside the mutation. */
export async function generateUniqueCarSlug(
  brand: string,
  model: string,
  year: number,
): Promise<string> {
  const base = slugify(`${brand}-${model}-${year}`) || "vehicule";
  let candidate = base;
  let attempt = 1;
  // Small, bounded loop — the fleet size makes runaway collisions unrealistic.
  while (attempt < 50) {
    const existing = await db
      .select({ id: cars.id })
      .from(cars)
      .where(eq(cars.slug, candidate))
      .limit(1);
    if (existing.length === 0) return candidate;
    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
  return `${base}-${Date.now()}`;
}

/* ------------------------------------------------------------------ */
/*  PUBLIC-SITE INTEGRATION                                             */
/*  Public read path for the `cars` table. Before this phase the public  */
/*  site rendered the unrelated static sample in lib/vehicles.ts and     */
/*  admin car edits are intentionally separated from public rendering.  */
/*  These functions are the single public read path for the cars table:  */
/*  no second cars table, no duplicated car objects — same schema, same  */
/*  rows the admin dashboard manages.                                    */
/* ------------------------------------------------------------------ */

/** Maps a database car row onto the public site's existing `Vehicle`
 *  shape (src/lib/vehicles.ts) so VehicleCard/VehicleGrid/VehicleGallery/
 *  VehicleSpecs — and their design — don't need to change at all; only
 *  the data source feeding them does. Values are narrowed against the
 *  same CATEGORIES/TRANSMISSIONS/FUEL_TYPES the admin form already
 *  validates against, with a safe fallback for any row saved before that
 *  validation existed. */
async function toPublicVehicle(row: CarRow): Promise<Vehicle> {
  const category = CATEGORIES.includes(row.category as (typeof CATEGORIES)[number])
    ? (row.category as Vehicle["category"])
    : "Citadine";
  const transmission = TRANSMISSIONS.includes(
    row.transmission as (typeof TRANSMISSIONS)[number],
  )
    ? (row.transmission as Vehicle["transmission"])
    : "Manuelle";
  const fuel = FUEL_TYPES.includes(row.fuelType as (typeof FUEL_TYPES)[number])
    ? (row.fuelType as Vehicle["fuel"])
    : "Essence";

  const fallbackImage = await getMediaSrc("fallback.vehicle", "/images/mda-car-route-souss-massa.jpg");

  const isLegacyExternalImage = (src: string) => {
    try {
      const hostname = new URL(src, "https://www.mdacar.com").hostname.toLowerCase();
      return (
        hostname === "cdn.getyourguide.com" ||
        hostname === "industries.ma" ||
        hostname === "media.istockphoto.com"
      );
    } catch {
      return false;
    }
  };

  const storedImages = (row.images ?? []).filter(Boolean).filter((src) => !isLegacyExternalImage(src));
  const urls = storedImages.length > 0
    ? storedImages
    : row.imageUrl && !isLegacyExternalImage(row.imageUrl)
      ? [row.imageUrl]
      : [];
  const images: VehicleImage[] =
    urls.length > 0
      ? urls.map((src, index) => ({
          src,
          // Natural, distinct alt text per photo (no repeated keyword phrase).
          alt: index === 0 ? `${row.name}, voiture de location MDA CAR` : `${row.name}, vue ${index + 1}`,
        }))
      : [
          {
            // Defensive fallback only: the admin form doesn't currently
            // require at least one image, so a car saved without one must
            // still render (VehicleGallery indexes into this array) rather
            // than crash the public page. The file itself keeps its
            // original name (a real stock photo already deployed at this
            // path) — only its alt text is updated for the new positioning.
            src: fallbackImage,
            alt: `${row.name}, photo à venir`,
          },
        ];

  return {
    slug: row.slug,
    name: row.name,
    brand: row.brand ?? "",
    model: row.model ?? "",
    category,
    transmission,
    fuel,
    seats: row.seats ?? 5,
    pricePerDay: row.pricePerDay != null ? `${row.pricePerDay} MAD/jour` : null,
    shortDescription: (row.description ?? "").slice(0, 140),
    description: row.description ?? "",
    images,
    updatedAt: row.updatedAt,
    isAvailable: row.isAvailable,
  };
}

/** Public visibility rule (Phase 2's own convention — reused, not
 *  reinvented): `isHidden` is the public on/off switch, toggled from
 *  /admin/cars either directly or via the "publish" checkbox in
 *  CarForm (isPublished = !isHidden). `isAvailable` is a separate
 *  "currently available" flag the admin can toggle without unpublishing
 *  the car; the public fleet pages don't currently render a distinct
 *  "unavailable" state (no such design exists yet), so — per the brief's
 *  instruction not to invent new UI/business rules — it is not filtered
 *  on here, only exposed on the row for a future phase to use. */
async function fetchPublishedCars(): Promise<CarRow[]> {
  // Public pages do not need admin-only bookkeeping fields. Selecting only
  // the fields required by the public card/gallery keeps the database payload
  // small as the fleet grows.
  return db
    .select({
      id: cars.id,
      slug: cars.slug,
      name: cars.name,
      brand: cars.brand,
      model: cars.model,
      year: cars.year,
      category: cars.category,
      transmission: cars.transmission,
      fuelType: cars.fuelType,
      seats: cars.seats,
      pricePerDay: cars.pricePerDay,
      description: cars.description,
      imageUrl: cars.imageUrl,
      images: cars.images,
      features: cars.features,
      isHidden: cars.isHidden,
      isAvailable: cars.isAvailable,
      createdAt: cars.createdAt,
      updatedAt: cars.updatedAt,
    })
    .from(cars)
    .where(eq(cars.isHidden, false))
    .orderBy(cars.createdAt);
}

/** Cached, tagged read of the published fleet. The admin car mutations
 *  (create/update/delete/toggle availability/toggle visibility) call
 *  `updateTag("cars-public")` after a successful write, so public
 *  pages pick up the change without invalidating unrelated routes. */
export const getPublishedCars = unstable_cache(
  async (): Promise<Vehicle[]> => Promise.all((await fetchPublishedCars()).map(toPublicVehicle)),
  ["cars-public"],
  { tags: ["cars-public"], revalidate: 3600 },
);

export async function getPublishedCarBySlug(slug: string): Promise<Vehicle | undefined> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return undefined;

  const getCachedCar = unstable_cache(
    async () => {
      const row = await db
        .select({
          id: cars.id,
          slug: cars.slug,
          name: cars.name,
          brand: cars.brand,
          model: cars.model,
          year: cars.year,
          category: cars.category,
          transmission: cars.transmission,
          fuelType: cars.fuelType,
          seats: cars.seats,
          pricePerDay: cars.pricePerDay,
          description: cars.description,
          imageUrl: cars.imageUrl,
          images: cars.images,
          features: cars.features,
          isHidden: cars.isHidden,
          isAvailable: cars.isAvailable,
          createdAt: cars.createdAt,
          updatedAt: cars.updatedAt,
        })
        .from(cars)
        .where(
          and(
            eq(cars.slug, normalizedSlug),
            eq(cars.isHidden, false),
          ),
        )
        .limit(1);

      return row[0] ? toPublicVehicle(row[0]) : undefined;
    },
    ["car-public", normalizedSlug],
    { tags: ["cars-public"], revalidate: 3600 },
  );

  return getCachedCar();
}

export async function getRelatedPublishedCars(
  slug: string,
  count = 3,
): Promise<Vehicle[]> {
  const all = await getPublishedCars();
  return all.filter((v) => v.slug !== slug).slice(0, count);
}
