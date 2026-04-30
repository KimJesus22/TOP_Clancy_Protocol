"use client";

import { useState } from "react";
import { Command, ShieldAlert } from "lucide-react";
import TerminalInterface from "@/app/components/TerminalInterface";

const samplePrompts = [
  "help",
  "status",
  "decrypt_lore",
  "contact_banditos",
  "vialism",
] as const;

export default function ConsoleDemoClient() {
  const [queuedCommand, setQueuedCommand] = useState<{
    id: number;
    value: string;
  } | null>(null);

  const runCommand = (value: string) => {
    setQueuedCommand({ id: Date.now(), value });
  };

  return (
    <section
      aria-label="Experiencia principal de consola"
      className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]"
    >
      <article className="rounded-xl border border-clancy-line/80 bg-clancy-raised/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <TerminalInterface queuedCommand={queuedCommand} />
      </article>

      <aside className="space-y-4">
        <section className="rounded-xl border border-clancy-line/80 bg-clancy-raised/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <header className="flex items-center gap-2">
            <Command className="h-4 w-4 text-clancy-trench" />
            <h2 className="font-mono text-sm uppercase tracking-[0.16em] text-clancy-ink">
              Prueba rapida
            </h2>
          </header>
          <div className="mt-4 flex flex-wrap gap-2">
            {samplePrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => runCommand(prompt)}
                className="rounded-full border border-clancy-line/70 bg-clancy-surface/84 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-clancy-muted transition hover:border-clancy-trench hover:text-clancy-ink focus-visible:border-clancy-trench focus-visible:text-clancy-ink"
              >
                {prompt}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-clancy-fire/30 bg-clancy-surface/84 p-4">
          <header className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-clancy-fire" />
            <h2 className="font-mono text-sm uppercase tracking-[0.16em] text-clancy-ink">
              Nota de demo
            </h2>
          </header>
          <p className="mt-3 text-sm text-clancy-muted">
            Esta consola no accede a datos sensibles ni requiere cuenta. La zona
            autenticada sigue disponible en <span className="font-mono">/login</span>{" "}
            y <span className="font-mono">/classified</span>.
          </p>
        </section>
      </aside>
    </section>
  );
}
