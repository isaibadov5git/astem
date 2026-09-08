import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory, TrainFront } from "lucide-react";
import { getDict, LOCALES, type Locale } from "@/content/i18n";
import { INDUSTRIAL, METRO, PILOT, PRECEDENTS } from "@/content/metrics";
import { num, kw } from "@/lib/format";
import Reveal from "@/components/Reveal";
import { Stat, StatGrid, SectionHead } from "@/components/Stat";

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
  return { title: t.feasibility.title, description: t.feasibility.lede };
}

export default async function FeasibilityPage({
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
          <p className="eyebrow">{t.nav.feasibility}</p>
          <h1 className="display mt-4 max-w-4xl">{t.feasibility.title}</h1>
          <p className="lede mt-6">{t.feasibility.lede}</p>
        </div>
      </section>

      {/* ---- module specs ---- */}
      <section className="telemetry section">
        <div className="shell">
          <StatGrid>
            <Stat
              value={num(PILOT.thermalCapacityMw, locale, 1)}
              unit="MW"
              label={`${t.feasibility.capacity} · ${t.feasibility.perModule}`}
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
              label={`${t.feasibility.savings} (≈ $${num(PILOT.annualSavingsUsd, locale)})`}
              accent
            />
            <Stat
              value={`${num(PILOT.deploymentRangeKw[0], locale)}–${num(PILOT.deploymentRangeKw[1], locale)}`}
              unit="kW"
              label={t.feasibility.rangeTitle}
              accent
            />
          </StatGrid>

          <p className="muted mt-10 max-w-3xl text-sm leading-relaxed">
            {t.feasibility.rangeBody}
          </p>
        </div>
      </section>

      {/* ---- payback, split honestly by case ---- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead title={t.feasibility.payback} lede={t.feasibility.paybackNote} />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <PaybackCard
                icon={<Factory size={20} aria-hidden />}
                title={t.feasibility.paybackIndustrial}
                range={INDUSTRIAL.paybackYears}
                years={t.feasibility.years}
                cop={INDUSTRIAL.cop}
                detail={`${INDUSTRIAL.sourceTempC[0]}–${INDUSTRIAL.sourceTempC[1]} °C → ${INDUSTRIAL.outputTempC[0]}–${INDUSTRIAL.outputTempC[1]} °C`}
                locale={locale}
                accent="var(--color-emerald)"
              />
            </Reveal>
            <Reveal delay={80}>
              <PaybackCard
                icon={<TrainFront size={20} aria-hidden />}
                title={t.feasibility.paybackMetro}
                range={METRO.paybackYears}
                years={t.feasibility.years}
                cop={METRO.cop}
                detail={`${METRO.sourceTempC[0]}–${METRO.sourceTempC[1]} °C → ${METRO.outputTempC[0]}–${METRO.outputTempC[1]} °C`}
                locale={locale}
                accent="var(--color-cyan)"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- precedents ---- */}
      <section className="section border-t border-[var(--color-line)]">
        <div className="shell">
          <Reveal>
            <SectionHead
              title={t.feasibility.precedentsTitle}
              lede={t.feasibility.precedentsBody}
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {PRECEDENTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}>
                <div className="card ticked h-full">
                  <h3 className="h3">{p.name}</h3>
                  <p className="muted mt-2 text-sm">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- the ask ---- */}
      <section className="telemetry section">
        <div className="shell max-w-3xl">
          <Reveal>
            <p className="eyebrow">{t.feasibility.askTitle}</p>
            <h2 className="h2 mt-3">{t.feasibility.askBody}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {t.nav.requestAudit}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href={`/${locale}/deck`} className="btn btn-ghost">
                {t.nav.viewDeck}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PaybackCard({
  icon,
  title,
  range,
  years,
  cop,
  detail,
  locale,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  range: readonly [number, number];
  years: string;
  cop: number;
  detail: string;
  locale: Locale;
  accent: string;
}) {
  return (
    <div className="card ticked h-full">
      <div className="flex items-center gap-2.5" style={{ color: accent }}>
        {icon}
        <h3 className="h3 !text-base">{title}</h3>
      </div>
      <p className="num mt-5 text-4xl font-bold">
        {num(range[0], locale, range[0] % 1 ? 1 : 0)}–{num(range[1], locale)}
        <span className="ml-2 text-base font-semibold text-[var(--color-muted)]">{years}</span>
      </p>
      <dl className="mt-6">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] py-2.5">
          <dt className="text-sm text-[var(--color-muted)]">COP</dt>
          <dd className="num text-sm font-semibold">{cop.toFixed(1)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="text-sm text-[var(--color-muted)]">
            {kw(PILOT.thermalCapacityMw * 1000, locale)}
          </dt>
          <dd className="mono text-sm">{detail}</dd>
        </div>
      </dl>
    </div>
  );
}
