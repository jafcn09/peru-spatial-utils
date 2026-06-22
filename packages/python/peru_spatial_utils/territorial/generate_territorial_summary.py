from typing import List, Mapping, Sequence

_PRIORITY = ["ALTO", "MEDIO", "BAJO"]


def generate_territorial_summary(
    intersections: Sequence[Mapping[str, str]],
) -> str:
    if not intersections:
        return "El territorio no presenta superposiciones con las capas evaluadas."

    present = {item.get("level") for item in intersections}
    dominant = next(level for level in _PRIORITY if level in present)
    entities: List[str] = [item.get("entity", "") for item in intersections]
    count = len(intersections)
    joined = ", ".join(entities)
    return (
        f"El territorio presenta superposicion de nivel {dominant} con "
        f"{count} entidad(es): {joined}."
    )
