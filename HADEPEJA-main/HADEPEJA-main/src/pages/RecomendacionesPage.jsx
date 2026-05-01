import { useState, useEffect } from 'react';
import Topbar from '../components/common/Topbar';
import { api } from '../api';

const P_CFG = {
  alta: {
    emoji: '',
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
    emoji: '',
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

  if (loading)
    return (
      <div>
        <Topbar />
        <div style={{ padding: '30px' }}>⏳ Cargando recomendaciones...</div>
      </div>
    );

  const cfgIA = P_CFG[prioridadIA] || P_CFG.baja;

  return (
    <div>
      <Topbar />

      <main style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
          ¡El sistema analizó tu huerto!
        </h1>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
          {lista.filter((r) => !r.aplicada).length} sugerencias pendientes ·{' '}
          {lista.filter((r) => r.aplicada).length} aplicadas ✅
        </p>

        {/* Recomendación IA en tiempo real */}
        <section
          style={{
            padding: '22px',
            borderRadius: 'var(--radius-lg)',
            background: cfgIA.bg,
            border: `1px solid ${cfgIA.border}`,
            color: cfgIA.color,
            marginBottom: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.85rem',
              marginBottom: '12px',
            }}
          >
            {cfgIA.emoji} IA {cfgIA.label}
          </div>

          <h3 style={{ margin: '0 0 10px 0' }}>
            Recomendación IA en tiempo real
          </h3>

          <p style={{ marginBottom: '12px' }}>{consejoIA}</p>

          <p style={{ fontWeight: 700, margin: 0 }}>
            Prioridad IA: {prioridadIA}
          </p>
        </section>

        {/* Predicciones de IA */}
        <section
          style={{
            padding: '22px',
            borderRadius: 'var(--radius-lg)',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            color: '#1D4ED8',
            marginTop: '4px',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.85rem',
              marginBottom: '12px',
            }}
          >
            🤖 Modelo entrenado
          </div>

          <h3 style={{ margin: '0 0 10px 0' }}>Predicciones de IA</h3>

          {prediccionHumedad !== null ? (
            <>
              <p style={{ marginBottom: '8px' }}>
                Humedad futura estimada del suelo:
              </p>

              <p style={{ fontSize: '2rem', fontWeight: 900, margin: '8px 0' }}>
                {prediccionHumedad}%
              </p>

              <p style={{ marginBottom: '8px' }}>
                <strong>Modelo usado:</strong> modelo_humedad.pkl
              </p>

              <p style={{ fontWeight: 700, margin: 0 }}>
                {mensajePrediccion}
              </p>
            </>
          ) : (
            <p style={{ fontWeight: 700, margin: 0 }}>{mensajePrediccion}</p>
          )}
        </section>

        {lista.length === 0 ? (
          <div
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              color: '#374151',
            }}
          >
            No hay recomendaciones disponibles.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '22px' }}>
            {lista.map((r, i) => {
              const cfg = P_CFG[r.prioridad] || P_CFG.baja;

              return (
                <div
                  key={r.id || i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '20px',
                    borderRadius: 'var(--radius-lg)',
                    background: r.aplicada ? '#F3F4F6' : cfg.bg,
                    border: `1px solid ${
                      r.aplicada ? '#E5E7EB' : cfg.border
                    }`,
                    color: r.aplicada ? '#6B7280' : cfg.color,
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                      {r.aplicada ? '✅' : r.icono || cfg.emoji}
                    </div>

                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        marginBottom: '8px',
                      }}
                    >
                      {r.aplicada ? '✓ Aplicado' : `${cfg.emoji} ${cfg.label}`}
                    </div>

                    <h3 style={{ margin: '0 0 8px 0' }}>{r.accion}</h3>

                    <p style={{ margin: '0 0 8px 0' }}>{r.descripcion}</p>

                    <p style={{ margin: 0, fontWeight: 700 }}>
                      Confianza:{' '}
                      <span style={{ marginLeft: '8px' }}>{r.confianza}%</span>
                    </p>
                  </div>

                  <button
                    onClick={() => !r.aplicada && aplicar(r.id)}
                    disabled={r.aplicada}
                    style={{
                      flexShrink: 0,
                      padding: '10px 18px',
                      background: r.aplicada ? '#E5E7EB' : cfg.btn,
                      color: r.aplicada ? '#9CA3AF' : '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: r.aplicada ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      alignSelf: 'center',
                      whiteSpace: 'nowrap',
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
              marginTop: '28px',
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
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