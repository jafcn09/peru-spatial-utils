package com.peruspatial;

import com.peruspatial.area.FormatArea;
import com.peruspatial.area.ToHectares;
import com.peruspatial.area.ToKm2;
import com.peruspatial.bbox.BoundingBox;
import com.peruspatial.bbox.BoundingBoxResult;
import com.peruspatial.crs.ToUTM;
import com.peruspatial.crs.ToWGS84;
import com.peruspatial.crs.UtmResult;
import com.peruspatial.crs.UtmZoneFor;
import com.peruspatial.crs.Wgs84Result;
import com.peruspatial.distance.Distance;
import com.peruspatial.territorial.CalculateTerritorialRisk;
import com.peruspatial.territorial.ClassifyHazard;
import com.peruspatial.territorial.GenerateRecommendations;
import com.peruspatial.territorial.GenerateTerritorialSummary;
import com.peruspatial.territorial.HazardForCategory;
import com.peruspatial.territorial.Intersection;
import com.peruspatial.territorial.RecommendationFor;
import com.peruspatial.territorial.RiskLevelToScore;
import com.peruspatial.territorial.RiskResult;
import com.peruspatial.ubigeo.GetDistrict;
import com.peruspatial.ubigeo.GetProvince;
import com.peruspatial.ubigeo.GetRegion;
import com.peruspatial.ubigeo.IsValidUbigeo;
import com.peruspatial.ubigeo.ParentOf;
import com.peruspatial.ubigeo.SearchDistricts;
import com.peruspatial.ubigeo.UbigeoRecord;
import java.util.List;

public final class Runner {
  private static int checks = 0;

  public static void main(String[] args) {
    ubigeo();
    crs();
    area();
    distance();
    bbox();
    territorial();
    System.out.println("All " + checks + " golden vector checks passed.");
  }

  static void ubigeo() {
    eq("Tumbes", GetRegion.getRegion("24").name(), "getRegion(24).name");
    eq("Contralmirante Villar", GetProvince.getProvince("2402").name(), "getProvince(2402).name");
    eq("Canoas de Punta Sal", GetDistrict.getDistrict("240203").name(), "getDistrict(240203).name");

    isTrue(IsValidUbigeo.isValidUbigeo("24"), "isValidUbigeo(24)");
    isTrue(IsValidUbigeo.isValidUbigeo("2402"), "isValidUbigeo(2402)");
    isTrue(IsValidUbigeo.isValidUbigeo("240203"), "isValidUbigeo(240203)");
    isTrue(!IsValidUbigeo.isValidUbigeo("999999"), "isValidUbigeo(999999)");
    isTrue(!IsValidUbigeo.isValidUbigeo("ab"), "isValidUbigeo(ab)");
    isTrue(!IsValidUbigeo.isValidUbigeo("24x"), "isValidUbigeo(24x)");

    eq("2402", ParentOf.parentOf("240203"), "parentOf(240203)");
    eq("24", ParentOf.parentOf("2402"), "parentOf(2402)");
    isNull(ParentOf.parentOf("24"), "parentOf(24)");

    List<UbigeoRecord> res = SearchDistricts.searchDistricts("canoas", 10);
    isTrue(!res.isEmpty() && res.get(0).name().equals("Canoas de Punta Sal"),
        "searchDistricts(canoas)");
  }

  static void crs() {
    eqInt(17, UtmZoneFor.utmZoneFor(-80.451), "utmZoneFor(-80.451)");
    eqInt(18, UtmZoneFor.utmZoneFor(-77.0428), "utmZoneFor(-77.0428)");
    eqInt(19, UtmZoneFor.utmZoneFor(-71.9675), "utmZoneFor(-71.9675)");

    UtmResult u1 = ToUTM.toUTM(-3.683, -80.451);
    eqInt(17, u1.zone(), "toUTM#1.zone");
    eq("S", u1.hemisphere(), "toUTM#1.hemisphere");
    eqInt(32717, u1.epsg(), "toUTM#1.epsg");
    eqLong(560966, u1.easting(), "toUTM#1.easting");
    eqLong(9592893, u1.northing(), "toUTM#1.northing");

    UtmResult u2 = ToUTM.toUTM(-12.0464, -77.0428);
    eqInt(18, u2.zone(), "toUTM#2.zone");
    eqInt(32718, u2.epsg(), "toUTM#2.epsg");
    eqLong(277617, u2.easting(), "toUTM#2.easting");
    eqLong(8667488, u2.northing(), "toUTM#2.northing");

    UtmResult u3 = ToUTM.toUTM(-13.5320, -71.9675);
    eqInt(19, u3.zone(), "toUTM#3.zone");
    eqInt(32719, u3.epsg(), "toUTM#3.epsg");
    eqLong(178771, u3.easting(), "toUTM#3.easting");
    eqLong(8502083, u3.northing(), "toUTM#3.northing");

    Wgs84Result w = ToWGS84.toWGS84(560966, 9592893, 17);
    near(-3.68300, w.lat(), 1e-4, "toWGS84.lat");
    near(-80.45100, w.lng(), 1e-4, "toWGS84.lng");
  }

  static void area() {
    near(46.744366, ToHectares.toHectares(467443.66), 1e-9, "toHectares");
    near(0.46744366, ToKm2.toKm2(467443.66), 1e-12, "toKm2");
    eq("467,443.66 m² (46.74 ha)", FormatArea.formatArea(467443.66), "formatArea");
  }

  static void distance() {
    double d = Distance.distance(new double[]{-80.451, -3.683}, new double[]{-80.320, -3.561});
    near(19.8839, d, 1e-3, "distance");
  }

  static void bbox() {
    Object polygon = java.util.Map.of(
        "type", "Polygon",
        "coordinates", List.of(List.of(
            List.of(-80.56, -3.82),
            List.of(-80.11, -3.82),
            List.of(-80.11, -3.42),
            List.of(-80.56, -3.42),
            List.of(-80.56, -3.82))));
    BoundingBoxResult bb = BoundingBox.boundingBox(polygon);
    near(-80.56, bb.minX(), 1e-12, "bbox.minX");
    near(-3.82, bb.minY(), 1e-12, "bbox.minY");
    near(-80.11, bb.maxX(), 1e-12, "bbox.maxX");
    near(-3.42, bb.maxY(), 1e-12, "bbox.maxY");
  }

  static void territorial() {
    isTrue(RecommendationFor.recommendationFor("SERNANP")
            .startsWith("El territorio se superpone con un Area"),
        "recommendationFor(SERNANP)");
    eq("Verificar la normativa aplicable de XYZ antes de cualquier intervencion en el territorio.",
        RecommendationFor.recommendationFor("XYZ"), "recommendationFor(XYZ)");

    eq("flood", ClassifyHazard.classifyHazard("Zona de inundacion recurrente"),
        "classifyHazard(flood)");
    eq("tsunami", ClassifyHazard.classifyHazard("Alerta de tsunami"), "classifyHazard(tsunami)");
    eq("earthquake", ClassifyHazard.classifyHazard("evento desconocido"),
        "classifyHazard(earthquake)");

    eq("flood", HazardForCategory.hazardForCategory("AMBIENTAL"), "hazardForCategory(AMBIENTAL)");
    eq("earthquake", HazardForCategory.hazardForCategory("DESCONOCIDO"),
        "hazardForCategory(unknown)");

    eqInt(1, RiskLevelToScore.riskLevelToScore("BAJO"), "riskLevelToScore(BAJO)");
    eqInt(2, RiskLevelToScore.riskLevelToScore("MEDIO"), "riskLevelToScore(MEDIO)");
    eqInt(3, RiskLevelToScore.riskLevelToScore("ALTO"), "riskLevelToScore(ALTO)");
    eqInt(0, RiskLevelToScore.riskLevelToScore("X"), "riskLevelToScore(unknown)");

    RiskResult r1 = CalculateTerritorialRisk.calculateTerritorialRisk(
        List.of(new Intersection("A", "ALTO"), new Intersection("B", "MEDIO")));
    eqInt(54, r1.score(), "calcRisk#1.score");
    eq("MEDIO", r1.risk(), "calcRisk#1.risk");

    RiskResult r2 = CalculateTerritorialRisk.calculateTerritorialRisk(
        List.of(new Intersection("A", "ALTO"), new Intersection("B", "ALTO")));
    eqInt(68, r2.score(), "calcRisk#2.score");
    eq("ALTO", r2.risk(), "calcRisk#2.risk");

    RiskResult r3 = CalculateTerritorialRisk.calculateTerritorialRisk(List.of());
    eqInt(0, r3.score(), "calcRisk#3.score");
    eq("BAJO", r3.risk(), "calcRisk#3.risk");

    List<String> recs = GenerateRecommendations.generateRecommendations(
        List.of("SERNANP", "SERNANP", "XYZ"));
    eqInt(2, recs.size(), "generateRecommendations.dedupe");

    eq("El territorio no presenta superposiciones con las capas evaluadas.",
        GenerateTerritorialSummary.generateTerritorialSummary(List.of()),
        "generateTerritorialSummary.empty");
    eq("El territorio presenta superposicion de nivel ALTO con 2 entidad(es): A, B.",
        GenerateTerritorialSummary.generateTerritorialSummary(
            List.of(new Intersection("A", "ALTO"), new Intersection("B", "MEDIO"))),
        "generateTerritorialSummary.nonempty");
  }

  static void eq(String expected, String actual, String label) {
    checks++;
    if (!expected.equals(actual)) {
      fail(label, expected, actual);
    }
  }

  static void eqInt(int expected, int actual, String label) {
    checks++;
    if (expected != actual) fail(label, String.valueOf(expected), String.valueOf(actual));
  }

  static void eqLong(long expected, long actual, String label) {
    checks++;
    if (expected != actual) fail(label, String.valueOf(expected), String.valueOf(actual));
  }

  static void near(double expected, double actual, double tol, String label) {
    checks++;
    if (Math.abs(expected - actual) > tol) {
      fail(label, String.valueOf(expected), String.valueOf(actual));
    }
  }

  static void isTrue(boolean cond, String label) {
    checks++;
    if (!cond) fail(label, "true", "false");
  }

  static void isNull(Object value, String label) {
    checks++;
    if (value != null) fail(label, "null", String.valueOf(value));
  }

  static void fail(String label, String expected, String actual) {
    System.err.println("FAIL [" + label + "] expected=" + expected + " actual=" + actual);
    System.exit(1);
  }
}
