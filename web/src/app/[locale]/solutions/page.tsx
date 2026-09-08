import type { Metadata } from "next";
import { getDict, LOCALES, type Locale } from "@/content/i18n";
import { METRO } from "@/content/metrics";
import { num } from "@/lib/format";
import Reveal from "@/components/Reveal";
import { SectionHead } from "@/components/Stat";
import SolutionsTabs from "@/components/SolutionsTabs";

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
  return { title: t.solutions.title, description: t.solutions.lede };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDict(locale);

  const baku = METRO.passengersPerStationMillions;
  const london = METRO.londonPassengersPerStationMillions;

  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow">{t.nav.solutions}</p>
          <h1 className="display mt-4 max-w-4xl">{t.solutions.title}</h1>
          <p className="lede mt-6">{t.solutions.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SolutionsTabs locale={locale} />
        </div>
      </section>

      {/* ---- density argument ---- */}
      <section className="telemetry section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHead title={t.solutions.densityTitle} lede={t.solutions.densityBody} />
            </Reveal>

            <Reveal delay={80}>
              <div className="flex items-end justify-center gap-10 md:gap-16">
                <DensityBar
                  label="London"
                  value={london}
                  max={baku}
                  unit={t.solutions.densityUnit}
                  locale={locale}
                />
                <DensityBar
                  label="Baku"
                  value={baku}
                  max={baku}
                  unit={t.solutions.densityUnit}
                  locale={locale}
                  highlight
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function DensityBar({
  label,
  value,
  max,
  unit,
  locale,
  highlight = false,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  locale: Locale;
  highlight?: boolean;
}) {
  const height = Math.round((value / max) * 100);
  return (
    <figure className="flex w-32 flex-col items-center md:w-40">
      <figcaption className="num text-2xl font-bold text-white md:text-3xl">
        {num(value, locale, 1)}
      </figcaption>
      <p className="stat-label mt-1 text-center !text-xs">{unit}</p>
      <div className="mt-4 flex h-56 w-full items-end">
        <div
          className="w-full rounded-t-lg"
          style={{
            height: `${height}%`,
            background: highlight
              ? "linear-gradient(180deg, var(--color-emerald-bright), var(--color-cyan))"
              : "var(--color-ink-line)",
          }}
        />
      </div>
      <p className={`mt-3 text-sm font-semibold ${highlight ? "text-white" : "text-[var(--color-muted-dark)]"}`}>
        {label}
      </p>
    </figure>
  );
}
