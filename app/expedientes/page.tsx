import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileSearch } from "lucide-react";
import { buildPageMetadata } from "@/src/lib/metadata";
import { getAllEvidence } from "@/src/lib/evidence";

export const metadata: Metadata = buildPageMetadata({
  title: "Expedientes",
  description:
    "Indice de expedientes del dashboard con rutas limpias y fichas semanticas para albumes, personajes, documentos y analisis.",
  path: "/expedientes",
  keywords: ["expedientes", "lore", "albumes", "DEMA", "slugs semanticos"],
});

export default function ExpedientesPage() {
  const evidenceRecords = getAllEvidence();

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl p-6 md:p-10">
      <header className="rounded-2xl border border-clancy-line/85 bg-clancy-surface/92 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-clancy-trench">
              Expedientes
            </p>
            <h1 className="mt-2 font-mono text-3xl text-clancy-ink md:text-4xl">
              Archivo indexable de evidencias
            </h1>
            <p className="mt-3 text-sm text-clancy-muted md:text-base">
              Cada registro ya tiene una URL semantica propia para compartir,
              indexar y navegar sin depender del panel lateral del dashboard.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-clancy-line/80 bg-clancy-raised/78 px-4 py-2 text-sm text-clancy-muted transition hover:border-clancy-trench hover:text-clancy-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al dashboard
          </Link>
        </div>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {evidenceRecords.map((evidence) => (
          <article
            key={evidence.id}
            className="rounded-xl border border-clancy-line/85 bg-clancy-surface/90 p-5 shadow-[0_10px_28px_rgba(0,0,0,0.24)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-clancy-trench">
                {evidence.type}
              </p>
              <span className="rounded-full border border-clancy-line/70 bg-clancy-raised/75 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-clancy-muted">
                {evidence.badge}
              </span>
            </div>

            <h2 className="mt-3 font-mono text-xl text-clancy-fire">{evidence.title}</h2>
            <p className="mt-1 font-mono text-xs text-clancy-muted">{evidence.yearOrRef}</p>
            <p className="mt-3 text-sm text-clancy-muted">{evidence.shortDescription}</p>

            <Link
              href={`/expedientes/${evidence.id}`}
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-clancy-fire/45 bg-clancy-fire/10 px-3 py-2 text-sm text-clancy-fire transition hover:shadow-[0_0_14px_rgba(255,46,46,0.18)]"
            >
              <FileSearch className="h-4 w-4" />
              Abrir expediente
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
