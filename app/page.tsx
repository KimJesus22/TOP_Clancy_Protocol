import type { Metadata } from "next";
import SecureDashboard from "./components/SecureDashboard";
import { buildPageMetadata } from "@/src/lib/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Inicio",
  description:
    "Centro de mando principal con briefing de la era Clancy, expedientes cronologicos, analisis de red y consola demo.",
  path: "/",
  keywords: [
    "inicio",
    "dashboard Clancy",
    "expedientes",
    "analisis de red",
    "lore Twenty One Pilots",
  ],
});

export default function Home() {
  return <SecureDashboard />;
}
