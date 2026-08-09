import { formatCurrency } from "../lib/interest";

interface ResultCardProps {
  label: string;
  interest: number;
  total: number;
  accent: "primary" | "muted";
}

export default function ResultCard({ label, interest, total, accent }: ResultCardProps) {
  const totalStr = formatCurrency(total);

  return (
    <div
      className={`glass-inset flex-1 rounded-2xl p-3.5 transition-all duration-200 ${
        accent === "primary" ? "ring-1 ring-red-400/30" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium uppercase tracking-wider text-white/55">
          {label}
        </span>
      </div>

      <div
        key={totalStr}
        className="animate-char-reveal mt-2 truncate font-bold text-white"
        style={{
          fontSize: "clamp(0.95rem, 2.6vw, 1.25rem)",
          textShadow: "0 0 18px rgba(251,113,133,0.32)",
        }}
      >
        {totalStr}
      </div>

      <p className="mt-1 text-sm text-white/65">
        Interés generado:{" "}
        <span className="font-semibold text-white/85">{formatCurrency(interest)}</span>
      </p>
    </div>
  );
}
