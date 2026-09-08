import { getDict, type Locale } from "@/content/i18n";
import { INDUSTRIAL } from "@/content/metrics";

/**
 * Hero diagram: cold low-grade source -> AI multiplier engine -> high-value heat.
 *
 * Pure SVG with CSS dash-flow animation — no JS, no library, and it stops moving
 * under prefers-reduced-motion (handled globally in globals.css).
 */
export default function ThermalLoop({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [inLo, inHi] = INDUSTRIAL.sourceTempC;
  const [outLo, outHi] = INDUSTRIAL.outputTempC;

  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 900 260"
        className="w-full"
        role="img"
        aria-label={`${inLo}–${inHi} °C → COP ${INDUSTRIAL.cop}+ → ${outLo}–${outHi} °C`}
      >
        <defs>
          <linearGradient id="loop-cold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="loop-hot" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00875a" />
            <stop offset="100%" stopColor="#00875a" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="loop-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#00875a" />
          </linearGradient>
        </defs>

        {/* ---- cold intake: three streams ---- */}
        {[86, 130, 174].map((y, i) => (
          <g key={y}>
            <path
              d={`M40 ${y} H330`}
              stroke="url(#loop-cold)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d={`M40 ${y} H330`}
              stroke="#38bdf8"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="flow"
              style={{ animationDelay: `${i * -1.2}s` }}
            />
          </g>
        ))}

        <text x="40" y="66" className="fill-[#0284c7] text-[13px] font-semibold">
          {inLo}–{inHi} °C
        </text>
        <text x="40" y="206" className="fill-[var(--color-muted)] text-[12px]">
          {t.tech.steps[0].title}
        </text>

        {/* ---- engine ---- */}
        <g>
          <rect
            x="336"
            y="60"
            width="228"
            height="140"
            rx="14"
            fill="none"
            stroke="url(#loop-core)"
            strokeWidth="2"
          />
          <rect
            x="336"
            y="60"
            width="228"
            height="140"
            rx="14"
            fill="url(#loop-core)"
            opacity="0.06"
            className="pulse"
          />
          <text
            x="450"
            y="118"
            textAnchor="middle"
            className="fill-[var(--color-ink)] text-[30px] font-bold"
          >
            COP {INDUSTRIAL.cop}+
          </text>
          <text
            x="450"
            y="146"
            textAnchor="middle"
            className="fill-[var(--color-muted)] text-[12px]"
          >
            {t.tech.steps[1].title}
          </text>
          <text
            x="450"
            y="172"
            textAnchor="middle"
            className="fill-[var(--color-muted)] text-[11px]"
          >
            {INDUSTRIAL.split.electricity} + {INDUSTRIAL.split.recovered} ={" "}
            {INDUSTRIAL.split.output} kWh
          </text>
        </g>

        {/* ---- hot output ---- */}
        {[100, 160].map((y, i) => (
          <g key={y}>
            <path d={`M570 ${y} H852`} stroke="url(#loop-hot)" strokeWidth="2" fill="none" />
            <path
              d={`M570 ${y} H852`}
              stroke="#0ea672"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="flow"
              style={{ animationDelay: `${i * -1.6}s` }}
            />
            <path
              d={`M852 ${y} l-9 -6 v12 z`}
              fill="#00875a"
            />
          </g>
        ))}

        <text x="700" y="66" className="fill-[#00875a] text-[13px] font-semibold">
          {outLo}–{outHi} °C
        </text>
        <text x="700" y="206" className="fill-[var(--color-muted)] text-[12px]">
          {t.tech.steps[2].title}
        </text>
      </svg>
    </figure>
  );
}
