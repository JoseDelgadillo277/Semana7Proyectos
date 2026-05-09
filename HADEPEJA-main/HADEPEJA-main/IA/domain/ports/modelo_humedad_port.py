from abc import ABC, abstractmethod

from IA.domain.entities.datos_huerto import DatosHuerto


class ModeloHumedadPort(ABC):
    @abstractmethod
    def predecir_humedad(self, datos: DatosHuerto) -> float:
        pass

