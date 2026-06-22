import recommendations from "../../data/territorial/recommendations.json";
import hazards from "../../data/territorial/hazard-keywords.json";

interface RecommendationsData {
  entities: Record<string, string>;
  fallback: string;
}

interface HazardRule {
  type: string;
  keywords: string[];
}

interface HazardData {
  rules: HazardRule[];
  categoryFallback: Record<string, string>;
  default: string;
}

export const recommendationsData = recommendations as RecommendationsData;
export const hazardData = hazards as HazardData;
