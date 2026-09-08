import type { Metadata } from "next";
import { getDict, fill, LOCALES, type Locale } from "@/content/i18n";
import { METRO } from "@/content/metrics";
import { num } from "@/lib/format";
import { getStations } from "@/lib/metro";
import Reveal from "@/components/Reveal";
import { Stat, StatGrid, SectionHead } from "@/components/Stat";
import Calculator from "@/components/Calculator";

import MetroMap from "@/components/MetroMapLoader";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale as Locale);
  return { title: t.impact.title, description: t.impact.lede };
}

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDict(locale);
  const stations = getStations();

  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow">{t.impact.title}</p>
          <h1 className="display mt-4 max-w-4xl">{t.impact.heroTitle}</h1>
          <p className="lede mt-6">{t.impact.lede}</p>
        </div>
      </section>

      {/* ---- network aggregates ---- */}
      <section className="border-b border-[var(--color-line)] py-12">
        <div className="shell">
          <StatGrid>
            <Stat
              value={num(METRO.recoverableHeatKw, locale)}
              unit="kW"
              label={t.impact.mapRecoverable}
            />
            <Stat value={num(METRO.annualMwh, locale)} unit="MWh" label={t.impact.calcEnergy} />
            <Stat value={num(METRO.annualCo2Tons, locale)} unit="t" label={t.impact.calcCo2} />
            <Stat value={num(METRO.homesHeated, locale)} label={t.impact.calcHomes} />
          </StatGrid>
        </div>
      </section>

      {/* ---- map ---- */}
      <section className="telemetry section">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow={`${METRO.measuredYear}`}
              title={t.impact.mapTitle}
              lede={fill(t.impact.mapBody, {
                stations: METRO.stations,
                exits: METRO.exits,
                year: METRO.measuredYear,
              })}
            />
          </Reveal>
          <div className="mt-10">
            <MetroMap locale={locale} />
          </div>
        </div>
      </section>

      {/* ---- calculator ---- */}
      <section className="telemetry border-t border-[var(--color-ink-line)] section">
        <div className="shell">
          <Reveal>
            <SectionHead title={t.impact.calcTitle} />
          </Reveal>
          <div className="mt-10">
            <Calculator locale={locale} />
          </div>
        </div>
      </section>

      {/* ---- full station table ---- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <h2 className="h2">{t.impact.mapTop}</h2>
          </Reveal>
          <Reveal delay={80} className="scroll-x mt-8 rounded-xl border border-[var(--color-line)]">
            <table className="data min-w-[46rem]">
              <thead>
                <tr>
                  <th>{t.impact.mapSelect}</th>
                  <th>{t.impact.mapLine}</th>
                  <th className="text-right">{t.impact.mapPassengers}</th>
                  <th className="text-right">{t.impact.mapExits}</th>
                  <th className="text-right">{t.impact.mapRecoverable}</th>
                  <th className="text-right">{t.impact.mapAnnual}</th>
                </tr>
              </thead>
              <tbody>
                {stations.map((s) => (
                  <tr key={s.id}>
                    <td className="font-medium">
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: s.lineColor }}
                          aria-hidden
                        />
                        {locale === "en" ? s.name : s.nameAz}
                      </span>
                    </td>
                    <td className="muted">{s.line}</td>
                    <td className="num text-right">{num(s.dailyPassengers, locale)}</td>
                    <td className="num text-right">{num(s.exits, locale)}</td>
                    <td className="num text-right font-semibold">
                      {num(s.recoverableKw, locale)} kW
                    </td>
                    <td className="num text-right">{num(s.annualMwh, locale)} MWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
    </>
  );
}
