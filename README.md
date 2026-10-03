# MDA CAR — Production Project

## Overview

Production-ready Next.js website and admin dashboard for MDA CAR, a car-rental business serving Agadir, the airport and customers throughout Morocco.

### Main stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- PostgreSQL + Drizzle ORM
- Vercel Blob for persistent public vehicle/media images
- Server-side admin authentication with hashed passwords and revocable sessions

## Production configuration

The public canonical origin is:

`https://www.mdacar.com`

Production environment variables required by the application should be configured in Vercel. Never commit `.env`, `.env.local`, database credentials, Blob tokens, admin passwords or other private values.

See `.env.example` for the variable names expected by the project.

## Local verification

From the project root:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm start
```

## Database

The project uses Drizzle ORM and PostgreSQL. The deployment build currently synchronizes the schema with:

```bash
npm run db:push
```

Before changing production database structure, keep a database backup and review the schema change.

## Admin account

There is no public admin sign-up page. Create or reset an administrator from a trusted server/development environment with:

```bash
npm run create-admin -- "admin@example.com" "StrongPasswordHere" "Admin Name"
```

Use a unique, strong password and never place it in source control.

## Vercel Blob

Vehicle and site-media uploads use Vercel Blob. Configure the Blob store for the project and provide the Vercel-generated Blob environment variable in the deployment environment.

## SEO and indexing

The project includes:

- canonical metadata
- Open Graph and Twitter metadata
- `robots.txt`
- dynamic `sitemap.xml`
- JSON-LD structured data
- App Router favicon/app-icon files
- published-vehicle sitemap entries
- `noindex` protection for admin, API and non-public utility routes

Google Search Console should be connected after deployment and the production sitemap submitted there.

## Social links

Instagram is exposed on the public website through a neutral internal redirect path so the external profile handle is not embedded in public page markup or structured data. The actual profile target remains server-side/configured data.

Facebook is linked directly.

## Important launch checks

After deployment, verify:

1. `https://www.mdacar.com/robots.txt` returns HTTP 200.
2. `https://www.mdacar.com/sitemap.xml` returns valid XML and only public canonical URLs.
3. The homepage and key service pages show the correct canonical origin.
4. Favicon and app icons load from the production domain.
5. Reservation submission works and appears in the admin dashboard.
6. Admin login, logout and password change work correctly.
7. Vehicle/media uploads work in production.
8. Mobile navigation, forms, WhatsApp, phone, social and Google Maps links work.
9. Search Console is connected and the final sitemap is submitted.
10. Production Lighthouse/PageSpeed checks are run on mobile and desktop.

No source-code change can guarantee a Google ranking position or a specific indexing time; those are determined by Google's crawling and ranking systems and by the live site's signals.
