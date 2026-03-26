import { createDashboardOgImage } from "@/src/lib/opengraph-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function LearnOpenGraphImage() {
  return createDashboardOgImage({
    eyebrow: "Analisis",
    title: "Bandito Learning Hub",
    description:
      "Ruta educativa con modulos de linguistica, progreso de misiones y practica guiada para usuarios no tecnicos.",
    accent: "#fce300",
    tags: ["Analisis", "Aprendizaje", "Progreso"],
  });
}
