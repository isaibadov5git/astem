import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { LOCALES, type Locale, getDict } from "@/content/i18n";
import { BRAND } from "@/content/metrics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) return {};
  const t = getDict(locale as Locale);
  return {
    title: {
      default: `${BRAND.name} — ${t.meta.tagline}`,
      template: `%s · ${BRAND.name}`,
    },
    description: t.meta.description,
    applicationName: BRAND.name,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: `${BRAND.name} — ${t.meta.tagline}`,
      description: t.meta.description,
      locale,
      type: "website",
    },
  };
}

export const viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();

  return (
    <html lang={locale}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to content
        </a>
        <Header locale={locale as Locale} />
        <main id="main">{children}</main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
