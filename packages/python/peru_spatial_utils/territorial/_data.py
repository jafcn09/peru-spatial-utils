from functools import lru_cache

from .._data import load_json


@lru_cache(maxsize=None)
def recommendations() -> dict:
    return load_json("territorial", "recommendations.json")


@lru_cache(maxsize=None)
def hazards() -> dict:
    return load_json("territorial", "hazard-keywords.json")
