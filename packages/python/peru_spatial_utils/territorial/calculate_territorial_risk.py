from typing import Iterable, Mapping, TypedDict

_WEIGHTS = {"BAJO": 10, "MEDIO": 20, "ALTO": 34}


class TerritorialRisk(TypedDict):
    risk: str
    score: int


def calculate_territorial_risk(
    intersections: Iterable[Mapping[str, str]],
) -> TerritorialRisk:
    total = sum(_WEIGHTS.get(item.get("level", ""), 0) for item in intersections)
    score = min(100, total)
    if score >= 67:
        risk = "ALTO"
    elif score >= 34:
        risk = "MEDIO"
    else:
        risk = "BAJO"
    return {"risk": risk, "score": score}
