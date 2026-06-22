use peru_spatial_utils::*;

#[test]
fn ubigeo_lookups() {
    assert_eq!(get_region("24").unwrap().name, "Tumbes");
    assert_eq!(get_department("24").unwrap().name, "Tumbes");
    assert_eq!(get_province("2402").unwrap().name, "Contralmirante Villar");
    assert_eq!(get_district("240203").unwrap().name, "Canoas de Punta Sal");
    assert!(get_region("99").is_none());
    assert!(get_district("999999").is_none());
}

#[test]
fn ubigeo_is_valid() {
    assert!(is_valid_ubigeo("24"));
    assert!(is_valid_ubigeo("2402"));
    assert!(is_valid_ubigeo("240203"));
    assert!(!is_valid_ubigeo("999999"));
    assert!(!is_valid_ubigeo("ab"));
    assert!(!is_valid_ubigeo("24x"));
    assert!(!is_valid_ubigeo("240"));
}

#[test]
fn ubigeo_parent_of() {
    assert_eq!(parent_of("240203").as_deref(), Some("2402"));
    assert_eq!(parent_of("2402").as_deref(), Some("24"));
    assert_eq!(parent_of("24"), None);
}

#[test]
fn ubigeo_search() {
    let results = search_districts("canoas", 10);
    assert!(results.iter().any(|r| r.code == "240203"));

    let limited = search_districts("san", 5);
    assert_eq!(limited.len(), 5);

    assert!(search_districts("", 10).is_empty());

    let accent = search_districts("ñepeña", 10);
    assert!(accent.iter().any(|r| r.name == "Nepeña"));
}

#[test]
fn crs_utm_zone_for() {
    assert_eq!(utm_zone_for(-80.451), 17);
    assert_eq!(utm_zone_for(-77.0428), 18);
    assert_eq!(utm_zone_for(-71.9675), 19);
}

#[test]
fn crs_to_utm() {
    let a = to_utm(-3.683, -80.451);
    assert_eq!(a.zone, 17);
    assert_eq!(a.hemisphere, "S");
    assert_eq!(a.epsg, 32717);
    assert_eq!(a.easting, 560966.0);
    assert_eq!(a.northing, 9592893.0);

    let b = to_utm(-12.0464, -77.0428);
    assert_eq!(b.zone, 18);
    assert_eq!(b.epsg, 32718);
    assert_eq!(b.easting, 277617.0);
    assert_eq!(b.northing, 8667488.0);

    let c = to_utm(-13.5320, -71.9675);
    assert_eq!(c.zone, 19);
    assert_eq!(c.epsg, 32719);
    assert_eq!(c.easting, 178771.0);
    assert_eq!(c.northing, 8502083.0);
}

#[test]
fn crs_to_wgs84() {
    let p = to_wgs84(560966.0, 9592893.0, 17);
    assert!((p.lat - (-3.68300)).abs() < 1e-4, "lat={}", p.lat);
    assert!((p.lng - (-80.45100)).abs() < 1e-4, "lng={}", p.lng);
}

#[test]
fn crs_round_trip() {
    let u = to_utm(-12.0464, -77.0428);
    let p = to_wgs84(u.easting, u.northing, u.zone);
    assert!((p.lat - (-12.0464)).abs() < 1e-4);
    assert!((p.lng - (-77.0428)).abs() < 1e-4);
}

#[test]
fn area_conversions() {
    assert!((to_hectares(467443.66) - 46.744366).abs() < 1e-9);
    assert!((to_km2(467443.66) - 0.46744366).abs() < 1e-12);
    assert_eq!(format_area(467443.66), "467,443.66 m\u{00B2} (46.74 ha)");
}

#[test]
fn distance_haversine() {
    let d = distance([-80.451, -3.683], [-80.320, -3.561]);
    assert!((d - 19.8839).abs() < 1e-3, "d={}", d);
}

#[test]
fn bbox_polygon() {
    let poly = GeoJson::Polygon(vec![vec![
        [-80.56, -3.82],
        [-80.11, -3.82],
        [-80.11, -3.42],
        [-80.56, -3.42],
        [-80.56, -3.82],
    ]]);
    let b = bounding_box(&poly);
    assert_eq!(b.min_x, -80.56);
    assert_eq!(b.min_y, -3.82);
    assert_eq!(b.max_x, -80.11);
    assert_eq!(b.max_y, -3.42);
}

#[test]
fn bbox_feature_collection() {
    let fc = GeoJson::FeatureCollection(vec![
        GeoJson::Feature(Box::new(GeoJson::Point([-80.0, -4.0]))),
        GeoJson::Feature(Box::new(GeoJson::Point([-79.0, -3.0]))),
    ]);
    let b = bounding_box(&fc);
    assert_eq!(b.min_x, -80.0);
    assert_eq!(b.min_y, -4.0);
    assert_eq!(b.max_x, -79.0);
    assert_eq!(b.max_y, -3.0);
}

#[test]
fn territorial_recommendations() {
    assert!(recommendation_for("SERNANP").starts_with("El territorio se superpone con un Area"));
    assert_eq!(
        recommendation_for("XYZ"),
        "Verificar la normativa aplicable de XYZ antes de cualquier intervencion en el territorio."
    );
}

#[test]
fn territorial_generate_recommendations() {
    let out = generate_recommendations(&["SERNANP", "SERNANP", "XYZ"]);
    assert_eq!(out.len(), 2);
    assert!(out[0].starts_with("El territorio se superpone con un Area"));
}

#[test]
fn territorial_classify_hazard() {
    assert_eq!(classify_hazard("Zona de inundacion recurrente"), "flood");
    assert_eq!(classify_hazard("Alerta de tsunami"), "tsunami");
    assert_eq!(classify_hazard("evento desconocido"), "earthquake");
}

#[test]
fn territorial_hazard_for_category() {
    assert_eq!(hazard_for_category("AMBIENTAL"), "flood");
    assert_eq!(hazard_for_category("DESCONOCIDA"), "earthquake");
}

#[test]
fn territorial_risk_level_to_score() {
    assert_eq!(risk_level_to_score("BAJO"), 1);
    assert_eq!(risk_level_to_score("MEDIO"), 2);
    assert_eq!(risk_level_to_score("ALTO"), 3);
    assert_eq!(risk_level_to_score("???"), 0);
}

fn ix(level: &str) -> Intersection {
    Intersection {
        entity: "E".to_string(),
        level: level.to_string(),
    }
}

#[test]
fn territorial_calculate_risk() {
    let a = calculate_territorial_risk(&[ix("ALTO"), ix("MEDIO")]);
    assert_eq!(a.score, 54);
    assert_eq!(a.risk, "MEDIO");

    let b = calculate_territorial_risk(&[ix("ALTO"), ix("ALTO")]);
    assert_eq!(b.score, 68);
    assert_eq!(b.risk, "ALTO");

    let c = calculate_territorial_risk(&[]);
    assert_eq!(c.score, 0);
    assert_eq!(c.risk, "BAJO");
}

#[test]
fn territorial_summary() {
    assert_eq!(
        generate_territorial_summary(&[]),
        "El territorio no presenta superposiciones con las capas evaluadas."
    );
    let s = generate_territorial_summary(&[
        Intersection { entity: "SERNANP".into(), level: "MEDIO".into() },
        Intersection { entity: "INGEMMET".into(), level: "ALTO".into() },
    ]);
    assert_eq!(
        s,
        "El territorio presenta superposicion de nivel ALTO con 2 entidad(es): SERNANP, INGEMMET."
    );
}
