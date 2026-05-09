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
        elif datos.humedad_suelo < 40:
            recomendaciones.append("Humedad baja: revisar la frecuencia de riego.")
            prioridad = "media"
        elif datos.humedad_suelo > 90:
            recomendaciones.append("Humedad excesiva: riesgo de encharcamiento en el cultivo.")
            prioridad = "alta"
        elif datos.humedad_suelo > 80:
            recomendaciones.append("Humedad alta: reducir el riego temporalmente.")
            prioridad = "media"

        if datos.temperatura < 10:
            recomendaciones.append("Temperatura crítica baja: proteger el cultivo del frío.")
            prioridad = "alta"
        elif datos.temperatura < 18:
            recomendaciones.append("Temperatura baja: considerar cobertura térmica.")
            if prioridad != "alta":
                prioridad = "media"
        elif datos.temperatura > 35:
            recomendaciones.append("Temperatura crítica alta: aplicar sombra y ventilación urgente.")
            prioridad = "alta"
        elif datos.temperatura > 30:
            recomendaciones.append("Temperatura elevada: revisar sombra o ventilación del cultivo.")
            if prioridad != "alta":
                prioridad = "media"

        if datos.luz < 150:
            recomendaciones.append("Luz crítica baja: la fotosíntesis puede verse comprometida.")
            prioridad = "alta"
        elif datos.luz < 200:
            recomendaciones.append("Luminosidad baja: el cultivo necesita más exposición a la luz.")
            if prioridad != "alta":
                prioridad = "media"
        elif datos.luz > 900:
            recomendaciones.append("Luz crítica alta: aplicar sombra al cultivo.")
            prioridad = "alta"
        elif datos.luz > 800:
            recomendaciones.append("Luz alta: vigilar posible estrés por radiación.")
            if prioridad != "alta":
                prioridad = "media"

        if datos.humedad_aire < 30:
            recomendaciones.append("Humedad ambiental crítica baja: riesgo de deshidratación.")
            prioridad = "alta"
        elif datos.humedad_aire < 35:
            recomendaciones.append("Humedad ambiental baja: revisar nebulización o riego.")
            if prioridad != "alta":
                prioridad = "media"
        elif datos.humedad_aire > 90:
            recomendaciones.append("Humedad ambiental crítica alta: riesgo de hongos.")
            prioridad = "alta"
        elif datos.humedad_aire > 75:
            recomendaciones.append("Humedad ambiental alta: mejorar la ventilación.")
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
