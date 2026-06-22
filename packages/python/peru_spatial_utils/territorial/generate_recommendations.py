from typing import Iterable, List

from .recommendation_for import recommendation_for


def generate_recommendations(entities: Iterable[str]) -> List[str]:
    seen: set[str] = set()
    result: List[str] = []
    for entity in entities:
        if entity in seen:
            continue
        seen.add(entity)
        result.append(recommendation_for(entity))
    return result
