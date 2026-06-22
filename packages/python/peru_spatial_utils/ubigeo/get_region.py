from typing import Optional

from ._records import UbigeoRecord
from .get_department import get_department


def get_region(code: str) -> Optional[UbigeoRecord]:
    return get_department(code)
