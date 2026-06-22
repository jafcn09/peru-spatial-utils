package perspatial

import (
	"strconv"
	"strings"
)

func GenerateTerritorialSummary(intersections []Intersection) string {
	if len(intersections) == 0 {
		return "El territorio no presenta superposiciones con las capas evaluadas."
	}
	dominant := "BAJO"
	entities := make([]string, 0, len(intersections))
	for _, in := range intersections {
		if RiskLevelToScore(in.Level) > RiskLevelToScore(dominant) {
			dominant = in.Level
		}
		entities = append(entities, in.Entity)
	}
	n := strconv.Itoa(len(intersections))
	return "El territorio presenta superposicion de nivel " + dominant +
		" con " + n + " entidad(es): " + strings.Join(entities, ", ") + "."
}
