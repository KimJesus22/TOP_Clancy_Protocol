import { type RecoveredEvidence } from "@/app/data/evidenceGrid";
import { metadataBaseUrl } from "@/src/lib/metadata";

export function jsonLdScriptProps(schema: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
    },
  };
}

function absoluteUrl(path: string) {
  return new URL(path, metadataBaseUrl).toString();
}

export function buildHomeStructuredData() {
  const pageUrl = absoluteUrl("/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Clancy Protocol",
      url: pageUrl,
      inLanguage: "es-MX",
      description:
        "Dashboard narrativo con lore de Clancy, expedientes, analisis de red y consola interactiva.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Inicio",
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "Clancy Protocol",
        url: pageUrl,
      },
      description:
        "Centro de mando principal con briefing de la era Clancy, expedientes cronologicos, analisis de red y consola demo.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Que es Clancy Protocol?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Es un dashboard narrativo inspirado en Twenty One Pilots que combina lore de Clancy, expedientes indexables, analisis de red y una consola demo accesible.",
          },
        },
        {
          "@type": "Question",
          name: "Que incluye la seccion de expedientes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Incluye albumes, personajes, organizaciones, documentos y analisis web con rutas limpias como /expedientes/blurryface o /expedientes/dema.",
          },
        },
        {
          "@type": "Question",
          name: "La consola requiere registro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Existe una demo publica en /consola pensada para portafolio, mientras que /login y /classified representan el flujo autenticado.",
          },
        },
      ],
    },
  ];
}

export function buildEvidenceIndexStructuredData(evidenceRecords: RecoveredEvidence[]) {
  const pageUrl = absoluteUrl("/expedientes");

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Expedientes",
      url: pageUrl,
      description:
        "Indice de expedientes del dashboard con rutas limpias y fichas semanticas para albumes, personajes, documentos y analisis.",
      isPartOf: {
        "@type": "WebSite",
        name: "Clancy Protocol",
        url: absoluteUrl("/"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Archivo de expedientes",
      url: pageUrl,
      numberOfItems: evidenceRecords.length,
      itemListElement: evidenceRecords.map((evidence, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/expedientes/${evidence.id}`),
        name: evidence.title,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Como se organizan los expedientes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cada expediente se publica con un slug descriptivo y estable, por ejemplo /expedientes/trench o /expedientes/red-envelope.",
          },
        },
        {
          "@type": "Question",
          name: "Que tipos de entidades aparecen en el archivo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El archivo incluye albumes, eras, personajes, ciudades, documentos, organizaciones y registros de analisis web.",
          },
        },
      ],
    },
  ];
}

export function buildEvidenceDetailStructuredData(evidence: RecoveredEvidence) {
  const detailUrl = absoluteUrl(`/expedientes/${evidence.id}`);
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Expedientes",
      item: absoluteUrl("/expedientes"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: evidence.title,
      item: detailUrl,
    },
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: evidence.title,
      name: evidence.title,
      url: detailUrl,
      description: evidence.shortDescription,
      articleSection: evidence.type,
      inLanguage: "es-MX",
      isPartOf: {
        "@type": "CollectionPage",
        name: "Expedientes",
        url: absoluteUrl("/expedientes"),
      },
      about: evidence.details.flatMap((detail) => detail.items).slice(0, 8),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Que tipo de entidad es ${evidence.title}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${evidence.title} se clasifica como ${evidence.type.toLowerCase()} dentro del archivo de Clancy Protocol.`,
          },
        },
        {
          "@type": "Question",
          name: `Que resume el expediente ${evidence.title}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: evidence.shortDescription,
          },
        },
      ],
    },
  ];
}
