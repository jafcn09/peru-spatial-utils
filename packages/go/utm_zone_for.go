package perspatial

import "math"

func UtmZoneFor(lng float64) int {
	for _, z := range utmCfg.Zones {
		if lng >= z.LngMin && lng < z.LngMax {
			return z.Zone
		}
	}
	return int(math.Floor((lng+180)/6)) + 1
}
