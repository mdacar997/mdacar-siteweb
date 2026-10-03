# MDA CAR — SEO / Local SEO / GEO implementation

## Primary search intent

The main commercial intent is **location de voiture au Maroc**: users want to compare rental options, understand conditions, find a vehicle and contact an agency.

The content strategy therefore separates the broad Morocco topic from local landing pages instead of repeating the same keyword on every page.

## Keyword map

| Keyword | Recommended target |
|---|---|
| location de voiture | Homepage + fleet context |
| agence de location de voitures | About/services context |
| voiture de location pas cher | Guide + commercial copy where pricing is actually explained |
| agence location de voiture | Guide/services context |
| location de voiture pas cher | Guide + relevant fleet/service copy |
| agence de location de voiture | Guide/services context |
| location de voiture maroc | Guide + Morocco service content |
| location de voiture au maroc | Main guide / broader topical target |
| location de voiture Agadir | Agadir service page |
| location de voiture à l'aéroport | Airport service page |

## New SEO content

- `/blog` — editorial hub for rental advice.
- `/blog/location-de-voiture-maroc-guide` — 1,500–2,000-word French guide targeting the Morocco rental intent.
- The guide contains natural internal links to the fleet, reservation, contact, Agadir and airport service pages.
- The guide includes FAQ content and FAQPage structured data.
- The guide also emits Article structured data.

## Metadata

**Article SEO title**

`Location de voiture au Maroc : guide complet | MDA CAR`

**Meta description**

`Guide MDA CAR pour choisir une agence de location de voiture au Maroc, comparer les offres, préparer votre réservation et louer à Agadir.`

**Canonical**

`https://www.mdacar.com/blog/location-de-voiture-maroc-guide`

**Suggested H1**

`Location de voiture au Maroc : le guide complet pour bien louer`

## Local SEO

The public site already exposes strong local signals around Agadir, Souss-Massa and Morocco. The new guide reinforces those signals without stuffing city names into every paragraph.

Keep these signals consistent everywhere:

- Business name: MDA CAR
- Main service: location de voitures
- Main public service city: Agadir
- Region: Souss-Massa
- Country: Maroc
- Phone: 06 50 91 11 22
- Google Maps / Business Profile link
- Opening hours only when they are confirmed and current

## Google Business Profile — manual actions

These cannot be safely automated from the website code:

1. Keep the business name, phone, website and service information consistent with the site.
2. Use the official website URL: `https://www.mdacar.com`.
3. Make sure the Google Business Profile describes the real service area and does not claim locations that are not actually served.
4. Add recent, real photos of the vehicles, service and relevant locations.
5. Ask genuine customers for honest reviews after completed rentals.
6. Respond to reviews naturally and mention the actual service when relevant; never fabricate reviews or locations.
7. Publish occasional real updates when there is useful information for customers.

## Local authority / citations

Prioritize accurate business listings on legitimate Moroccan/local directories and travel/business platforms. Keep the same business details and remove or correct obsolete listings. Do not create large numbers of low-quality directory links.

## Backlinks

Prefer relevant, legitimate links:

- local tourism/business websites
- Moroccan travel resources
- partner hotels or tourism businesses where a real relationship exists
- local associations/directories
- useful travel guides that genuinely reference MDA CAR

Do not buy large batches of spam backlinks.

## Reviews and trust

The site should continue showing real customer feedback only. Do not add invented ratings, aggregate ratings or testimonials. Keep the existing approach of linking visitors to the public Google listing where appropriate.

## Technical SEO already supported

- Canonical production origin is `https://www.mdacar.com`.
- Public pages use unique metadata.
- `robots.txt` excludes admin/API/redirect paths.
- `sitemap.xml` includes public static pages and published vehicle URLs.
- The new blog and guide are included in the sitemap.
- JSON-LD is used for the business, website, services, breadcrumbs, vehicles, article and FAQ content.
- Admin/API/redirect paths receive `X-Robots-Tag: noindex`.
- Images use Next.js image optimization and modern formats.
- The public app uses cached/static rendering with hourly refresh and admin-triggered invalidation.
- The existing CSP/security headers remain intact.

## Conversion SEO

Every informational page should lead naturally to one of these actions:

- view the fleet
- request a reservation
- contact MDA CAR
- WhatsApp / phone

Do not turn informational pages into keyword-heavy sales pages. The objective is to answer the search intent first, then provide a clear next step.

## Google Search Console workflow after deployment

1. Deploy the updated project on the canonical domain.
2. Confirm `https://www.mdacar.com/robots.txt`.
3. Confirm `https://www.mdacar.com/sitemap.xml`.
4. Submit the sitemap in Google Search Console.
5. Inspect the new guide URL and request indexing.
6. Inspect the Agadir, fleet and service URLs.
7. Monitor queries, impressions, clicks and indexing over time.
8. Improve titles/content based on real Search Console data rather than guessing.

## Important content rule

Do not force every keyword into every page. One page should have one main search intent, with related terms used naturally. This protects readability and avoids keyword stuffing while creating a coherent topical structure for MDA CAR.
