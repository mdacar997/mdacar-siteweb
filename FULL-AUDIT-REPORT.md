# MDA CAR — Full Revision Report

## Google reviews
- `Laisser votre avis sur Google` uses `site.googleReviewUrl` configured for MDA CAR's Google profile and opens in a new tab.
- `Voir tous les avis sur Google Maps` continues to use the supplied MDA CAR Maps URL.
- Review-summary background was removed from the public UI and legacy `reviews.background` media rows are cleaned automatically.

## Conseils / article
- `blog.header` is shared by `/blog` and `/blog/location-de-voiture-maroc-guide`.
- Changing the Conseils header in Admin invalidates the public blog pages immediately.

## SEO / GEO
- Canonical origin is locked to `https://www.mdacar.com`.
- Sitemap and robots use the same canonical origin.
- Old Vercel host redirect is kept once; duplicate redirect removed.
- JSON-LD organization logo follows the admin-managed logo.
- Official MDA CAR Instagram profile is connected through `/go/instagram` and included in the business `sameAs` graph.
- No third-party Google review aggregateRating/review schema was added.
- Public metadata was checked across public routes.

## Performance / images
- Largest static marketing images were recompressed as WebP while preserving their roles and responsive layout.
- Hero desktop remains separately optimized from the mobile hero.
- Existing Next.js image optimization remains enabled for normal `next/image` assets.

## Admin / media
- Site-media upload limit is consistently 8 MB on client and server.
- Allowed image types remain JPG, JPEG, PNG, WebP, AVIF and GIF.
- Media cache invalidation explicitly includes Conseils and the guide article.

## Security / infrastructure
- Canonical host redirects remain in place.
- HSTS and DNS-prefetch response headers were added.
- Existing CSP, noindex rules for admin/API/go routes and Vercel Blob restrictions remain intact.
- No `.env.local` or secret token is included.

## Validation
- Static source audit completed.
- The execution environment had an incomplete `node_modules` type-definition set; `tsc --noEmit` therefore reports missing ambient type packages rather than project-specific source errors. `npm ci` could not complete within the execution environment timeout.
- Run `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build` in the deployment environment before production deployment.
