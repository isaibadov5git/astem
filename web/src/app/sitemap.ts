import type { MetadataRoute } from "next";
import { LOCALES } from "@/content/i18n";
import { siteUrl } from "@/lib/site";

const PATHS = [
  "",
  "/technology",
  "/solutions",
  "/impact",
  "/feasibility",
  "/about",
  "/deck",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${base}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
