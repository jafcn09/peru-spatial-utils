package perspatial

import "strings"

func ClassifyHazard(text string) string {
	lower := strings.ToLower(text)
	for _, rule := range hazards.Rules {
		for _, kw := range rule.Keywords {
			if strings.Contains(lower, kw) {
				return rule.Type
			}
		}
	}
	return hazards.Default
}
