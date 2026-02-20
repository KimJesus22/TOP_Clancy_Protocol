"use client";

import {
  Command,
  Home,
  Menu,
  Network,
  FolderOpen,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentType, useEffect, useState } from "react";
import ChronologicalEvidence from "./ChronologicalEvidence";
import EvidenceGrid from "./EvidenceGrid";
import LoreDecryptor from "./LoreDecryptor";
import TerminalInterface from "./TerminalInterface";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "#inicio", icon: Home },
  {
    id: "expedientes",
    label: "Expedientes (Discografia)",
    href: "#expedientes",
    icon: FolderOpen,
  },
  {
    id: "analisis",
    label: "Analisis de Red (El CSV)",
    href: "#analisis-red",
    icon: Network,
  },
];

export default function SecureDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [secretFound, setSecretFound] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        setTerminalOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      <button
        type="button"
        aria-label="Abrir menu"
        className="fixed left-4 top-4 z-50 rounded-md border border-clancy-fire/70 bg-black/80 p-2 text-clancy-fire shadow-[0_0_14px_rgba(255,46,46,0.25)] md:hidden"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-clancy-fire/40 bg-black/80 p-6 backdrop-blur md:flex md:flex-col">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Secure Panel
        </p>
        <h1 className="mt-2 font-mono text-xl tracking-[0.08em] text-clancy-fire">
          Clancy Dashboard
        </h1>
        <nav className="mt-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className="group flex items-center gap-3 rounded-md border border-clancy-fire/20 px-3 py-2 text-sm text-zinc-200 transition hover:border-clancy-fire/70 hover:text-clancy-fire hover:shadow-[0_0_16px_rgba(255,46,46,0.22)]"
              >
                <Icon className="h-4 w-4 text-clancy-trench transition group-hover:text-clancy-fire" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => setTerminalOpen(true)}
          className="mt-4 flex items-center gap-3 rounded-md border border-clancy-trench/40 bg-clancy-trench/10 px-3 py-2 text-sm text-clancy-trench transition hover:border-clancy-trench hover:shadow-[0_0_16px_rgba(252,227,0,0.28)]"
        >
          <Command className="h-4 w-4" />
          <span>Abrir Consola</span>
        </button>
        <p className="mt-2 font-mono text-[11px] text-zinc-500">
          Atajo: Ctrl + Shift + T
        </p>
      </aside>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            aria-label="Cerrar menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative h-full w-80 max-w-[88vw] border-r border-clancy-fire/40 bg-[#0a0a0a] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-mono text-lg tracking-[0.08em] text-clancy-fire">
                Menu Seguro
              </h2>
              <button
                type="button"
                className="rounded border border-clancy-fire/60 p-1 text-clancy-fire"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menu lateral"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md border border-clancy-fire/20 px-3 py-2 text-sm text-zinc-200 transition hover:border-clancy-fire/70 hover:text-clancy-fire hover:shadow-[0_0_14px_rgba(255,46,46,0.2)]"
                  >
                    <Icon className="h-4 w-4 text-clancy-trench" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setTerminalOpen(true);
              }}
              className="mt-4 flex w-full items-center gap-3 rounded-md border border-clancy-trench/40 bg-clancy-trench/10 px-3 py-2 text-sm text-clancy-trench transition hover:border-clancy-trench hover:shadow-[0_0_14px_rgba(252,227,0,0.22)]"
            >
              <Command className="h-4 w-4" />
              <span>Abrir Consola</span>
            </button>
            <p className="mt-2 font-mono text-[11px] text-zinc-500">
              Atajo: Ctrl + Shift + T
            </p>
          </aside>
        </div>
      ) : null}

      <main className="md:pl-72">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 pt-20 sm:p-6 sm:pt-24 md:p-10 md:pt-10">
          <section
            id="inicio"
            className="rounded-xl border border-clancy-fire/35 bg-black/45 p-6 shadow-[0_0_24px_rgba(255,46,46,0.16)]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
              Inicio
            </p>
            <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-clancy-fire sm:text-3xl">
              Panel de Control Seguro
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-zinc-300 sm:text-base">
              Interfaz visual para monitorear expedientes, trafico de red y
              acceso terminal, pensada para usuarios no tecnicos sin perder
              estetica Cyberpunk/Clancy.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <article className="rounded-md border border-clancy-fire/40 bg-black/40 p-3">
                <p className="text-xs text-zinc-400">Alertas activas</p>
                <p className="mt-1 font-mono text-2xl text-clancy-fire">03</p>
              </article>
              <article className="rounded-md border border-clancy-fire/40 bg-black/40 p-3">
                <p className="text-xs text-zinc-400">Expedientes auditados</p>
                <p className="mt-1 font-mono text-2xl text-clancy-fire">02</p>
              </article>
              <article className="rounded-md border border-clancy-fire/40 bg-black/40 p-3">
                <p className="text-xs text-zinc-400">Riesgo DEMA</p>
                <p className="mt-1 font-mono text-2xl text-clancy-trench">78%</p>
              </article>
            </div>
          </section>

          <section id="expedientes" className="scroll-mt-24">
            <ChronologicalEvidence />
          </section>

          <section className="scroll-mt-24">
            <EvidenceGrid />
          </section>

          <section
            id="analisis-red"
            className="scroll-mt-24 rounded-xl border border-clancy-fire/35 bg-black/45 p-6 shadow-[0_0_20px_rgba(255,46,46,0.14)]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
              Analisis de Red (El CSV)
            </p>
            <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-clancy-fire">
              Resumen Forense de Trafico
            </h2>
            <p className="mt-3 text-sm text-zinc-300">
              Vista ejecutiva del analisis de red extraido del CSV para facilitar
              decisiones rapidas sin navegar datos crudos.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <article className="rounded-md border border-clancy-fire/35 bg-black/35 p-3">
                <p className="text-xs text-zinc-400">Eventos analizados</p>
                <p className="mt-1 font-mono text-xl text-clancy-fire">12,480</p>
              </article>
              <article className="rounded-md border border-clancy-fire/35 bg-black/35 p-3">
                <p className="text-xs text-zinc-400">Conexiones sospechosas</p>
                <p className="mt-1 font-mono text-xl text-clancy-fire">241</p>
              </article>
              <article className="rounded-md border border-clancy-fire/35 bg-black/35 p-3">
                <p className="text-xs text-zinc-400">Integridad CSV</p>
                <p className="mt-1 font-mono text-xl text-clancy-trench">99.2%</p>
              </article>
            </div>
          </section>

          <section className="scroll-mt-24">
            <LoreDecryptor />
          </section>
        </div>
      </main>

      <AnimatePresence>
        {terminalOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar consola"
              className="fixed inset-0 z-50 bg-black/75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTerminalOpen(false)}
            />
            <motion.section
              className="fixed left-1/2 top-1/2 z-[60] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="mb-3 flex items-center justify-between rounded-md border border-clancy-fire/40 bg-black/80 px-3 py-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-clancy-trench">
                    Consola Avanzada
                  </p>
                  <p className="text-xs text-zinc-400">
                    Extra opcional para usuarios avanzados
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {secretFound ? (
                    <span className="rounded-full border border-clancy-trench/70 bg-clancy-trench/15 px-2 py-1 font-mono text-[11px] uppercase text-clancy-trench">
                      Secreto desbloqueado
                    </span>
                  ) : null}
                  <button
                    type="button"
                    aria-label="Cerrar consola avanzada"
                    onClick={() => setTerminalOpen(false)}
                    className="rounded border border-clancy-fire/60 p-1 text-clancy-fire"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <TerminalInterface onSecretUnlocked={() => setSecretFound(true)} />
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
