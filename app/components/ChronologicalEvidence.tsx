"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import { topAlbums } from "@/lib/data/albums";

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

type SpotifyAlbumMetadata = {
  id: string;
  name: string;
  artists: string[];
  releaseDate: string;
  totalTracks: number;
  imageUrl: string | null;
  spotifyUrl: string | null;
};

type SpotifyAlbumsResponse = {
  albums?: Record<string, SpotifyAlbumMetadata>;
};

function isLikelySpotifyAlbumId(value: string) {
  return /^[A-Za-z0-9]{22}$/.test(value);
}

export default function ChronologicalEvidence() {
  const [expandedAlbumId, setExpandedAlbumId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const requestControllerRef = useRef<AbortController | null>(null);

  const spotifyAlbumIds = useMemo(
    () =>
      topAlbums
        .map((album) => album.spotifyEmbedId)
        .filter(isLikelySpotifyAlbumId),
    [],
  );

  const spotifyAlbumsUrl =
    spotifyAlbumIds.length > 0
      ? `/api/spotify/albums?ids=${encodeURIComponent(spotifyAlbumIds.join(","))}`
      : null;

  const spotifyAlbumsFetcher = useCallback(async (url: string) => {
    requestControllerRef.current?.abort();

    const controller = new AbortController();
    requestControllerRef.current = controller;

    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify metadata request failed with ${response.status}.`);
    }

    return (await response.json()) as SpotifyAlbumsResponse;
  }, []);

  useEffect(() => {
    return () => {
      requestControllerRef.current?.abort();
    };
  }, []);

  const { data: spotifyData, error: spotifyError } = useSWR(
    spotifyAlbumsUrl,
    spotifyAlbumsFetcher,
    {
      dedupingInterval: 60_000,
      keepPreviousData: true,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  const spotifyAlbums = spotifyData?.albums ?? {};

  return (
    <section className="scroll-mt-24 rounded-xl border border-clancy-line/80 bg-clancy-surface/88 p-6 shadow-[0_0_20px_rgba(255,46,46,0.14)] backdrop-blur-md">
      <header className="mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Chronological Evidence
        </p>
        <h2 className="mt-2 font-mono text-2xl tracking-[0.08em] text-clancy-ink">
          Timeline de Albumes
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-clancy-muted">
          Registro cronologico convertido desde el PDF en un dossier bilingue de
          eras, ciclos, personajes y puntos de ruptura contra DEMA.
        </p>
      </header>

      <motion.ol
        className="relative ml-3 space-y-6 border-l border-zinc-700/70 pl-6"
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {topAlbums.map((album) => {
          const spotifyAlbum = spotifyAlbums[album.spotifyEmbedId];
          const hasSpotifyMetadata = Boolean(spotifyAlbum);
          const shouldResolveSpotify = isLikelySpotifyAlbumId(album.spotifyEmbedId);
          const isExpanded = expandedAlbumId === album.id;
          const detailsPanelId = `${album.id}-details`;

          return (
            <motion.li
              key={album.id}
              variants={itemVariants}
              className="relative rounded-lg border border-clancy-line/80 bg-clancy-raised/72 p-4"
              style={{
                borderColor: `${album.coverColor}88`,
                boxShadow: `0 0 0px ${album.coverColor}00`,
              }}
            >
              <span
                className="absolute -left-[33px] top-5 h-4 w-4 rounded-full border-2 bg-clancy-canvas"
                style={{
                  borderColor: album.coverColor,
                  boxShadow: `0 0 12px ${album.coverColor}`,
                }}
              />

              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={detailsPanelId}
                onClick={() => setExpandedAlbumId((prev) => (prev === album.id ? null : album.id))}
                className="w-full text-left"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-mono text-lg text-clancy-ink">{album.title}</h3>
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
                    <span className="font-mono text-clancy-ink">{album.releaseYear}</span>
                  </p>
                  <p className="text-zinc-300">
                    Amenaza DEMA:{" "}
                      <span className="font-mono text-clancy-ink">
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
                id={detailsPanelId}
                role="region"
                aria-label={`Detalles del album ${album.title}`}
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                aria-hidden={!isExpanded}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  {hasSpotifyMetadata ? (
                    <article className="grid gap-4 rounded-md border border-clancy-line/80 bg-clancy-surface/82 p-4 md:grid-cols-[96px_1fr]">
                      {spotifyAlbum.imageUrl ? (
                        <Image
                          src={spotifyAlbum.imageUrl}
                          alt={`Portada del album ${spotifyAlbum.name} de ${spotifyAlbum.artists.join(", ")}`}
                          width={96}
                          height={96}
                          sizes="96px"
                          className="h-24 w-24 rounded-md border border-clancy-line/70 object-cover"
                        />
                      ) : null}
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                          Spotify Metadata
                        </p>
                          <h4 className="mt-2 font-mono text-base text-clancy-ink">
                          {spotifyAlbum.name}
                        </h4>
                        <p className="mt-1 text-sm text-clancy-muted">
                          {spotifyAlbum.artists.join(", ")}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
                          <span className="rounded-full border border-clancy-line/70 px-2 py-1">
                            Release: {spotifyAlbum.releaseDate}
                          </span>
                          <span className="rounded-full border border-clancy-line/70 px-2 py-1">
                            Tracks: {spotifyAlbum.totalTracks}
                          </span>
                          {spotifyAlbum.spotifyUrl ? (
                            <a
                              href={spotifyAlbum.spotifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-clancy-trench/40 px-2 py-1 text-clancy-trench transition hover:bg-clancy-trench/10"
                            >
                              Open in Spotify
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  ) : spotifyError && shouldResolveSpotify ? (
                    <article className="rounded-md border border-clancy-fire/30 bg-clancy-surface/82 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-fire">
                        Spotify Metadata
                      </p>
                      <p className="mt-2 text-sm text-clancy-muted">
                        No se pudo cargar metadata en tiempo real. El embed sigue
                        disponible.
                      </p>
                    </article>
                  ) : null}

                  <div className="grid gap-4 lg:grid-cols-2">
                    <article className="rounded-md border border-clancy-line/80 bg-clancy-surface/82 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                        Resumen ES
                      </p>
                      <p className="mt-3 text-sm text-clancy-ink">{album.summary.es}</p>
                    </article>

                    <article className="rounded-md border border-clancy-line/80 bg-clancy-surface/82 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-fire">
                        Summary EN
                      </p>
                      <p className="mt-3 text-sm text-clancy-muted">{album.summary.en}</p>
                    </article>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                    <article className="rounded-md border border-clancy-line/80 bg-clancy-surface/82 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                        Key Moments
                      </p>
                      <div className="mt-3 space-y-3">
                        {album.keyMoments.map((moment) => (
                          <div
                            key={`${album.id}-${moment.es}`}
                            className="rounded-md border border-clancy-line/70 bg-clancy-raised/70 p-3"
                          >
                            <p className="text-sm text-clancy-ink">{moment.es}</p>
                            <p className="mt-2 text-sm text-clancy-muted">{moment.en}</p>
                          </div>
                        ))}
                      </div>
                    </article>

                    <div className="space-y-4">
                      <article className="rounded-md border border-clancy-line/80 bg-clancy-surface/82 p-4">
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-fire">
                          Linked Entities
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {album.linkedEntities.map((entity) => (
                            <span
                              key={`${album.id}-${entity}`}
                                className="rounded-full border border-clancy-line/70 bg-clancy-raised/72 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-clancy-muted"
                            >
                              {entity}
                            </span>
                          ))}
                        </div>
                      </article>

                      <article className="rounded-md border border-clancy-line/80 bg-clancy-surface/82 p-4">
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                          Lore Signals
                        </p>
                        <div className="mt-3 space-y-3">
                          {album.loreSignals.map((signal) => (
                            <div
                              key={`${album.id}-${signal.es}`}
                                className="rounded-md border border-clancy-line/70 bg-clancy-raised/70 p-3"
                            >
                              <p className="text-sm text-clancy-ink">{signal.es}</p>
                              <p className="mt-2 text-sm text-clancy-muted">{signal.en}</p>
                            </div>
                          ))}
                        </div>
                      </article>
                    </div>
                  </div>

                  <div className="rounded-md border border-clancy-line/80 bg-clancy-surface/82 p-3">
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-clancy-trench">
                      Spotify Relay
                    </p>
                    {isExpanded ? (
                      <div className="rounded-md border border-clancy-line/75 bg-clancy-canvas p-1 opacity-100 saturate-100 transition">
                        <iframe
                          title={`Reproductor embebido de Spotify para el album ${album.title}`}
                          src={`https://open.spotify.com/embed/album/${album.spotifyEmbedId}?utm_source=generator`}
                          width="100%"
                          height="152"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="w-full rounded-md"
                          style={{ filter: "brightness(0.92) contrast(0.95)" }}
                        />
                      </div>
                    ) : (
                      <div className="rounded-md border border-dashed border-clancy-line/70 bg-clancy-canvas/70 px-4 py-6 text-sm text-clancy-muted">
                        El reproductor se carga solo al expandir este expediente para reducir trabajo inicial.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
