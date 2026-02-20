export type EvidenceStatus = "Vulnerable" | "Secure";

export type EvidenceRecord = {
  id: string;
  title: string;
  classification: string;
  status: EvidenceStatus;
  summary: string;
  technicalDetails: string[];
  riskAssessment: string;
};

export const DIGITAL_EVIDENCE_LOCKER: EvidenceRecord[] = [
  {
    id: "evidence-a",
    title: "Evidence A",
    classification: "Expediente Legal A-01",
    status: "Vulnerable",
    summary: "Tecnologia usada: Drupal + AWS",
    technicalDetails: [
      "CMS identificado: Drupal (surface area amplia por modulos de terceros).",
      "Infraestructura detectada: AWS con endpoints publicos expuestos al trafico web.",
      "Riesgo forense: dependencia de hardening y control de actualizaciones.",
    ],
    riskAssessment:
      "Estado Vulnerable: se recomienda auditoria de modulos, parches y politicas WAF.",
  },
  {
    id: "evidence-b",
    title: "Evidence B",
    classification: "Expediente Legal B-02",
    status: "Secure",
    summary: "Certificados SSL",
    technicalDetails: [
      "Canal HTTPS activo con cifrado TLS para trafico en transito.",
      "Certificado SSL valido y cadena de confianza verificable.",
      "Riesgo forense: bajo para interceptacion pasiva en capa de transporte.",
    ],
    riskAssessment:
      "Estado Secure: el canal cifrado cumple la base de proteccion en transito.",
  },
];
