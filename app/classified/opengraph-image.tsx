import { createDashboardOgImage } from "@/src/lib/opengraph-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function ClassifiedOpenGraphImage() {
  return createDashboardOgImage({
    eyebrow: "Expedientes",
    title: "Intercepted Messages",
    description:
      "Zona clasificada con mensajes interceptados, registros protegidos y acceso autenticado a contenido restringido.",
    accent: "#22c55e",
    tags: ["Expedientes", "Clasificado", "Interceptos"],
  });
}
