"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Check, Globe } from "lucide-react";
import { LOCALES, LOCALE_NAMES, getDict, type Locale } from "@/content/i18n";
import { BRAND } from "@/content/metrics";
import Wordmark from "./Wordmark";

export default function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close both menus on navigation.
  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `/${locale}/technology`, label: t.nav.technology },
    { href: `/${locale}/solutions`, label: t.nav.solutions },
    { href: `/${locale}/impact`, label: t.nav.impact },
    { href: `/${locale}/feasibility`, label: t.nav.feasibility },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/deck`, label: t.nav.deck },
  ];

  /** Swaps only the locale segment, so language switching keeps the page. */
  const swapLocale = (next: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${next}${rest ? `/${rest}` : ""}`;
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur transition-shadow ${
        scrolled ? "border-[var(--color-line)] shadow-sm" : "border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="shrink-0" aria-label={BRAND.name}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-[var(--color-emerald)]"
                    : "text-[var(--color-ink)] hover:bg-[var(--color-paper-warm)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="btn btn-ghost !px-3 !py-2 text-sm"
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label={t.nav.language}
            >
              <Globe size={15} aria-hidden />
              <span className="uppercase">{locale}</span>
            </button>
            {langOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-[var(--color-line)] bg-white py-1 shadow-lg"
              >
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    role="menuitem"
                    href={swapLocale(l)}
                    className="flex items-center justify-between px-3 py-2 text-sm hover:bg-[var(--color-paper-warm)]"
                  >
                    {LOCALE_NAMES[l]}
                    {l === locale && (
                      <Check size={15} className="text-[var(--color-emerald)]" aria-hidden />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={`/${locale}/contact`} className="btn btn-primary hidden md:inline-flex">
            {t.nav.requestAudit}
          </Link>

          <button
            type="button"
            className="btn btn-ghost !px-3 !py-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-white lg:hidden">
          <nav className="shell flex flex-col py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-[var(--color-line)] py-3 text-base font-medium last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link href={`/${locale}/contact`} className="btn btn-primary mt-4">
              {t.nav.requestAudit}
            </Link>
            <div className="mt-4 flex items-center gap-2 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                {t.nav.language}
              </span>
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={swapLocale(l)}
                  className={`rounded-md border px-2.5 py-1 text-sm uppercase ${
                    l === locale
                      ? "border-[var(--color-emerald)] text-[var(--color-emerald)]"
                      : "border-[var(--color-line)]"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
