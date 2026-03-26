import { createDashboardOgImage } from "@/src/lib/opengraph-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function SmugglerOpenGraphImage() {
  return createDashboardOgImage({
    eyebrow: "Smuggler",
    title: "Tienda de Contrabando",
    description:
      "Vista de economia interna con creditos, desbloqueo de temas y activacion de modos visuales dentro del dashboard.",
    accent: "#ff2e2e",
    tags: ["Smuggler", "Wallet", "Themes"],
  });
}
