/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL at build time; the fallback is the
 * subdomain the site launches on so sitemap and robots are never empty.
 */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://astem.inmytime.me").replace(/\/$/, "");
}
