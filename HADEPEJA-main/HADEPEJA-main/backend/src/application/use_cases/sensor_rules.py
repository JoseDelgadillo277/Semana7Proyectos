def evaluar_sensor(reading):
    valores = {
        "humedad_suelo": float(reading.humedad_suelo),
        "temperatura": float(reading.temperatura),
        "luminosidad": float(reading.luminosidad),
        "humedad_ambiental": float(reading.humedad_ambiental),
    }

    reglas = [
        {
            "variable": "Humedad del Suelo",
            "valor": valores["humedad_suelo"],
            "unidad": "%",
            "baja_critica": 25,
            "baja": 40,
            "alta": 80,
            "alta_critica": 90,
            "mensaje_baja_critica": "Humedad crítica: se requiere riego urgente",
            "mensaje_baja": "Humedad baja: revisar frecuencia de riego",
            "mensaje_alta": "Humedad alta: reducir riego temporalmente",
            "mensaje_alta_critica": "Humedad excesiva: riesgo de encharcamiento",
        },
        {
            "variable": "Temperatura",
            "valor": valores["temperatura"],
            "unidad": "°C",
            "baja_critica": 10,
            "baja": 18,
            "alta": 30,
            "alta_critica": 35,
            "mensaje_baja_critica": "Temperatura crítica baja: proteger el cultivo del frío",
            "mensaje_baja": "Temperatura baja: considerar cobertura térmica",
            "mensaje_alta": "Temperatura elevada: revisar sombra o ventilación",
            "mensaje_alta_critica": "Temperatura crítica alta: aplicar sombra y ventilación urgente",
        },
        {
            "variable": "Luminosidad",
            "valor": valores["luminosidad"],
            "unidad": "lux",
            "baja_critica": 150,
            "baja": 200,
            "alta": 800,
            "alta_critica": 900,
            "mensaje_baja_critica": "Luz crítica baja: fotosíntesis comprometida",
            "mensaje_baja": "Luz insuficiente: aumentar exposición del cultivo",
            "mensaje_alta": "Luz alta: vigilar estrés por radiación",
            "mensaje_alta_critica": "Luz crítica alta: aplicar sombra al cultivo",
        },
        {
            "variable": "Humedad del Aire",
            "valor": valores["humedad_ambiental"],
            "unidad": "%",
            "baja_critica": 30,
            "baja": 35,
            "alta": 75,
            "alta_critica": 90,
            "mensaje_baja_critica": "Humedad ambiental crítica baja: riesgo de deshidratación",
            "mensaje_baja": "Humedad ambiental baja: revisar nebulización o riego",
            "mensaje_alta": "Humedad ambiental alta: mejorar ventilación",
            "mensaje_alta_critica": "Humedad ambiental crítica alta: riesgo de hongos",
        },
    ]

    alertas = []
    estados = {}

    for regla in reglas:
        valor = regla["valor"]
        estado = "adecuado"
        tipo = None
        mensaje = None

        if valor < regla["baja_critica"]:
            estado = "critico"
            tipo = "critico"
            mensaje = regla["mensaje_baja_critica"]
        elif valor < regla["baja"]:
            estado = "advertencia"
            tipo = "advertencia"
            mensaje = regla["mensaje_baja"]
        elif valor > regla["alta_critica"]:
            estado = "critico"
            tipo = "critico"
            mensaje = regla["mensaje_alta_critica"]
        elif valor > regla["alta"]:
            estado = "advertencia"
            tipo = "advertencia"
            mensaje = regla["mensaje_alta"]

        estados[regla["variable"]] = estado

        if mensaje:
            alertas.append({
                "tipo": tipo,
                "variable": regla["variable"],
                "mensaje": f"{mensaje}: {valor:g} {regla['unidad']}",
                "fecha": reading.fecha.isoformat() if reading.fecha else None,
            })

    return {"estados": estados, "alertas": alertas}
