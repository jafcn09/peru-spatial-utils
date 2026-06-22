package perspatial

func GenerateRecommendations(entities []string) []string {
	seen := make(map[string]struct{}, len(entities))
	out := make([]string, 0, len(entities))
	for _, e := range entities {
		if _, ok := seen[e]; ok {
			continue
		}
		seen[e] = struct{}{}
		out = append(out, RecommendationFor(e))
	}
	return out
}
