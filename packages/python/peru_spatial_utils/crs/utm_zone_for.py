import math


def utm_zone_for(lng: float) -> int:
    if -84 <= lng < -78:
        return 17
    if -78 <= lng < -72:
        return 18
    if -72 <= lng < -66:
        return 19
    return int(math.floor((lng + 180) / 6)) + 1
