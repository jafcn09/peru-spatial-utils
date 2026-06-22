import math
from functools import lru_cache
from typing import Optional, TypedDict

from .._data import load_json


class ZoneParams(TypedDict):
    zone: int
    hemisphere: str
    epsg: int
    centralMeridian: int
    lngMin: int
    lngMax: int


@lru_cache(maxsize=None)
def config() -> dict:
    return load_json("crs", "utm-zones.json")


@lru_cache(maxsize=None)
def ellipsoid() -> dict:
    return config()["ellipsoid"]


def zone_record(zone: int) -> Optional[ZoneParams]:
    for record in config()["zones"]:
        if record["zone"] == zone:
            return record
    return None


def central_meridian(zone: int) -> float:
    record = zone_record(zone)
    if record is not None:
        return float(record["centralMeridian"])
    return float((zone - 1) * 6 - 180 + 3)


def epsg_for(zone: int) -> int:
    record = zone_record(zone)
    if record is not None:
        return record["epsg"]
    return 32700 + zone


def derived() -> dict:
    ell = ellipsoid()
    a = ell["a"]
    f = ell["f"]
    e2 = f * (2 - f)
    return {
        "a": a,
        "k0": ell["k0"],
        "false_easting": ell["falseEasting"],
        "false_northing": ell["falseNorthingSouth"],
        "e2": e2,
        "ep2": e2 / (1 - e2),
    }
