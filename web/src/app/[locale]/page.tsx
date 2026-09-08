import Link from "next/link";
import { ArrowRight, Map, Flame, Snowflake } from "lucide-react";
import { getDict, fill, type Locale } from "@/content/i18n";
import { INDUSTRIAL, METRO, PILOT } from "@/content/metrics";
import { num, compact } from "@/lib/format";
import ThermalLoop from "@/components/ThermalLoop";
import Reveal from "@/components/Reveal";
import { Stat, StatGrid, SectionHead } from "@/components/Stat";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDict(locale);

  const nav = [
    { href: `/${locale}/technology`, label: t.nav.technology, body: t.tech.lede },
    { href: `/${locale}/solutions`, label: t.nav.solutions, body: t.solutions.lede },
    { href: `/${locale}/impact`, label: t.nav.impact, body: t.impact.lede },
    { href: `/${locale}/feasibility`, label: t.nav.feasibility, body: t.feasibility.lede },
  ];

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="shell pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1 className="display mt-5 max-w-5xl">{t.home.headline}</h1>
          <p className="lede mt-7">{t.home.sub}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {t.home.ctaPrimary}
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href={`/${locale}/impact`} className="btn btn-ghost">
              {t.home.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="shell pb-14">
          <div className="ticked border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-4 md:p-8">
            <ThermalLoop locale={locale} />
          </div>
        </div>
      </section>

      {/* ---------------- ticker ---------------- */}
      <section className="telemetry border-b border-[var(--color-ink-line)]">
        <div className="shell py-12 md:py-16">
          <StatGrid>
            <Stat
              value={num(METRO.recoverableHeatKw, locale)}
              unit="kW"
              label={t.home.tickerRecoverable}
              accent
            />
            <Stat value={`${INDUSTRIAL.cop}+`} label={t.home.tickerCop} accent />
            <Stat
              value={compact(METRO.annualCo2Tons, locale)}
              unit="t"
              label={t.home.tickerCo2}
              accent
            />
            <Stat
              value={compact(METRO.dailyPassengers, locale)}
              label={t.home.tickerPassengers}
              accent
            />
          </StatGrid>
        </div>
      </section>

      {/* ---------------- the paradox ---------------- */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal>
              <SectionHead
                eyebrow={t.nav.solutions}
                title={t.home.paradoxTitle}
                lede={t.home.paradoxBody}
              />
            </Reveal>

            <Reveal delay={80} className="flex flex-col justify-center gap-4">
              <div className="card ticked flex items-start gap-4">
                <Flame className="mt-0.5 shrink-0 text-[var(--color-amber)]" size={22} aria-hidden />
                <div>
                  <p className="h3">{t.home.paradoxWasted}</p>
                  <p className="mt-2 num text-3xl font-bold text-[var(--color-ink)]">
                    {num(METRO.grossHeatKw, locale)}{" "}
                    <span className="text-base font-semibold text-[var(--color-muted)]">kW</span>
                  </p>
                  <p className="muted mt-1 text-sm">
                    {METRO.stableTunnelTempC[0]}–{METRO.stableTunnelTempC[1]} °C ·{" "}
                    {num(METRO.stations, locale)} {t.impact.mapSelect.toLowerCase()}
                  </p>
                </div>
              </div>

              <div className="card ticked flex items-start gap-4">
                <Snowflake className="mt-0.5 shrink-0 text-[var(--color-cyan)]" size={22} aria-hidden />
                <div>
                  <p className="h3">{t.home.paradoxBurned}</p>
                  <p className="mt-2 num text-3xl font-bold text-[var(--color-ink)]">
                    {num(METRO.ventilators, locale)}
                  </p>
                  <p className="muted mt-1 text-sm">
                    {fill(t.tech.ventilatorsNote, { n: METRO.ventilators })}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- proof ---------------- */}
      <section className="telemetry section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <Reveal>
              <p className="eyebrow">{t.impact.title}</p>
              <h2 className="h2 mt-3">{t.home.proofTitle}</h2>
              <p className="lede mt-5">{t.home.proofBody}</p>
              <Link href={`/${locale}/impact`} className="btn btn-ghost mt-8">
                <Map size={16} aria-hidden />
                {t.home.proofCta}
              </Link>
            </Reveal>

            <Reveal delay={80}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--color-ink-line)] bg-[var(--color-ink-line)]">
                {[
                  { v: num(METRO.stations, locale), l: t.impact.mapSelect },
                  { v: num(METRO.exits, locale), l: t.impact.mapExits },
                  { v: num(METRO.annualMwh, locale), l: `${t.impact.calcEnergy} (MWh)` },
                  { v: num(METRO.homesHeated, locale), l: t.impact.calcHomes },
                ].map((item) => (
                  <div key={item.l} className="bg-[var(--color-ink)] p-6">
                    <dt className="num text-2xl font-bold text-white md:text-3xl">{item.v}</dt>
                    <dd className="stat-label">{item.l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- pilot strip ---------------- */}
      <section className="section border-b border-[var(--color-line)]">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow={t.nav.feasibility}
              title={t.feasibility.title}
              lede={t.feasibility.lede}
            />
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <StatGrid>
              <Stat
                value={num(PILOT.thermalCapacityMw, locale, 1)}
                unit="MW"
                label={t.feasibility.capacity}
              />
              <Stat
                value={num(PILOT.annualEnergySavedGwh, locale, 1)}
                unit="GWh"
                label={t.feasibility.energy}
              />
              <Stat
                value={num(PILOT.annualSavingsAzn, locale)}
                unit="AZN"
                label={t.feasibility.savings}
              />
              <Stat
                value={`${INDUSTRIAL.paybackYears[0]}–${METRO.paybackYears[1]}`}
                unit={t.feasibility.years}
                label={t.feasibility.payback}
              />
            </StatGrid>
          </Reveal>
          <Reveal delay={140}>
            <Link href={`/${locale}/feasibility`} className="btn btn-ghost mt-10">
              {t.common.readMore}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- navigation cards ---------------- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <h2 className="h2">{t.home.sectionsTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {nav.map((item, i) => (
              <Reveal key={item.href} delay={i * 60}>
                <Link
                  href={item.href}
                  className="card ticked group block h-full transition-colors hover:border-[var(--color-line-strong)] hover:bg-[var(--color-paper-warm)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="h3">{item.label}</h3>
                    <ArrowRight
                      size={18}
                      aria-hidden
                      className="shrink-0 text-[var(--color-muted)] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                  <p className="muted mt-3 line-clamp-3 text-sm leading-relaxed">{item.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
