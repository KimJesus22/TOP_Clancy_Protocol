import type { Metadata } from "next";
import SecureDashboard from "@/app/components/SecureDashboard";
import { buildPageMetadata } from "@/src/lib/metadata";
import { buildHomeStructuredData, jsonLdScriptProps } from "@/src/lib/structured-data";

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
  const structuredData = buildHomeStructuredData();

  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={`home-structured-data-${index}`}
          id={`structured-data-home-${index}`}
          {...jsonLdScriptProps(schema)}
        />
      ))}
      <SecureDashboard />
    </>
  );
}
