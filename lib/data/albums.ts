import topAlbumsData from "@/public/data/albums.json";

export type BilingualCopy = {
  es: string;
  en: string;
};

export interface AlbumRecord {
  id: string;
  title: string;
  releaseYear: number;
  status: "Classified" | "Public" | "Corrupted";
  demaThreatLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  coverColor: `#${string}`;
  spotifyEmbedId: string;
  sourceCoverage: "Detailed" | "Contextual";
  summary: BilingualCopy;
  keyMoments: BilingualCopy[];
  loreSignals: BilingualCopy[];
  linkedEntities: string[];
}

export const topAlbums = topAlbumsData as AlbumRecord[];

export const topAlbumsJsonPath = "/data/albums.json";
