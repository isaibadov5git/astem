"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { getDict, type Locale } from "@/content/i18n";
import { CONTACT } from "@/content/metrics";

/**
 * The form composes a message and hands it to the visitor's own mail client.
 *
 * Deliberately no backend: nothing is sent or stored by the site, there is no
 * API key to leak and no third-party processor in the path. The copy button is
 * the fallback for anyone without a configured mail handler — without it, a
 * webmail-only visitor would hit a dead end.
 */
export default function ContactForm({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    load: "",
    message: "",
  });
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setError(false);
  };

  const valid = form.name.trim() && form.email.trim() && form.message.trim();

  const subject = `Technical audit request — ${form.org || form.name || "AstemLab"}`;

  const body = [
    `${t.contact.name}: ${form.name}`,
    `${t.contact.org}: ${form.org}`,
    `${t.contact.email}: ${form.email}`,
    `${t.contact.load}: ${form.load}`,
    "",
    form.message,
  ].join("\n");

  const openMail = () => {
    if (!valid) {
      setError(true);
      return;
    }
    const href = `mailto:${CONTACT.formEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const copy = async () => {
    if (!valid) {
      setError(true);
      return;
    }
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setError(true);
    }
  };

  return (
    <form
      className="card"
      onSubmit={(e) => {
        e.preventDefault();
        openMail();
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="cf-name">
            {t.contact.name}
          </label>
          <input id="cf-name" className="field" value={form.name} onChange={set("name")} required />
        </div>
        <div>
          <label className="label" htmlFor="cf-org">
            {t.contact.org}
          </label>
          <input id="cf-org" className="field" value={form.org} onChange={set("org")} />
        </div>
        <div>
          <label className="label" htmlFor="cf-email">
            {t.contact.email}
          </label>
          <input
            id="cf-email"
            type="email"
            className="field"
            value={form.email}
            onChange={set("email")}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="cf-load">
            {t.contact.load}
          </label>
          <input
            id="cf-load"
            className="field"
            value={form.load}
            onChange={set("load")}
            placeholder={t.contact.loadHint}
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="label" htmlFor="cf-message">
          {t.contact.message}
        </label>
        <textarea
          id="cf-message"
          className="field min-h-32 resize-y"
          value={form.message}
          onChange={set("message")}
          required
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-[var(--color-amber)]">
          {t.contact.required}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary">
          <Mail size={16} aria-hidden />
          {t.contact.submit}
        </button>
        <button type="button" onClick={copy} className="btn btn-ghost">
          {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          {copied ? t.contact.copied : t.contact.copy}
        </button>
      </div>

      <p className="muted mt-5 text-xs leading-relaxed">{t.contact.mailNote}</p>
    </form>
  );
}
