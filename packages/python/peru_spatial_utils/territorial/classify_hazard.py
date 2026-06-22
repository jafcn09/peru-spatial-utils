from ._data import hazards


def classify_hazard(text: str) -> str:
    lowered = text.lower()
    data = hazards()
    for rule in data["rules"]:
        for keyword in rule["keywords"]:
            if keyword in lowered:
                return rule["type"]
    return data["default"]
