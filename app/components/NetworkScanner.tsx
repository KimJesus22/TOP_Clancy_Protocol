"use client";

import { motion } from "framer-motion";
import { Code2, Server, Shield } from "lucide-react";
import { useMemo, useState } from "react";
import { NETWORK_SCAN_DATA } from "@/app/data/networkScanner";

const categoryMeta = {
  "CMS & Servidores": { icon: Server, color: "text-clancy-fire" },
  "Analitica y Rastreo": { icon: Shield, color: "text-clancy-trench" },
  "Librerias Visuales": { icon: Code2, color: "text-clancy-ink" },
} as const;

type ScanState = "idle" | "scanning" | "done";

export default function NetworkScanner() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [visibleCount, setVisibleCount] = useState(0);

  const isRunning = scanState === "scanning";
  const isReady = scanState === "done";

  const runScan = () => {
    if (isRunning) return;

    setScanState("scanning");
    setVisibleCount(0);

    NETWORK_SCAN_DATA.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCount(index + 1);
      }, index * 300);
    });

    setTimeout(() => {
      setScanState("done");
    }, NETWORK_SCAN_DATA.length * 300 + 350);
  };

  const visibleItems = useMemo(
    () => NETWORK_SCAN_DATA.slice(0, visibleCount),
    [visibleCount],
  );

  return (
    <section className="rounded-xl border border-clancy-line/85 bg-clancy-surface/90 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.24)] backdrop-blur-md">
      <header className="mb-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Analisis de Red
        </p>
        <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-clancy-ink">
          Radar de Red
        </h2>
        <p className="mt-2 text-sm text-clancy-muted">
          Simulacion de reconocimiento de superficie sobre infraestructura DEMA.
        </p>
      </header>

      <button
        type="button"
        onClick={runScan}
        disabled={isRunning}
        className="rounded-md border border-clancy-line/80 bg-clancy-raised/78 px-4 py-2 font-mono text-sm text-clancy-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-clancy-fire/70 hover:text-clancy-ink hover:shadow-[0_0_16px_rgba(255,46,46,0.16)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRunning ? "Escaneando..." : "Ejecutar Escaneo de Superficie"}
      </button>

      <div className="mt-6 space-y-3">
        {visibleItems.map((tech) => {
          const meta = categoryMeta[tech.category];
          const Icon = meta.icon;

          return (
            <motion.article
              key={tech.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-md border border-clancy-line/85 bg-gradient-to-b from-clancy-raised/94 to-clancy-surface/92 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/6" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_34%)] opacity-70" />
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${meta.color}`} />
                  <h3 className="font-mono text-sm text-clancy-ink">{tech.name}</h3>
                </div>
                <span className="text-xs text-clancy-muted">{tech.category}</span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded bg-clancy-canvas/90 ring-1 ring-white/5">
                <motion.div
                  className="h-full bg-clancy-fire"
                  initial={{ width: "0%" }}
                  animate={{
                    width: isRunning || isReady ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 font-mono text-xs text-clancy-trench">
                Nivel de penetracion: {isRunning || isReady ? "100%" : "0%"}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
