export interface InterestInputs {
  principal: number;
  ratePercent: number; // e.g. 8 for 8%
  years: number;
  compoundsPerYear: number;
}

export interface InterestResult {
  interest: number;
  total: number;
}

export interface YearPoint {
  year: number;
  simple: number;
  compound: number;
}

// Sensible input limits: keep numbers realistic and the chart light to render.
export const LIMITS = {
  principal: { min: 1, max: 10_000_000 },
  ratePercent: { min: 0.01, max: 50 },
  years: { min: 1, max: 50 },
};

// Hard cap on how many points we ever feed to the chart, regardless of "years".
const MAX_CHART_POINTS = 50;

export function calculateSimpleInterest({
  principal,
  ratePercent,
  years,
}: InterestInputs): InterestResult {
  const interest = (principal * ratePercent * years) / 100;
  return { interest, total: principal + interest };
}

export function calculateCompoundInterest({
  principal,
  ratePercent,
  years,
  compoundsPerYear,
}: InterestInputs): InterestResult {
  const rate = ratePercent / 100;
  const total =
    principal * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * years);
  return { interest: total - principal, total };
}

/** Builds a year-by-year series comparing simple vs compound growth, for charting. */
export function buildGrowthSeries(inputs: InterestInputs): YearPoint[] {
  const { principal, ratePercent, years, compoundsPerYear } = inputs;
  const rate = ratePercent / 100;
  const totalSteps = Math.max(1, Math.ceil(years));
  // Never plot more than MAX_CHART_POINTS, no matter how many years were entered.
  const pointCount = Math.min(totalSteps, MAX_CHART_POINTS);
  const stepSize = years / pointCount;
  const points: YearPoint[] = [];

  for (let i = 0; i <= pointCount; i++) {
    const t = Math.min(i * stepSize, years);
    const simpleTotal = principal + (principal * ratePercent * t) / 100;
    const compoundTotal =
      principal * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * t);
    points.push({
      year: Math.round(t * 100) / 100,
      simple: Math.round(simpleTotal * 100) / 100,
      compound: Math.round(compoundTotal * 100) / 100,
    });
  }

  return points;
}

export const compoundFrequencyOptions = [
  { value: 1, label: "Anual" },
  { value: 2, label: "Semestral" },
  { value: 4, label: "Trimestral" },
  { value: 12, label: "Mensual" },
  { value: 365, label: "Diaria" },
];

export function formatCurrency(value: number): string {
  if (!isFinite(value)) return "$0.00";

  // Beyond a trillion, switch to compact notation (e.g. "$1.2T") so the
  // string stays short and cheap to render, even for extreme inputs.
  if (Math.abs(value) >= 1e12) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    });
  }

  return value.toLocaleString("es-PE", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
