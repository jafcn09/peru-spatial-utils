import unittest

from peru_spatial_utils import (
    bounding_box,
    calculate_territorial_risk,
    classify_hazard,
    distance,
    format_area,
    generate_recommendations,
    generate_territorial_summary,
    get_district,
    get_province,
    get_region,
    hazard_for_category,
    is_valid_ubigeo,
    parent_of,
    recommendation_for,
    risk_level_to_score,
    search_districts,
    to_hectares,
    to_km2,
    to_utm,
    to_wgs84,
    utm_zone_for,
)


class UbigeoTest(unittest.TestCase):
    def test_get_region(self):
        self.assertEqual(get_region("24")["name"], "Tumbes")

    def test_get_province(self):
        self.assertEqual(get_province("2402")["name"], "Contralmirante Villar")

    def test_get_district(self):
        self.assertEqual(get_district("240203")["name"], "Canoas de Punta Sal")

    def test_get_district_missing(self):
        self.assertIsNone(get_district("999999"))

    def test_is_valid_ubigeo(self):
        self.assertTrue(is_valid_ubigeo("24"))
        self.assertTrue(is_valid_ubigeo("2402"))
        self.assertTrue(is_valid_ubigeo("240203"))
        self.assertFalse(is_valid_ubigeo("999999"))
        self.assertFalse(is_valid_ubigeo("ab"))
        self.assertFalse(is_valid_ubigeo("24x"))

    def test_parent_of(self):
        self.assertEqual(parent_of("240203"), "2402")
        self.assertEqual(parent_of("2402"), "24")
        self.assertIsNone(parent_of("24"))

    def test_search_districts(self):
        results = search_districts("canoas")
        self.assertTrue(any(r["code"] == "240203" for r in results))
        self.assertLessEqual(len(results), 10)

    def test_search_districts_limit(self):
        self.assertLessEqual(len(search_districts("san", limit=3)), 3)

    def test_search_districts_accent_insensitive(self):
        self.assertEqual(search_districts("ASUNCIÓN"), search_districts("asuncion"))


class CrsTest(unittest.TestCase):
    def test_utm_zone_for(self):
        self.assertEqual(utm_zone_for(-80.451), 17)
        self.assertEqual(utm_zone_for(-77.0428), 18)
        self.assertEqual(utm_zone_for(-71.9675), 19)

    def test_to_utm_zone17(self):
        result = to_utm(-3.683, -80.451)
        self.assertEqual(result["zone"], 17)
        self.assertEqual(result["hemisphere"], "S")
        self.assertEqual(result["epsg"], 32717)
        self.assertEqual(result["easting"], 560966)
        self.assertEqual(result["northing"], 9592893)

    def test_to_utm_zone18(self):
        result = to_utm(-12.0464, -77.0428)
        self.assertEqual(result["zone"], 18)
        self.assertEqual(result["epsg"], 32718)
        self.assertEqual(result["easting"], 277617)
        self.assertEqual(result["northing"], 8667488)

    def test_to_utm_zone19(self):
        result = to_utm(-13.5320, -71.9675)
        self.assertEqual(result["zone"], 19)
        self.assertEqual(result["epsg"], 32719)
        self.assertEqual(result["easting"], 178771)
        self.assertEqual(result["northing"], 8502083)

    def test_to_wgs84(self):
        result = to_wgs84(560966, 9592893, 17)
        self.assertAlmostEqual(result["lat"], -3.68300, places=4)
        self.assertAlmostEqual(result["lng"], -80.45100, places=4)


class AreaTest(unittest.TestCase):
    def test_to_hectares(self):
        self.assertAlmostEqual(to_hectares(467443.66), 46.744366, places=9)

    def test_to_km2(self):
        self.assertAlmostEqual(to_km2(467443.66), 0.46744366, places=9)

    def test_format_area(self):
        self.assertEqual(format_area(467443.66), "467,443.66 m² (46.74 ha)")


class DistanceTest(unittest.TestCase):
    def test_distance(self):
        d = distance([-80.451, -3.683], [-80.320, -3.561])
        self.assertAlmostEqual(d, 19.8839, places=3)


class BboxTest(unittest.TestCase):
    def test_polygon(self):
        polygon = {
            "type": "Polygon",
            "coordinates": [
                [
                    [-80.56, -3.82],
                    [-80.11, -3.82],
                    [-80.11, -3.42],
                    [-80.56, -3.42],
                    [-80.56, -3.82],
                ]
            ],
        }
        self.assertEqual(
            bounding_box(polygon),
            {"minX": -80.56, "minY": -3.82, "maxX": -80.11, "maxY": -3.42},
        )

    def test_feature_collection(self):
        fc = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [-80.56, -3.82]},
                },
                {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [-80.11, -3.42]},
                },
            ],
        }
        self.assertEqual(
            bounding_box(fc),
            {"minX": -80.56, "minY": -3.82, "maxX": -80.11, "maxY": -3.42},
        )


class TerritorialTest(unittest.TestCase):
    def test_recommendation_for_known(self):
        self.assertTrue(
            recommendation_for("SERNANP").startswith(
                "El territorio se superpone con un Area"
            )
        )

    def test_recommendation_for_unknown(self):
        self.assertEqual(
            recommendation_for("XYZ"),
            "Verificar la normativa aplicable de XYZ antes de cualquier "
            "intervencion en el territorio.",
        )

    def test_generate_recommendations_dedup_order(self):
        result = generate_recommendations(["SERNANP", "SERNANP", "INGEMMET"])
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0], recommendation_for("SERNANP"))
        self.assertEqual(result[1], recommendation_for("INGEMMET"))

    def test_classify_hazard(self):
        self.assertEqual(classify_hazard("Zona de inundacion recurrente"), "flood")
        self.assertEqual(classify_hazard("Alerta de tsunami"), "tsunami")
        self.assertEqual(classify_hazard("evento desconocido"), "earthquake")

    def test_hazard_for_category(self):
        self.assertEqual(hazard_for_category("AMBIENTAL"), "flood")
        self.assertEqual(hazard_for_category("DESCONOCIDO"), "earthquake")

    def test_risk_level_to_score(self):
        self.assertEqual(risk_level_to_score("BAJO"), 1)
        self.assertEqual(risk_level_to_score("MEDIO"), 2)
        self.assertEqual(risk_level_to_score("ALTO"), 3)
        self.assertEqual(risk_level_to_score("XX"), 0)

    def test_calculate_territorial_risk(self):
        self.assertEqual(
            calculate_territorial_risk([{"level": "ALTO"}, {"level": "MEDIO"}]),
            {"score": 54, "risk": "MEDIO"},
        )
        self.assertEqual(
            calculate_territorial_risk([{"level": "ALTO"}, {"level": "ALTO"}]),
            {"score": 68, "risk": "ALTO"},
        )
        self.assertEqual(
            calculate_territorial_risk([]), {"score": 0, "risk": "BAJO"}
        )

    def test_generate_territorial_summary_empty(self):
        self.assertEqual(
            generate_territorial_summary([]),
            "El territorio no presenta superposiciones con las capas evaluadas.",
        )

    def test_generate_territorial_summary(self):
        summary = generate_territorial_summary(
            [
                {"entity": "SERNANP", "level": "MEDIO"},
                {"entity": "INGEMMET", "level": "ALTO"},
            ]
        )
        self.assertEqual(
            summary,
            "El territorio presenta superposicion de nivel ALTO con "
            "2 entidad(es): SERNANP, INGEMMET.",
        )


if __name__ == "__main__":
    unittest.main()
