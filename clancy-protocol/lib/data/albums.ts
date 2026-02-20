export interface AlbumRecord {
  id: string;
  title: string;
  releaseYear: number;
  status: "Classified" | "Public" | "Corrupted";
  demaThreatLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  coverColor: `#${string}`;
  spotifyEmbedId: string;
}

export const topAlbums: AlbumRecord[] = [
  {
    id: "self-titled-2009",
    title: "Twenty One Pilots (Self-Titled)",
    releaseYear: 2009,
    status: "Public",
    demaThreatLevel: 4,
    coverColor: "#8B0000",
    spotifyEmbedId: "PLACEHOLDER_SELF_TITLED_ID",
  },
  {
    id: "regional-at-best-2011",
    title: "Regional at Best",
    releaseYear: 2011,
    status: "Corrupted",
    demaThreatLevel: 8,
    coverColor: "#5F9EA0",
    spotifyEmbedId: "PLACEHOLDER_REGIONAL_AT_BEST_ID",
  },
  {
    id: "vessel-2013",
    title: "Vessel",
    releaseYear: 2013,
    status: "Public",
    demaThreatLevel: 5,
    coverColor: "#F2D16B",
    spotifyEmbedId: "PLACEHOLDER_VESSEL_ID",
  },
  {
    id: "blurryface-2015",
    title: "Blurryface",
    releaseYear: 2015,
    status: "Classified",
    demaThreatLevel: 9,
    coverColor: "#FF2E2E",
    spotifyEmbedId: "PLACEHOLDER_BLURRYFACE_ID",
  },
  {
    id: "trench-2018",
    title: "Trench",
    releaseYear: 2018,
    status: "Classified",
    demaThreatLevel: 7,
    coverColor: "#FCE300",
    spotifyEmbedId: "PLACEHOLDER_TRENCH_ID",
  },
  {
    id: "scaled-and-icy-2021",
    title: "Scaled and Icy",
    releaseYear: 2021,
    status: "Public",
    demaThreatLevel: 3,
    coverColor: "#7DD3FC",
    spotifyEmbedId: "PLACEHOLDER_SCALED_AND_ICY_ID",
  },
  {
    id: "clancy-2024",
    title: "Clancy",
    releaseYear: 2024,
    status: "Classified",
    demaThreatLevel: 10,
    coverColor: "#FF6A00",
    spotifyEmbedId: "PLACEHOLDER_CLANCY_ID",
  },
];
