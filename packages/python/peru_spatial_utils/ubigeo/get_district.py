from typing import Optional

from ._records import UbigeoRecord, districts, lookup


def get_district(code: str) -> Optional[UbigeoRecord]:
    return lookup(districts(), code)
