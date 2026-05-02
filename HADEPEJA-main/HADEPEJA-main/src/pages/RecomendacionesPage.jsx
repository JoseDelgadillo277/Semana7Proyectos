import { useState, useEffect } from 'react';
import Topbar from '../components/common/Topbar';
import { api } from '../api';

const P_CFG = {
  alta: {
    emoji: '🚨',
    label: 'Urgente',
    bg: '#FEF2F2',
    border: '#FECACA',
    color: '#991B1B',
    btn: '#EF4444',
  },
  media: {
    emoji: '⚠️',
    label: 'Importante',
    bg: '#FEF3DC',
    border: '#FCD88A',
    color: '#92400E',
    btn: '#F5A623',
  },
  baja: {
    emoji: '💡',
    label: 'Sugerencia',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    color: '#1D4ED8',
    btn: '#3B82F6',
  },
};

export default function RecomendacionesPage() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  const [consejoIA, setConsejoIA] = useState(
    'Analizando datos actuales del huerto...'
  );
  const [prioridadIA, setPrioridadIA] = useState('baja');

  const [prediccionHumedad, setPrediccionHumedad] = useState(null);
  const [mensajePrediccion, setMensajePrediccion] = useState(
    'Calculando predicción del modelo entrenado...'
  );

  const cargarConsejoIA = async () => {
    try {
      const sensor = await api.getSensorActual();

      const datosSensor = {
        humedad_suelo: Number(sensor.humedad_suelo || 0),
        temperatura: Number(sensor.temperatura || 0),
        luz: Number(sensor.luminosidad || 0),
        humedad_aire: Number(sensor.humedad_ambiental || 0),
      };

      const response = await fetch('http://127.0.0.1:8000/api/ia/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosSensor),
      });

      const data = await response.json();

      if (data.recomendaciones && data.recomendaciones.length > 0) {
        setConsejoIA(data.recomendaciones[0]);
        setPrioridadIA(data.prioridad || 'baja');
      } else {
        setConsejoIA('La IA no encontró recomendaciones críticas por ahora.');
        setPrioridadIA('baja');
      }

      const responsePrediccion = await fetch(
        'http://127.0.0.1:8000/api/ia/predecir',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosSensor),
        }
      );

      const dataPrediccion = await responsePrediccion.json();

      if (dataPrediccion.humedad_futura_predicha !== undefined) {
        setPrediccionHumedad(dataPrediccion.humedad_futura_predicha);
        setMensajePrediccion(
          dataPrediccion.mensaje || 'Predicción generada correctamente.'
        );
      } else {
        setPrediccionHumedad(null);
        setMensajePrediccion(
          dataPrediccion.error || 'No se pudo generar la predicción.'
        );
      }
    } catch (error) {
      console.error('Error al obtener información IA:', error);

      setConsejoIA('No se pudo cargar la recomendación IA desde el backend.');
      setPrioridadIA('baja');

      setPrediccionHumedad(null);
      setMensajePrediccion(
        'No se pudo cargar la predicción del modelo entrenado.'
      );
    }
  };

  useEffect(() => {
    api
      .getRecomendaciones()
      .then((data) => setLista(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));

    cargarConsejoIA();

    const intervalo = setInterval(cargarConsejoIA, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const aplicar = async (id) => {
    try {
      const updated = await api.aplicarRecomendacion(id);
      setLista((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {}
  };

  if (loading) {
    return (
      <div>
        <Topbar />
        <div style={{ padding: '30px' }}>⏳ Cargando recomendaciones...</div>
      </div>
    );
  }

  const cfgIA = P_CFG[prioridadIA] || P_CFG.baja;

  return (
    <div style={{ background: '#F8FAFB', minHeight: '100vh' }}>
      <Topbar />

      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Encabezado principal */}
        <div
          style={{
            background: '#D1FAE5',
            border: '2px solid #6EE7B7',
            borderRadius: '20px',
            padding: '20px 28px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '2rem', marginRight: '8px' }}>🤖</span>

          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                margin: 0,
                fontWeight: 900,
                color: '#047857',
              }}
            >
              ¡El sistema analizó tu huerto!
            </h1>

            <p style={{ color: '#047857', margin: 0, fontWeight: 600 }}>
              {lista.filter((r) => !r.aplicada).length} sugerencias pendientes ·{' '}
              {lista.filter((r) => r.aplicada).length} aplicadas ✅
            </p>
          </div>
        </div>

        {/* Recomendación IA en tiempo real */}
        <section
          style={{
            padding: '24px',
            borderRadius: '16px',
            background: cfgIA.bg,
            border: `2px solid ${cfgIA.border}`,
            color: cfgIA.color,
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              fontSize: '2rem',
              background: '#fff',
              borderRadius: '50%',
              border: `2px solid ${cfgIA.border}`,
              padding: '4px 8px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          >
            🤖
          </span>

          <div
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '10px',
              marginLeft: '52px',
              border: `1.5px solid ${cfgIA.border}`,
            }}
          >
            {cfgIA.emoji} IA {cfgIA.label}
          </div>

          <h3
            style={{
              margin: '0 0 8px 52px',
              fontSize: '1.1rem',
              fontWeight: 800,
            }}
          >
            Recomendación IA en tiempo real
          </h3>

          <p
            style={{
              marginBottom: '10px',
              marginLeft: '52px',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {consejoIA}
          </p>

          <p style={{ fontWeight: 700, margin: '0 0 0 52px', fontSize: '0.95rem' }}>
            Prioridad IA:{' '}
            <span style={{ textTransform: 'capitalize' }}>{prioridadIA}</span>
          </p>
        </section>

        {/* Predicciones de IA */}
        <section
          style={{
            padding: '24px',
            borderRadius: '16px',
            background: '#EFF6FF',
            border: '2px solid #BFDBFE',
            color: '#1D4ED8',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              fontSize: '2rem',
              background: '#fff',
              borderRadius: '50%',
              border: '2px solid #BFDBFE',
              padding: '4px 8px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          >
            🤖
          </span>

          <div
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '10px',
              marginLeft: '52px',
              border: '1.5px solid #BFDBFE',
            }}
          >
            🤖 Modelo entrenado
          </div>

          <h3
            style={{
              margin: '0 0 8px 52px',
              fontSize: '1.1rem',
              fontWeight: 800,
            }}
          >
            Predicciones de IA
          </h3>

          {prediccionHumedad !== null ? (
            <>
              <p style={{ marginBottom: '8px', marginLeft: '52px', fontSize: '0.95rem' }}>
                Humedad futura estimada del suelo:
              </p>

              <p
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  margin: '8px 0 8px 52px',
                }}
              >
                {prediccionHumedad}%
              </p>

              <p style={{ marginBottom: '8px', marginLeft: '52px', fontSize: '0.95rem' }}>
                <strong>Modelo usado:</strong> modelo_humedad.pkl
              </p>

              <p style={{ fontWeight: 700, margin: '0 0 0 52px', fontSize: '0.95rem' }}>
                {mensajePrediccion}
              </p>
            </>
          ) : (
            <p style={{ fontWeight: 700, margin: '0 0 0 52px', fontSize: '0.95rem' }}>
              {mensajePrediccion}
            </p>
          )}
        </section>

        {lista.length === 0 ? (
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#F9FAFB',
              border: '2px solid #E5E7EB',
              color: '#374151',
              fontWeight: 700,
              textAlign: 'center',
              fontSize: '1rem',
            }}
          >
            No hay recomendaciones disponibles.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {lista.map((r, i) => {
              const cfg = P_CFG[r.prioridad] || P_CFG.baja;

              return (
                <div
                  key={r.id || i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: r.aplicada ? '#F3F4F6' : cfg.bg,
                    border: `2px solid ${
                      r.aplicada ? '#E5E7EB' : cfg.border
                    }`,
                    color: r.aplicada ? '#6B7280' : cfg.color,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                      {r.aplicada ? '✅' : r.icono || cfg.emoji}
                    </div>

                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        marginBottom: '8px',
                        color: r.aplicada ? '#10B981' : cfg.color,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {r.aplicada ? (
                        <>
                          <span style={{ fontSize: '1.2rem' }}>✓</span>{' '}
                          Aplicado
                        </>
                      ) : (
                        <>
                          {cfg.emoji} {cfg.label}
                        </>
                      )}
                    </div>

                    <h3
                      style={{
                        margin: '0 0 6px 0',
                        fontWeight: 900,
                        fontSize: '1.1rem',
                      }}
                    >
                      {r.accion}
                    </h3>

                    <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>
                      {r.descripcion}
                    </p>

                    <div style={{ margin: '10px 0 0 0' }}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: r.aplicada ? '#6B7280' : cfg.color,
                        }}
                      >
                        🎯 Confianza:
                      </span>

                      <div
                        style={{
                          height: '8px',
                          width: '100%',
                          background: '#E5E7EB',
                          borderRadius: '8px',
                          margin: '6px 0 0 0',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${r.confianza}%`,
                            height: '100%',
                            background: r.aplicada ? '#10B981' : cfg.btn,
                            borderRadius: '8px',
                            transition: 'width 0.5s',
                          }}
                        />
                      </div>

                      <span
                        style={{
                          marginLeft: '8px',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                        }}
                      >
                        {r.confianza}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => !r.aplicada && aplicar(r.id)}
                    disabled={r.aplicada}
                    style={{
                      flexShrink: 0,
                      padding: '12px 24px',
                      background: r.aplicada ? '#E5E7EB' : cfg.btn,
                      color: r.aplicada ? '#9CA3AF' : '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 900,
                      fontSize: '0.95rem',
                      cursor: r.aplicada ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      alignSelf: 'center',
                      whiteSpace: 'nowrap',
                      boxShadow: r.aplicada ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {r.aplicada ? '✅ Listo' : '✓ Aplicar'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {lista.length > 0 && lista.every((r) => r.aplicada) && (
          <div
            style={{
              marginTop: '20px',
              padding: '18px',
              borderRadius: '16px',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#065F46',
              fontWeight: 700,
            }}
          >
            ¡Aplicaste todos los consejos!
            <br />
            Tu huerto está recibiendo el mejor cuidado posible.
          </div>
        )}
      </main>
    </div>
  );
}