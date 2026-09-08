import type { Locale } from "@/content/i18n";

const INTL_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  az: "az-AZ",
  ru: "ru-RU",
};

/**
 * Formatting is centralised so a figure reads identically everywhere it appears.
 * Azerbaijani and Russian both use a space as the thousands separator; forcing a
 * consistent group separator avoids the non-breaking-space glyph rendering as a
 * box in some fonts.
 */
export function num(value: number, locale: Locale, digits = 0): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/ /g, " ");
}

/** Compact form for tickers: 541,908 -> 541.9k, 2,373,557 -> 2.37M */
export function compact(value: number, locale: Locale): string {
  if (value >= 1_000_000) return `${num(value / 1_000_000, locale, 2)}M`;
  if (value >= 10_000) return `${num(value / 1000, locale, 1)}k`;
  return num(value, locale);
}

export function kw(value: number, locale: Locale): string {
  if (value >= 1000) return `${num(value / 1000, locale, 1)} MW`;
  return `${num(value, locale)} kW`;
}

export function range(pair: readonly [number, number], locale: Locale, unit = ""): string {
  return `${num(pair[0], locale, pair[0] % 1 ? 1 : 0)}–${num(pair[1], locale, pair[1] % 1 ? 1 : 0)}${unit}`;
}
