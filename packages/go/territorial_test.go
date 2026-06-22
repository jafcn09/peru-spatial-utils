package perspatial

import (
	"strings"
	"testing"
)

func TestRecommendationFor(t *testing.T) {
	if got := RecommendationFor("SERNANP"); !strings.HasPrefix(got, "El territorio se superpone con un Area") {
		t.Errorf("recommendationFor(SERNANP) = %q", got)
	}
	want := "Verificar la normativa aplicable de XYZ antes de cualquier intervencion en el territorio."
	if got := RecommendationFor("XYZ"); got != want {
		t.Errorf("recommendationFor(XYZ) = %q", got)
	}
}

func TestGenerateRecommendations(t *testing.T) {
	res := GenerateRecommendations([]string{"SERNANP", "SERNANP", "XYZ"})
	if len(res) != 2 {
		t.Fatalf("expected 2 (dedup), got %d", len(res))
	}
	if !strings.HasPrefix(res[0], "El territorio se superpone") {
		t.Errorf("order wrong: %q", res[0])
	}
}

func TestClassifyHazard(t *testing.T) {
	cases := map[string]string{
		"Zona de inundacion recurrente": "flood",
		"Alerta de tsunami":             "tsunami",
		"evento desconocido":            "earthquake",
	}
	for text, want := range cases {
		if got := ClassifyHazard(text); got != want {
			t.Errorf("classifyHazard(%q) = %q, want %q", text, got, want)
		}
	}
}

func TestHazardForCategory(t *testing.T) {
	if got := HazardForCategory("AMBIENTAL"); got != "flood" {
		t.Errorf("hazardForCategory(AMBIENTAL) = %q", got)
	}
	if got := HazardForCategory("UNKNOWN"); got != "earthquake" {
		t.Errorf("hazardForCategory(UNKNOWN) = %q", got)
	}
}

func TestRiskLevelToScore(t *testing.T) {
	cases := map[string]int{"BAJO": 1, "MEDIO": 2, "ALTO": 3, "ZZZ": 0}
	for level, want := range cases {
		if got := RiskLevelToScore(level); got != want {
			t.Errorf("riskLevelToScore(%q) = %d, want %d", level, got, want)
		}
	}
}

func TestCalculateTerritorialRisk(t *testing.T) {
	r1 := CalculateTerritorialRisk([]Intersection{{Level: "ALTO"}, {Level: "MEDIO"}})
	if r1.Score != 54 || r1.Risk != "MEDIO" {
		t.Errorf("risk1 = %+v, want score 54 MEDIO", r1)
	}
	r2 := CalculateTerritorialRisk([]Intersection{{Level: "ALTO"}, {Level: "ALTO"}})
	if r2.Score != 68 || r2.Risk != "ALTO" {
		t.Errorf("risk2 = %+v, want score 68 ALTO", r2)
	}
	r3 := CalculateTerritorialRisk([]Intersection{})
	if r3.Score != 0 || r3.Risk != "BAJO" {
		t.Errorf("risk3 = %+v, want score 0 BAJO", r3)
	}
}

func TestGenerateTerritorialSummary(t *testing.T) {
	empty := GenerateTerritorialSummary([]Intersection{})
	if empty != "El territorio no presenta superposiciones con las capas evaluadas." {
		t.Errorf("empty summary = %q", empty)
	}
	s := GenerateTerritorialSummary([]Intersection{
		{Entity: "SERNANP", Level: "MEDIO"},
		{Entity: "INGEMMET", Level: "ALTO"},
	})
	want := "El territorio presenta superposicion de nivel ALTO con 2 entidad(es): SERNANP, INGEMMET."
	if s != want {
		t.Errorf("summary = %q, want %q", s, want)
	}
}
