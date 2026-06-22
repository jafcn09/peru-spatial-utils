import math
from typing import Sequence

EARTH_RADIUS_KM = 6371.0088


def distance(a: Sequence[float], b: Sequence[float]) -> float:
    lng1, lat1 = a[0], a[1]
    lng2, lat2 = b[0], b[1]
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    d_phi = math.radians(lat2 - lat1)
    d_lambda = math.radians(lng2 - lng1)
    h = (
        math.sin(d_phi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(d_lambda / 2) ** 2
    )
    return 2 * EARTH_RADIUS_KM * math.asin(math.sqrt(h))
