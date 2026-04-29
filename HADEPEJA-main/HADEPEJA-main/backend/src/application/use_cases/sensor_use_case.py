from src.domain.ports.repository_port import SensorRepositoryPort
from src.domain.entities.sensor import SensorReading

class SensorUseCase:
    def __init__(self, repository: SensorRepositoryPort):
        self.repository = repository

    def registrar_lectura(self, data: dict):
        # Aquí puedes agregar lógica: ej. disparar alerta si la temp > 40
        nueva_lectura = SensorReading(**data)
        return self.repository.save(nueva_lectura)

    def obtener_estado_actual(self):
        return self.repository.get_latest()

    def obtener_historial(self, limit: int = 24):
        return self.repository.get_history(limit)
