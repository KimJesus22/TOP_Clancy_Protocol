"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ThreatNode = {
  id: number;
  x: number;
  y: number;
  color: "fire" | "trench";
  coords: string;
};

const PING_TTL_MS = 2200;
const TICK_MS = 2500;

function toCoordinates(x: number, y: number) {
  const lon = ((x / 100) * 360 - 180).toFixed(2);
  const lat = (90 - (y / 100) * 180).toFixed(2);
  return `${lat}, ${lon}`;
}

export default function ThreatMap() {
  const [nodes, setNodes] = useState<ThreatNode[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const id = ++idRef.current;
      const x = Math.random() * 92 + 4;
      const y = Math.random() * 84 + 8;
      const color: ThreatNode["color"] = Math.random() > 0.5 ? "fire" : "trench";
      const coords = toCoordinates(x, y);

      const node: ThreatNode = { id, x, y, color, coords };

      setNodes((prev) => [...prev, node]);
      setLogs((prev) => [
        `Infraccion detectada en [${coords}] - Protocolo Vialism iniciado`,
        ...prev,
      ].slice(0, 8));

      window.setTimeout(() => {
        setNodes((prev) => prev.filter((item) => item.id !== id));
      }, PING_TTL_MS);
    }, TICK_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
        Threat Map
      </p>
      <h2 className="mt-2 font-mono text-2xl text-white">Radar de Amenazas Globales</h2>

      <div className="mt-5 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/45">
          <svg viewBox="0 0 1000 500" className="h-full w-full">
            <rect x="0" y="0" width="1000" height="500" fill="#090909" />
            <g fill="#1f1f1f" stroke="#2f2f2f" strokeWidth="2">
              <path d="M70 180 L180 120 L280 140 L320 190 L250 250 L140 260 L80 230 Z" />
              <path d="M310 120 L420 95 L520 130 L560 190 L530 250 L430 260 L350 220 Z" />
              <path d="M520 280 L620 250 L730 260 L760 330 L700 390 L580 380 L520 330 Z" />
              <path d="M620 130 L760 110 L900 170 L920 240 L850 290 L730 260 L680 210 Z" />
            </g>
          </svg>

          <AnimatePresence>
            {nodes.map((node) => {
              const colorClass =
                node.color === "fire" ? "bg-clancy-fire" : "bg-clancy-trench";

              return (
                <motion.div
                  key={node.id}
                  className="pointer-events-none absolute"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className={`absolute -left-2 -top-2 h-5 w-5 rounded-full ${colorClass} opacity-70`}
                    initial={{ scale: 0.5, opacity: 0.9 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  />
                  <span
                    className={`absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full ${colorClass} shadow-[0_0_12px_currentColor]`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <aside className="rounded-lg border border-white/10 bg-black/55 p-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-clancy-trench">
            ThreatLog
          </p>
          <div className="mt-3 space-y-2">
            {logs.map((line, index) => (
              <p
                key={`${line}-${index}`}
                className="font-mono text-xs text-gray-300"
              >
                {line}
              </p>
            ))}
            {logs.length === 0 ? (
              <p className="font-mono text-xs text-gray-500">
                Esperando actividad de red...
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
