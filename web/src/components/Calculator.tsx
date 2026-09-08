"use client";

import { useEffect, useMemo, useState } from "react";
import { Link2, Check, Info } from "lucide-react";
import { getDict, type Locale } from "@/content/i18n";
import { MODEL, INDUSTRIAL, METRO, estimate, type Track } from "@/content/metrics";
import { num, kw } from "@/lib/format";

const MIN_KW = 100;
const MAX_KW = 100_000;

export default function Calculator({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [heatKw, setHeatKw] = useState(20_000);
  const [hours, setHours] = useState<number>(MODEL.operatingHoursPerYear);
  const [track, setTrack] = useState<Track>("industrial");
  const [copied, setCopied] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);

  // Restore state from a shared link so a forwarded result opens as it was sent.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const q = Number(p.get("kw"));
    const h = Number(p.get("h"));
    const tr = p.get("track");
    if (Number.isFinite(q) && q >= MIN_KW && q <= MAX_KW) setHeatKw(q);
    if (Number.isFinite(h) && h > 0 && h <= 8760) setHours(h);
    if (tr === "metro" || tr === "industrial") setTrack(tr);
  }, []);

  const r = useMemo(() => estimate(heatKw, hours, track), [heatKw, hours, track]);

  const share = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("kw", String(heatKw));
    url.searchParams.set("h", String(hours));
    url.searchParams.set("track", track);
    url.hash = "calculator";
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be blocked; putting the state in the address bar still
      // lets the visitor copy the link manually.
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <div id="calculator" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
      {/* ---- inputs ---- */}
      <div className="card">
        <fieldset>
          <legend className="label">{t.impact.calcTrack}</legend>
          <div className="inline-flex rounded-lg border border-[var(--color-ink-line)] p-1">
            {(
              [
                ["industrial", t.impact.calcIndustrial, INDUSTRIAL.cop],
                ["metro", t.impact.calcMetro, METRO.cop],
              ] as const
            ).map(([key, label, cop]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTrack(key)}
                aria-pressed={track === key}
                className={`rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
                  track === key
                    ? "bg-[var(--color-emerald)] text-white"
                    : "text-[var(--color-muted-dark)] hover:text-white"
                }`}
              >
                {label}
                <span className="ml-1.5 opacity-70">COP {cop.toFixed(1)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <label className="label" htmlFor="calc-kw">
            {t.impact.calcHeatLabel}
          </label>
          <output className="num block text-3xl font-bold text-white">{kw(heatKw, locale)}</output>
          <input
            id="calc-kw"
            type="range"
            className="mt-4"
            min={MIN_KW}
            max={MAX_KW}
            step={100}
            value={heatKw}
            onChange={(e) => setHeatKw(Number(e.target.value))}
          />
          <div className="muted mono mt-2 flex justify-between">
            <span>{kw(MIN_KW, locale)}</span>
            <span>{kw(MAX_KW, locale)}</span>
          </div>
        </div>

        <div className="mt-8">
          <label className="label" htmlFor="calc-hours">
            {t.impact.calcHoursLabel}
          </label>
          <output className="num block text-3xl font-bold text-white">
            {num(hours, locale)} h
          </output>
          <input
            id="calc-hours"
            type="range"
            className="mt-4"
            min={1000}
            max={8760}
            step={60}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <div className="muted mono mt-2 flex justify-between">
            <span>1 000 h</span>
            <span>8 760 h</span>
          </div>
        </div>

        <button type="button" onClick={share} className="btn btn-ghost mt-8 w-full">
          {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
          {copied ? t.impact.calcShared : t.impact.calcShare}
        </button>
      </div>

      {/* ---- outputs ---- */}
      <div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--color-ink-line)] bg-[var(--color-ink-line)]">
          <Out label={t.impact.calcRecovered} value={kw(r.recoverableKw, locale)} accent />
          <Out label={t.impact.calcEnergy} value={`${num(r.annualMwh, locale)} MWh`} accent />
          <Out label={t.impact.calcCo2} value={`${num(r.co2Tons, locale)} t`} />
          <Out label={t.impact.calcHomes} value={num(r.homes, locale)} />
          <Out
            label={t.impact.calcElectrical}
            value={`${num(r.electricalInputMwh, locale)} MWh`}
            span
          />
        </dl>

        <div className="card mt-6">
          <button
            type="button"
            onClick={() => setMethodOpen((v) => !v)}
            aria-expanded={methodOpen}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <span className="flex items-center gap-2.5">
              <Info size={17} className="text-[var(--color-cyan-bright)]" aria-hidden />
              <span className="h3 !text-base">{t.impact.methodTitle}</span>
            </span>
            <span className="mono text-[var(--color-muted-dark)]">{methodOpen ? "−" : "+"}</span>
          </button>

          {methodOpen && (
            <div className="mt-5">
              <p className="muted text-sm leading-relaxed">{t.impact.methodBody}</p>
              <dl className="mt-5">
                <Const k={t.impact.methodCop} v={`${r.cop.toFixed(1)}`} />
                <Const k={t.impact.methodRecovery} v={`${MODEL.recoveryFactor}`} />
                <Const
                  k={t.impact.methodHours}
                  v={`${num(MODEL.operatingHoursPerYear, locale)} h`}
                />
                <Const k={t.impact.methodCo2} v={`${MODEL.co2KgPerMwh} kg/MWh`} />
                <Const k={t.impact.methodHomes} v={`${MODEL.mwhPerHome} MWh`} />
              </dl>
              <p className="muted mt-5 border-t border-[var(--color-ink-line)] pt-4 text-xs leading-relaxed">
                {t.impact.methodNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Out({
  label,
  value,
  accent = false,
  span = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  span?: boolean;
}) {
  return (
    <div className={`bg-[var(--color-ink)] p-6 ${span ? "col-span-2" : ""}`}>
      <dt className="stat-label !mt-0">{label}</dt>
      <dd
        className={`num mt-2 text-2xl font-bold md:text-3xl ${
          accent ? "thermal-text" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function Const({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-ink-line)] py-2.5 last:border-0">
      <dt className="text-sm text-[var(--color-muted-dark)]">{k}</dt>
      <dd className="mono shrink-0 text-white">{v}</dd>
    </div>
  );
}
