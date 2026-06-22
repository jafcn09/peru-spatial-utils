from ._records import departments, districts, provinces


def is_valid_ubigeo(code: str) -> bool:
    if not code.isdigit():
        return False
    length = len(code)
    if length == 2:
        return code in departments()
    if length == 4:
        return code in provinces()
    if length == 6:
        return code in districts()
    return False
