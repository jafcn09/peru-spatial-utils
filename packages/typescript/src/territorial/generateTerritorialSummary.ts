import type { Intersection, RiskLevel } from "../types";

const ORDER: RiskLevel[] = ["ALTO", "MEDIO", "BAJO"];

export function generateTerritorialSummary(
  intersections: Intersection[]
): string {
  if (intersections.length === 0) {
    return "El territorio no presenta superposiciones con las capas evaluadas.";
  }

  const present = new Set(intersections.map((item) => item.level));
  const dominant = ORDER.find((level) => present.has(level)) ?? "BAJO";

  const entities = intersections
    .map((item) => item.entity ?? "")
    .join(", ");

  return `El territorio presenta superposicion de nivel ${dominant} con ${intersections.length} entidad(es): ${entities}.`;
}
