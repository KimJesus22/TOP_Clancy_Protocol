import Link from "next/link";
import { ArrowLeft, Command, LogIn, ShieldAlert } from "lucide-react";
import TerminalInterface from "../components/TerminalInterface";

export const dynamic = "force-static";
export const revalidate = 3600;

const samplePrompts = [
  "help",
  "status",
  "decrypt_lore",
  "contact_banditos",
  "vialism",
];

export default function ConsolaDemoPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl p-6 md:p-10">
      <section
        aria-labelledby="console-demo-title"
        className="rounded-2xl border border-clancy-line/85 bg-clancy-surface/92 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur-md"
      >
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-clancy-trench">
              Public Console Demo
            </p>
            <h1
              id="console-demo-title"
              className="mt-2 font-mono text-3xl text-clancy-ink md:text-4xl"
            >
              Consola accesible sin registro
            </h1>
            <p className="mt-3 text-sm text-clancy-muted md:text-base">
              Esta vista sirve como demo de portafolio para reclutadores. Muestra
              la experiencia interactiva de la terminal con datos ficticios y sin
              depender de autenticacion.
            </p>
          </div>

          <nav aria-label="Acciones de la demo" className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-clancy-line/80 bg-clancy-raised/78 px-4 py-2 text-sm text-clancy-muted transition hover:border-clancy-trench hover:text-clancy-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al dashboard
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-md border border-clancy-fire/45 bg-clancy-fire/10 px-4 py-2 text-sm text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.18)]"
            >
              <LogIn className="h-4 w-4" />
              Login real
            </Link>
          </nav>
        </header>

        <section
          aria-label="Experiencia principal de consola"
          className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]"
        >
          <article className="rounded-xl border border-clancy-line/80 bg-clancy-raised/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <TerminalInterface />
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
                  <span
                    key={prompt}
                    className="rounded-full border border-clancy-line/70 bg-clancy-surface/84 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-clancy-muted"
                  >
                    {prompt}
                  </span>
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
                Esta consola no accede a datos sensibles ni requiere cuenta. La
                zona autenticada sigue disponible en <span className="font-mono">/login</span>{" "}
                y <span className="font-mono">/classified</span>.
              </p>
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}
