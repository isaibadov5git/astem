"use client";

import { useState } from "react";
import { Sun, Snowflake, Factory, TrainFront } from "lucide-react";
import { getDict, type Locale } from "@/content/i18n";

export default function SeasonToggle({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [season, setSeason] = useState<"winter" | "summer">("winter");
  const winter = season === "winter";

  return (
    <div>
      <div
        role="tablist"
        aria-label={t.tech.seasonTitle}
        className="inline-flex rounded-lg border border-[var(--color-ink-line)] p-1"
      >
        {(["winter", "summer"] as const).map((s) => {
          const active = season === s;
          const Icon = s === "winter" ? Snowflake : Sun;
          return (
            <button
              key={s}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setSeason(s)}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? s === "winter"
                    ? "bg-[var(--color-cyan)] text-white"
                    : "bg-[var(--color-amber)] text-white"
                  : "text-[var(--color-muted-dark)] hover:text-white"
              }`}
            >
              <Icon size={15} aria-hidden />
              {s === "winter" ? t.tech.winter : t.tech.summer}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card">
          <div className="flex items-center gap-2.5">
            <Factory size={18} className="text-[var(--color-emerald-bright)]" aria-hidden />
            <h3 className="h3">{t.solutions.industrialTab}</h3>
          </div>
          <p className="muted mt-3 text-sm leading-relaxed">
            {winter ? t.tech.winterIndustrial : t.tech.summerIndustrial}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2.5">
            <TrainFront size={18} className="text-[var(--color-cyan-bright)]" aria-hidden />
            <h3 className="h3">{t.solutions.urbanTab}</h3>
          </div>
          <p className="muted mt-3 text-sm leading-relaxed">
            {winter ? t.tech.winterMetro : t.tech.summerMetro}
          </p>
        </div>
      </div>
    </div>
  );
}
