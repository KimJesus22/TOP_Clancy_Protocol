"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const alerts = [
  "ADVERTENCIA: SECTOR RESTRINGIDO",
  "SE HA REGISTRADO SU IP",
  "LOS OBISPOS HAN SIDO NOTIFICADOS",
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,46,46,0.14),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,46,46,0.08),transparent_35%)]" />

      <section className="relative z-10 w-full max-w-3xl rounded-xl border border-clancy-fire/50 bg-black/70 p-8 text-center shadow-[0_0_30px_rgba(255,46,46,0.25)] backdrop-blur-md">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-clancy-trench">
          Firewall de DEMA
        </p>

        <div className="relative mt-4">
          <motion.h1
            className="font-mono text-5xl font-bold tracking-[0.12em] text-clancy-fire md:text-7xl"
            animate={{ opacity: [1, 0.82, 1, 0.9, 1] }}
            transition={{ duration: 0.55, repeat: Infinity, repeatDelay: 1.2 }}
          >
            404
          </motion.h1>
          <motion.h1
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 font-mono text-5xl font-bold tracking-[0.12em] text-clancy-fire/40 md:text-7xl"
            animate={{ x: [0, -2, 2, -1, 0], opacity: [0.45, 0.2, 0.45] }}
            transition={{ duration: 0.22, repeat: Infinity }}
          >
            404
          </motion.h1>
        </div>

        <h2 className="mt-5 font-mono text-xl text-white md:text-2xl">
          Violacion de Seguridad del Firewall de DEMA
        </h2>

        <div className="mt-6 space-y-2">
          {alerts.map((alert, index) => (
            <motion.p
              key={alert}
              className="font-mono text-sm uppercase tracking-[0.08em] text-clancy-fire"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
                repeatDelay: 0.7,
              }}
            >
              {alert}
            </motion.p>
          ))}
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-md border border-clancy-fire/70 bg-clancy-fire/15 px-5 py-3 font-mono text-sm uppercase tracking-[0.08em] text-white transition-all duration-300 hover:border-clancy-trench hover:text-clancy-trench hover:shadow-[0_0_18px_rgba(252,227,0,0.28)]"
        >
          Ejecutar Protocolo de Escape (Volver al Inicio)
        </Link>
      </section>
    </main>
  );
}
