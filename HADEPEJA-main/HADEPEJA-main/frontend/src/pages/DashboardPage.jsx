import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Topbar from '../components/common/Topbar';
import MetricCard from '../components/dashboard/MetricCard';
import { api } from '../api';
import { evaluarSensores } from '../utils/sensorRules';

const TT = {
  contentStyle: {
    background: '#fff',
    border: '1px solid #E2EBE4',
    borderRadius: 12,
    fontSize: '0.82rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  },
};

const ALERTA_CFG = {
  critico: { emoji: '🚨', bg: '#FEF2F2', border: '#FECACA', color: '#991B1B' },
  advertencia: { emoji: '⚠️', bg: '#FEF3DC', border: '#FCD88A', color: '#92400E' },
  info: { emoji: 'ℹ️', bg: '#EFF6FF', border: '#BFDBFE', color: '#1D4ED8' },
};

const SENSOR_VACIO = {
  humedad_suelo: 0,
  temperatura: 0,
  luminosidad: 0,
  humedad_ambiental: 0,
};

const SENSOR_UPDATE_DELAY_MS = 1000;

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function formatHora(isoStr) {
  try {
    return new Date(isoStr).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return isoStr;
  }
}

export default function DashboardPage() {
  const [sensor, setSensor] = useState(SENSOR_VACIO);
  const [historico, setHistorico] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [ultimaAct, setUltimaAct] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [consejoIA, setConsejoIA] = useState('Cargando recomendación de IA...');
  const [prioridadIA, setPrioridadIA] = useState('baja');

  const cargarConsejoIA = async (datosSensor) => {
    try {
      const data = await api.recomendarIA({
        humedad_suelo: Number(datosSensor.humedad_suelo || 0),
        temperatura: Number(datosSensor.temperatura || 0),
        luz: Number(datosSensor.luminosidad || 0),
        humedad_aire: Number(datosSensor.humedad_ambiental || 0),
      });

      if (data.recomendaciones && data.recomendaciones.length > 0) {
        setConsejoIA(data.recomendaciones[0]);
        setPrioridadIA(data.prioridad || 'baja');
      } else {
        setConsejoIA('La IA no encontró recomendaciones por ahora.');
        setPrioridadIA('baja');
      }
    } catch (error) {
      console.error('Error al obtener recomendación IA:', error);
      setConsejoIA('No se pudo cargar la recomendación de IA.');
      setPrioridadIA('desconocida');
    }
  };

  const cargarDatos = async () => {
    try {
      const [current, history, alertasData] = await Promise.all([
        api.getSensorActual(),
        api.getSensorHistory(24),
        api.getAlertas(),
      ]);

      await esperar(SENSOR_UPDATE_DELAY_MS);

      if (current && !current.message) {
        setSensor(current);
        setUltimaAct(new Date());
        cargarConsejoIA(current);
      }

      if (Array.isArray(history) && history.length > 0) {
        setHistorico(history.map((r) => ({
          hora: formatHora(r.fecha),
          humedad: Math.round(r.humedad_suelo),
          temperatura: Math.round(r.temperatura),
          luz: Math.round(r.luminosidad),
        })).reverse());
      }

      if (Array.isArray(alertasData)) setAlertas(alertasData);
    } catch {
      // Servidor no disponible: la UI mantiene los valores actuales.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
    const t = setInterval(cargarDatos, 6000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const estados = evaluarSensores(sensor);

  return (
    <div style={{ flex: 1 }}>
      <Topbar title="¿Cómo está mi huerto?" subtitle="Datos en tiempo real de los sensores" emoji="🏠" />
      <div className="page-wrapper">
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', background: 'var(--green-light)',
          border: '1.5px solid var(--green)', borderRadius: 20,
          fontSize: '0.8rem', fontWeight: 700, color: 'var(--green)', marginBottom: 20,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: loading ? '#FCD88A' : 'var(--green)' }} />
          {loading ? 'Cargando...' : `Actualizando cada 6s · ${ultimaAct.toLocaleTimeString('es-PE')}`}
        </div>

        <div className="metrics-grid" style={{ marginBottom: 24 }}>
          <MetricCard icon="💧" label="Humedad del Suelo" value={Math.round(sensor.humedad_suelo)} unit="%" color="green" estado={estados.humedadSuelo} />
          <MetricCard icon="🌡️" label="Temperatura" value={Math.round(sensor.temperatura)} unit="°C" color="red" estado={estados.temperatura} />
          <MetricCard icon="☀️" label="Luz Solar" value={Math.round(sensor.luminosidad)} unit="lux" color="yellow" estado={estados.luminosidad} />
          <MetricCard icon="🌫️" label="Humedad del Aire" value={Math.round(sensor.humedad_ambiental)} unit="%" color="blue" estado={estados.humedadAire} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, marginBottom: 20 }}>
          <div className="card">
            <h2 className="section-title">📈 Cómo han cambiado los valores hoy</h2>
            {historico.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={historico.slice(-12)}>
                  <defs>
                    <linearGradient id="gH" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D9B5A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2D9B5A" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="hora" tick={{ fill: '#9CB8A0', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#9CB8A0', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip {...TT} />
                  <Area type="monotone" dataKey="humedad" name="Humedad %" stroke="#2D9B5A" strokeWidth={2.5} fill="url(#gH)" />
                  <Area type="monotone" dataKey="temperatura" name="Temperatura °C" stroke="#EF4444" strokeWidth={2.5} fill="url(#gT)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                📊 Sin datos históricos aún
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="section-title">🔔 Avisos importantes</h2>
            {alertas.length === 0 ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                ✅ Sin alertas activas
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {alertas.slice(0, 5).map((a, index) => {
                  const cfg = ALERTA_CFG[a.tipo] || ALERTA_CFG.info;
                  return (
                    <div key={a.id || `${a.variable}-${index}`} style={{
                      padding: '12px 14px', background: cfg.bg,
                      border: `1.5px solid ${cfg.border}`,
                      borderRadius: 'var(--radius)', display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{cfg.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.82rem', color: cfg.color }}>{a.mensaje}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{a.variable}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div style={{
          padding: '18px 22px', background: 'var(--accent-light)',
          border: '2px solid #FCD88A', borderRadius: 'var(--radius-lg)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{ fontSize: 32, flexShrink: 0 }}>🤖</span>
          <div>
            <div style={{ fontWeight: 800, color: '#92400E', marginBottom: 2 }}>
              Consejo IA
            </div>
            <div style={{ fontSize: '0.88rem', color: '#B45309' }}>
              {consejoIA}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#92400E', marginTop: 4 }}>
              Prioridad IA: {prioridadIA}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
