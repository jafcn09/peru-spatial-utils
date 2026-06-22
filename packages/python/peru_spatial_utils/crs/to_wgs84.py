import math
from typing import TypedDict

from ._params import central_meridian, derived


class WGS84Result(TypedDict):
    lat: float
    lng: float


def to_wgs84(easting: float, northing: float, zone: int) -> WGS84Result:
    p = derived()
    a = p["a"]
    k0 = p["k0"]
    e2 = p["e2"]
    ep2 = p["ep2"]

    x = easting - p["false_easting"]
    y = northing - p["false_northing"]

    m = y / k0
    e1 = (1 - math.sqrt(1 - e2)) / (1 + math.sqrt(1 - e2))
    mu = m / (a * (1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256))

    phi1 = (
        mu
        + (3 * e1 / 2 - 27 * e1 ** 3 / 32) * math.sin(2 * mu)
        + (21 * e1 ** 2 / 16 - 55 * e1 ** 4 / 32) * math.sin(4 * mu)
        + (151 * e1 ** 3 / 96) * math.sin(6 * mu)
        + (1097 * e1 ** 4 / 512) * math.sin(8 * mu)
    )

    sin_phi1 = math.sin(phi1)
    cos_phi1 = math.cos(phi1)
    tan_phi1 = math.tan(phi1)

    c1 = ep2 * cos_phi1 * cos_phi1
    t1 = tan_phi1 * tan_phi1
    n1 = a / math.sqrt(1 - e2 * sin_phi1 * sin_phi1)
    r1 = a * (1 - e2) / (1 - e2 * sin_phi1 * sin_phi1) ** 1.5
    d = x / (n1 * k0)

    lat = phi1 - (n1 * tan_phi1 / r1) * (
        d ** 2 / 2
        - (5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * ep2) * d ** 4 / 24
        + (61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * ep2 - 3 * c1 * c1)
        * d ** 6
        / 720
    )

    lng_rad = (
        d
        - (1 + 2 * t1 + c1) * d ** 3 / 6
        + (5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * ep2 + 24 * t1 * t1)
        * d ** 5
        / 120
    ) / cos_phi1

    lng = central_meridian(zone) + math.degrees(lng_rad)

    return {"lat": math.degrees(lat), "lng": lng}
