from pathlib import Path

import joblib

from IA.domain.entities.datos_huerto import DatosHuerto
from IA.domain.ports.modelo_humedad_port import ModeloHumedadPort


class ModeloHumedadJoblib(ModeloHumedadPort):
    def __init__(self, modelo_path: Path):
        self.modelo_path = modelo_path

    def predecir_humedad(self, datos: DatosHuerto) -> float:
        if not self.modelo_path.exists():
            raise FileNotFoundError("Modelo no entrenado. Ejecuta primero: python IA/entrenar_modelo.py")

        modelo = joblib.load(self.modelo_path)
        entrada = [[datos.humedad_suelo, datos.temperatura, datos.luz, datos.humedad_aire]]
        return modelo.predict(entrada)[0]

