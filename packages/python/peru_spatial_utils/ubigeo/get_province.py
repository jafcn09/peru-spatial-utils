from typing import Optional

from ._records import UbigeoRecord, lookup, provinces


def get_province(code: str) -> Optional[UbigeoRecord]:
    return lookup(provinces(), code)
