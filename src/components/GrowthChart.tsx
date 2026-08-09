import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, type YearPoint } from "../lib/interest";

interface GrowthChartProps {
  data: YearPoint[];
  className?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; dataKey: string; color: string }[];
  label?: number;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-sm shadow-lg">
      <p className="mb-1 font-semibold text-white/70">Año {label !== undefined ? Math.round(label) : ""}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-white" style={{ color: entry.color }}>
          {entry.dataKey === "compound" ? "Compuesto" : "Simple"}:{" "}
          <span className="font-semibold">{formatCurrency(entry.value)}</span>
        </p>
      ))}
    </div>
  );
}

export default function GrowthChart({ data, className = "" }: GrowthChartProps) {
  return (
    <div className={`glass-inset flex min-h-0 flex-col rounded-2xl p-4 ${className}`}>
      <span className="shrink-0 text-sm font-medium uppercase tracking-wider text-white/55">
        Crecimiento proyectado
      </span>
      <div className="mt-2 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="compoundFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ea580c" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#ea580c" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="simpleFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="year"
              tickFormatter={(v) => `${Math.round(v)}a`}
              stroke="rgba(255,255,255,0.35)"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
              stroke="rgba(255,255,255,0.35)"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="simple"
              stroke="#f87171"
              strokeWidth={2}
              fill="url(#simpleFill)"
              name="Simple"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="compound"
              stroke="#fb923c"
              strokeWidth={2.5}
              fill="url(#compoundFill)"
              name="Compuesto"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-1 flex shrink-0 items-center gap-4 text-sm text-white/60">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-orange-400" /> Compuesto
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" /> Simple
        </span>
      </div>
    </div>
  );
}
