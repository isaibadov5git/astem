export function Stat({
  value,
  label,
  unit,
  accent = false,
}: {
  value: string;
  label: string;
  unit?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className={`stat-value ${accent ? "thermal-text" : ""}`}>
        {value}
        {unit && (
          <span className="ml-1 align-baseline text-[0.42em] font-semibold tracking-normal opacity-70">
            {unit}
          </span>
        )}
      </p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">{children}</div>
  );
}

/** A labelled row used in detail panels and spec tables. */
export function Row({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] py-2.5 last:border-0">
      <span className="text-sm text-[var(--color-muted)]">{label}</span>
      <span className={`text-sm font-semibold ${mono ? "mono" : "num"}`}>{value}</span>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl" id={id}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`h2 ${eyebrow ? "mt-3" : ""}`}>{title}</h2>
      {lede && <p className="lede mt-5">{lede}</p>}
    </div>
  );
}
