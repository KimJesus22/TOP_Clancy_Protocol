"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { LyricChallenge } from "@/src/lib/data/lessons";
import { useTrenchWalletStore } from "@/src/store/trenchWalletStore";

type LyricQuizEngineProps = {
  lessons: LyricChallenge[];
};

export default function LyricQuizEngine({ lessons }: LyricQuizEngineProps) {
  const addCredits = useTrenchWalletStore((state) => state.addCredits);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lastWrongOption, setLastWrongOption] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const currentLesson = lessons[currentIndex];
  const progressLabel = `${currentIndex + 1}/${lessons.length}`;

  const visibleSnippet = useMemo(() => {
    if (!currentLesson) return "";
    return currentLesson.englishSnippet.replace("____", "[ _______ ]");
  }, [currentLesson]);

  if (!currentLesson) {
    return (
      <section className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
        <p className="font-mono text-sm text-gray-300">
          No hay ejercicios disponibles.
        </p>
      </section>
    );
  }

  const onPickOption = (option: string) => {
    if (solved) return;

    setSelectedOption(option);

    if (option === currentLesson.missingWord) {
      addCredits(10);
      setSolved(true);
      setLastWrongOption(null);
      return;
    }

    setLastWrongOption(option);
    setTimeout(() => setLastWrongOption(null), 420);
  };

  const onNext = () => {
    if (currentIndex >= lessons.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
    setSelectedOption(null);
    setLastWrongOption(null);
    setSolved(false);
  };

  return (
    <section className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clancy-trench">
          Lyric Quiz Engine
        </p>
        <p className="font-mono text-xs text-gray-300">{progressLabel}</p>
      </div>

      <h3 className="mt-2 font-mono text-2xl text-white">{currentLesson.song}</h3>
      <p className="mt-4 rounded-md border border-white/10 bg-black/35 p-4 font-mono text-base text-gray-200">
        {visibleSnippet}
      </p>
      <p className="mt-2 text-xs text-gray-300">Pista: {currentLesson.hint}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {currentLesson.options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrectChoice = option === currentLesson.missingWord;
          const shouldPaintGreen = solved && isCorrectChoice;
          const shouldPaintRed = isSelected && !isCorrectChoice;
          const shouldShake = lastWrongOption === option;

          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => onPickOption(option)}
              animate={
                shouldShake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }
              }
              transition={{ duration: 0.28 }}
              className={`rounded-md border px-4 py-3 text-left font-mono text-sm transition-all duration-300 ${
                shouldPaintGreen
                  ? "border-green-400 bg-green-500/15 text-green-300"
                  : shouldPaintRed
                    ? "border-red-400 bg-red-500/15 text-red-300"
                    : "border-white/10 bg-black/30 text-gray-200 hover:border-clancy-trench hover:text-white"
              }`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {solved ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-5 rounded-md border border-clancy-trench/60 bg-clancy-trench/10 p-4"
          >
            <p className="font-mono text-sm text-clancy-trench">
              Transmision descifrada correctamente.
            </p>
            <p className="mt-2 text-sm text-gray-200">
              {currentLesson.spanishTranslation}
            </p>
            <button
              type="button"
              onClick={onNext}
              className="mt-4 rounded-md border border-white/10 bg-black/30 px-4 py-2 font-mono text-sm text-gray-200 transition-all duration-300 hover:border-clancy-fire hover:text-white hover:shadow-[0_0_12px_rgba(255,46,46,0.22)]"
            >
              Siguiente Transmision
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
