interface NumberFieldProps {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suffix?: string;
  error?: boolean;
  errorMessage?: string;
  min?: number;
  max?: number;
}

export default function NumberField({
  id,
  label,
  hint: _hint,
  value,
  onChange,
  placeholder,
  suffix,
  error,
  errorMessage,
  min,
  max,
}: NumberFieldProps) {
  const handleChange = (raw: string) => {
    if (max !== undefined && raw !== "") {
      const num = parseFloat(raw);
      if (!isNaN(num) && num > max) {
        onChange(String(max));
        return;
      }
    }
    onChange(raw);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-medium uppercase tracking-wider text-white/55"
      >
        {label}
      </label>
      <div
        className={`glass-inset flex items-center rounded-xl px-4 py-2.5 transition-all duration-200 focus-within:border-red-400/50 focus-within:shadow-[0_0_0_3px_rgba(220,38,38,0.15)] ${
          error ? "animate-shake border-red-500/60" : ""
        }`}
      >
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min ?? 0}
          max={max}
          step="any"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-base font-semibold text-white placeholder:text-white/35 focus:outline-none"
        />
        {suffix && (
          <span className="ml-2 shrink-0 text-sm font-medium text-white/50">
            {suffix}
          </span>
        )}
      </div>
      {error && errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
    </div>
  );
}
