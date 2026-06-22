from .to_hectares import to_hectares


def format_area(m2: float) -> str:
    hectares = to_hectares(m2)
    return f"{m2:,.2f} m² ({hectares:,.2f} ha)"
