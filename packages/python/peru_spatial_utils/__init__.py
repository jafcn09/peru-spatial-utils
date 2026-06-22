from .ubigeo import (
    UbigeoRecord,
    get_department,
    get_region,
    get_province,
    get_district,
    is_valid_ubigeo,
    search_districts,
    parent_of,
)
from .crs import UTMResult, WGS84Result, utm_zone_for, to_utm, to_wgs84
from .area import to_hectares, to_km2, format_area
from .distance import distance
from .bbox import BoundingBox, bounding_box
from .territorial import (
    TerritorialRisk,
    recommendation_for,
    generate_recommendations,
    classify_hazard,
    hazard_for_category,
    risk_level_to_score,
    calculate_territorial_risk,
    generate_territorial_summary,
)

__version__ = "0.1.0"

__all__ = [
    "UbigeoRecord",
    "get_department",
    "get_region",
    "get_province",
    "get_district",
    "is_valid_ubigeo",
    "search_districts",
    "parent_of",
    "UTMResult",
    "WGS84Result",
    "utm_zone_for",
    "to_utm",
    "to_wgs84",
    "to_hectares",
    "to_km2",
    "format_area",
    "distance",
    "BoundingBox",
    "bounding_box",
    "TerritorialRisk",
    "recommendation_for",
    "generate_recommendations",
    "classify_hazard",
    "hazard_for_category",
    "risk_level_to_score",
    "calculate_territorial_risk",
    "generate_territorial_summary",
]
