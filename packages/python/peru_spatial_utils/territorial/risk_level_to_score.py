_SCORES = {"BAJO": 1, "MEDIO": 2, "ALTO": 3}


def risk_level_to_score(level: str) -> int:
    return _SCORES.get(level, 0)
