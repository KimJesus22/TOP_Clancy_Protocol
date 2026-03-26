import { createDashboardOgImage } from "@/src/lib/opengraph-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function LoginOpenGraphImage() {
  return createDashboardOgImage({
    eyebrow: "Acceso",
    title: "Login Bandito",
    description:
      "Acceso con magic link a zonas autenticadas del proyecto, con flujo de entrada alineado al universo DEMA.",
    accent: "#ff2e2e",
    tags: ["Login", "Magic Link", "Acceso"],
  });
}
