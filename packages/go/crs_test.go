package perspatial

import (
	"math"
	"testing"
)

func TestUtmZoneFor(t *testing.T) {
	cases := map[float64]int{
		-80.451:  17,
		-77.0428: 18,
		-71.9675: 19,
	}
	for lng, want := range cases {
		if got := UtmZoneFor(lng); got != want {
			t.Errorf("utmZoneFor(%v) = %d, want %d", lng, got, want)
		}
	}
}

func TestToUTM(t *testing.T) {
	type tc struct {
		lat, lng          float64
		zone, epsg        int
		easting, northing float64
	}
	cases := []tc{
		{-3.683, -80.451, 17, 32717, 560966, 9592893},
		{-12.0464, -77.0428, 18, 32718, 277617, 8667488},
		{-13.5320, -71.9675, 19, 32719, 178771, 8502083},
	}
	for _, c := range cases {
		got := ToUTM(c.lat, c.lng)
		if got.Zone != c.zone {
			t.Errorf("zone = %d, want %d", got.Zone, c.zone)
		}
		if got.Hemisphere != "S" {
			t.Errorf("hemisphere = %q, want S", got.Hemisphere)
		}
		if got.Epsg != c.epsg {
			t.Errorf("epsg = %d, want %d", got.Epsg, c.epsg)
		}
		if got.Easting != c.easting {
			t.Errorf("easting = %v, want %v", got.Easting, c.easting)
		}
		if got.Northing != c.northing {
			t.Errorf("northing = %v, want %v", got.Northing, c.northing)
		}
	}
}

func TestToWGS84RoundTrip(t *testing.T) {
	got := ToWGS84(560966, 9592893, 17)
	if math.Abs(got.Lat-(-3.683)) > 1e-4 {
		t.Errorf("lat = %v, want ~-3.683", got.Lat)
	}
	if math.Abs(got.Lng-(-80.451)) > 1e-4 {
		t.Errorf("lng = %v, want ~-80.451", got.Lng)
	}

	for _, p := range [][2]float64{{-12.0464, -77.0428}, {-13.5320, -71.9675}} {
		u := ToUTM(p[0], p[1])
		back := ToWGS84(u.Easting, u.Northing, u.Zone)
		if math.Abs(back.Lat-p[0]) > 1e-4 || math.Abs(back.Lng-p[1]) > 1e-4 {
			t.Errorf("round trip %v -> %v", p, back)
		}
	}
}
