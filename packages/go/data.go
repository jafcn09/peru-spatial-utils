package perspatial

import (
	_ "embed"
	"encoding/json"
)

//go:embed data/ubigeo/departments.json
var departmentsJSON []byte

//go:embed data/ubigeo/provinces.json
var provincesJSON []byte

//go:embed data/ubigeo/districts.json
var districtsJSON []byte

//go:embed data/crs/utm-zones.json
var utmZonesJSON []byte

//go:embed data/territorial/recommendations.json
var recommendationsJSON []byte

//go:embed data/territorial/hazard-keywords.json
var hazardKeywordsJSON []byte

type utmEllipsoid struct {
	A                  float64 `json:"a"`
	F                  float64 `json:"f"`
	K0                 float64 `json:"k0"`
	FalseEasting       float64 `json:"falseEasting"`
	FalseNorthingSouth float64 `json:"falseNorthingSouth"`
}

type utmZone struct {
	Zone            int     `json:"zone"`
	Hemisphere      string  `json:"hemisphere"`
	Epsg            int     `json:"epsg"`
	CentralMeridian float64 `json:"centralMeridian"`
	LngMin          float64 `json:"lngMin"`
	LngMax          float64 `json:"lngMax"`
}

type utmConfig struct {
	Datum     string       `json:"datum"`
	Ellipsoid utmEllipsoid `json:"ellipsoid"`
	Zones     []utmZone    `json:"zones"`
}

type recommendationsConfig struct {
	Entities map[string]string `json:"entities"`
	Fallback string            `json:"fallback"`
}

type hazardRule struct {
	Type     string   `json:"type"`
	Keywords []string `json:"keywords"`
}

type hazardConfig struct {
	Rules            []hazardRule      `json:"rules"`
	CategoryFallback map[string]string `json:"categoryFallback"`
	Default          string            `json:"default"`
}

var (
	departments       []UbigeoRecord
	provinces         []UbigeoRecord
	districts         []UbigeoRecord
	departmentsByCode map[string]UbigeoRecord
	provincesByCode   map[string]UbigeoRecord
	districtsByCode   map[string]UbigeoRecord

	utmCfg          utmConfig
	recommendations recommendationsConfig
	hazards         hazardConfig
)

func init() {
	mustUnmarshal(departmentsJSON, &departments)
	mustUnmarshal(provincesJSON, &provinces)
	mustUnmarshal(districtsJSON, &districts)
	mustUnmarshal(utmZonesJSON, &utmCfg)
	mustUnmarshal(recommendationsJSON, &recommendations)
	mustUnmarshal(hazardKeywordsJSON, &hazards)

	departmentsByCode = indexByCode(departments)
	provincesByCode = indexByCode(provinces)
	districtsByCode = indexByCode(districts)
}

func mustUnmarshal(data []byte, v any) {
	if err := json.Unmarshal(data, v); err != nil {
		panic(err)
	}
}

func indexByCode(records []UbigeoRecord) map[string]UbigeoRecord {
	m := make(map[string]UbigeoRecord, len(records))
	for _, r := range records {
		m[r.Code] = r
	}
	return m
}
