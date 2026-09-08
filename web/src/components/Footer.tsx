import Link from "next/link";
import { getDict, fill, type Locale } from "@/content/i18n";
import { BRAND, CONTACT, METRO } from "@/content/metrics";
import Wordmark from "./Wordmark";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  const sections = [
    { href: `/${locale}/technology`, label: t.nav.technology },
    { href: `/${locale}/solutions`, label: t.nav.solutions },
    { href: `/${locale}/impact`, label: t.nav.impact },
    { href: `/${locale}/feasibility`, label: t.nav.feasibility },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/deck`, label: t.nav.deck },
  ];

  return (
    <footer className="telemetry border-t border-[var(--color-ink-line)]">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark onDark />
            <p className="muted mt-4 max-w-xs text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="muted mt-4 max-w-xs text-xs leading-relaxed">
              {fill(t.footer.sourceNote, { year: METRO.measuredYear })}
            </p>
          </div>

          <nav aria-label={t.footer.sections}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-cyan-bright)]">
              {t.footer.sections}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="muted hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-cyan-bright)]">
              {t.footer.contact}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT.publicEmail}`} className="muted hover:text-white">
                  {CONTACT.publicEmail}
                </a>
              </li>
              <li className="muted">{CONTACT.location}</li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="muted hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-[var(--color-emerald-bright)] hover:underline">
                  {t.nav.requestAudit}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="rule my-10" />

        <p className="muted text-xs">
          {BRAND.legalName} © {BRAND.year}. {t.footer.rights} {CONTACT.location}.
        </p>
      </div>
    </footer>
  );
}
