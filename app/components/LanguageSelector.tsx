"use client";

import type { LyricChallenge } from "@/src/lib/data/lessons";

type Language = LyricChallenge["language"];

type LanguageSelectorProps = {
  selectedLanguage: Language | "All";
  onSelectLanguage: (language: Language | "All") => void;
};

const languageOptions: Array<Language | "All"> = [
  "All",
  "English",
  "Korean",
  "Japanese",
];

export default function LanguageSelector({
  selectedLanguage,
  onSelectLanguage,
}: LanguageSelectorProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-clancy-trench">
        Language Selector
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {languageOptions.map((language) => {
          const isActive = selectedLanguage === language;
          return (
            <button
              key={language}
              type="button"
              onClick={() => onSelectLanguage(language)}
              className={`rounded-md border px-3 py-2 text-sm transition-all duration-300 ${
                isActive
                  ? "border-clancy-trench bg-clancy-trench/15 text-white shadow-[0_0_12px_rgba(252,227,0,0.2)]"
                  : "border-white/10 bg-black/30 text-gray-300 hover:border-clancy-fire hover:text-white hover:shadow-[0_0_12px_rgba(255,46,46,0.2)]"
              }`}
            >
              {language}
            </button>
          );
        })}
      </div>
    </div>
  );
}
