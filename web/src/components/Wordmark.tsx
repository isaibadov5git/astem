import { BRAND } from "@/content/metrics";

/**
 * Original inline mark — an A monogram crossed by a thermal curve running cold
 * (cyan) to hot (emerald).
 *
 * Deliberately NOT the raster file in assets/logo: that image was taken from the
 * internet and carries no licence (docs/06-brand-and-design.md). Keeping the
 * mark here as one small component means replacing it later is a single-file
 * change, and nothing unlicensed ships in the meantime.
 */
export default function Wordmark({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="astem-thermal" x1="2" y1="28" x2="30" y2="6">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#00875a" />
          </linearGradient>
        </defs>
        {/* A monogram, drawn as two strokes so the crossbar can be the heat line */}
        <path
          d="M5 27.5 15.1 5.4a1 1 0 0 1 1.8 0L27 27.5"
          stroke="url(#astem-thermal)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* the recovered-heat curve rising through the monogram */}
        <path
          d="M8.6 20.4c3.6 2.6 7.2 2.6 10.8 0 3.1-2.2 5.5-2.5 7.6-1"
          stroke="url(#astem-thermal)"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span
        className={`text-[1.0625rem] font-bold tracking-tight ${
          onDark ? "text-white" : "text-[var(--color-ink)]"
        }`}
      >
        {BRAND.name}
      </span>
    </span>
  );
}
