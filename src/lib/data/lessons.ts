export interface LyricChallenge {
  id: string;
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
    song: "Chlorine",
    englishSnippet: "Sippin' on straight ______",
    missingWord: "chlorine",
    spanishTranslation: "Bebiendo cloro puro.",
    options: ["chlorine", "sunlight", "medicine", "gravity"],
    hint: "Es la palabra central y titulo de la cancion.",
  },
  {
    id: "overcompensate-01",
    song: "Overcompensate",
    englishSnippet: "I fly by the dangerous ____",
    missingWord: "bend symbol",
    spanishTranslation: "Vuelo junto al simbolo de curva peligrosa.",
    options: ["bend symbol", "night vision", "warning light", "front line"],
    hint: "Hace referencia a una senal de carretera.",
  },
];
