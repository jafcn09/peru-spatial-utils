package perspatial

import (
	"encoding/json"
	"errors"
	"math"
)

func BoundingBox(geojson []byte) (BoundingBoxResult, error) {
	var v any
	if err := json.Unmarshal(geojson, &v); err != nil {
		return BoundingBoxResult{}, err
	}
	res := BoundingBoxResult{
		MinX: math.Inf(1), MinY: math.Inf(1),
		MaxX: math.Inf(-1), MaxY: math.Inf(-1),
	}
	found := scanCoordinates(v, &res)
	if !found {
		return BoundingBoxResult{}, errors.New("no coordinates found")
	}
	return res, nil
}

func scanCoordinates(v any, res *BoundingBoxResult) bool {
	found := false
	switch node := v.(type) {
	case map[string]any:
		if t, ok := node["type"].(string); ok {
			switch t {
			case "FeatureCollection":
				if feats, ok := node["features"].([]any); ok {
					for _, f := range feats {
						if scanCoordinates(f, res) {
							found = true
						}
					}
				}
				return found
			case "Feature":
				if g, ok := node["geometry"]; ok {
					return scanCoordinates(g, res)
				}
				return false
			case "GeometryCollection":
				if geoms, ok := node["geometries"].([]any); ok {
					for _, g := range geoms {
						if scanCoordinates(g, res) {
							found = true
						}
					}
				}
				return found
			default:
				if c, ok := node["coordinates"]; ok {
					return scanCoords(c, res)
				}
			}
		}
		return found
	}
	return found
}

func scanCoords(v any, res *BoundingBoxResult) bool {
	arr, ok := v.([]any)
	if !ok {
		return false
	}
	if isPosition(arr) {
		x := arr[0].(float64)
		y := arr[1].(float64)
		if x < res.MinX {
			res.MinX = x
		}
		if x > res.MaxX {
			res.MaxX = x
		}
		if y < res.MinY {
			res.MinY = y
		}
		if y > res.MaxY {
			res.MaxY = y
		}
		return true
	}
	found := false
	for _, item := range arr {
		if scanCoords(item, res) {
			found = true
		}
	}
	return found
}

func isPosition(arr []any) bool {
	if len(arr) < 2 {
		return false
	}
	_, x := arr[0].(float64)
	_, y := arr[1].(float64)
	return x && y
}
