import { useMemo, useState } from "react";
import BackgroundBlobs from "./components/BackgroundBlobs";
import BrandPanel from "./components/BrandPanel";
import NumberField from "./components/NumberField";
import FrequencyChips from "./components/FrequencyChips";
import ResultCard from "./components/ResultCard";
import GrowthChart from "./components/GrowthChart";
import {
  buildGrowthSeries,
  calculateCompoundInterest,
  calculateSimpleInterest,
  LIMITS,
} from "./lib/interest";
import { useDebouncedValue } from "./lib/useDebouncedValue";

function App() {
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("5");
  const [compoundsPerYear, setCompoundsPerYear] = useState(12);
  const [touched, setTouched] = useState(false);

  // Instant values: used only for cheap field-level validation (red border),
  // so the UI reacts immediately as you type.
  const principalNum = parseFloat(principal);
  const rateNum = parseFloat(rate);
  const yearsNum = parseFloat(years);

  const principalOk =
    !isNaN(principalNum) &&
    principalNum >= LIMITS.principal.min &&
    principalNum <= LIMITS.principal.max;
  const rateOk =
    !isNaN(rateNum) && rateNum >= LIMITS.ratePercent.min && rateNum <= LIMITS.ratePercent.max;
  const yearsOk =
    !isNaN(yearsNum) && yearsNum >= LIMITS.years.min && yearsNum <= LIMITS.years.max;

  // Debounced values: the expensive work (results + chart) only recomputes
  // ~220ms after the user stops typing, instead of on every single keystroke.
  const debouncedPrincipal = useDebouncedValue(principalNum);
  const debouncedRate = useDebouncedValue(rateNum);
  const debouncedYears = useDebouncedValue(yearsNum);
  const debouncedCompounds = useDebouncedValue(compoundsPerYear);

  const debouncedValid =
    !isNaN(debouncedPrincipal) &&
    !isNaN(debouncedRate) &&
    !isNaN(debouncedYears) &&
    debouncedPrincipal >= LIMITS.principal.min &&
    debouncedPrincipal <= LIMITS.principal.max &&
    debouncedRate >= LIMITS.ratePercent.min &&
    debouncedRate <= LIMITS.ratePercent.max &&
    debouncedYears >= LIMITS.years.min &&
    debouncedYears <= LIMITS.years.max;

  const inputs = {
    principal: debouncedPrincipal,
    ratePercent: debouncedRate,
    years: debouncedYears,
    compoundsPerYear: debouncedCompounds,
  };

  const simple = useMemo(
    () => (debouncedValid ? calculateSimpleInterest(inputs) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedPrincipal, debouncedRate, debouncedYears, debouncedValid]
  );
  const compound = useMemo(
    () => (debouncedValid ? calculateCompoundInterest(inputs) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedPrincipal, debouncedRate, debouncedYears, debouncedCompounds, debouncedValid]
  );
  const series = useMemo(
    () => (debouncedValid ? buildGrowthSeries(inputs) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedPrincipal, debouncedRate, debouncedYears, debouncedCompounds, debouncedValid]
  );

  return (
    <div className="app-shell relative flex h-dvh w-screen overflow-y-auto text-white lg:overflow-hidden">
      <BackgroundBlobs />
      <BrandPanel />

      <div className="tool-panel flex h-full min-h-0 w-full flex-col">
        {/* Mobile mini header */}
        <div className="animate-fade-in-up flex shrink-0 flex-col gap-0.5 px-6 pt-6 lg:hidden">
          <span className="text-sm font-medium uppercase tracking-wider text-white/55">
            Finanzas · Cálculo
          </span>
          <h1 className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Calculadora de Intereses
          </h1>
        </div>

        <div
          className="animate-fade-in-up flex min-h-0 flex-1 flex-col overflow-hidden px-6 py-5 lg:px-14 lg:py-8"
          style={{ animationDelay: "80ms" }}
        >
          <div className="mx-auto flex h-full w-full max-w-xl min-h-0 flex-col gap-3">
            <div className="shrink-0">
              <span className="text-sm font-medium uppercase tracking-wider text-white/55">
                Datos de entrada
              </span>
            </div>

            <div className="grid shrink-0 gap-3 sm:grid-cols-2">
              <NumberField
                id="principal"
                label="Principal (P)"
                hint={`Monto inicial invertido o prestado (máx. ${LIMITS.principal.max.toLocaleString(
                  "es-PE"
                )} USD).`}
                errorMessage={`Debe estar entre ${LIMITS.principal.min} y ${LIMITS.principal.max.toLocaleString(
                  "es-PE"
                )} USD.`}
                value={principal}
                onChange={setPrincipal}
                placeholder="1000"
                suffix="USD"
                min={LIMITS.principal.min}
                max={LIMITS.principal.max}
                error={touched && !principalOk}
              />
              <NumberField
                id="rate"
                label="Tasa de interés"
                hint={`Porcentaje anual aplicado al monto (máx. ${LIMITS.ratePercent.max}%).`}
                errorMessage={`Debe estar entre ${LIMITS.ratePercent.min}% y ${LIMITS.ratePercent.max}%.`}
                value={rate}
                onChange={setRate}
                placeholder="8"
                suffix="%"
                min={LIMITS.ratePercent.min}
                max={LIMITS.ratePercent.max}
                error={touched && !rateOk}
              />
              <NumberField
                id="years"
                label="Período de tiempo"
                hint={`Años que dura la inversión (máx. ${LIMITS.years.max}).`}
                errorMessage={`Debe estar entre ${LIMITS.years.min} y ${LIMITS.years.max} años.`}
                value={years}
                onChange={setYears}
                placeholder="5"
                suffix="años"
                min={LIMITS.years.min}
                max={LIMITS.years.max}
                error={touched && !yearsOk}
              />
              <div className="flex items-end">
                <div className="w-full">
                  <FrequencyChips value={compoundsPerYear} onChange={setCompoundsPerYear} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTouched(true)}
              className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-200 hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Calcular
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-orange-600 to-red-600 transition-transform duration-300 group-hover:translate-y-0" />
            </button>

            {debouncedValid ? (
              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  {simple && (
                    <ResultCard
                      label="Interés simple"
                      interest={simple.interest}
                      total={simple.total}
                      accent="muted"
                    />
                  )}
                  {compound && (
                    <ResultCard
                      label="Interés compuesto"
                      interest={compound.interest}
                      total={compound.total}
                      accent="primary"
                    />
                  )}
                </div>
                <GrowthChart data={series} className="min-h-0 flex-1" />
              </div>
            ) : (
              <div className="glass-inset flex flex-1 items-center justify-center rounded-2xl p-6 text-center">
                <p className="text-sm text-white/35 sm:text-base">
                  Completa los tres campos dentro de los rangos indicados para ver el resultado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
