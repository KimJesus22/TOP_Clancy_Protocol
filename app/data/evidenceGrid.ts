export type EvidenceBadge = "Seguro" | "Clasificado" | "Vulnerable";

export type RecoveredEvidence = {
  id: string;
  title: string;
  type: "Album" | "Analisis Web";
  yearOrRef: string;
  badge: EvidenceBadge;
  shortDescription: string;
  details: {
    section: string;
    items: string[];
  }[];
};

export const RECOVERED_EVIDENCE: RecoveredEvidence[] = [
  {
    id: "blurryface",
    title: "Blurryface",
    type: "Album",
    yearOrRef: "2015",
    badge: "Clasificado",
    shortDescription: "Registro narrativo de identidad y conflicto interno.",
    details: [
      {
        section: "Estado del expediente",
        items: [
          "Archivo musical recuperado y etiquetado como nodo clave del lore.",
          "Nivel de acceso limitado a personal autorizado.",
        ],
      },
      {
        section: "Notas forenses",
        items: [
          "Patrones liricos con alta recurrencia de tematicas de dualidad.",
          "Metadatos coherentes con cronologia oficial de lanzamientos.",
        ],
      },
    ],
  },
  {
    id: "trench",
    title: "Trench",
    type: "Album",
    yearOrRef: "2018",
    badge: "Seguro",
    shortDescription: "Cartografia central del universo DEMA y Banditos.",
    details: [
      {
        section: "Estado del expediente",
        items: [
          "Integridad de archivo verificada.",
          "Indice tematico completo y versionado estable.",
        ],
      },
      {
        section: "Notas forenses",
        items: [
          "Referencias directas a entidades y ubicaciones del lore.",
          "Correlacion alta con arte visual y narrativa extendida.",
        ],
      },
    ],
  },
  {
    id: "evidence-a-web",
    title: "Evidence A: Tecnologia Web",
    type: "Analisis Web",
    yearOrRef: "Ref A-01",
    badge: "Vulnerable",
    shortDescription: "Stack detectado: Drupal + AWS.",
    details: [
      {
        section: "Hallazgos tecnicos",
        items: [
          "CMS identificado: Drupal.",
          "Infraestructura principal alojada en AWS.",
        ],
      },
      {
        section: "Riesgo",
        items: [
          "Superficie de ataque dependiente de modulos y parches.",
          "Recomendado: auditoria continua y hardening de endpoints.",
        ],
      },
    ],
  },
  {
    id: "evidence-b-ssl",
    title: "Evidence B: SSL",
    type: "Analisis Web",
    yearOrRef: "Ref B-02",
    badge: "Seguro",
    shortDescription: "Canal HTTPS y certificados SSL validos.",
    details: [
      {
        section: "Hallazgos tecnicos",
        items: [
          "Certificados SSL validos y cadena de confianza consistente.",
          "Cifrado de trafico en transito activo.",
        ],
      },
      {
        section: "Riesgo",
        items: [
          "Baja exposicion a interceptacion pasiva.",
          "Mantener renovacion y monitoreo de certificados.",
        ],
      },
    ],
  },
];
