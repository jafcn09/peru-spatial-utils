from typing import Optional


def parent_of(code: str) -> Optional[str]:
    if len(code) == 6:
        return code[:4]
    if len(code) == 4:
        return code[:2]
    return None
