import { RECOVERED_EVIDENCE, type RecoveredEvidence } from "@/app/data/evidenceGrid";

export function getAllEvidence(): RecoveredEvidence[] {
  return RECOVERED_EVIDENCE;
}

export function getEvidenceBySlug(slug: string): RecoveredEvidence | undefined {
  return RECOVERED_EVIDENCE.find((evidence) => evidence.id === slug);
}

export function getEvidenceSlugs(): string[] {
  return RECOVERED_EVIDENCE.map((evidence) => evidence.id);
}
