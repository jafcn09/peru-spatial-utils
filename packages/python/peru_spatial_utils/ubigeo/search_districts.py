from typing import List

from ._normalize import normalize
from ._records import UbigeoRecord, districts


def _rank(name: str, query: str) -> int:
    if name == query:
        return 0
    if name.startswith(query):
        return 1
    if (" " + query) in name:
        return 2
    if query in name:
        return 3
    return -1


def search_districts(query: str, limit: int = 10) -> List[UbigeoRecord]:
    normalized = normalize(query)
    if not normalized:
        return []
    scored: List[tuple[int, int, UbigeoRecord]] = []
    for order, record in enumerate(districts().values()):
        rank = _rank(normalize(record["name"]), normalized)
        if rank >= 0:
            scored.append((rank, order, record))
    scored.sort(key=lambda item: (item[0], item[1]))
    return [record for _, _, record in scored[:limit]]
