import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/metadata";
import SmugglerStorefront from "@/app/smuggler/SmugglerStorefront";

export const metadata: Metadata = buildPageMetadata({
  title: "Tienda de Contrabando",
  description:
    "Vista de economia del dashboard para desbloquear temas visuales y gestionar creditos dentro de la experiencia.",
  path: "/smuggler",
  keywords: ["smuggler", "wallet", "themes", "dashboard economy"],
});

export default function SmugglerPage() {
  return <SmugglerStorefront />;
}
