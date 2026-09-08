import type { Metadata } from "next";
import { getDict, LOCALES, type Locale } from "@/content/i18n";
import { METRO } from "@/content/metrics";
import { num } from "@/lib/format";
import Reveal from "@/components/Reveal";
import { SectionHead } from "@/components/Stat";

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
  return { title: t.about.title, description: t.about.lede };
}

/**
 * Names and roles only — no headshots, no biographies. Roles are the ones the
 * project lead confirmed for public use (docs/05-team-and-partners.md).
 *
 * Institution logos are deliberately absent: no permission has been obtained
 * from UFAZ, ASOIU, IDDA or Enterprise Azerbaijan.
 */
const TEAM = [
  { name: "Isa Ibadov", role: "strategy" },
  { name: "Shukur Shukurov", role: "fullstack" },
  { name: "Rufat Jabrayilli", role: "finance" },
  { name: "Ziya Aliyev", role: "thermo" },
  { name: "Shargiyya Qafarzade", role: "thermo" },
  { name: "Aysel Sardarova", role: "telemetry" },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDict(locale);

  const evidence = [
    { v: num(METRO.stations, locale), l: t.impact.mapSelect },
    { v: num(METRO.exits, locale), l: t.impact.mapExits },
    { v: num(METRO.dailyPassengers, locale), l: t.impact.mapPassengers },
    { v: `${num(METRO.grossHeatKw, locale)} kW`, l: t.impact.mapGross },
  ];

  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow">{t.nav.about}</p>
          <h1 className="display mt-4 max-w-4xl">{t.about.title}</h1>
          <p className="lede mt-6">{t.about.lede}</p>
        </div>
      </section>

      {/* ---- team ---- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <h2 className="h2">{t.about.teamTitle}</h2>
          </Reveal>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <Reveal as="li" key={member.name} delay={i * 50} className="bg-white p-7">
                <p className="h3">{member.name}</p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-emerald)]">
                  {t.about.roles[member.role]}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- science + evidence ---- */}
      <section className="telemetry section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <SectionHead title={t.about.scienceTitle} lede={t.about.scienceBody} />
            </Reveal>
            <Reveal delay={80}>
              <h3 className="h3">{t.about.evidenceTitle}</h3>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--color-ink-line)] bg-[var(--color-ink-line)]">
                {evidence.map((e) => (
                  <div key={e.l} className="bg-[var(--color-ink)] p-6">
                    <dt className="num text-2xl font-bold text-white">{e.v}</dt>
                    <dd className="stat-label">{e.l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
