import type { RiskLevel } from "../types";

export function riskLevelToScore(level: string): number {
  switch (level as RiskLevel) {
    case "BAJO":
      return 1;
    case "MEDIO":
      return 2;
    case "ALTO":
      return 3;
    default:
      return 0;
  }
}
