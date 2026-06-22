import { recommendationsData } from "./data";

export function recommendationFor(entity: string): string {
  const known = recommendationsData.entities[entity];
  if (known !== undefined) {
    return known;
  }
  return recommendationsData.fallback.replace("{entity}", entity);
}
