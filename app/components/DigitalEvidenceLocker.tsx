"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  DIGITAL_EVIDENCE_LOCKER,
  EvidenceRecord,
} from "../data/digitalEvidenceLocker";

export default function DigitalEvidenceLocker() {
  const [activeEvidence, setActiveEvidence] = useState<EvidenceRecord | null>(
    null,
  );

  return (
    <section className="w-full">
      <header className="mb-4">
        <h2 className="font-mono text-xl tracking-[0.16em] text-clancy-fire">
          Digital_Evidence_Locker
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          Archivo seguro de expedientes legales | Acceso supervisado
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {DIGITAL_EVIDENCE_LOCKER.map((evidence) => {
          const statusClass =
            evidence.status === "Vulnerable"
              ? "text-clancy-fire"
              : "text-clancy-trench";

          return (
            <button
              key={evidence.id}
              type="button"
              onClick={() => setActiveEvidence(evidence)}
              className="group relative rounded-md border border-clancy-fire/50 bg-black/35 p-4 text-left transition-all duration-300 hover:border-clancy-fire hover:shadow-[0_0_24px_rgba(255,46,46,0.35)]"
            >
              <div className="absolute -top-2 left-3 h-3 w-20 rounded-sm border border-clancy-fire/40 bg-black/80" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-trench/90">
                {evidence.classification}
              </p>
              <h3 className="mt-2 font-mono text-lg tracking-[0.1em] text-clancy-fire">
                {evidence.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-200">{evidence.summary}</p>
              <p className={`mt-3 font-mono text-xs tracking-[0.12em] ${statusClass}`}>
                STATUS: {evidence.status}
              </p>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeEvidence ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveEvidence(null)}
          >
            <motion.article
              className="w-full max-w-2xl rounded-md border border-clancy-fire bg-[#0f0f0f] p-5 shadow-[0_0_28px_rgba(255,46,46,0.4)]"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-clancy-trench/90">
                    {activeEvidence.classification}
                  </p>
                  <h3 className="mt-1 font-mono text-xl tracking-[0.1em] text-clancy-fire">
                    {activeEvidence.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-200">
                    {activeEvidence.summary}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded border border-clancy-fire/60 px-2 py-1 text-xs text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.35)]"
                  onClick={() => setActiveEvidence(null)}
                >
                  CLOSE
                </button>
              </div>

              <div className="mt-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-clancy-trench">
                  Analisis forense
                </p>
                <ul className="mt-2 space-y-2 text-sm text-zinc-200">
                  {activeEvidence.technicalDetails.map((detail) => (
                    <li
                      key={detail}
                      className="rounded border border-clancy-fire/30 bg-black/40 p-2"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded border border-clancy-fire/40 bg-black/50 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                  Dictamen tecnico
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  {activeEvidence.riskAssessment}
                </p>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
