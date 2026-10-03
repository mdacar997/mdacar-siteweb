/**
 * MDA CAR — single source of truth for business information.
 * Only confirmed, real data appears here. Missing data uses the exact
 * placeholder tokens required by the brand spec and MUST be replaced
 * with real information before launch.
 */
// Current production origin: the canonical public domain.
// Canonical URLs, sitemap, Open Graph and JSON-LD are all derived from this origin.
// Preview/alternate Vercel hosts are never used as canonical URLs.
const PRODUCTION_SITE_URL = "https://www.mdacar.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
// Safety guard: the public site must never emit a preview/alternate Vercel
// origin as canonical. Even if an old environment variable survives a
// deployment, metadata, sitemap, robots and JSON-LD stay on the real domain.
const resolvedSiteUrl =
  configuredSiteUrl === PRODUCTION_SITE_URL
    ? configuredSiteUrl
    : PRODUCTION_SITE_URL;

export const site = {
  name: "MDA CAR",
  tagline: "Location de voitures",
  // One canonical origin for metadata, sitemap and structured data.
  url: resolvedSiteUrl.replace(/\/+$/, ""),

  // Confirmed contact data
  phoneDisplay: "06 50 91 11 22",
  phoneInternational: "+212650911122",
  telHref: "tel:+212650911122",
  whatsappNumber: "212650911122",
  // Official MDA CAR Instagram profile. Public social buttons use the
  // server-side /go/instagram redirect so the destination can remain centrally managed.
  instagram: "https://www.instagram.com/location_de_voiture_biougra?stkn=MWl4djBraXZ5cnlzcg==",
  facebook: "https://www.facebook.com/profile.php?id=100090192637682",
  // Google Maps place link for the business profile.
  // Built from the place's stable CID so the URL stays short and clean.
  googleMapsUrl: "https://maps.app.goo.gl/aiHneBVCio5FyD3C7",
  // Direct Google review composer for the same MDA CAR Business Profile.
  // Derived from the current Google Maps feature/CID in googleMapsUrl.
  googleReviewUrl:
    "https://www.google.com/search?hl=fr&q=MDA%20CAR%20biougra&ludocid=15736903763679957559#lrd=0xdb3c5e9acd60421:0xda64b6986aa6d237,3",

  // Confirmed geography
  region: "Souss-Massa",
  country: "Maroc",
  countryCode: "MA",
  postalCode: "80000",
  // Verified physical coordinates retained for private/admin business settings.
  latitude: 30.21017983393551,
  longitude: -9.37909042733886,
  serviceCountry: "Maroc",
  // Public-facing service location. The physical business location is kept in private/admin settings.
  publicServiceCity: "Agadir",
  serviceDescription: "Location de voitures à Agadir, location à l’aéroport et livraison du véhicule partout au Maroc, notamment à l’hôtel, au domicile ou à la gare, selon disponibilité et modalités confirmées avec le client.",

  // Confirmed opening hours — open 24/7, every day of the week.
  hoursLabel: "Ouvert 24h/24, 7j/7",
  openingHours: [
    { day: "Lundi", hours: "Ouvert 24h/24" },
    { day: "Mardi", hours: "Ouvert 24h/24" },
    { day: "Mercredi", hours: "Ouvert 24h/24" },
    { day: "Jeudi", hours: "Ouvert 24h/24" },
    { day: "Vendredi", hours: "Ouvert 24h/24" },
    { day: "Samedi", hours: "Ouvert 24h/24" },
    { day: "Dimanche", hours: "Ouvert 24h/24" },
  ] as const,
} as const;

/** Exact placeholder tokens — visible in the UI until real data is provided. */
export const PLACEHOLDERS = {
  address: "[BUSINESS ADDRESS TO BE PROVIDED]",
  hours: "[OPENING HOURS TO BE PROVIDED]",
  price: "[VEHICLE PRICE TO BE PROVIDED]",
  conditions: "[RENTAL CONDITIONS TO BE PROVIDED]",
  service: "[CONFIRM SERVICE BEFORE PUBLISHING]",
} as const;

export const DEFAULT_WA_MESSAGE =
  "Bonjour MDA CAR, je souhaite des informations sur la location d’une voiture . Merci.";

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Primary navigation. Ordered to lead with the new public positioning
 *  The three service offers are grouped under /services rather than
 *  duplicated as separate landing pages. */
export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/nos-voitures", label: "Nos voitures" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Conseils" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;
