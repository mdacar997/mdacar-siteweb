import { NextResponse } from "next/server";
import { db } from "@/db";
import { businessSettings } from "@/db/schema";
import { resolveInstagramTarget } from "@/lib/instagram";

/**
 * /go/instagram — neutral outbound redirect to the business Instagram profile.
 * Keeps the profile handle out of every indexable/rendered surface of the site
 * (see lib/instagram.ts). Not indexable, not crawlable (robots.txt + header),
 * and the destination is restricted to https://(www.)instagram.com.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  let adminValue: string | null = null;
  try {
    const rows = await db
      .select({ instagramUrl: businessSettings.instagramUrl })
      .from(businessSettings)
      .limit(1);
    adminValue = rows[0]?.instagramUrl ?? null;
  } catch {
    // Database unavailable: fall back to the server-side default target.
  }

  const response = NextResponse.redirect(resolveInstagramTarget(adminValue), 307);
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
