from src.domain.ports.etapa_port import EtapaRepositoryPort

class EtapaUseCase:
    def __init__(self, repository: EtapaRepositoryPort):
        self.repository = repository

    def obtener_etapas(self):
        return self.repository.get_all()

    def actualizar_etapa(self, etapa_id: int, data: dict):
        return self.repository.update(etapa_id, data)
