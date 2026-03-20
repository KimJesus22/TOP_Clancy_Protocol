"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { topAlbums } from "../../lib/data/albums";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

export default function ChronologicalEvidence() {
  const [expandedAlbumId, setExpandedAlbumId] = useState<string | null>(null);

  return (
    <section className="scroll-mt-24 rounded-xl border border-white/10 bg-black/40 p-6 shadow-[0_0_20px_rgba(255,46,46,0.14)] backdrop-blur-md">
      <header className="mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Chronological Evidence
        </p>
        <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-white">
          Timeline de Albumes
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-gray-300">
          Registro cronologico convertido desde el PDF en un dossier bilingue de
          eras, ciclos, personajes y puntos de ruptura contra DEMA.
        </p>
      </header>

      <motion.ol
        className="relative ml-3 space-y-6 border-l border-zinc-700/70 pl-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {topAlbums.map((album) => (
          <motion.li
            key={album.id}
            variants={itemVariants}
            className="relative rounded-lg border border-zinc-700/70 bg-black/40 p-4"
            style={{
              borderColor: `${album.coverColor}88`,
              boxShadow: `0 0 0px ${album.coverColor}00`,
            }}
          >
            <span
              className="absolute -left-[33px] top-5 h-4 w-4 rounded-full border-2 bg-black"
              style={{
                borderColor: album.coverColor,
                boxShadow: `0 0 12px ${album.coverColor}`,
              }}
            />

            <button
              type="button"
              onClick={() =>
                setExpandedAlbumId((prev) => (prev === album.id ? null : album.id))
              }
              className="w-full text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-mono text-lg text-zinc-100">{album.title}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                    PDF coverage: {album.sourceCoverage}
                  </p>
                </div>
                <span
                  className="rounded-full border px-2 py-1 font-mono text-xs uppercase tracking-[0.08em]"
                  style={{
                    borderColor: `${album.coverColor}99`,
                    color: album.coverColor,
                    backgroundColor: `${album.coverColor}1A`,
                  }}
                >
                  {album.status}
                </span>
              </div>

              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                <p className="text-zinc-300">
                  Ano:{" "}
                  <span className="font-mono text-zinc-100">{album.releaseYear}</span>
                </p>
                <p className="text-zinc-300">
                  Amenaza DEMA:{" "}
                  <span className="font-mono text-zinc-100">
                    {album.demaThreatLevel}/10
                  </span>
                </p>
                <p className="text-zinc-300">
                  Color:{" "}
                  <span className="font-mono" style={{ color: album.coverColor }}>
                    {album.coverColor}
                  </span>
                </p>
              </div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedAlbumId === album.id ? "auto" : 0,
                opacity: expandedAlbumId === album.id ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <article className="rounded-md border border-zinc-700/70 bg-black/60 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                      Resumen ES
                    </p>
                    <p className="mt-3 text-sm text-zinc-200">{album.summary.es}</p>
                  </article>

                  <article className="rounded-md border border-zinc-700/70 bg-black/60 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-fire">
                      Summary EN
                    </p>
                    <p className="mt-3 text-sm text-zinc-300">{album.summary.en}</p>
                  </article>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                  <article className="rounded-md border border-zinc-700/70 bg-black/60 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                      Key Moments
                    </p>
                    <div className="mt-3 space-y-3">
                      {album.keyMoments.map((moment) => (
                        <div
                          key={`${album.id}-${moment.es}`}
                          className="rounded-md border border-white/10 bg-black/40 p-3"
                        >
                          <p className="text-sm text-zinc-100">{moment.es}</p>
                          <p className="mt-2 text-sm text-zinc-400">{moment.en}</p>
                        </div>
                      ))}
                    </div>
                  </article>

                  <div className="space-y-4">
                    <article className="rounded-md border border-zinc-700/70 bg-black/60 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-fire">
                        Linked Entities
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {album.linkedEntities.map((entity) => (
                          <span
                            key={`${album.id}-${entity}`}
                            className="rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-300"
                          >
                            {entity}
                          </span>
                        ))}
                      </div>
                    </article>

                    <article className="rounded-md border border-zinc-700/70 bg-black/60 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                        Lore Signals
                      </p>
                      <div className="mt-3 space-y-3">
                        {album.loreSignals.map((signal) => (
                          <div
                            key={`${album.id}-${signal.es}`}
                            className="rounded-md border border-white/10 bg-black/40 p-3"
                          >
                            <p className="text-sm text-zinc-200">{signal.es}</p>
                            <p className="mt-2 text-sm text-zinc-400">{signal.en}</p>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>

                <div className="rounded-md border border-zinc-700/70 bg-black/60 p-3">
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                    Spotify Relay
                  </p>
                  <div
                    className={`rounded-md border border-zinc-700/70 bg-black p-1 transition ${
                      expandedAlbumId === album.id
                        ? "opacity-100 saturate-100"
                        : "opacity-60 saturate-50"
                    }`}
                  >
                    <iframe
                      title={`Spotify player for ${album.title}`}
                      src={`https://open.spotify.com/embed/album/${album.spotifyEmbedId}?utm_source=generator`}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full rounded-md"
                      style={{ filter: "brightness(0.92) contrast(0.95)" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
