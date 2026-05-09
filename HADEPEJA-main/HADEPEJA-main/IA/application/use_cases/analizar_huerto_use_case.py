from IA.domain.entities.datos_huerto import DatosHuerto
from IA.domain.ports.modelo_humedad_port import ModeloHumedadPort


class AnalizarHuertoUseCase:
    def __init__(self, modelo_humedad: ModeloHumedadPort):
        self.modelo_humedad = modelo_humedad

    def generar_recomendacion(self, datos: DatosHuerto):
        recomendaciones = []
        prioridad = "baja"

        if datos.humedad_suelo < 25:
            recomendaciones.append("Riego urgente: la humedad del suelo está por debajo del 25%.")
            prioridad = "alta"

        if datos.temperatura > 32:
            recomendaciones.append("Temperatura elevada: revisar sombra o ventilación del cultivo.")
            prioridad = "alta"

        if datos.luz < 200:
            recomendaciones.append("Luminosidad baja: el cultivo necesita más exposición a la luz.")
            if prioridad != "alta":
                prioridad = "media"

        if not recomendaciones:
            recomendaciones.append("El huerto se encuentra en condiciones normales.")

        return {
            "estado": "analizado",
            "prioridad": prioridad,
            "recomendaciones": recomendaciones,
        }

    def predecir_humedad(self, datos: DatosHuerto):
        humedad_futura = self.modelo_humedad.predecir_humedad(datos)

        return {
            "humedad_futura_predicha": round(float(humedad_futura), 2),
            "mensaje": "Predicción generada correctamente",
        }

