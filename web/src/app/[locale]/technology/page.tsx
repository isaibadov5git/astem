import type { Metadata } from "next";
import { Cpu, Thermometer, Wind, Droplets } from "lucide-react";
import { getDict, fill, LOCALES, type Locale } from "@/content/i18n";
import { INDUSTRIAL, METRO } from "@/content/metrics";
import Reveal from "@/components/Reveal";
import { SectionHead } from "@/components/Stat";
import SeasonToggle from "@/components/SeasonToggle";

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
  return { title: t.tech.title, description: t.tech.lede };
}

export default async function TechnologyPage({
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
          <p className="eyebrow">{t.nav.technology}</p>
          <h1 className="display mt-4 max-w-4xl">{t.tech.title}</h1>
          <p className="lede mt-6">{t.tech.lede}</p>
        </div>
      </section>

      {/* ---- four-stage industrial pipeline ---- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <h2 className="h2">{t.tech.pipelineTitle}</h2>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-4">
            {t.tech.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 70} className="bg-white p-7">
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[var(--color-emerald)]">{step.n}</span>
                  <span className="h-px flex-1 bg-[var(--color-line)]" aria-hidden />
                </div>
                <h3 className="h3 mt-4">{step.title}</h3>
                <p className="muted mt-3 text-sm leading-relaxed">{step.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="card ticked mt-10 flex flex-col gap-5 border-[var(--color-line-strong)] bg-[var(--color-paper-warm)] md:flex-row md:items-start md:gap-7">
              <Cpu size={26} className="shrink-0 text-[var(--color-emerald)]" aria-hidden />
              <div>
                <h3 className="h3">{t.tech.defensibleTitle}</h3>
                <p className="muted mt-3 max-w-3xl leading-relaxed">{t.tech.defensibleBody}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- urban pipeline ---- */}
      <section className="telemetry section">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow={t.solutions.urbanTab}
              title={t.tech.metroTitle}
              lede={t.tech.metroBody}
            />
          </Reveal>

          <Reveal delay={80} className="mt-12">
            <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              <div className="card">
                <Wind size={20} className="text-[var(--color-cyan-bright)]" aria-hidden />
                <p className="h3 mt-3">{t.tech.metroCapture}</p>
                <p className="mono mt-2 text-[var(--color-cyan-bright)]">
                  {METRO.sourceTempC[0]}–{METRO.sourceTempC[1]} °C
                </p>
              </div>

              <Arrow />

              <div className="card border-[var(--color-emerald)]/40">
                <Cpu size={20} className="text-[var(--color-emerald-bright)]" aria-hidden />
                <p className="h3 mt-3">{t.tech.metroUpgrade}</p>
                <p className="mono mt-2 text-[var(--color-emerald-bright)]">
                  COP {METRO.cop.toFixed(1)}
                </p>
              </div>

              <Arrow />

              <div className="card">
                <div className="flex gap-2">
                  <Thermometer size={20} className="text-[var(--color-amber)]" aria-hidden />
                  <Droplets size={20} className="text-[var(--color-amber)]" aria-hidden />
                </div>
                <p className="h3 mt-3">{t.tech.metroHeating}</p>
                <p className="mono mt-2 text-[var(--color-amber)]">
                  {METRO.outputTempC[0]}–{METRO.outputTempC[1]} °C · {t.tech.metroWater}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="muted mt-8 max-w-2xl text-sm leading-relaxed">
              {fill(t.tech.ventilatorsNote, { n: METRO.ventilators })}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- COP comparison ---- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHead title={t.tech.copTitle} lede={t.tech.copBody} />
          </Reveal>

          <Reveal delay={80} className="mt-12">
            <div className="grid gap-6 md:grid-cols-2">
              <CopCard
                title={t.tech.copStandard}
                cop={2.0}
                copLabel="COP ~2.0"
                source="0 °C"
                sourceLabel={t.tech.copSourceLabel}
                demand={t.tech.copHigh}
                demandLabel={t.tech.copDemandLabel}
                efficiency={t.tech.copLow}
                efficiencyLabel={t.tech.copEfficiencyLabel}
                tone="cold"
                max={INDUSTRIAL.cop}
              />
              <CopCard
                title={t.tech.copAstem}
                cop={INDUSTRIAL.cop}
                copLabel={`COP ${INDUSTRIAL.cop}+`}
                source={`${INDUSTRIAL.sourceTempC[0]}–${INDUSTRIAL.sourceTempC[1]} °C`}
                sourceLabel={t.tech.copSourceLabel}
                demand={t.tech.copLow}
                demandLabel={t.tech.copDemandLabel}
                efficiency={t.tech.copHigh}
                efficiencyLabel={t.tech.copEfficiencyLabel}
                tone="hot"
                max={INDUSTRIAL.cop}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- seasons ---- */}
      <section className="telemetry section">
        <div className="shell">
          <Reveal>
            <SectionHead title={t.tech.seasonTitle} lede={t.tech.seasonBody} />
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <SeasonToggle locale={locale} />
          </Reveal>
        </div>
      </section>

      {/* ---- science ---- */}
      <section className="section">
        <div className="shell max-w-3xl">
          <Reveal>
            <h2 className="h2">{t.tech.scienceTitle}</h2>
            <p className="lede mt-5">{t.tech.scienceBody}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center" aria-hidden>
      <svg width="34" height="16" viewBox="0 0 34 16" className="rotate-90 md:rotate-0">
        <path
          d="M1 8h29"
          stroke="var(--color-ink-line)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path d="M33 8l-7-4.2v8.4z" fill="var(--color-ink-line)" />
      </svg>
    </div>
  );
}

function CopCard({
  title,
  cop,
  copLabel,
  source,
  sourceLabel,
  demand,
  demandLabel,
  efficiency,
  efficiencyLabel,
  tone,
  max,
}: {
  title: string;
  cop: number;
  copLabel: string;
  source: string;
  sourceLabel: string;
  demand: string;
  demandLabel: string;
  efficiency: string;
  efficiencyLabel: string;
  tone: "cold" | "hot";
  max: number;
}) {
  const pct = Math.round((cop / max) * 100);
  const accent = tone === "hot" ? "var(--color-emerald)" : "var(--color-muted)";

  return (
    <div className={`card ticked ${tone === "hot" ? "border-[var(--color-emerald)]/35" : ""}`}>
      <h3 className="h3">{title}</h3>
      <p className="num mt-5 text-4xl font-bold" style={{ color: accent }}>
        {copLabel}
      </p>

      {/* Bar is proportional, so the 2x gap is visible rather than asserted. */}
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background:
              tone === "hot"
                ? "linear-gradient(90deg, var(--color-cyan), var(--color-emerald))"
                : "var(--color-line-strong)",
          }}
        />
      </div>

      <dl className="mt-6">
        {[
          [sourceLabel, source],
          [demandLabel, demand],
          [efficiencyLabel, efficiency],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] py-2.5 last:border-0"
          >
            <dt className="text-sm text-[var(--color-muted)]">{k}</dt>
            <dd className="num text-sm font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
