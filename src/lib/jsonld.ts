import { site } from "./site";
import type { PublicSiteSettings } from "./business-settings-constants";

/** Parses a free-text opening-hours entry (as typed by the admin, e.g.
 *  "Ouvert 24h/24" or "09:00 - 18:00") into schema.org opens/closes times.
 *  Days that read as closed are omitted entirely — schema.org has no
 *  "closed" value. Best-effort by design: the admin field is free text,
 *  not a structured time picker, so this stays a small, defensive mapper
 *  rather than a rewrite of the settings form. */
function parseHoursEntry(hours: string): { opens: string; closes: string } | null {
  const normalized = hours.trim().toLowerCase();
  if (!normalized || normalized.includes("fermé") || normalized.includes("ferme")) {
    return null;
  }
  if (normalized.includes("24h")) {
    return { opens: "00:00", closes: "23:59" };
  }
  const match = normalized.match(/(\d{1,2})[:h](\d{2})?\s*-\s*(\d{1,2})[:h](\d{2})?/);
  if (match) {
    const [, h1, m1 = "00", h2, m2 = "00"] = match;
    return {
      opens: `${h1.padStart(2, "0")}:${m1}`,
      closes: `${h2.padStart(2, "0")}:${m2}`,
    };
  }
  return null;
}

const DAY_NAME_TO_SCHEMA: Record<string, string> = {
  Lundi: "Monday",
  Mardi: "Tuesday",
  Mercredi: "Wednesday",
  Jeudi: "Thursday",
  Vendredi: "Friday",
  Samedi: "Saturday",
  Dimanche: "Sunday",
};

function buildOpeningHoursSpecification(
  openingHours: PublicSiteSettings["openingHours"],
): Record<string, unknown>[] {
  const bySlot = new Map<string, string[]>();
  for (const entry of openingHours) {
    const parsed = parseHoursEntry(entry.hours);
    if (!parsed) continue; // closed / unparseable → day omitted, not fabricated
    const key = `${parsed.opens}-${parsed.closes}`;
    const schemaDay = DAY_NAME_TO_SCHEMA[entry.day] ?? entry.day;
    bySlot.set(key, [...(bySlot.get(key) ?? []), schemaDay]);
  }
  return Array.from(bySlot.entries()).map(([key, days]) => {
    const [opens, closes] = key.split("-");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens,
      closes,
    };
  });
}

/**
 * Structured data builders. Only confirmed, real business data is emitted:
 * - opening hours come from the database-backed business settings; physical
 *   address/coordinates are intentionally omitted from public structured data
 *   while the site's public positioning is service-focused,
 * - review ratings from third-party Google Maps are intentionally not emitted
 *   as review/aggregateRating structured data; the visible review section can
 *   still link users to the public Google listing.
 */
export function organizationJsonLd(
  settings: PublicSiteSettings,
  logoSrc = "/images/mda-car-logo.webp",
): Record<string, unknown> {
  const openingHoursSpecification = buildOpeningHoursSpecification(settings.openingHours);
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${site.url}/#business`,
    name: settings.businessName,
    url: site.url,
    telephone: settings.phoneInternational,
    image: `${site.url}/og`,
    logo: logoSrc.startsWith("http") ? logoSrc : `${site.url}${logoSrc}`,
    areaServed: [
      { "@type": "City", name: "Agadir" },
      { "@type": "AdministrativeArea", name: "Souss-Massa" },
      { "@type": "Country", name: "Maroc" },
    ],
    // Verified social profiles strengthen the business entity graph.
    sameAs: [settings.facebookUrl, site.instagram].filter(Boolean),
    hasMap: site.googleMapsUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phoneInternational,
      contactType: "customer service",
      areaServed: "MA",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de location de voitures MDA CAR",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Location de voitures à Agadir",
            url: `${site.url}/services/location-voiture-agadir`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Livraison de voitures partout au Maroc",
            url: `${site.url}/services/livraison-voiture-maroc`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Location de voitures à l'aéroport",
            url: `${site.url}/services/location-voiture-aeroport`,
          },
        },
      ],
    },
    // The physical address/coordinates are intentionally not emitted here:
    // the current public positioning is service-focused and the private/admin
    // business location must not reintroduce the retired public location name.
    ...(openingHoursSpecification.length > 0 ? { openingHoursSpecification } : {}),
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "fr",
    publisher: { "@id": `${site.url}/#business` },
  };
}

/** FAQPage schema — pass the exact Q&A already rendered on the page. */
export function faqJsonLd(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Service schema for a service/product page, linked to the business entity. */
export function serviceJsonLd({
  name,
  description,
  path,
  areaServed = ["Agadir", "Souss-Massa", "Maroc"],
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}/#service`,
    name,
    description,
    serviceType: name,
    url: `${site.url}${path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}${path}` },
    provider: { "@id": `${site.url}/#business` },
    areaServed: areaServed.map((areaName) => ({
      "@type": areaName === "Maroc" ? "Country" : "Place",
      name: areaName,
    })),
  };
}


/** Article structured data for editorial/guide content. */
export function articleJsonLd({
  headline,
  description,
  path,
}: {
  headline: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}${path}/#article`,
    headline,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}${path}` },
    url: `${site.url}${path}`,
    inLanguage: "fr-MA",
    author: { "@id": `${site.url}/#business` },
    publisher: { "@id": `${site.url}/#business` },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** List structured data helps search systems understand a visible fleet list. */
export function itemListJsonLd(
  items: { name: string; path: string; image?: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${site.url}${item.path}`,
      ...(item.image ? { image: item.image.startsWith("http") ? item.image : `${site.url}${item.image}` } : {}),
    })),
  };
}

/** Product/Car structured data for a rental vehicle page (GEO + rich results).
 *  A price is only emitted when a real numeric daily price exists. */
export function vehicleJsonLd(v: {
  slug: string;
  name: string;
  brand: string;
  description: string;
  imageSrc?: string;
  pricePerDay: string | null;
  isAvailable?: boolean;
}): Record<string, unknown> {
  const url = `${site.url}/nos-voitures/${v.slug}`;
  const price = v.pricePerDay ? Number.parseFloat(v.pricePerDay) : NaN;
  const image = v.imageSrc ? (v.imageSrc.startsWith("http") ? v.imageSrc : `${site.url}${v.imageSrc}`) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${v.name} à louer à Agadir`,
    description: v.description,
    url,
    ...(image ? { image } : {}),
    ...(v.brand ? { brand: { "@type": "Brand", name: v.brand } } : {}),
    category: "Location de voiture",
    ...(Number.isFinite(price) && price > 0
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "MAD",
            price,
            availability: v.isAvailable === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Maroc" },
            seller: { "@id": `${site.url}/#business` },
          },
        }
      : {}),
  };
}
