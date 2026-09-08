"use client";

import { useState } from "react";
import { Factory, TrainFront, Check } from "lucide-react";
import { getDict, type Locale } from "@/content/i18n";
import { HOTSPOTS, METRO } from "@/content/metrics";
import { num } from "@/lib/format";

type TrackKey = "industrial" | "urban";

export default function SolutionsTabs({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [track, setTrack] = useState<TrackKey>("industrial");
  const data = track === "industrial" ? t.solutions.industrial : t.solutions.urban;

  const tabs: { key: TrackKey; label: string; Icon: typeof Factory }[] = [
    { key: "industrial", label: t.solutions.industrialTab, Icon: Factory },
    { key: "urban", label: t.solutions.urbanTab, Icon: TrainFront },
  ];

  const assets =
    track === "industrial"
      ? HOTSPOTS.filter((h) => h.type !== "facility").map((h) => `${h.name} — ${h.source}`)
      : [
          `Baku Metro — ${num(METRO.stations, locale)} stations, ${num(METRO.exits, locale)} exits`,
          `${num(METRO.recoverableHeatKw, locale)} kW recoverable`,
          `${METRO.stableTunnelTempC[0]}–${METRO.stableTunnelTempC[1]} °C year-round`,
        ];

  return (
    <div>
      <div
        role="tablist"
        aria-label={t.solutions.title}
        className="inline-flex flex-wrap rounded-lg border border-[var(--color-line-strong)] p-1"
      >
        {tabs.map(({ key, label, Icon }) => {
          const active = track === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTrack(key)}
              className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[var(--color-ink)] text-white"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              <Icon size={16} aria-hidden />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-9 grid gap-6 lg:grid-cols-3">
        <Panel title={t.solutions.assets} items={assets} />
        <Panel title={t.solutions.focus} items={data.focus} />
        <Panel title={t.solutions.benefit} items={data.benefit} checks />
      </div>

      <h3 className="h3 mt-14">{t.solutions.roadmap}</h3>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {data.phases.map((phase, i) => (
          <li key={phase.name} className="card ticked flex flex-col">
            <div className="flex items-center gap-2">
              <span className="mono text-[var(--color-emerald)]">
                {t.solutions.phase} {i + 1}
              </span>
              <span className="h-px flex-1 bg-[var(--color-line)]" aria-hidden />
            </div>
            <h4 className="h3 mt-3 !text-base">{phase.name}</h4>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  {t.solutions.client}
                </dt>
                <dd className="mt-0.5">{phase.client}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  {t.solutions.product}
                </dt>
                <dd className="mt-0.5">{phase.product}</dd>
              </div>
            </dl>
            <p className="muted mt-4 border-t border-[var(--color-line)] pt-4 text-sm leading-relaxed">
              {phase.value}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Panel({
  title,
  items,
  checks = false,
}: {
  title: string;
  items: string[];
  checks?: boolean;
}) {
  return (
    <div className="card h-full">
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-emerald)]">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
            {checks ? (
              <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-emerald)]" aria-hidden />
            ) : (
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-line-strong)]"
                aria-hidden
              />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
