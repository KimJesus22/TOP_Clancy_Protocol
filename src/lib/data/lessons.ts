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
  {
    id: "city-walls-01",
    language: "English",
    song: "City Walls",
    englishSnippet: "Beyond the city ____",
    missingWord: "walls",
    spanishTranslation: "Mas alla de los muros de la ciudad.",
    options: ["walls", "lights", "sirens", "bridges"],
    hint: "Completa el titulo de la transmision Breach.",
  },
  {
    id: "rawfear-01",
    language: "English",
    song: "RAWFEAR",
    englishSnippet: "Name the raw ____ before it names you",
    missingWord: "fear",
    spanishTranslation: "Nombra el miedo crudo antes de que el te nombre.",
    options: ["fear", "fire", "signal", "voice"],
    hint: "La palabra esta escondida en el titulo de la cancion.",
  },
  {
    id: "drum-show-01",
    language: "English",
    song: "Drum Show",
    englishSnippet: "Follow the ____ through the static",
    missingWord: "drum",
    spanishTranslation: "Sigue el tambor a traves de la estatica.",
    options: ["drum", "map", "door", "echo"],
    hint: "Instrumento central de la senal.",
  },
  {
    id: "contract-01",
    language: "English",
    song: "The Contract",
    englishSnippet: "Read the ____ before you sign",
    missingWord: "contract",
    spanishTranslation: "Lee el contrato antes de firmar.",
    options: ["contract", "signal", "letter", "warning"],
    hint: "Palabra central del titulo.",
  },
  {
    id: "intentions-01",
    language: "English",
    song: "Intentions",
    englishSnippet: "Declare your ____ before the breach",
    missingWord: "intentions",
    spanishTranslation: "Declara tus intenciones antes de la brecha.",
    options: ["intentions", "routes", "colors", "voices"],
    hint: "Tambien es el titulo de una pista de Breach.",
  },
];
