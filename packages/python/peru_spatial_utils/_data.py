import json
from functools import lru_cache
from importlib import resources
from typing import Any


@lru_cache(maxsize=None)
def load_json(*parts: str) -> Any:
    resource = resources.files("peru_spatial_utils.data")
    for part in parts:
        resource = resource.joinpath(part)
    with resource.open("r", encoding="utf-8") as handle:
        return json.load(handle)
