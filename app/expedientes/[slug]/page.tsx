import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/src/lib/metadata";
import { getEvidenceBySlug, getEvidenceSlugs } from "@/src/lib/evidence";

type EvidenceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getEvidenceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EvidenceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const evidence = getEvidenceBySlug(slug);

  if (!evidence) {
    return buildPageMetadata({
      title: "Expediente no encontrado",
      description: "El expediente solicitado no existe dentro del archivo de Clancy Protocol.",
      path: `/expedientes/${slug}`,
    });
  }

  return buildPageMetadata({
    title: evidence.title,
    description: evidence.shortDescription,
    path: `/expedientes/${slug}`,
    keywords: [evidence.type, evidence.title, "expediente", "Clancy Protocol"],
  });
}

export default async function EvidenceDetailPage({
  params,
}: EvidenceDetailPageProps) {
  const { slug } = await params;
  const evidence = getEvidenceBySlug(slug);

  if (!evidence) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl p-6 md:p-10">
      <article className="rounded-2xl border border-clancy-line/85 bg-clancy-surface/92 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur-md">
        <header className="border-b border-clancy-line/75 pb-5">
          <Link
            href="/expedientes"
            className="inline-flex items-center gap-2 rounded-md border border-clancy-line/80 bg-clancy-raised/78 px-4 py-2 text-sm text-clancy-muted transition hover:border-clancy-trench hover:text-clancy-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a expedientes
          </Link>

          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
            {evidence.type}
          </p>
          <h1 className="mt-2 font-mono text-3xl text-clancy-fire md:text-4xl">
            {evidence.title}
          </h1>
          <p className="mt-2 font-mono text-sm text-clancy-muted">{evidence.yearOrRef}</p>
          <p className="mt-4 text-base text-clancy-muted">{evidence.shortDescription}</p>
          <p className="mt-4 font-mono text-xs text-zinc-500">
            URL semantica: /expedientes/{evidence.id}
          </p>
        </header>

        <div className="mt-6 space-y-4">
          {evidence.details.map((detail) => (
            <section
              key={detail.section}
              className="rounded-xl border border-clancy-line/80 bg-clancy-raised/78 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <h2 className="font-mono text-sm uppercase tracking-[0.14em] text-clancy-trench">
                {detail.section}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-clancy-ink">
                {detail.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-clancy-line/65 bg-clancy-surface/84 p-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
