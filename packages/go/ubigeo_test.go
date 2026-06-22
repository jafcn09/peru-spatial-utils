package perspatial

import "testing"

func TestGetRegion(t *testing.T) {
	r := GetRegion("24")
	if r == nil || r.Name != "Tumbes" {
		t.Fatalf("getRegion(24).name = %v, want Tumbes", r)
	}
	if GetDepartment("24").Name != "Tumbes" {
		t.Fatalf("GetDepartment alias mismatch")
	}
}

func TestGetProvince(t *testing.T) {
	p := GetProvince("2402")
	if p == nil || p.Name != "Contralmirante Villar" {
		t.Fatalf("getProvince(2402).name = %v, want Contralmirante Villar", p)
	}
}

func TestGetDistrict(t *testing.T) {
	d := GetDistrict("240203")
	if d == nil || d.Name != "Canoas de Punta Sal" {
		t.Fatalf("getDistrict(240203).name = %v, want Canoas de Punta Sal", d)
	}
}

func TestGetMissing(t *testing.T) {
	if GetDepartment("99") != nil {
		t.Fatal("expected nil for unknown department")
	}
}

func TestIsValidUbigeo(t *testing.T) {
	cases := map[string]bool{
		"24":     true,
		"2402":   true,
		"240203": true,
		"999999": false,
		"ab":     false,
		"24x":    false,
		"":       false,
	}
	for code, want := range cases {
		if got := IsValidUbigeo(code); got != want {
			t.Errorf("isValidUbigeo(%q) = %v, want %v", code, got, want)
		}
	}
}

func TestParentOf(t *testing.T) {
	if p := ParentOf("240203"); p == nil || *p != "2402" {
		t.Errorf("parentOf(240203) = %v, want 2402", p)
	}
	if p := ParentOf("2402"); p == nil || *p != "24" {
		t.Errorf("parentOf(2402) = %v, want 24", p)
	}
	if p := ParentOf("24"); p != nil {
		t.Errorf("parentOf(24) = %v, want nil", p)
	}
}

func TestSearchDistricts(t *testing.T) {
	res := SearchDistricts("canoas", 10)
	if len(res) == 0 {
		t.Fatal("expected results for 'canoas'")
	}
	if res[0].Name != "Canoas de Punta Sal" {
		t.Errorf("first result = %q, want Canoas de Punta Sal", res[0].Name)
	}
	res2 := SearchDistricts("CANOAS DE PUNTA SAL", 10)
	if res2[0].Code != "240203" {
		t.Errorf("exact match code = %q, want 240203", res2[0].Code)
	}
	limited := SearchDistricts("san", 3)
	if len(limited) > 3 {
		t.Errorf("limit not respected: %d", len(limited))
	}
}

func TestNullLatLng(t *testing.T) {
	d := GetDistrict("030612")
	if d == nil {
		t.Fatal("expected district 030612")
	}
	if d.Lat != nil || d.Lng != nil {
		t.Errorf("expected nil lat/lng for 030612, got %v/%v", d.Lat, d.Lng)
	}
}
