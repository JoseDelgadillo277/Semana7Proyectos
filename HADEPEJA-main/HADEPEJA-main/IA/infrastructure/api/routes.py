from pathlib import Path

from fastapi import APIRouter
from pydantic import BaseModel

from IA.application.use_cases.analizar_huerto_use_case import AnalizarHuertoUseCase
from IA.domain.entities.datos_huerto import DatosHuerto
from IA.infrastructure.adapters.modelo_humedad_joblib import ModeloHumedadJoblib


router = APIRouter(prefix="/api/ia", tags=["IA"])
MODELO_HUMEDAD_PATH = Path(__file__).resolve().parents[1] / "models" / "modelo_humedad.pkl"


class DatosHuertoRequest(BaseModel):
    humedad_suelo: float
    temperatura: float
    luz: float
    humedad_aire: float

    def to_entity(self) -> DatosHuerto:
        return DatosHuerto(
            humedad_suelo=self.humedad_suelo,
            temperatura=self.temperatura,
            luz=self.luz,
            humedad_aire=self.humedad_aire,
        )


def get_use_case() -> AnalizarHuertoUseCase:
    modelo_humedad = ModeloHumedadJoblib(MODELO_HUMEDAD_PATH)
    return AnalizarHuertoUseCase(modelo_humedad)


@router.post("/recomendar")
def recomendar(datos: DatosHuertoRequest):
    return get_use_case().generar_recomendacion(datos.to_entity())


@router.post("/predecir")
def predecir(datos: DatosHuertoRequest):
    try:
        return get_use_case().predecir_humedad(datos.to_entity())
    except FileNotFoundError as exc:
        return {"error": str(exc)}

