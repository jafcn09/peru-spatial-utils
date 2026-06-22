from ._data import hazards


def hazard_for_category(category: str) -> str:
    data = hazards()
    return data["categoryFallback"].get(category, data["default"])
