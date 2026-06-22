package perspatial

import "strings"

func RecommendationFor(entity string) string {
	if rec, ok := recommendations.Entities[entity]; ok {
		return rec
	}
	return strings.ReplaceAll(recommendations.Fallback, "{entity}", entity)
}
