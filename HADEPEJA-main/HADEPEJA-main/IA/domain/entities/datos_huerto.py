from dataclasses import dataclass


@dataclass
class DatosHuerto:
    humedad_suelo: float
    temperatura: float
    luz: float
    humedad_aire: float

