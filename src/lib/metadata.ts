import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://top-clancy-protocol.vercel.app";

export const metadataBaseUrl = new URL(siteUrl);

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  keywords?: string[];
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description,
  path,
  imagePath,
  keywords = [],
  robots,
}: MetadataInput): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedImagePath = imagePath ?? `${normalizedPath === "/" ? "" : normalizedPath}/opengraph-image`;
  const canonicalUrl = new URL(normalizedPath, metadataBaseUrl);
  const imageUrl = new URL(normalizedImagePath, metadataBaseUrl);

  return {
    title,
    description,
    keywords,
    robots,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "es_MX",
      url: canonicalUrl,
      title,
      description,
      siteName: "Clancy Protocol",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Vista previa de ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
