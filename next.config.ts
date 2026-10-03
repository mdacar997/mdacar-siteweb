import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  // Next.js App Router emits inline hydration scripts; without a per-request
  // nonce (which would force every page to be dynamic) they need 'unsafe-inline'.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
  "font-src 'self' data:",
  "connect-src 'self' https://vercel.com https://blob.vercel-storage.com https://*.blob.vercel-storage.com https://*.public.blob.vercel-storage.com",
  "frame-src https://maps.google.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Security headers are static so public pages can be prerendered and cached.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Legacy fallback for browsers that don't honor the
          // frame-ancestors directive in the CSP above.
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      // Defense in depth: robots.txt already excludes these paths, but the
      // HTTP response also explicitly tells compliant crawlers not to index
      // admin/API responses if they are discovered directly.
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/go/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/location-voiture-agadir", destination: "/services/location-voiture-agadir", permanent: true },
      { source: "/livraison-voiture-maroc", destination: "/services/livraison-voiture-maroc", permanent: true },
      // Host-level canonicalization: old deployment and non-www production host
      // permanently redirect to the official www origin without affecting paths.
      {
        source: "/:path*",
        has: [{ type: "host", value: "mdacars-site.vercel.app" }],
        destination: "https://www.mdacar.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "mdacar-site.vercel.app" }],
        destination: "https://www.mdacar.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "mdacar.com" }],
        destination: "https://www.mdacar.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [55, 60, 75, 80, 82, 85, 90],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
