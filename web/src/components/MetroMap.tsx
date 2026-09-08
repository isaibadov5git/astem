"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { RotateCcw } from "lucide-react";
import { getDict, type Locale } from "@/content/i18n";
import { getStations, stationsGeoJSON, stationName, type Station } from "@/lib/metro";
import { NARRATIVE_STATIONS } from "@/content/metrics";
import { num, kw } from "@/lib/format";

const BAKU_VIEW = { center: [49.86, 40.4] as [number, number], zoom: 10.4 };

/**
 * Baku Metro thermal asset map.
 *
 * Basemap tiles come from Carto's free public style, so nothing has to be
 * self-hosted. The measurement data is bundled at build time, so the map keeps
 * working even if that CDN is unavailable — only the background would be blank.
 */
export default function MetroMap({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const stations = getStations();
  const selected = stations.find((s) => s.id === selectedId) ?? null;

  useEffect(() => {
    if (!container.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: BAKU_VIEW.center,
      zoom: BAKU_VIEW.zoom,
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      map.addSource("stations", { type: "geojson", data: stationsGeoJSON() });

      // Soft halo sized by recoverable capacity — the "heat" read.
      map.addLayer({
        id: "station-glow",
        type: "circle",
        source: "stations",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "intensity"], 0, 12, 1, 40],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],
            0,
            "#0284c7",
            0.5,
            "#10b981",
            1,
            "#f59e0b",
          ],
          "circle-opacity": 0.2,
          "circle-blur": 0.9,
        },
      });

      map.addLayer({
        id: "station-dot",
        type: "circle",
        source: "stations",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "intensity"], 0, 4.5, 1, 11],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],
            0,
            "#38bdf8",
            0.5,
            "#10b981",
            1,
            "#fbbf24",
          ],
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#0f172a",
        },
      });

      map.addLayer({
        id: "station-label",
        type: "symbol",
        source: "stations",
        layout: {
          "text-field": ["get", locale === "en" ? "name" : "nameAz"],
          "text-size": 11,
          "text-offset": [0, 1.5],
          "text-anchor": "top",
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        },
        paint: {
          "text-color": "#cbd5e1",
          "text-halo-color": "#0f172a",
          "text-halo-width": 1.4,
        },
      });

      for (const layer of ["station-dot", "station-glow"]) {
        map.on("click", layer, (e) => {
          const id = e.features?.[0]?.properties?.id;
          if (typeof id === "string") setSelectedId(id);
        });
        map.on("mouseenter", layer, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", layer, () => {
          map.getCanvas().style.cursor = "";
        });
      }

      setReady(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [locale]);

  const focus = (station: Station) => {
    setSelectedId(station.id);
    mapRef.current?.flyTo({ center: [station.lon, station.lat], zoom: 13, duration: 900 });
  };

  const reset = () => {
    setSelectedId(null);
    mapRef.current?.flyTo({ ...BAKU_VIEW, duration: 900 });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-xl border border-[var(--color-ink-line)]">
        <div ref={container} className="h-[26rem] w-full md:h-[34rem]" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-ink)]">
            <p className="muted text-sm">{t.impact.mapLoading}</p>
          </div>
        )}

        <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-[var(--color-ink)]/85 px-3 py-2 backdrop-blur">
          <p className="stat-label !mt-0 !text-[0.6875rem]">{t.impact.mapLegend}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span
              className="h-2 w-24 rounded-full"
              style={{ background: "linear-gradient(90deg,#38bdf8,#10b981,#fbbf24)" }}
            />
          </div>
        </div>
      </div>

      <div>
        {selected ? (
          <div className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="h3">{stationName(selected, locale)}</h3>
                <p className="mono mt-1" style={{ color: selected.lineColor }}>
                  {selected.line}
                </p>
              </div>
              <button type="button" onClick={reset} className="btn btn-ghost !px-2.5 !py-2">
                <RotateCcw size={15} aria-hidden />
                <span className="sr-only">{t.impact.mapReset}</span>
              </button>
            </div>

            {NARRATIVE_STATIONS[selected.name] && (
              <p className="muted mt-3 text-sm leading-relaxed">
                {NARRATIVE_STATIONS[selected.name]}
              </p>
            )}

            <dl className="mt-5">
              <Detail k={t.impact.mapPassengers} v={num(selected.dailyPassengers, locale)} />
              <Detail k={t.impact.mapExits} v={num(selected.exits, locale)} />
              {selected.depth > 0 && (
                <Detail k={t.impact.mapDepth} v={`${num(selected.depth, locale)} m`} />
              )}
              <Detail k={t.impact.mapGross} v={kw(selected.grossKw, locale)} />
              <Detail k={t.impact.mapRecoverable} v={kw(selected.recoverableKw, locale)} accent />
              <Detail k={t.impact.mapAnnual} v={`${num(selected.annualMwh, locale)} MWh`} />
              <Detail k={t.impact.mapCo2} v={`${num(selected.co2Tons, locale)} t`} />
              <Detail k={t.impact.mapHomes} v={num(selected.homes, locale)} />
            </dl>
          </div>
        ) : (
          <div className="card">
            <h3 className="h3">{t.impact.mapSelect}</h3>
            <p className="muted mt-2 text-sm leading-relaxed">{t.impact.mapSelectHint}</p>

            <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-cyan-bright)]">
              {t.impact.mapTop}
            </h4>
            <ul className="mt-3">
              {stations.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => focus(s)}
                    className="flex w-full items-baseline justify-between gap-4 border-b border-[var(--color-ink-line)] py-2.5 text-left transition-colors hover:text-white"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-sm">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: s.lineColor }}
                        aria-hidden
                      />
                      <span className="truncate">{stationName(s, locale)}</span>
                    </span>
                    <span className="num shrink-0 text-sm font-semibold text-[var(--color-emerald-bright)]">
                      {kw(s.recoverableKw, locale)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-ink-line)] py-2.5 last:border-0">
      <dt className="text-sm text-[var(--color-muted-dark)]">{k}</dt>
      <dd className={`num text-sm font-semibold ${accent ? "text-[var(--color-emerald-bright)]" : "text-white"}`}>
        {v}
      </dd>
    </div>
  );
}
