import type { Metadata } from "next";
import { Mail, MapPin, Linkedin } from "lucide-react";
import { getDict, LOCALES, type Locale } from "@/content/i18n";
import { CONTACT } from "@/content/metrics";
import ContactForm from "@/components/ContactForm";

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
  return { title: t.contact.title, description: t.contact.lede };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDict(locale);

  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.nav.contact}</p>
          <h1 className="display mt-4">{t.contact.title}</h1>
          <p className="lede mt-6">{t.contact.lede}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <ContactForm locale={locale} />

          <aside>
            <div className="card ticked">
              <h2 className="h3">{t.contact.directTitle}</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-[var(--color-emerald)]" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                      {t.contact.emailLabel}
                    </p>
                    <a
                      href={`mailto:${CONTACT.publicEmail}`}
                      className="link-underline mt-0.5 block break-all"
                    >
                      {CONTACT.publicEmail}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--color-emerald)]" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                      {t.contact.locationLabel}
                    </p>
                    <p className="mt-0.5">{CONTACT.location}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Linkedin size={17} className="mt-0.5 shrink-0 text-[var(--color-emerald)]" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                      {t.contact.linkedinLabel}
                    </p>
                    <a
                      href={CONTACT.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline mt-0.5 block"
                    >
                      astem-lab
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
