import type { Intersection, RiskLevel, TerritorialRisk } from "../types";

const WEIGHTS: Record<RiskLevel, number> = {
  BAJO: 10,
  MEDIO: 20,
  ALTO: 34,
};

export function calculateTerritorialRisk(
  intersections: Intersection[]
): TerritorialRisk {
  const sum = intersections.reduce(
    (acc, item) => acc + (WEIGHTS[item.level as RiskLevel] ?? 0),
    0
  );
  const score = Math.min(100, sum);

  let risk: RiskLevel;
  if (score >= 67) {
    risk = "ALTO";
  } else if (score >= 34) {
    risk = "MEDIO";
  } else {
    risk = "BAJO";
  }

  return { risk, score };
}
