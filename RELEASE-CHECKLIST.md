# MDA CAR — release checklist

- Production canonical origin: https://www.mdacar.com
- Google Maps business profile: https://maps.app.goo.gl/aiHneBVCio5FyD3C7
- Google review CTA uses the configured `site.googleReviewUrl` and opens in a new tab.
- Conseils header is `blog.header` and is shared by the Conseils index and the Morocco rental guide article.
- Review summary has no background image; legacy `reviews.background` media rows are cleaned automatically.
- Site media uploads: JPG/PNG/WebP/AVIF/GIF, maximum 8 MB.
- Static redirects contain one old-Vercel-host rule and one non-www-to-www rule.
- Sitemap and robots are generated from the canonical `www.mdacar.com` origin.
- No `.env.local` or secret token is included in this archive.

Before production deploy, run `npm ci`, then `npm run typecheck`, `npm run lint`, and `npm run build` in the target environment with the production environment variables present.

- Official MDA CAR Instagram profile is configured and linked through `/go/instagram`.
