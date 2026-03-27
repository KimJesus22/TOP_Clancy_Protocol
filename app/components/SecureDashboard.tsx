"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import ChronologicalEvidence from "@/app/components/ChronologicalEvidence";
import DecodeChallenge from "@/app/components/DecodeChallenge";
import ActClancyBriefing from "@/app/components/ActClancyBriefing";
import WalletIndicator from "@/app/components/WalletIndicator";
import AdvancedTerminalDialog from "@/app/components/secure-dashboard/AdvancedTerminalDialog";
import MobileNavigation from "@/app/components/secure-dashboard/MobileNavigation";
import SectionSkeleton from "@/app/components/secure-dashboard/SectionSkeleton";
import SidebarNavigation from "@/app/components/secure-dashboard/SidebarNavigation";
import { useOverlayFocusTrap } from "@/src/hooks/useOverlayFocusTrap";
import { useTerminalShortcut } from "@/src/hooks/useTerminalShortcut";

const EvidenceGrid = dynamic(() => import("@/app/components/EvidenceGrid"), {
  loading: () => (
    <SectionSkeleton
      title="Evidence Grid"
      description="Preparando los expedientes recuperados y el panel lateral de detalle."
      minHeightClass="min-h-[420px]"
    />
  ),
});

const NetworkScanner = dynamic(() => import("@/app/components/NetworkScanner"), {
  loading: () => (
    <SectionSkeleton
      title="Radar de Red"
      description="Inicializando el modulo de reconocimiento de superficie y sus hallazgos."
      minHeightClass="min-h-[360px]"
    />
  ),
});

const ThreatMap = dynamic(() => import("@/app/components/ThreatMap"), {
  loading: () => (
    <SectionSkeleton
      title="Radar de Amenazas Globales"
      description="Cargando el mapa tactico y reservando espacio para evitar desplazamientos de layout."
      minHeightClass="min-h-[420px]"
    />
  ),
});

const LoreDecryptor = dynamic(() => import("@/app/components/LoreDecryptor"), {
  loading: () => (
    <SectionSkeleton
      title="Mensajes cifrados de DEMA"
      description="Conectando con el feed de mensajes y preparando fallback estable."
      minHeightClass="min-h-[300px]"
    />
  ),
});

const BroadcastGallery = dynamic(() => import("@/app/components/BroadcastGallery"), {
  loading: () => (
    <SectionSkeleton
      title="Transmisiones Interceptadas de DEMA"
      description="Reservando espacio para los reproductores de video oficiales."
      minHeightClass="min-h-[520px]"
    />
  ),
});

const TerminalInterface = dynamic(() => import("@/app/components/TerminalInterface"), {
  loading: () => (
    <div className="rounded-xl border border-clancy-line/80 bg-clancy-surface/90 p-6 backdrop-blur-md">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
        Cargando consola
      </p>
      <div className="mt-4 h-[320px] rounded-lg border border-clancy-line/70 bg-clancy-raised/72" />
    </div>
  ),
});

export default function SecureDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [secretFound, setSecretFound] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLElement | null>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement | null>(null);
  const terminalDialogRef = useRef<HTMLElement | null>(null);
  const terminalCloseRef = useRef<HTMLButtonElement | null>(null);
  const terminalTriggerRef = useRef<HTMLElement | null>(null);

  useTerminalShortcut({
    onCaptureTrigger: (element) => {
      terminalTriggerRef.current = element;
    },
    onOpen: () => setTerminalOpen(true),
  });

  useOverlayFocusTrap({
    isOpen: mobileMenuOpen,
    container: mobileMenuRef.current,
    initialFocus: mobileMenuCloseRef.current,
    returnFocus: mobileMenuTriggerRef.current,
    onClose: () => setMobileMenuOpen(false),
  });

  useOverlayFocusTrap({
    isOpen: terminalOpen,
    container: terminalDialogRef.current,
    initialFocus: terminalCloseRef.current,
    returnFocus: terminalTriggerRef.current,
    onClose: () => setTerminalOpen(false),
  });

  return (
    <div className="min-h-screen">
      <MobileNavigation
        isOpen={mobileMenuOpen}
        triggerRef={mobileMenuTriggerRef}
        panelRef={mobileMenuRef}
        closeButtonRef={mobileMenuCloseRef}
        onOpen={() => setMobileMenuOpen(true)}
        onClose={() => setMobileMenuOpen(false)}
      />

      <SidebarNavigation />

      <main id="main-content" tabIndex={-1} className="md:pl-72">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 pt-20 sm:p-6 sm:pt-24 md:p-10 md:pt-10">
          <header className="sticky top-3 z-30 flex items-center justify-between rounded-xl border border-clancy-line/80 bg-clancy-surface/88 px-4 py-3 backdrop-blur-md">
            <p className="font-mono text-sm text-clancy-ink">Operacion Trench Wallet</p>
            <div className="flex items-center gap-2">
              <a
                href="/smuggler"
                className="rounded-md border border-clancy-line/75 bg-clancy-raised/75 px-3 py-1.5 text-sm text-clancy-muted transition-all duration-300 hover:border-clancy-fire hover:text-clancy-ink hover:shadow-[0_0_12px_rgba(255,46,46,0.22)] focus-visible:border-clancy-trench focus-visible:text-clancy-ink focus-visible:shadow-[0_0_12px_rgba(252,227,0,0.18)]"
              >
                Tienda de Contrabando
              </a>
              <WalletIndicator />
            </div>
          </header>

          <section
            id="inicio"
            className="rounded-xl border border-clancy-line/80 bg-clancy-surface/88 p-6 shadow-[0_0_24px_rgba(255,46,46,0.16)] backdrop-blur-md"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
              Inicio
            </p>
            <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-clancy-ink sm:text-3xl">
              Panel de Control Seguro
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-clancy-muted sm:text-base">
              Interfaz visual para monitorear expedientes, trafico de red y
              acceso terminal, pensada para usuarios no tecnicos sin perder
              estetica Cyberpunk/Clancy.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <article className="rounded-md border border-clancy-line/75 bg-clancy-raised/72 p-3 backdrop-blur-md">
                <p className="text-xs text-clancy-muted">Alertas activas</p>
                <p className="mt-1 font-mono text-2xl text-clancy-fire">03</p>
              </article>
              <article className="rounded-md border border-clancy-line/75 bg-clancy-raised/72 p-3 backdrop-blur-md">
                <p className="text-xs text-clancy-muted">Expedientes auditados</p>
                <p className="mt-1 font-mono text-2xl text-clancy-fire">08</p>
              </article>
              <article className="rounded-md border border-clancy-line/75 bg-clancy-raised/72 p-3 backdrop-blur-md">
                <p className="text-xs text-clancy-muted">Riesgo DEMA</p>
                <p className="mt-1 font-mono text-2xl text-clancy-trench">78%</p>
              </article>
            </div>
          </section>

          <section className="scroll-mt-24">
            <DecodeChallenge />
          </section>

          <section className="scroll-mt-24">
            <ActClancyBriefing />
          </section>

          <section id="expedientes" className="scroll-mt-24">
            <ChronologicalEvidence />
          </section>

          <section className="scroll-mt-24">
            <EvidenceGrid />
          </section>

          <section
            id="analisis-red"
            className="scroll-mt-24"
          >
            <NetworkScanner />
          </section>

          <section className="scroll-mt-24">
            <ThreatMap />
          </section>

          <section className="scroll-mt-24">
            <LoreDecryptor />
          </section>

          <section className="scroll-mt-24 rounded-xl border border-clancy-line/80 bg-clancy-surface/88 p-6 backdrop-blur-md">
            <h2 className="font-mono text-2xl tracking-[0.08em] text-clancy-ink">
              Transmisiones Interceptadas de DEMA
            </h2>
            <p className="mt-3 text-sm text-clancy-muted">
              Archivo publico de videos oficiales del lore para seguimiento no tecnico.
            </p>
            <div className="mt-5">
              <BroadcastGallery />
            </div>
          </section>
        </div>
      </main>

      <AdvancedTerminalDialog
        isOpen={terminalOpen}
        secretFound={secretFound}
        dialogRef={terminalDialogRef}
        closeButtonRef={terminalCloseRef}
        onClose={() => setTerminalOpen(false)}
      >
        <TerminalInterface onSecretUnlocked={() => setSecretFound(true)} />
      </AdvancedTerminalDialog>
    </div>
  );
}
