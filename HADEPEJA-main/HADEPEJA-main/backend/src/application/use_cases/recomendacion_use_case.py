from src.domain.ports.recomendacion_port import RecomendacionRepositoryPort
from src.domain.entities.recomendacion import Recomendacion

class RecomendacionUseCase:
    def __init__(self, repository: RecomendacionRepositoryPort):
        self.repository = repository

    def obtener_recomendaciones(self):
        return self.repository.get_all()

    def aplicar_recomendacion(self, rec_id: int):
        return self.repository.aplicar(rec_id)
