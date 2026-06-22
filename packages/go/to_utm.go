package perspatial

import "math"

func ToUTM(lat, lng float64) UtmResult {
	zone := UtmZoneFor(lng)
	central := float64(zone)*6 - 183
	for _, z := range utmCfg.Zones {
		if z.Zone == zone {
			central = z.CentralMeridian
			break
		}
	}
	epsg := 32700 + zone
	for _, z := range utmCfg.Zones {
		if z.Zone == zone {
			epsg = z.Epsg
			break
		}
	}

	e := utmCfg.Ellipsoid
	a := e.A
	f := e.F
	k0 := e.K0

	eccSq := f * (2 - f)
	ePrimeSq := eccSq / (1 - eccSq)

	latRad := lat * math.Pi / 180
	lngRad := lng * math.Pi / 180
	centralRad := central * math.Pi / 180

	N := a / math.Sqrt(1-eccSq*math.Sin(latRad)*math.Sin(latRad))
	T := math.Tan(latRad) * math.Tan(latRad)
	C := ePrimeSq * math.Cos(latRad) * math.Cos(latRad)
	A := math.Cos(latRad) * (lngRad - centralRad)

	M := a * ((1-eccSq/4-3*eccSq*eccSq/64-5*eccSq*eccSq*eccSq/256)*latRad -
		(3*eccSq/8+3*eccSq*eccSq/32+45*eccSq*eccSq*eccSq/1024)*math.Sin(2*latRad) +
		(15*eccSq*eccSq/256+45*eccSq*eccSq*eccSq/1024)*math.Sin(4*latRad) -
		(35*eccSq*eccSq*eccSq/3072)*math.Sin(6*latRad))

	easting := k0*N*(A+(1-T+C)*A*A*A/6+
		(5-18*T+T*T+72*C-58*ePrimeSq)*A*A*A*A*A/120) + e.FalseEasting

	northing := k0 * (M + N*math.Tan(latRad)*(A*A/2+
		(5-T+9*C+4*C*C)*A*A*A*A/24+
		(61-58*T+T*T+600*C-330*ePrimeSq)*A*A*A*A*A*A/720))

	northing += e.FalseNorthingSouth

	return UtmResult{
		Zone:       zone,
		Hemisphere: "S",
		Epsg:       epsg,
		Easting:    math.Round(easting),
		Northing:   math.Round(northing),
	}
}
