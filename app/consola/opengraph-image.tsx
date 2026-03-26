import { createDashboardOgImage } from "@/src/lib/opengraph-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function ConsoleOpenGraphImage() {
  return createDashboardOgImage({
    eyebrow: "Consola",
    title: "Public Console Demo",
    description:
      "Demo publica orientada a portafolio con terminal interactiva, comandos ficticios y flujo accesible sin registro.",
    accent: "#fce300",
    tags: ["Consola", "Demo", "Portafolio"],
  });
}
