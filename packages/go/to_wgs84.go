package perspatial

import "math"

func ToWGS84(easting, northing float64, zone int) WGS84Result {
	central := float64(zone)*6 - 183
	for _, z := range utmCfg.Zones {
		if z.Zone == zone {
			central = z.CentralMeridian
			break
		}
	}

	e := utmCfg.Ellipsoid
	a := e.A
	f := e.F
	k0 := e.K0

	eccSq := f * (2 - f)
	ePrimeSq := eccSq / (1 - eccSq)

	x := easting - e.FalseEasting
	y := northing - e.FalseNorthingSouth

	M := y / k0
	mu := M / (a * (1 - eccSq/4 - 3*eccSq*eccSq/64 - 5*eccSq*eccSq*eccSq/256))

	e1 := (1 - math.Sqrt(1-eccSq)) / (1 + math.Sqrt(1-eccSq))

	phi1 := mu +
		(3*e1/2-27*e1*e1*e1/32)*math.Sin(2*mu) +
		(21*e1*e1/16-55*e1*e1*e1*e1/32)*math.Sin(4*mu) +
		(151*e1*e1*e1/96)*math.Sin(6*mu) +
		(1097*e1*e1*e1*e1/512)*math.Sin(8*mu)

	N1 := a / math.Sqrt(1-eccSq*math.Sin(phi1)*math.Sin(phi1))
	T1 := math.Tan(phi1) * math.Tan(phi1)
	C1 := ePrimeSq * math.Cos(phi1) * math.Cos(phi1)
	R1 := a * (1 - eccSq) / math.Pow(1-eccSq*math.Sin(phi1)*math.Sin(phi1), 1.5)
	D := x / (N1 * k0)

	lat := phi1 - (N1*math.Tan(phi1)/R1)*(D*D/2-
		(5+3*T1+10*C1-4*C1*C1-9*ePrimeSq)*D*D*D*D/24+
		(61+90*T1+298*C1+45*T1*T1-252*ePrimeSq-3*C1*C1)*D*D*D*D*D*D/720)

	lng := (D - (1+2*T1+C1)*D*D*D/6 +
		(5-2*C1+28*T1-3*C1*C1+8*ePrimeSq+24*T1*T1)*D*D*D*D*D/120) / math.Cos(phi1)

	latDeg := lat * 180 / math.Pi
	lngDeg := central + lng*180/math.Pi

	return WGS84Result{Lat: latDeg, Lng: lngDeg}
}
