from typing import Any, Iterator, TypedDict


class BoundingBox(TypedDict):
    minX: float
    minY: float
    maxX: float
    maxY: float


def _coords(node: Any) -> Iterator[tuple[float, float]]:
    if (
        isinstance(node, (list, tuple))
        and len(node) >= 2
        and isinstance(node[0], (int, float))
        and isinstance(node[1], (int, float))
    ):
        yield float(node[0]), float(node[1])
        return
    if isinstance(node, (list, tuple)):
        for item in node:
            yield from _coords(item)


def _geometries(geojson: dict) -> Iterator[dict]:
    kind = geojson.get("type")
    if kind == "FeatureCollection":
        for feature in geojson.get("features", []):
            yield from _geometries(feature)
    elif kind == "Feature":
        geometry = geojson.get("geometry")
        if geometry is not None:
            yield from _geometries(geometry)
    elif kind == "GeometryCollection":
        for geometry in geojson.get("geometries", []):
            yield from _geometries(geometry)
    elif kind is not None:
        yield geojson


def bounding_box(geojson: dict) -> BoundingBox:
    min_x = min_y = float("inf")
    max_x = max_y = float("-inf")
    for geometry in _geometries(geojson):
        for lng, lat in _coords(geometry.get("coordinates")):
            min_x = min(min_x, lng)
            max_x = max(max_x, lng)
            min_y = min(min_y, lat)
            max_y = max(max_y, lat)
    return {"minX": min_x, "minY": min_y, "maxX": max_x, "maxY": max_y}
