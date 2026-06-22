#include "psu.h"
#include <stdio.h>
#include <string.h>
#include <math.h>

static int failures = 0;

static void check(int cond, const char *msg) {
    if (!cond) {
        printf("FAIL: %s\n", msg);
        failures++;
    } else {
        printf("ok: %s\n", msg);
    }
}

static void check_str(const char *got, const char *want, const char *msg) {
    if (!got || strcmp(got, want) != 0) {
        printf("FAIL: %s (got=\"%s\" want=\"%s\")\n", msg, got ? got : "(null)", want);
        failures++;
    } else {
        printf("ok: %s\n", msg);
    }
}

static void check_close(double got, double want, double tol, const char *msg) {
    if (fabs(got - want) > tol) {
        printf("FAIL: %s (got=%.6f want=%.6f)\n", msg, got, want);
        failures++;
    } else {
        printf("ok: %s\n", msg);
    }
}

int main(void) {
    const PsuUbigeo *r = psu_get_region("24");
    check(r != NULL, "getRegion(24) not null");
    if (r) check_str(r->name, "Tumbes", "getRegion(24).name");

    const PsuUbigeo *p = psu_get_province("2402");
    check(p != NULL, "getProvince(2402) not null");
    if (p) check_str(p->name, "Contralmirante Villar", "getProvince(2402).name");

    const PsuUbigeo *d = psu_get_district("240203");
    check(d != NULL, "getDistrict(240203) not null");
    if (d) check_str(d->name, "Canoas de Punta Sal", "getDistrict(240203).name");

    check(psu_is_valid_ubigeo("24") == true, "isValidUbigeo(24)");
    check(psu_is_valid_ubigeo("2402") == true, "isValidUbigeo(2402)");
    check(psu_is_valid_ubigeo("240203") == true, "isValidUbigeo(240203)");
    check(psu_is_valid_ubigeo("999999") == false, "isValidUbigeo(999999)");
    check(psu_is_valid_ubigeo("ab") == false, "isValidUbigeo(ab)");
    check(psu_is_valid_ubigeo("24x") == false, "isValidUbigeo(24x)");

    char parent[16];
    check(psu_parent_of("240203", parent, sizeof(parent)) && strcmp(parent, "2402") == 0,
          "parentOf(240203)");
    check(psu_parent_of("2402", parent, sizeof(parent)) && strcmp(parent, "24") == 0,
          "parentOf(2402)");
    check(psu_parent_of("24", parent, sizeof(parent)) == false, "parentOf(24) null");

    const PsuUbigeo *sd[10];
    size_t found = psu_search_districts("canoas", 10, sd, 10);
    check(found >= 1, "searchDistricts(canoas) found");
    if (found >= 1) check_str(sd[0]->name, "Canoas de Punta Sal", "searchDistricts first match");

    check(psu_utm_zone_for(-80.451) == 17, "utmZoneFor(-80.451)");
    check(psu_utm_zone_for(-77.0428) == 18, "utmZoneFor(-77.0428)");
    check(psu_utm_zone_for(-71.9675) == 19, "utmZoneFor(-71.9675)");

    PsuUtm u1 = psu_to_utm(-3.683, -80.451);
    check(u1.zone == 17 && u1.epsg == 32717 && strcmp(u1.hemisphere, "S") == 0, "toUTM(1) meta");
    check_close(u1.easting, 560966, 0.5, "toUTM(1) easting");
    check_close(u1.northing, 9592893, 0.5, "toUTM(1) northing");

    PsuUtm u2 = psu_to_utm(-12.0464, -77.0428);
    check(u2.zone == 18 && u2.epsg == 32718, "toUTM(2) meta");
    check_close(u2.easting, 277617, 0.5, "toUTM(2) easting");
    check_close(u2.northing, 8667488, 0.5, "toUTM(2) northing");

    PsuUtm u3 = psu_to_utm(-13.5320, -71.9675);
    check(u3.zone == 19 && u3.epsg == 32719, "toUTM(3) meta");
    check_close(u3.easting, 178771, 0.5, "toUTM(3) easting");
    check_close(u3.northing, 8502083, 0.5, "toUTM(3) northing");

    PsuLatLng w = psu_to_wgs84(560966, 9592893, 17);
    check_close(w.lat, -3.68300, 1e-4, "toWGS84 lat");
    check_close(w.lng, -80.45100, 1e-4, "toWGS84 lng");

    check_close(psu_to_hectares(467443.66), 46.744366, 1e-9, "toHectares");
    check_close(psu_to_km2(467443.66), 0.46744366, 1e-12, "toKm2");

    char area[128];
    psu_format_area(467443.66, area, sizeof(area));
    check_str(area, "467,443.66 m\xC2\xB2 (46.74 ha)", "formatArea");

    double a[2] = { -80.451, -3.683 };
    double b[2] = { -80.320, -3.561 };
    check_close(psu_distance(a, b), 19.8839, 1e-3, "distance");

    double poly[] = {
        -80.56, -3.82, -80.11, -3.82, -80.11, -3.42, -80.56, -3.42, -80.56, -3.82
    };
    PsuBoundingBox box = psu_bounding_box_coords(poly, 5);
    check_close(box.minX, -80.56, 1e-9, "bbox minX");
    check_close(box.minY, -3.82, 1e-9, "bbox minY");
    check_close(box.maxX, -80.11, 1e-9, "bbox maxX");
    check_close(box.maxY, -3.42, 1e-9, "bbox maxY");

    char rec[512];
    const char *rs = psu_recommendation_for("SERNANP", rec, sizeof(rec));
    check(strncmp(rs, "El territorio se superpone con un Area", 37) == 0, "recommendationFor(SERNANP)");
    psu_recommendation_for("XYZ", rec, sizeof(rec));
    check_str(rec, "Verificar la normativa aplicable de XYZ antes de cualquier intervencion en el territorio.",
              "recommendationFor(XYZ)");

    const char *entities[] = { "SERNANP", "INGEMMET", "SERNANP" };
    char recs[8][512];
    size_t nrec = psu_generate_recommendations(entities, 3, recs, 8);
    check(nrec == 2, "generateRecommendations dedupe");

    check_str(psu_classify_hazard("Zona de inundacion recurrente"), "flood", "classifyHazard flood");
    check_str(psu_classify_hazard("Alerta de tsunami"), "tsunami", "classifyHazard tsunami");
    check_str(psu_classify_hazard("evento desconocido"), "earthquake", "classifyHazard default");

    check_str(psu_hazard_for_category("AMBIENTAL"), "flood", "hazardForCategory(AMBIENTAL)");
    check_str(psu_hazard_for_category("DESCONOCIDO"), "earthquake", "hazardForCategory default");

    check(psu_risk_level_to_score("BAJO") == 1, "riskLevelToScore BAJO");
    check(psu_risk_level_to_score("MEDIO") == 2, "riskLevelToScore MEDIO");
    check(psu_risk_level_to_score("ALTO") == 3, "riskLevelToScore ALTO");
    check(psu_risk_level_to_score("???") == 0, "riskLevelToScore unknown");

    PsuIntersection ix1[] = { { "A", "ALTO" }, { "B", "MEDIO" } };
    PsuRisk rk1 = psu_calculate_territorial_risk(ix1, 2);
    check(rk1.score == 54 && strcmp(rk1.risk, "MEDIO") == 0, "calculateTerritorialRisk ALTO+MEDIO");

    PsuIntersection ix2[] = { { "A", "ALTO" }, { "B", "ALTO" } };
    PsuRisk rk2 = psu_calculate_territorial_risk(ix2, 2);
    check(rk2.score == 68 && strcmp(rk2.risk, "ALTO") == 0, "calculateTerritorialRisk ALTO+ALTO");

    PsuRisk rk3 = psu_calculate_territorial_risk(NULL, 0);
    check(rk3.score == 0 && strcmp(rk3.risk, "BAJO") == 0, "calculateTerritorialRisk empty");

    char summary[2048];
    psu_generate_territorial_summary(NULL, 0, summary, sizeof(summary));
    check_str(summary, "El territorio no presenta superposiciones con las capas evaluadas.",
              "generateTerritorialSummary empty");
    psu_generate_territorial_summary(ix1, 2, summary, sizeof(summary));
    check_str(summary,
              "El territorio presenta superposicion de nivel ALTO con 2 entidad(es): A, B.",
              "generateTerritorialSummary populated");

    if (failures == 0) {
        printf("\nAll tests passed.\n");
        return 0;
    }
    printf("\n%d test(s) failed.\n", failures);
    return 1;
}
