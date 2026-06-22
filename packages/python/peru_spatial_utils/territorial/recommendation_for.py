from ._data import recommendations


def recommendation_for(entity: str) -> str:
    data = recommendations()
    entities = data["entities"]
    if entity in entities:
        return entities[entity]
    return data["fallback"].replace("{entity}", entity)
