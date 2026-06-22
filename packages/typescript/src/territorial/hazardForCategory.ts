import { hazardData } from "./data";

export function hazardForCategory(category: string): string {
  return hazardData.categoryFallback[category] ?? hazardData.default;
}
