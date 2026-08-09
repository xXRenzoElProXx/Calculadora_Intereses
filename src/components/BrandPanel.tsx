const FEATURES = [
  { title: "Interés simple y compuesto", description: "Compara ambos resultados en paralelo." },
  { title: "Frecuencia configurable", description: "Ajusta la composición a tu escenario." },
  { title: "Proyección visual", description: "Observa el crecimiento año a año." },
];

export default function BrandPanel() {
  return (
    <aside className="brand-panel animate-fade-in-up relative hidden shrink-0 flex-col justify-center gap-10 overflow-hidden lg:flex">
      <div className="pointer-events-none absolute -left-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-red-500/10" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 rounded-full border border-red-500/10" />
      <div className="relative">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-3xl font-bold text-white shadow-lg shadow-red-600/30 transition-transform duration-300 hover:scale-105">$</div>
        <h1 className="max-w-sm text-4xl font-bold leading-tight tracking-tight text-white">Calculadora de <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Intereses</span></h1>
        <p className="mt-4 max-w-xs text-base leading-relaxed text-white/65">Compara cómo evoluciona tu dinero con interés simple y compuesto.</p>
      </div>
      <ul className="relative flex flex-col gap-4">{FEATURES.map((feature, index) => <li key={feature.title} className="animate-fade-in-up flex items-start gap-3" style={{ animationDelay: `${150 + index * 90}ms` }}><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400">✓</span><div><p className="text-base font-medium text-white/90">{feature.title}</p><p className="text-sm text-white/60">{feature.description}</p></div></li>)}</ul>
      <p className="app-footer absolute inset-x-14 bottom-8 text-sm text-white/35">Renzo Enrique Crisanto Crisanto</p>
    </aside>
  );
}
