package perspatial

func HazardForCategory(category string) string {
	if h, ok := hazards.CategoryFallback[category]; ok {
		return h
	}
	return hazards.Default
}
