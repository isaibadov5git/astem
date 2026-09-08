import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDict, fill, LOCALES, type Locale } from "@/content/i18n";
import { INDUSTRIAL, METRO, PILOT, PRECEDENTS, HOTSPOTS } from "@/content/metrics";
import { num } from "@/lib/format";
import ThermalLoop from "@/components/ThermalLoop";
import Reveal from "@/components/Reveal";
import { Stat, StatGrid } from "@/components/Stat";

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
  return { title: t.deck.title, description: t.deck.lede };
}

/**
 * The investor deck as a page rather than a PDF download — the project lead's
 * explicit choice. Same narrative order as the source decks, built from the same
 * single source of figures so the story cannot drift from the site.
 */
export default async function DeckPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDict(locale);

  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow">{t.deck.title}</p>
          <h1 className="display mt-4 max-w-4xl">{t.home.headline}</h1>
          <p className="lede mt-6">{t.deck.lede}</p>
        </div>
      </section>

      <Slide n="01" title={t.home.paradoxTitle} locale={locale}>
        <p className="lede">{t.home.paradoxBody}</p>
        <StatGrid>
          <Stat value={num(METRO.grossHeatKw, locale)} unit="kW" label={t.impact.mapGross} />
          <Stat
            value={`${METRO.stableTunnelTempC[0]}–${METRO.stableTunnelTempC[1]}`}
            unit="°C"
            label={t.tech.copSourceLabel}
          />
          <Stat value={num(METRO.ventilators, locale)} label={t.home.paradoxBurned} />
          <Stat value={num(METRO.stations, locale)} label={t.impact.mapSelect} />
        </StatGrid>
      </Slide>

      <Slide n="02" title={t.tech.title} dark locale={locale}>
        <p className="lede">{t.tech.lede}</p>
        <div className="ticked border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)]/40 p-4 md:p-8">
          <ThermalLoop locale={locale} />
        </div>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.tech.steps.map((step) => (
            <li key={step.n} className="card">
              <span className="mono text-[var(--color-cyan-bright)]">{step.n}</span>
              <h3 className="h3 mt-3 !text-base">{step.title}</h3>
              <p className="muted mt-2 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide n="03" title={t.home.proofTitle} locale={locale}>
        <p className="lede">{t.home.proofBody}</p>
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
        <div className="scroll-x rounded-xl border border-[var(--color-line)]">
          <table className="data min-w-[36rem]">
            <thead>
              <tr>
                <th>{t.solutions.assets}</th>
                <th>{t.solutions.focus}</th>
              </tr>
            </thead>
            <tbody>
              {HOTSPOTS.map((h) => (
                <tr key={h.id}>
                  <td className="font-medium">{h.name}</td>
                  <td className="muted">{h.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Slide>

      <Slide n="04" title={t.solutions.densityTitle} dark locale={locale}>
        <p className="lede">{t.solutions.densityBody}</p>
        <StatGrid>
          <Stat
            value={num(METRO.passengersPerStationMillions, locale, 1)}
            label={`Baku — ${t.solutions.densityUnit}`}
            accent
          />
          <Stat
            value={num(METRO.londonPassengersPerStationMillions, locale, 1)}
            label={`London — ${t.solutions.densityUnit}`}
          />
          <Stat value={`${INDUSTRIAL.cop}+`} label={t.impact.calcIndustrial} accent />
          <Stat value={METRO.cop.toFixed(1)} label={t.impact.calcMetro} accent />
        </StatGrid>
        <p className="muted text-sm">
          {t.feasibility.precedentsBody}{" "}
          {PRECEDENTS.map((p) => `${p.name} (${p.detail})`).join(" · ")}
        </p>
      </Slide>

      <Slide n="05" title={t.solutions.roadmap} locale={locale}>
        <div className="grid gap-4 md:grid-cols-3">
          {t.solutions.urban.phases.map((phase, i) => (
            <div key={phase.name} className="card ticked">
              <span className="mono text-[var(--color-emerald)]">
                {t.solutions.phase} {i + 1}
              </span>
              <h3 className="h3 mt-3 !text-base">{phase.name}</h3>
              <p className="muted mt-3 text-sm leading-relaxed">{phase.value}</p>
            </div>
          ))}
        </div>
      </Slide>

      <Slide n="06" title={t.feasibility.title} dark locale={locale}>
        <StatGrid>
          <Stat
            value={num(PILOT.thermalCapacityMw, locale, 1)}
            unit="MW"
            label={t.feasibility.capacity}
            accent
          />
          <Stat
            value={num(PILOT.annualEnergySavedGwh, locale, 1)}
            unit="GWh"
            label={t.feasibility.energy}
            accent
          />
          <Stat
            value={num(PILOT.annualSavingsAzn, locale)}
            unit="AZN"
            label={t.feasibility.savings}
            accent
          />
          <Stat
            value={`${INDUSTRIAL.paybackYears[0]}–${METRO.paybackYears[1]}`}
            unit={t.feasibility.years}
            label={t.feasibility.payback}
            accent
          />
        </StatGrid>
        <p className="muted text-sm">{t.feasibility.paybackNote}</p>
      </Slide>

      <section className="section border-t border-[var(--color-line)]">
        <div className="shell max-w-3xl">
          <Reveal>
            <p className="eyebrow">{t.feasibility.askTitle}</p>
            <h2 className="h2 mt-3">{t.feasibility.askBody}</h2>
            <p className="muted mt-6 text-sm">
              {fill(t.footer.sourceNote, { year: METRO.measuredYear })}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary mt-8">
              {t.nav.requestAudit}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Slide({
  n,
  title,
  children,
  dark = false,
  locale,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
  locale: Locale;
}) {
  const t = getDict(locale);
  return (
    <section className={`section ${dark ? "telemetry" : "border-b border-[var(--color-line)]"}`}>
      <div className="shell">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="mono text-[var(--color-muted)]">
              {t.deck.section} {n}
            </span>
            <span className="h-px flex-1 bg-[var(--color-line)]" aria-hidden />
          </div>
          <h2 className="h2 mt-5 max-w-4xl">{title}</h2>
        </Reveal>
        <Reveal delay={70} className="mt-8 flex flex-col gap-8">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
