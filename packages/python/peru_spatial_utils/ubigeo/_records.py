from functools import lru_cache
from typing import Optional, TypedDict

from .._data import load_json


class UbigeoRecord(TypedDict):
    code: str
    name: str
    capital: str
    lat: float
    lng: float


@lru_cache(maxsize=None)
def _index(filename: str) -> dict[str, UbigeoRecord]:
    records = load_json("ubigeo", filename)
    return {record["code"]: record for record in records}


def departments() -> dict[str, UbigeoRecord]:
    return _index("departments.json")


def provinces() -> dict[str, UbigeoRecord]:
    return _index("provinces.json")


def districts() -> dict[str, UbigeoRecord]:
    return _index("districts.json")


def lookup(level: dict[str, UbigeoRecord], code: str) -> Optional[UbigeoRecord]:
    return level.get(code)
