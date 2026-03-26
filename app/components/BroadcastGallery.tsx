"use client";

import { motion } from "framer-motion";

type Broadcast = {
  id: string;
  title: string;
  youtubeId: string;
};

const broadcasts: Broadcast[] = [
  { id: "overcompensate", title: "Overcompensate", youtubeId: "53tgVlXBZVg" },
  { id: "nico-niners", title: "Nico and the Niners", youtubeId: "hMAPyGoqQVw" },
  { id: "jumpsuit", title: "Jumpsuit", youtubeId: "UOUBW8bkjQ4" },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function BroadcastGallery() {
  return (
    <motion.div
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {broadcasts.map((broadcast) => (
        <motion.article
          key={broadcast.id}
          variants={cardVariants}
          className="group relative overflow-hidden rounded-xl border border-clancy-line/85 bg-gradient-to-b from-clancy-raised/94 to-clancy-surface/92 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_28px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-clancy-fire hover:shadow-[0_0_20px_rgba(255,46,46,0.2),0_18px_36px_rgba(0,0,0,0.28)]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/6" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_34%)] opacity-80" />
          <h3 className="mb-3 font-mono text-lg text-clancy-ink">{broadcast.title}</h3>
          <div className="overflow-hidden rounded-lg border border-clancy-line/80 shadow-[0_10px_22px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:border-clancy-fire/70 group-focus-within:border-clancy-trench group-focus-within:shadow-[0_0_0_1px_rgba(252,227,0,0.35),0_10px_22px_rgba(0,0,0,0.25)]">
            <iframe
              title={`Reproductor de YouTube del video oficial ${broadcast.title} de Twenty One Pilots`}
              src={`https://www.youtube.com/embed/${broadcast.youtubeId}?rel=0&modestbranding=1&controls=1&iv_load_policy=3&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-[260px] w-full border-0"
            />
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
