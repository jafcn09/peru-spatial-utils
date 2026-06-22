import { hazardData } from "./data";

export function classifyHazard(text: string): string {
  const lower = text.toLowerCase();
  for (const rule of hazardData.rules) {
    if (rule.keywords.some((keyword) => lower.includes(keyword))) {
      return rule.type;
    }
  }
  return hazardData.default;
}
