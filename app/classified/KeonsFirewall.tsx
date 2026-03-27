"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Sigma } from "lucide-react";
import { useState } from "react";

type KeonsFirewallProps = {
  children: React.ReactNode;
};

export default function KeonsFirewall({ children }: KeonsFirewallProps) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"locked" | "error" | "granted">("locked");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (answer.trim() === "4") {
      setStatus("granted");
      return;
    }

    setStatus("error");
  };

  return (
    <AnimatePresence mode="wait">
      {status === "granted" ? (
        <motion.div
          key="firewall-granted"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-[#22c55e]/45 bg-[#0f1712]/90 p-6 shadow-[0_0_28px_rgba(34,197,94,0.18)]"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-xl border border-[#22c55e]/35 bg-[#22c55e]/10 p-2">
                <ShieldCheck className="h-5 w-5 text-[#22c55e]" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#22c55e]">
                  Núcleo estabilizado
                </p>
                <p className="mt-1 font-mono text-sm text-zinc-200">
                  Núcleo estabilizado. Bypassing firewall...
                </p>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : (
        <motion.section
          key="firewall-locked"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className={`keons-glitch rounded-xl border border-clancy-fire/45 bg-black/88 p-6 shadow-[0_0_30px_rgba(255,46,46,0.2)] ${status === "error" ? "keons-shake" : ""}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-fire">
                Keons Firewall
              </p>
              <h2 className="mt-2 font-mono text-2xl text-clancy-ink">
                Sobrecarga de memoria detectada
              </h2>
              <p className="mt-3 font-mono text-sm text-zinc-300">
                Estabilice el núcleo resolviendo la indeterminación algorítmica.
              </p>
            </div>

            <span className="rounded-xl border border-clancy-fire/35 bg-clancy-fire/10 p-3">
              <ShieldAlert className="h-5 w-5 text-clancy-fire" />
            </span>
          </div>

          <div className="mt-6 rounded-xl border border-clancy-fire/30 bg-[#150f12]/92 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-2">
              <Sigma className="h-4 w-4 text-clancy-trench" />
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-clancy-trench">
                Límite de estabilización
              </p>
            </div>

            <div className="mt-5 overflow-x-auto rounded-lg border border-clancy-line/60 bg-black/35 px-4 py-5">
              <p className="font-serif text-center text-2xl text-clancy-ink md:text-3xl">
                lim x→2 (x² - 4) / (x - 2)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
              <label className="block flex-1">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted">
                  Respuesta estabilizadora
                </span>
                <input
                  type="text"
                  value={answer}
                  onChange={(event) => {
                    setAnswer(event.target.value);
                    if (status === "error") {
                      setStatus("locked");
                    }
                  }}
                  className="mt-2 w-full rounded-lg border border-clancy-line/80 bg-clancy-surface/84 px-3 py-3 font-mono text-sm text-clancy-ink outline-none transition focus:border-clancy-trench focus:ring-2 focus:ring-clancy-trench/30"
                  placeholder="Ingrese el limite"
                  aria-label="Respuesta estabilizadora del limite"
                />
              </label>

              <button
                type="submit"
                className="rounded-md border border-clancy-fire/45 bg-clancy-fire/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.22)]"
              >
                Verificar núcleo
              </button>
            </form>

            {status === "error" ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg border border-clancy-fire/35 bg-clancy-fire/10 p-3 font-mono text-sm text-clancy-fire"
              >
                Fallo de decodificación del núcleo. Reintente la factorización.
              </motion.p>
            ) : null}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
