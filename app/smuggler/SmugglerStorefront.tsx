"use client";

import { useState } from "react";
import WalletIndicator from "@/app/components/WalletIndicator";
import { useTrenchWalletStore } from "@/src/store/trenchWalletStore";

const BLURRYFACE_COST = 200;

export default function SmugglerStorefront() {
  const credits = useTrenchWalletStore((state) => state.credits);
  const unlockedThemes = useTrenchWalletStore((state) => state.unlockedThemes);
  const activeTheme = useTrenchWalletStore((state) => state.activeTheme);
  const purchaseTheme = useTrenchWalletStore((state) => state.purchaseTheme);
  const setActiveTheme = useTrenchWalletStore((state) => state.setActiveTheme);
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  const blurryfaceUnlocked = unlockedThemes.includes("blurryface");
  const blurryfaceActive = activeTheme === "blurryface";

  const buyBlurryface = () => {
    const result = purchaseTheme("blurryface", BLURRYFACE_COST);

    if (!result.success && result.reason === "insufficient_credits") {
      setPurchaseMessage(
        `Saldo insuficiente: necesitas ${BLURRYFACE_COST - credits} creditos mas para desbloquear Modo Blurryface.`,
      );
      return;
    }

    setPurchaseMessage("Modo Blurryface desbloqueado y equipado.");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-mono text-3xl text-white">Tienda de Contrabando</h1>
        <WalletIndicator />
      </div>

      <section className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-trench">
          Item exclusivo
        </p>
        <h2 className="mt-2 font-mono text-2xl text-white">Modo Blurryface</h2>
        <p className="mt-2 text-sm text-gray-300">
          Convierte los bordes de la interfaz al esquema rojo intenso.
        </p>
        <p className="mt-3 font-mono text-sm text-clancy-trench">
          Costo: {BLURRYFACE_COST} creditos
        </p>
        <p className="mt-1 text-sm text-gray-300">
          Saldo disponible: {credits} creditos
        </p>

        {!blurryfaceUnlocked ? (
          <button
            type="button"
            onClick={buyBlurryface}
            className="mt-4 rounded-md border border-white/10 bg-black/30 px-4 py-2 font-mono text-sm text-gray-300 transition-all duration-300 hover:border-clancy-fire hover:text-white hover:shadow-[0_0_14px_rgba(255,46,46,0.25)]"
          >
            Comprar Modo Blurryface
          </button>
        ) : blurryfaceActive ? (
          <button
            type="button"
            onClick={() => {
              setActiveTheme("default");
              setPurchaseMessage("Modo default activo.");
            }}
            className="mt-4 rounded-md border border-white/10 bg-black/30 px-4 py-2 font-mono text-sm text-gray-300 transition-all duration-300 hover:border-clancy-trench hover:text-white"
          >
            Volver a modo default
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setActiveTheme("blurryface");
              setPurchaseMessage("Modo Blurryface activo.");
            }}
            className="mt-4 rounded-md border border-clancy-fire/60 bg-clancy-fire/10 px-4 py-2 font-mono text-sm text-white transition-all duration-300 hover:shadow-[0_0_14px_rgba(255,46,46,0.3)]"
          >
            Equipar Modo Blurryface
          </button>
        )}

        {purchaseMessage ? (
          <p
            className={`mt-4 rounded-md border px-3 py-2 text-sm ${
              credits >= BLURRYFACE_COST || blurryfaceUnlocked
                ? "border-clancy-trench/55 bg-clancy-trench/10 text-clancy-trench"
                : "border-clancy-fire/55 bg-clancy-fire/10 text-clancy-fire"
            }`}
            role="status"
            aria-live="polite"
          >
            {purchaseMessage}
          </p>
        ) : null}
      </section>
    </main>
  );
}
