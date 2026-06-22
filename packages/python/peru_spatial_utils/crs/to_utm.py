import math
from typing import TypedDict

from ._params import central_meridian, derived, epsg_for
from .utm_zone_for import utm_zone_for


class UTMResult(TypedDict):
    zone: int
    hemisphere: str
    epsg: int
    easting: int
    northing: int


def to_utm(lat: float, lng: float) -> UTMResult:
    zone = utm_zone_for(lng)
    p = derived()
    a = p["a"]
    k0 = p["k0"]
    e2 = p["e2"]
    ep2 = p["ep2"]

    lat_rad = math.radians(lat)
    lon0 = math.radians(central_meridian(zone))
    delta = math.radians(lng) - lon0

    sin_lat = math.sin(lat_rad)
    cos_lat = math.cos(lat_rad)
    tan_lat = math.tan(lat_rad)

    n = a / math.sqrt(1 - e2 * sin_lat * sin_lat)
    t = tan_lat * tan_lat
    c = ep2 * cos_lat * cos_lat
    big_a = cos_lat * delta

    m = a * (
        (1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256) * lat_rad
        - (3 * e2 / 8 + 3 * e2 ** 2 / 32 + 45 * e2 ** 3 / 1024) * math.sin(2 * lat_rad)
        + (15 * e2 ** 2 / 256 + 45 * e2 ** 3 / 1024) * math.sin(4 * lat_rad)
        - (35 * e2 ** 3 / 3072) * math.sin(6 * lat_rad)
    )

    easting = (
        p["false_easting"]
        + k0
        * n
        * (
            big_a
            + (1 - t + c) * big_a ** 3 / 6
            + (5 - 18 * t + t * t + 72 * c - 58 * ep2) * big_a ** 5 / 120
        )
    )

    northing = k0 * (
        m
        + n
        * tan_lat
        * (
            big_a ** 2 / 2
            + (5 - t + 9 * c + 4 * c * c) * big_a ** 4 / 24
            + (61 - 58 * t + t * t + 600 * c - 330 * ep2) * big_a ** 6 / 720
        )
    )

    northing += p["false_northing"]

    return {
        "zone": zone,
        "hemisphere": "S",
        "epsg": epsg_for(zone),
        "easting": round(easting),
        "northing": round(northing),
    }
