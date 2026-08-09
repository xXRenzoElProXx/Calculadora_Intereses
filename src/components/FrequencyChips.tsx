import { compoundFrequencyOptions } from "../lib/interest";

interface FrequencyChipsProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FrequencyChips({ value, onChange }: FrequencyChipsProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium uppercase tracking-wider text-white/55">
        Frecuencia de composición
      </span>
      <div className="flex flex-wrap gap-1.5">
        {compoundFrequencyOptions.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`cursor-pointer rounded-xl border px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                active
                  ? "border-red-400/40 bg-gradient-to-b from-red-500/20 to-orange-500/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
