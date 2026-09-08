"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/content/i18n";

/**
 * maplibre-gl touches `window` when the module loads, so it must never be pulled
 * into the server render. `ssr: false` is only permitted inside a client
 * component, which is the entire reason this thin wrapper exists.
 */
const MetroMap = dynamic(() => import("./MetroMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[26rem] w-full animate-pulse rounded-xl border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)]/40 md:h-[34rem]" />
  ),
});

export default function MetroMapLoader({ locale }: { locale: Locale }) {
  return <MetroMap locale={locale} />;
}
