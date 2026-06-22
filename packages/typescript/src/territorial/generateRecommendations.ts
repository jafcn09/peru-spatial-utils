import { recommendationFor } from "./recommendationFor";

export function generateRecommendations(entities: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const entity of entities) {
    if (seen.has(entity)) {
      continue;
    }
    seen.add(entity);
    result.push(recommendationFor(entity));
  }
  return result;
}
