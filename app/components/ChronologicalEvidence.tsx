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
        <p className="mt-3 text-sm text-gray-300">
          Registro cronologico de expedientes musicales clasificados.
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
                <h3 className="font-mono text-lg text-zinc-100">{album.title}</h3>
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
              <div className="mt-4 rounded-md border border-zinc-700/70 bg-black/60 p-3">
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
            </motion.div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
