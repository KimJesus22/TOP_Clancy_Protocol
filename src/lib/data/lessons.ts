export interface LyricChallenge {
  id: string;
  language: "English" | "Korean" | "Japanese";
  song: string;
  englishSnippet: string;
  missingWord: string;
  spanishTranslation: string;
  options: string[];
  hint: string;
}

export const topLessons: LyricChallenge[] = [
  {
    id: "stressed-out-01",
    language: "English",
    song: "Stressed Out",
    englishSnippet: "Wish we could turn back time, to the good old ____",
    missingWord: "days",
    spanishTranslation:
      "Deseariamos poder retroceder el tiempo, a los buenos viejos tiempos.",
    options: ["days", "friends", "songs", "years"],
    hint: "La palabra completa la expresion 'good old ____'.",
  },
  {
    id: "chlorine-01",
    language: "English",
    song: "Chlorine",
    englishSnippet: "Sippin' on straight ______",
    missingWord: "chlorine",
    spanishTranslation: "Bebiendo cloro puro.",
    options: ["chlorine", "sunlight", "medicine", "gravity"],
    hint: "Es la palabra central y titulo de la cancion.",
  },
  {
    id: "overcompensate-01",
    language: "English",
    song: "Overcompensate",
    englishSnippet: "I fly by the dangerous ____",
    missingWord: "bend symbol",
    spanishTranslation: "Vuelo junto al simbolo de curva peligrosa.",
    options: ["bend symbol", "night vision", "warning light", "front line"],
    hint: "Hace referencia a una senal de carretera.",
  },
  {
    id: "oriente-korean-01",
    language: "Korean",
    song: "Intercepted Seoul Signal",
    englishSnippet: "안녕, 나의 ____",
    missingWord: "친구",
    spanishTranslation: "Hola, mi amigo.",
    options: ["친구", "미래", "감사", "노래"],
    hint: "Significa 'amigo' en coreano.",
  },
  {
    id: "oriente-japanese-01",
    language: "Japanese",
    song: "Tokyo Resistance Broadcast",
    englishSnippet: "未来へ、____",
    missingWord: "ありがとう",
    spanishTranslation: "Hacia el futuro, gracias.",
    options: ["ありがとう", "こんにちは", "ともだち", "さよなら"],
    hint: "Expresion japonesa comun para decir 'gracias'.",
  },
];
