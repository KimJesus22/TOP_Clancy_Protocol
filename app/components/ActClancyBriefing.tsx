"use client";

const briefingCards = [
  {
    title: "Nodo Central",
    accent: "text-clancy-fire",
    border: "border-clancy-fire/40",
    summaryEs:
      "El PDF posiciona a Clancy/Tyler como fugitivo recurrente de DEMA: no deja de caer en el ciclo, pero cada escape le da mas informacion y herramientas.",
    summaryEn:
      "The PDF positions Clancy/Tyler as DEMA's recurring fugitive: he keeps falling back into the cycle, but every escape gives him more information and tools.",
  },
  {
    title: "Geografia Del Conflicto",
    accent: "text-clancy-trench",
    border: "border-clancy-trench/40",
    summaryEs:
      "DEMA es la ciudad de los obispos, Trench es el continente, Voldsoy aporta el poder de posesion y Paladin Strait marca la siguiente frontera de la guerra.",
    summaryEn:
      "DEMA is the bishops' city, Trench is the continent, Voldsoy enables possession, and Paladin Strait marks the next frontier of the war.",
  },
  {
    title: "Cambio De Fase",
    accent: "text-orange-400",
    border: "border-orange-400/40",
    summaryEs:
      "La progresion del PDF va de personificar miedos en Blurryface a infiltrar DEMA desde dentro en Clancy. La rebelion pasa de escape a organizacion.",
    summaryEn:
      "The PDF progression moves from personifying fears in Blurryface to infiltrating DEMA from within in Clancy. Rebellion shifts from escape to organization.",
  },
];

const conflictMarkers = [
  "Blurryface -> ciclo de miedo",
  "Trench -> cartas, Banditos y mapa de DEMA",
  "Scaled And Icy -> propaganda, Keons y posesion",
  "Clancy -> reclutamiento, antorchas y contraataque",
];

export default function ActClancyBriefing() {
  return (
    <section className="rounded-xl border border-white/10 bg-black/40 p-6 shadow-[0_0_24px_rgba(252,227,0,0.12)] backdrop-blur-md">
      <header className="max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Act Clancy Era
        </p>
        <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-white sm:text-3xl">
          Briefing del PDF Integrado
        </h2>
        <p className="mt-3 text-sm text-zinc-300 sm:text-base">
          Conversion bilingue del dossier `WELCOME TO TRENCH` a formato web.
          La lectura prioriza cronologia, personajes, ciudades y el paso de
          supervivencia a contraofensiva dentro de DEMA.
        </p>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {briefingCards.map((card) => (
          <article
            key={card.title}
            className={`rounded-lg border bg-black/35 p-4 ${card.border}`}
          >
            <h3 className={`font-mono text-lg ${card.accent}`}>{card.title}</h3>
            <p className="mt-3 text-sm text-zinc-100">{card.summaryEs}</p>
            <p className="mt-3 border-t border-white/10 pt-3 text-sm text-zinc-400">
              {card.summaryEn}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-black/35 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-trench">
          Conflict Trace
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {conflictMarkers.map((marker, index) => (
            <div
              key={marker}
              className="rounded-md border border-white/10 bg-black/30 p-3"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                Fase 0{index + 1}
              </p>
              <p className="mt-2 text-sm text-zinc-200">{marker}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
