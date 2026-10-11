/**
 * The deployed origin, used for canonical URLs, the sitemap and social cards.
 * Set NEXT_PUBLIC_SITE_URL on Vercel once the domain is chosen (see .env.example).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
