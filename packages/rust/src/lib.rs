mod data;

pub mod area;
pub mod bbox;
pub mod crs;
pub mod distance;
pub mod territorial;
pub mod ubigeo;

pub use area::{format_area, to_hectares, to_km2};
pub use bbox::{bounding_box, BoundingBox, GeoJson};
pub use crs::{to_utm, to_wgs84, utm_zone_for, UtmResult, Wgs84};
pub use distance::distance;
pub use territorial::{
    calculate_territorial_risk, classify_hazard, generate_recommendations,
    generate_territorial_summary, hazard_for_category, recommendation_for, risk_level_to_score,
    Intersection, TerritorialRisk,
};
pub use ubigeo::{
    get_department, get_district, get_province, get_region, is_valid_ubigeo, parent_of,
    search_districts, UbigeoRecord,
};
