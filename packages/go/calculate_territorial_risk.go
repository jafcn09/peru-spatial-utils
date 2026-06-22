package perspatial

func CalculateTerritorialRisk(intersections []Intersection) RiskResult {
	if len(intersections) == 0 {
		return RiskResult{Risk: "BAJO", Score: 0}
	}
	sum := 0
	for _, in := range intersections {
		sum += levelWeight(in.Level)
	}
	if sum > 100 {
		sum = 100
	}
	risk := "BAJO"
	switch {
	case sum >= 67:
		risk = "ALTO"
	case sum >= 34:
		risk = "MEDIO"
	}
	return RiskResult{Risk: risk, Score: sum}
}

func levelWeight(level string) int {
	switch level {
	case "BAJO":
		return 10
	case "MEDIO":
		return 20
	case "ALTO":
		return 34
	default:
		return 0
	}
}
