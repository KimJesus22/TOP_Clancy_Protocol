import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LogIn } from "lucide-react";
import ConsoleDemoClient from "@/app/consola/ConsoleDemoClient";
import { buildPageMetadata } from "@/src/lib/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Consola Demo",
  description:
    "Demo publica de la terminal del proyecto, accesible sin registro y pensada para mostrar la experiencia en portafolio.",
  path: "/consola",
  keywords: ["consola", "terminal demo", "portfolio", "clancy protocol"],
});

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

        <ConsoleDemoClient />
      </section>
    </main>
  );
}
