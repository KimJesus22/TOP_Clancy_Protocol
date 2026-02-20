"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  RECOVERED_EVIDENCE,
  RecoveredEvidence,
  EvidenceBadge,
} from "../data/evidenceGrid";

function badgeStyles(badge: EvidenceBadge) {
  if (badge === "Vulnerable") {
    return "border-clancy-fire/70 bg-clancy-fire/20 text-clancy-fire";
  }

  if (badge === "Seguro") {
    return "border-clancy-trench/70 bg-clancy-trench/10 text-clancy-trench";
  }

  return "border-zinc-400/60 bg-zinc-500/10 text-zinc-200";
}

export default function EvidenceGrid() {
  const [selectedEvidence, setSelectedEvidence] =
    useState<RecoveredEvidence | null>(null);

  const evidenceCount = useMemo(() => RECOVERED_EVIDENCE.length, []);

  return (
    <section className="rounded-xl border border-clancy-fire/35 bg-black/45 p-6 shadow-[0_0_20px_rgba(255,46,46,0.14)]">
      <header className="mb-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Expedientes Recuperados
        </p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <h2 className="font-mono text-2xl tracking-[0.08em] text-clancy-fire">
            Evidence Grid
          </h2>
          <p className="font-mono text-sm text-zinc-300">
            Total: {evidenceCount}
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {RECOVERED_EVIDENCE.map((evidence, index) => {
          const hoverGlow =
            index % 2 === 0
              ? "hover:border-clancy-fire hover:shadow-[0_0_20px_rgba(255,46,46,0.28)]"
              : "hover:border-clancy-trench hover:shadow-[0_0_20px_rgba(252,227,0,0.24)]";

          return (
            <button
              key={evidence.id}
              type="button"
              onClick={() => setSelectedEvidence(evidence)}
              className={`group relative flex h-full flex-col rounded-lg border border-zinc-500/45 bg-[#0f0f0f] p-4 text-left transition-all duration-300 ${hoverGlow}`}
            >
              <div className="absolute -top-2 left-4 h-2 w-24 rounded-sm border border-zinc-500/50 bg-black/90 transition-colors group-hover:border-current" />
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-400">
                  {evidence.type}
                </p>
                <span
                  className={`rounded-full border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${badgeStyles(evidence.badge)}`}
                >
                  {evidence.badge}
                </span>
              </div>
              <h3 className="mt-3 font-mono text-lg text-clancy-fire">
                {evidence.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-clancy-trench">
                {evidence.yearOrRef}
              </p>
              <p className="mt-3 text-sm text-zinc-300">
                {evidence.shortDescription}
              </p>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedEvidence ? (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar panel lateral"
              className="fixed inset-0 z-40 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvidence(null)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto border-l border-clancy-fire/45 bg-[#0b0b0b] p-6 shadow-[-8px_0_24px_rgba(0,0,0,0.55)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
                    Panel Lateral Derecho
                  </p>
                  <h3 className="mt-2 font-mono text-2xl text-clancy-fire">
                    {selectedEvidence.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    {selectedEvidence.type} | {selectedEvidence.yearOrRef}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Cerrar panel"
                  onClick={() => setSelectedEvidence(null)}
                  className="rounded-md border border-clancy-fire/60 p-2 text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.25)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                <span
                  className={`rounded-full border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${badgeStyles(selectedEvidence.badge)}`}
                >
                  {selectedEvidence.badge}
                </span>
                <p className="mt-3 text-sm text-zinc-300">
                  {selectedEvidence.shortDescription}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {selectedEvidence.details.map((detail) => (
                  <section
                    key={detail.section}
                    className="rounded-md border border-zinc-600/40 bg-black/40 p-4"
                  >
                    <h4 className="font-mono text-sm uppercase tracking-[0.12em] text-clancy-trench">
                      {detail.section}
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                      {detail.items.map((item) => (
                        <li key={item} className="rounded bg-black/40 p-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
