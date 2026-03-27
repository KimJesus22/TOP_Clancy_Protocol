"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lock, LockOpen, ScanSearch } from "lucide-react";
import { useMemo, useState } from "react";

type TargetSignal = {
  id: string;
  label: string;
  hex: `#${string}`;
  fileName: string;
  summary: string;
};

type RgbValues = {
  r: number;
  g: number;
  b: number;
};

const targetSignals: TargetSignal[] = [
  {
    id: "trench-yellow",
    label: "Frecuencia Trench",
    hex: "#FCE300",
    fileName: "ARCHIVO_ANTORCHA_27",
    summary: "Ruta segura detectada. El amarillo anula vigilancia episcopal en corredores de escape.",
  },
  {
    id: "clancy-red",
    label: "Frecuencia Clancy",
    hex: "#FF2E2E",
    fileName: "ARCHIVO_CONTRAATAQUE_09",
    summary: "Canal ofensivo abierto. La señal roja marca la activacion de la fase de incursión.",
  },
];

function hexToRgb(hex: `#${string}`): RgbValues {
  const normalized = hex.replace("#", "");

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

export default function ColorDecryptor() {
  const [signalIndex, setSignalIndex] = useState(0);
  const [inputs, setInputs] = useState({ r: "", g: "", b: "" });
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const activeSignal = targetSignals[signalIndex];
  const targetRgb = useMemo(() => hexToRgb(activeSignal.hex), [activeSignal.hex]);

  const handleInputChange = (channel: keyof typeof inputs, value: string) => {
    const sanitizedValue = value.replace(/[^\d]/g, "").slice(0, 3);

    setInputs((current) => ({
      ...current,
      [channel]: sanitizedValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericValues = {
      r: Number(inputs.r),
      g: Number(inputs.g),
      b: Number(inputs.b),
    };

    const isMatch =
      numericValues.r === targetRgb.r &&
      numericValues.g === targetRgb.g &&
      numericValues.b === targetRgb.b;

    setStatus(isMatch ? "success" : "error");
  };

  const rotateSignal = () => {
    setSignalIndex((current) => (current + 1) % targetSignals.length);
    setInputs({ r: "", g: "", b: "" });
    setStatus("idle");
  };

  return (
    <motion.section
      animate={
        status === "success"
          ? {
              boxShadow: [
                "0 0 0 rgba(0,0,0,0)",
                `0 0 32px ${activeSignal.hex}66`,
                `0 0 18px ${activeSignal.hex}2a`,
              ],
              backgroundColor: [
                "rgba(25,29,36,0.92)",
                `${activeSignal.hex}1f`,
                "rgba(25,29,36,0.92)",
              ],
            }
          : undefined
      }
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="rounded-xl border border-clancy-line/85 bg-clancy-surface/92 p-6 backdrop-blur-md"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-trench">
            Color Decryptor
          </p>
          <h2 className="mt-2 font-mono text-2xl text-clancy-ink">
            Decodificador de espectro visual
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-clancy-muted">
            Convierte la señal hexadecimal interceptada a sus canales RGB exactos
            para desbloquear un archivo confidencial.
          </p>
        </div>

        <button
          type="button"
          onClick={rotateSignal}
          className="rounded-md border border-clancy-line/80 bg-clancy-raised/78 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted transition hover:border-clancy-trench hover:text-clancy-ink"
        >
          Cambiar señal
        </button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-xl border border-clancy-line/80 bg-clancy-raised/78 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-clancy-muted">
            Señal activa
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div
              aria-hidden="true"
              className="h-16 w-16 rounded-2xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
              style={{ backgroundColor: activeSignal.hex }}
            />
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.12em] text-clancy-trench">
                {activeSignal.label}
              </p>
              <p className="mt-2 font-mono text-3xl text-clancy-ink">{activeSignal.hex}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-clancy-line/75 bg-clancy-surface/84 p-4">
            <div className="flex items-center gap-2">
              <ScanSearch className="h-4 w-4 text-clancy-fire" />
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-fire">
                Referencia interna
              </p>
            </div>
            <p className="mt-3 text-sm text-clancy-muted">
              Ingresa el valor decimal exacto de cada canal para validar la firma cromatica.
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-clancy-line/80 bg-clancy-raised/78 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {(["r", "g", "b"] as const).map((channel) => (
                <label key={channel} className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted">
                    Canal {channel.toUpperCase()}
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={255}
                    value={inputs[channel]}
                    onChange={(event) => handleInputChange(channel, event.target.value)}
                    className="mt-2 w-full rounded-lg border border-clancy-line/80 bg-clancy-surface/84 px-3 py-3 font-mono text-sm text-clancy-ink outline-none transition focus:border-clancy-trench focus:ring-2 focus:ring-clancy-trench/30"
                    placeholder="000"
                    aria-label={`Canal ${channel.toUpperCase()}`}
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md border border-clancy-fire/45 bg-clancy-fire/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.22)]"
            >
              <ScanSearch className="h-4 w-4" />
              Decodificar espectro
            </button>
          </form>

          <AnimatePresence mode="wait">
            {status === "error" ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 rounded-lg border border-clancy-fire/35 bg-clancy-fire/10 p-3 text-sm text-clancy-fire"
              >
                Fallo de decodificación de espectro visual
              </motion.p>
            ) : null}

            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-4 rounded-xl border border-clancy-trench/45 bg-clancy-trench/10 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-xl border border-clancy-trench/50 bg-black/20 p-2">
                    <LockOpen className="h-5 w-5 text-clancy-trench" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                      Archivo confidencial desbloqueado
                    </p>
                    <p className="mt-1 font-mono text-lg text-clancy-ink">
                      {activeSignal.fileName}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-clancy-muted">{activeSignal.summary}</p>
              </motion.div>
            ) : (
              <motion.div
                key="locked"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 rounded-xl border border-clancy-line/75 bg-clancy-surface/82 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-xl border border-clancy-line/75 bg-clancy-raised/75 p-2">
                    <Lock className="h-5 w-5 text-clancy-muted" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-muted">
                      Archivo confidencial bloqueado
                    </p>
                    <p className="mt-1 text-sm text-clancy-muted">
                      Traduce la señal hexadecimal al espectro decimal exacto para continuar.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </div>
    </motion.section>
  );
}
