from typing import Optional

from ._records import UbigeoRecord, departments, lookup


def get_department(code: str) -> Optional[UbigeoRecord]:
    return lookup(departments(), code)
