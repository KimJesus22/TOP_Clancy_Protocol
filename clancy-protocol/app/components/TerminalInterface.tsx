"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Entry =
  | { id: string; type: "text"; content: string }
  | { id: string; type: "status"; threatLevel: number };

const AVAILABLE_COMMANDS = [
  "open_discography",
  "decrypt_lore",
  "contact_banditos",
] as const;

type TerminalInterfaceProps = {
  onSecretUnlocked?: () => void;
};

function AnimatedLine({ text }: { text: string }) {
  const chars = useMemo(() => text.split(""), [text]);

  return (
    <p className="whitespace-pre-wrap text-sm text-zinc-200 md:text-base">
      {chars.map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.02, duration: 0.02 }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  );
}

export default function TerminalInterface({
  onSecretUnlocked,
}: TerminalInterfaceProps) {
  const [command, setCommand] = useState("");
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: "boot-1",
      type: "text",
      content: "CLANCY TERMINAL v1.0 | Escribe 'help' para ver comandos.",
    },
  ]);

  const pushText = (content: string) => {
    setEntries((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: "text", content },
    ]);
  };

  const pushThreatStatus = () => {
    const threatLevel = 78;
    setEntries((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: "status", threatLevel },
    ]);
  };

  const handleCommand = (rawCommand: string) => {
    const normalized = rawCommand.trim().toLowerCase();
    if (!normalized) return;

    pushText(`> ${normalized}`);

    switch (normalized) {
      case "help":
        pushText(`Comandos disponibles:
${AVAILABLE_COMMANDS.join("\n")}`);
        break;
      case "status":
        pushThreatStatus();
        break;
      case "open_discography":
        pushText("Acceso concedido: Discography archive linked.");
        break;
      case "decrypt_lore":
        pushText("Decrypting lore packets... 42% complete.");
        break;
      case "contact_banditos":
        pushText("Secure channel opened. Waiting for Banditos signal.");
        break;
      case "vialism":
        if (!secretUnlocked) {
          setSecretUnlocked(true);
          onSecretUnlocked?.();
          pushText("Codex VIALISM aceptado. Archivo oculto desbloqueado.");
        } else {
          pushText("Archivo oculto ya fue desbloqueado.");
        }
        break;
      default:
        pushText("Comando no reconocido. Usa 'help'.");
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentCommand = command;
    setCommand("");
    handleCommand(currentCommand);
  };

  return (
    <section className="w-full rounded-xl border border-clancy-fire/35 bg-black/45 p-4 shadow-[0_0_20px_rgba(255,46,46,0.18)]">
      <header className="mb-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Terminal Abierta
        </p>
        <h3 className="mt-1 font-mono text-lg tracking-[0.08em] text-clancy-fire">
          Consola Operativa
        </h3>
      </header>
      <div className="mb-4 space-y-2">
        {entries.map((entry) => {
          if (entry.type === "status") {
            return (
              <div key={entry.id} className="space-y-2">
                <AnimatedLine
                  text={`Nivel de amenaza DEMA: ${entry.threatLevel}%`}
                />
                <div className="h-3 w-full overflow-hidden rounded bg-clancy-black/80 ring-1 ring-clancy-trench/30">
                  <motion.div
                    className="h-full bg-clancy-fire"
                    initial={{ width: 0 }}
                    animate={{ width: `${entry.threatLevel}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          }

          return <AnimatedLine key={entry.id} text={entry.content} />;
        })}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <span className="font-mono text-clancy-trench">$</span>
        <input
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          className="w-full bg-transparent text-zinc-100 outline-none placeholder:text-zinc-400"
          placeholder="Escribe un comando..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>

      {secretUnlocked ? (
        <motion.div
          className="mt-4 rounded-md border border-clancy-trench/50 bg-black/45 p-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
            Hidden Asset Unlocked
          </p>
          <Image
            src="/hidden-vialism.svg"
            alt="Vialism hidden signal"
            width={640}
            height={320}
            className="h-auto w-full rounded border border-clancy-fire/40"
          />
        </motion.div>
      ) : null}
    </section>
  );
}
