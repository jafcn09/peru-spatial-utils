package perspatial

import (
	"math"
	"testing"
)

func TestArea(t *testing.T) {
	if ToHectares(467443.66) != 46.744366 {
		t.Errorf("toHectares = %v", ToHectares(467443.66))
	}
	if ToKm2(467443.66) != 0.46744366 {
		t.Errorf("toKm2 = %v", ToKm2(467443.66))
	}
	if got := FormatArea(467443.66); got != "467,443.66 m² (46.74 ha)" {
		t.Errorf("formatArea = %q", got)
	}
}

func TestDistance(t *testing.T) {
	got := Distance([2]float64{-80.451, -3.683}, [2]float64{-80.320, -3.561})
	if math.Abs(got-19.8839) > 1e-3 {
		t.Errorf("distance = %v, want ~19.8839", got)
	}
}

func TestBoundingBox(t *testing.T) {
	geo := []byte(`{"type":"Polygon","coordinates":[[[-80.56,-3.82],[-80.11,-3.82],[-80.11,-3.42],[-80.56,-3.42],[-80.56,-3.82]]]}`)
	res, err := BoundingBox(geo)
	if err != nil {
		t.Fatal(err)
	}
	if res.MinX != -80.56 || res.MinY != -3.82 || res.MaxX != -80.11 || res.MaxY != -3.42 {
		t.Errorf("bbox = %+v", res)
	}
}

func TestBoundingBoxFeatureCollection(t *testing.T) {
	geo := []byte(`{"type":"FeatureCollection","features":[
		{"type":"Feature","geometry":{"type":"Point","coordinates":[-80.5,-3.5]},"properties":{}},
		{"type":"Feature","geometry":{"type":"Point","coordinates":[-80.1,-3.9]},"properties":{}}
	]}`)
	res, err := BoundingBox(geo)
	if err != nil {
		t.Fatal(err)
	}
	if res.MinX != -80.5 || res.MaxX != -80.1 || res.MinY != -3.9 || res.MaxY != -3.5 {
		t.Errorf("bbox fc = %+v", res)
	}
}
