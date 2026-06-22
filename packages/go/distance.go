package perspatial

import "math"

func Distance(a, b [2]float64) float64 {
	const r = 6371.0088
	lng1, lat1 := a[0], a[1]
	lng2, lat2 := b[0], b[1]

	phi1 := lat1 * math.Pi / 180
	phi2 := lat2 * math.Pi / 180
	dPhi := (lat2 - lat1) * math.Pi / 180
	dLambda := (lng2 - lng1) * math.Pi / 180

	h := math.Sin(dPhi/2)*math.Sin(dPhi/2) +
		math.Cos(phi1)*math.Cos(phi2)*math.Sin(dLambda/2)*math.Sin(dLambda/2)
	return 2 * r * math.Asin(math.Sqrt(h))
}
