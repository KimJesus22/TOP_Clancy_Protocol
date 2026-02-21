"use client";

import { useMemo, useState } from "react";
import type { LyricChallenge } from "@/src/lib/data/lessons";
import LanguageSelector from "./LanguageSelector";
import LyricQuizEngine from "./LyricQuizEngine";

type LearnLessonHubProps = {
  lessons: LyricChallenge[];
};

export default function LearnLessonHub({ lessons }: LearnLessonHubProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<
    LyricChallenge["language"] | "All"
  >("All");

  const filteredLessons = useMemo(() => {
    if (selectedLanguage === "All") return lessons;
    return lessons.filter((lesson) => lesson.language === selectedLanguage);
  }, [lessons, selectedLanguage]);

  return (
    <section className="mt-8 space-y-4">
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
      {filteredLessons.length > 0 ? (
        <LyricQuizEngine lessons={filteredLessons} />
      ) : (
        <section className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
          <p className="font-mono text-sm text-gray-300">
            No hay transmisiones disponibles para el idioma seleccionado.
          </p>
        </section>
      )}
    </section>
  );
}
