export function evaluarValor(valor, limites) {
  const n = Number(valor);

  if (!Number.isFinite(n)) return 'adecuado';
  if (n < limites.bajaCritica) return 'critico';
  if (n < limites.baja) return 'advertencia';
  if (n > limites.altaCritica) return 'critico';
  if (n > limites.alta) return 'advertencia';
  return 'adecuado';
}

export function etiquetaEstado(estado) {
  if (estado === 'critico') return 'Crítico';
  if (estado === 'advertencia') return 'Atención';
  return 'Normal';
}

export function colorEstado(estado) {
  if (estado === 'critico') return '#991B1B';
  if (estado === 'advertencia') return '#92400E';
  return '#166534';
}

export function evaluarSensores(sensor) {
  return {
    humedadSuelo: evaluarValor(sensor?.humedad_suelo, {
      bajaCritica: 25,
      baja: 40,
      alta: 80,
      altaCritica: 90,
    }),
    temperatura: evaluarValor(sensor?.temperatura, {
      bajaCritica: 10,
      baja: 18,
      alta: 30,
      altaCritica: 35,
    }),
    luminosidad: evaluarValor(sensor?.luminosidad, {
      bajaCritica: 150,
      baja: 200,
      alta: 800,
      altaCritica: 900,
    }),
    humedadAire: evaluarValor(sensor?.humedad_ambiental, {
      bajaCritica: 30,
      baja: 35,
      alta: 75,
      altaCritica: 90,
    }),
  };
}
