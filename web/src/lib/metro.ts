/**
 * Loads the Baku Metro measurement set and rolls it up per station.
 *
 * The JSON under src/data is a build-time copy of the canonical files in the
 * repository root (`npm run sync-data`). Never edit the copy.
 */

import stationsRaw from "@/data/metro/stations.json";
import exitsRaw from "@/data/metro/exits.json";
import statisticsRaw from "@/data/metro/statistics.json";
import { MODEL } from "@/content/metrics";

export type RawStation = {
  name: string;
  name_az: string;
  latitude: number;
  longitude: number;
  avg_daily_passengers: number;
  line: string;
  depth: number;
};

export type RawExit = {
  id: number;
  station_en: string;
  station_az: string;
  exit_name: string;
  exit_number: string;
  latitude: number;
  longitude: number;
  address: string;
  heat_kw: number;
  num_exits: number;
  daily_departures: number;
};

export type Station = {
  id: string;
  name: string;
  nameAz: string;
  line: string;
  lineColor: string;
  lat: number;
  lon: number;
  depth: number;
  dailyPassengers: number;
  exits: number;
  grossKw: number;
  recoverableKw: number;
  annualMwh: number;
  co2Tons: number;
  homes: number;
};

export const LINE_COLORS: Record<string, string> = {
  "Red Line": "#ef4444",
  "Green Line": "#10b981",
  "Purple Line": "#a855f7",
};

/**
 * The dataset's English transliterations are inconsistent and a misspelt Baku
 * station name is the fastest way to lose a local reader. Corrections applied on
 * read; the Azerbaijani `name_az` field is authoritative for AZ display.
 */
const NAME_FIXES: Record<string, string> = {
  Insahatchilar: "İnşaatçılar",
  "8 Novabr": "8 Noyabr",
  Khojasan: "Xocasan",
  Avtovaghzal: "Avtovağzal",
  "Elmler Akademiyasi": "Elmlər Akademiyası",
  "Memar Ajami": "Memar Əcəmi",
  "Memar Ajami 2": "Memar Əcəmi 2",
  "Azadliq prospekti": "Azadlıq prospekti",
  Ganjlik: "Gənclik",
  Ulduz: "Ulduz",
  Koroglu: "Koroğlu",
  "Gara Garayev": "Qara Qarayev",
  Neftchilar: "Neftçilər",
  "Khalglar Dostlughu": "Xalqlar Dostluğu",
  Akhmedli: "Əhmədli",
  "Hazi Aslanov": "Həzi Aslanov",
  Icherisheher: "İçərişəhər",
  "Jafar Jabbarly": "Cəfər Cabbarlı",
  "Shah Ismail Khatai": "Şah İsmayıl Xətai",
  Darnagul: "Dərnəgül",
  Nasimi: "Nəsimi",
  Bakmil: "Bakmil",
  Nizami: "Nizami",
  Sahil: "Sahil",
  "28 May": "28 May",
  "Nariman Narimanov": "Nəriman Nərimanov",
  "20 Yanvar": "20 Yanvar",
};

/** Display name for a locale. English keeps the transliteration people search for. */
export function stationName(station: Station, locale: string): string {
  return locale === "en" ? station.name : station.nameAz;
}

let cache: Station[] | null = null;

export function getStations(): Station[] {
  if (cache) return cache;

  const exits = exitsRaw as RawExit[];
  const byStation = new Map<string, { kw: number; count: number }>();
  for (const exit of exits) {
    const entry = byStation.get(exit.station_en) ?? { kw: 0, count: 0 };
    entry.kw += exit.heat_kw;
    entry.count += 1;
    byStation.set(exit.station_en, entry);
  }

  cache = (stationsRaw as RawStation[])
    .map((s) => {
      const agg = byStation.get(s.name) ?? { kw: 0, count: 0 };
      const grossKw = agg.kw;
      const recoverableKw = grossKw * MODEL.recoveryFactor;
      const annualMwh = (recoverableKw * MODEL.operatingHoursPerYear) / 1000;
      return {
        id: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: s.name,
        nameAz: NAME_FIXES[s.name] ?? s.name_az ?? s.name,
        line: s.line,
        lineColor: LINE_COLORS[s.line] ?? "#64748b",
        lat: s.latitude,
        lon: s.longitude,
        depth: s.depth,
        dailyPassengers: s.avg_daily_passengers,
        exits: agg.count,
        grossKw,
        recoverableKw,
        annualMwh,
        co2Tons: (annualMwh * MODEL.co2KgPerMwh) / 1000,
        homes: annualMwh / MODEL.mwhPerHome,
      };
    })
    .sort((a, b) => b.recoverableKw - a.recoverableKw);

  return cache;
}

export function getExits(): RawExit[] {
  return exitsRaw as RawExit[];
}

export function getStatistics() {
  return statisticsRaw as {
    year: number;
    passengers: {
      total_stations: number;
      total_passengers: number;
      avg_passengers: number;
      max_passengers: number;
    };
    heat: {
      total_heat_kw: number;
      total_recoverable_heat_kw: number;
      avg_recoverable_heat_kw: number;
    };
    emissions: {
      total_co2_saved_tons: number;
      total_energy_saved_mwh: number;
      total_houses_heated: number;
    };
  };
}

/** GeoJSON for the map layer. Built once at module load — the data is static. */
export function stationsGeoJSON() {
  const stations = getStations();
  const max = Math.max(...stations.map((s) => s.recoverableKw));
  return {
    type: "FeatureCollection" as const,
    features: stations.map((s) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [s.lon, s.lat] },
      properties: {
        id: s.id,
        name: s.name,
        nameAz: s.nameAz,
        line: s.line,
        lineColor: s.lineColor,
        recoverableKw: s.recoverableKw,
        /** 0..1, drives radius and colour ramp. */
        intensity: s.recoverableKw / max,
      },
    })),
  };
}
