"use client";

import { motion } from "framer-motion";
import { Code2, Server, Shield } from "lucide-react";
import { useMemo, useState } from "react";
import { NETWORK_SCAN_DATA } from "../data/networkScanner";

const categoryMeta = {
  "CMS & Servidores": { icon: Server, color: "text-clancy-fire" },
  "Analitica y Rastreo": { icon: Shield, color: "text-clancy-trench" },
  "Librerias Visuales": { icon: Code2, color: "text-white" },
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
    <section className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
      <header className="mb-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Analisis de Red
        </p>
        <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-white">
          Radar de Red
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Simulacion de reconocimiento de superficie sobre infraestructura DEMA.
        </p>
      </header>

      <button
        type="button"
        onClick={runScan}
        disabled={isRunning}
        className="rounded-md border border-white/10 bg-black/30 px-4 py-2 font-mono text-sm text-gray-300 transition-all duration-300 hover:border-clancy-fire/70 hover:text-white hover:shadow-[0_0_16px_rgba(255,46,46,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
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
              className="rounded-md border border-white/10 bg-black/35 p-4 backdrop-blur-md"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${meta.color}`} />
                  <h3 className="font-mono text-sm text-white">{tech.name}</h3>
                </div>
                <span className="text-xs text-gray-300">{tech.category}</span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded bg-zinc-800">
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
