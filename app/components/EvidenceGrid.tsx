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
    <section className="rounded-xl border border-clancy-line/85 bg-clancy-surface/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_20px_rgba(255,46,46,0.12)] backdrop-blur-md">
      <header className="mb-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Expedientes Recuperados
        </p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <h2 className="font-mono text-2xl tracking-[0.08em] text-clancy-ink">
            Evidence Grid
          </h2>
          <p className="font-mono text-sm text-gray-300">
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
              className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-clancy-line/90 bg-gradient-to-b from-clancy-raised/96 to-clancy-surface/94 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_28px_rgba(0,0,0,0.24)] transition-all duration-300 ${hoverGlow}`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/6" />
              <div className="absolute -top-2 left-4 h-2 w-24 rounded-sm border border-clancy-line/80 bg-clancy-canvas shadow-[0_0_12px_rgba(255,255,255,0.04)] transition-colors group-hover:border-current" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_34%)] opacity-80" />
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-clancy-muted">
                  {evidence.type}
                </p>
                <span
                  className={`rounded-full border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${badgeStyles(evidence.badge)}`}
                >
                  {evidence.badge}
                </span>
              </div>
              <h3 className="mt-3 font-mono text-lg text-clancy-fire drop-shadow-[0_0_12px_rgba(255,46,46,0.12)]">
                {evidence.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-clancy-trench">
                {evidence.yearOrRef}
              </p>
              <p className="mt-3 text-sm text-clancy-muted">
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
              className="fixed inset-0 z-40 bg-[#101317]/82"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvidence(null)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="evidence-panel-title"
              className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto border-l border-clancy-fire/45 bg-clancy-canvas p-6 shadow-[-8px_0_24px_rgba(0,0,0,0.55)]"
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
                  <h3
                    id="evidence-panel-title"
                    className="mt-2 font-mono text-2xl text-clancy-fire"
                  >
                    {selectedEvidence.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-clancy-muted">
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
                <p className="mt-3 text-sm text-clancy-muted">
                  {selectedEvidence.shortDescription}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {selectedEvidence.details.map((detail) => (
                  <section
                    key={detail.section}
                    className="rounded-md border border-clancy-line/80 bg-gradient-to-b from-clancy-surface/92 to-clancy-raised/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <h4 className="font-mono text-sm uppercase tracking-[0.12em] text-clancy-trench">
                      {detail.section}
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-clancy-ink">
                      {detail.items.map((item) => (
                        <li
                          key={item}
                          className="rounded border border-clancy-line/60 bg-clancy-raised/78 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                        >
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
