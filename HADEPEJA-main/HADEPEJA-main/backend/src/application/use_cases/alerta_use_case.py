from src.domain.ports.alerta_port import AlertaRepositoryPort
from src.domain.entities.alerta import Alerta

class AlertaUseCase:
    def __init__(self, repository: AlertaRepositoryPort):
        self.repository = repository

    def obtener_alertas(self):
        return self.repository.get_all()

    def crear_alerta(self, data: dict):
        alerta = Alerta(**data)
        return self.repository.save(alerta)
