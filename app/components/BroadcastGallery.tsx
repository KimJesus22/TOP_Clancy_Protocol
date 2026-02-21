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
          className="group rounded-xl border border-zinc-500/50 bg-black/40 p-3 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-clancy-fire hover:shadow-[0_0_20px_rgba(255,46,46,0.28)]"
        >
          <h3 className="mb-3 font-mono text-lg text-white">{broadcast.title}</h3>
          <div className="overflow-hidden rounded-lg border border-zinc-700/70 transition-all duration-300 group-hover:border-clancy-fire/70">
            <iframe
              title={`${broadcast.title} official video`}
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
