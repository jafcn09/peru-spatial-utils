package perspatial

type UbigeoRecord struct {
	Code    string   `json:"code"`
	Name    string   `json:"name"`
	Capital string   `json:"capital"`
	Lat     *float64 `json:"lat"`
	Lng     *float64 `json:"lng"`
}

type UtmResult struct {
	Zone       int     `json:"zone"`
	Hemisphere string  `json:"hemisphere"`
	Epsg       int     `json:"epsg"`
	Easting    float64 `json:"easting"`
	Northing   float64 `json:"northing"`
}

type WGS84Result struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

type BoundingBoxResult struct {
	MinX float64 `json:"minX"`
	MinY float64 `json:"minY"`
	MaxX float64 `json:"maxX"`
	MaxY float64 `json:"maxY"`
}

type RiskResult struct {
	Risk  string `json:"risk"`
	Score int    `json:"score"`
}

type Intersection struct {
	Entity string `json:"entity"`
	Level  string `json:"level"`
}
