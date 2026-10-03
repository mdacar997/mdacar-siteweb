import "server-only";

/**
 * Instagram profile target — SERVER ONLY, by design.
 *
 * The official MDA CAR Instagram profile is resolved from admin settings or
 * the INSTAGRAM_PROFILE_URL environment variable, with a confirmed built-in fallback.
 * The public pages (footer, contact, mobile menu) link to the neutral internal
 * path INSTAGRAM_PUBLIC_PATH, and /go/instagram (a route handler) issues the
 * redirect to the real profile.
 *
 * Do NOT move this constant into lib/site.ts: that module is imported by
 * client components and would be bundled into browser JavaScript.
 */
export const INSTAGRAM_PUBLIC_PATH = "/go/instagram";

const DEFAULT_INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/location_de_voiture_biougra?stkn=MWl4djBraXZ5cnlzcg==";

/** Only https links to instagram.com are ever used as a redirect target. */
export function isSafeInstagramUrl(raw: string | null | undefined): raw is string {
  if (!raw) return false;
  try {
    const url = new URL(raw.trim());
    return (
      url.protocol === "https:" &&
      (url.hostname === "instagram.com" || url.hostname === "www.instagram.com")
    );
  } catch {
    return false;
  }
}

/** Priority: admin-saved value (Settings) → INSTAGRAM_PROFILE_URL env → built-in default. */
export function resolveInstagramTarget(adminValue?: string | null): string {
  if (isSafeInstagramUrl(adminValue)) return adminValue.trim();
  const fromEnv = process.env.INSTAGRAM_PROFILE_URL;
  if (isSafeInstagramUrl(fromEnv)) return fromEnv.trim();
  return DEFAULT_INSTAGRAM_PROFILE_URL;
}
