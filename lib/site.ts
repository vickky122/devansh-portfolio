/**
 * The deployed origin, used for canonical URLs, the sitemap and social cards (server-side only).
 * Order: NEXT_PUBLIC_SITE_URL if set (an explicit override), else Vercel's own production URL
 * (VERCEL_PROJECT_PRODUCTION_URL: the custom domain once one is attached, otherwise the *.vercel.app address),
 * else localhost for local development.
 */
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercel ? `https://${vercel}` : "http://localhost:3000")
).replace(/\/$/, "");
