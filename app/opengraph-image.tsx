import { createDashboardOgImage } from "@/src/lib/opengraph-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return createDashboardOgImage({
    eyebrow: "Inicio",
    title: "Clancy Dashboard",
    description:
      "Panel narrativo con briefing de la era Clancy, expedientes cronologicos, analisis de red y consola interactiva.",
    accent: "#ff2e2e",
    tags: ["Inicio", "Expedientes", "Analisis"],
  });
}
