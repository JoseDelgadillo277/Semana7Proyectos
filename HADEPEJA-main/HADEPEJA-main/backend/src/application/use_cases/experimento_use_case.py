from src.domain.ports.experimento_port import ExperimentoRepositoryPort
from src.domain.entities.experimento import Experimento

class ExperimentoUseCase:
    def __init__(self, repository: ExperimentoRepositoryPort):
        self.repository = repository

    def obtener_experimentos(self):
        return self.repository.get_all()

    def crear_experimento(self, data: dict):
        exp = Experimento(**data)
        return self.repository.save(exp)

    def actualizar_experimento(self, exp_id: int, data: dict):
        return self.repository.update(exp_id, data)

    def eliminar_experimento(self, exp_id: int):
        return self.repository.delete(exp_id)
