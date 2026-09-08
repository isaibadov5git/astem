/**
 * Every publicly quoted figure lives here and nowhere else.
 *
 * Mirrors docs/04-metrics-and-feasibility.md. If a number changes there, change
 * it here — and nowhere else in the codebase.
 *
 * Industrial and urban/metro figures are NOT interchangeable. They come from
 * different studies with different physics. Keep them in separate objects so a
 * component cannot accidentally mix them.
 */

/** Model constants behind every metro impact figure. Published openly on the site. */
export const MODEL = {
  /** Share of gross exit heat that is actually capturable. */
  recoveryFactor: 0.75,
  /** Deliberately conservative duty cycle: half of 8,760 h. */
  operatingHoursPerYear: 4380,
  /** Displaced gas heating, kg CO2 per MWh. */
  co2KgPerMwh: 200,
  /** Annual heat demand of one dwelling, MWh. */
  mwhPerHome: 10,
} as const;

export const INDUSTRIAL = {
  cop: 3.8,
  sourceTempC: [18, 40] as const,
  outputTempC: [60, 90] as const,
  /** 1 kWh electricity + 2.8 kWh recovered heat = 3.8 kWh thermal. */
  split: { electricity: 1, recovered: 2.8, output: 3.8 },
  paybackYears: [4.9, 7] as const,
  portfolio: {
    recoverableKw: 500_000,
    annualMwh: 2_000_000,
    annualCo2Tons: 400_000,
  },
} as const;

export const METRO = {
  cop: 3.0,
  sourceTempC: [5, 30] as const,
  stableTunnelTempC: [18, 30] as const,
  outputTempC: [50, 60] as const,
  /** 1 unit electricity + 2 units tunnel heat = 3 units thermal. */
  split: { electricity: 1, recovered: 2, output: 3 },
  paybackYears: [7, 10] as const,
  measuredYear: 2025,
  stations: 27,
  exits: 98,
  dailyPassengers: 2_153_000,
  avgPassengersPerStation: 79_741,
  maxPassengersPerStation: 180_000,
  grossHeatKw: 722_544,
  recoverableHeatKw: 541_908,
  avgRecoverableKwPerStation: 20_071,
  annualMwh: 2_373_557,
  annualCo2Tons: 474_711.4,
  homesHeated: 237_356,
  /** Energy-intensive ventilators currently used to manage tunnel temperature. */
  ventilators: 82,
  passengersPerStationMillions: 8.3,
  londonPassengersPerStationMillions: 3.7,
  lines: { red: 13, green: 10, purple: 4 },
  redLineKm: 18.8,
} as const;

/** Standard modular pilot. Capacity is identical across both tracks; payback is not. */
export const PILOT = {
  thermalCapacityMw: 1.8,
  annualEnergySavedGwh: 11.9,
  annualSavingsAzn: 476_000,
  annualSavingsUsd: 280_000,
  deploymentRangeKw: [150, 1800] as const,
} as const;

export const PRECEDENTS = [
  { name: "London Bunhill 2", detail: "Underground heat recovery, 500+ homes heated" },
  { name: "Warsaw M2", detail: "Metro heat-recovery system" },
] as const;

export const HOTSPOTS = [
  {
    id: "refinery",
    name: "Heydar Aliyev Oil Refinery",
    type: "industrial",
    source: "Cooling towers & effluent loops",
    lat: 40.3897,
    lon: 49.8408,
  },
  {
    id: "polymer",
    name: "SOCAR Polymer & Carbamide",
    type: "industrial",
    source: "Process steam vents & secondary cooling",
    lat: 40.5892,
    lon: 49.6683,
  },
  {
    id: "scip",
    name: "Sumgayit Chemical Industrial Park",
    type: "industrial",
    source: "Clustered manufacturing waste-heat nodes",
    lat: 40.5836,
    lon: 49.6206,
  },
  {
    id: "tower",
    name: "SOCAR Tower",
    type: "facility",
    source: "Administrative complex heat & cooling demand",
    lat: 40.3936,
    lon: 49.8511,
  },
] as const;

/** Stations the decks single out for narrative reasons rather than raw kW. */
export const NARRATIVE_STATIONS: Record<string, string> = {
  "28 May": "Central transit hub, maximum passenger density",
  "Nariman Narimanov": "Administrative city centre, key connection point",
  "20 Yanvar": "Deepest segment, crucial western connection",
};

export const CONTACT = {
  publicEmail: "astemlab.info@gmail.com",
  formEmail: "isaibadov5@gmail.com",
  location: "Baku, Azerbaijan",
  linkedin: "https://www.linkedin.com/company/astem-lab/",
} as const;

export const BRAND = {
  name: "AstemLab",
  legalName: "Astem company",
  year: 2026,
} as const;

/**
 * The calculator. Both tracks share the same shape; only COP and the label differ.
 * Every constant used here is exposed in the UI's methodology panel — an
 * unstated assumption is worth less than no number at all to this audience.
 */
export type Track = "industrial" | "metro";

export function estimate(wasteHeatKw: number, hoursPerYear: number, track: Track) {
  const cop = track === "industrial" ? INDUSTRIAL.cop : METRO.cop;
  const recoverableKw = wasteHeatKw * MODEL.recoveryFactor;
  const annualMwh = (recoverableKw * hoursPerYear) / 1000;
  const co2Tons = (annualMwh * MODEL.co2KgPerMwh) / 1000;
  const homes = annualMwh / MODEL.mwhPerHome;
  /**
   * Electricity is the only paid input: the recovered share is free.
   * At COP n, 1/n of the delivered heat has to be bought as electricity.
   */
  const electricalInputMwh = annualMwh / cop;
  return { cop, recoverableKw, annualMwh, co2Tons, homes, electricalInputMwh };
}
