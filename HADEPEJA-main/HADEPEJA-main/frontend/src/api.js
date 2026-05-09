const BASE = 'http://localhost:8000/api';

const json = (res) => res.json();

const get = (url) =>
  fetch(`${BASE}${url}`, { cache: 'no-store' }).then(json);

const post = (url, body) =>
  fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

const put = (url, body) =>
  fetch(`${BASE}${url}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

const patch = (url) =>
  fetch(`${BASE}${url}`, { method: 'PATCH' });

const del = (url) =>
  fetch(`${BASE}${url}`, { method: 'DELETE' });

export const api = {
  // Auth
  login: (username, password) => post('/users/login', { username, password }).then(json),

  // Users
  getUsuarios:     ()           => get('/users'),
  crearUsuario:    (data)       => post('/users', data).then(json),
  editarUsuario:   (id, data)   => put(`/users/${id}`, data).then(json),
  eliminarUsuario: (id)         => del(`/users/${id}`).then(json),
  toggleUsuario:   (id)         => patch(`/users/${id}/toggle`).then(json),

  // Sensores
  getSensorActual:  ()           => get(`/sensors/current?t=${Date.now()}`),
  getSensorHistory: (limit = 24) => get(`/sensors/history?limit=${limit}&t=${Date.now()}`),
  postSensorReading:(data)       => post('/sensors/reading', data).then(json),

  // Alertas
  getAlertas: () => get(`/alertas?t=${Date.now()}`),

  // Recomendaciones
  getRecomendaciones:  ()    => get(`/recomendaciones?t=${Date.now()}`),
  aplicarRecomendacion:(id)  => patch(`/recomendaciones/${id}/aplicar`).then(json),

  // Experimentos
  getExperimentos:     ()         => get('/experimentos'),
  crearExperimento:    (data)     => post('/experimentos', data).then(json),
  editarExperimento:   (id, data) => put(`/experimentos/${id}`, data).then(json),
  eliminarExperimento: (id)       => del(`/experimentos/${id}`).then(json),

  // Etapas de cultivo
  getEtapas:    ()         => get('/etapas'),
  editarEtapa:  (id, data) => put(`/etapas/${id}`, data).then(json),

  // Config del sistema
  getConfig:   ()     => get('/config'),
  guardarConfig:(data) => put('/config', data).then(json),

  // Indicadores
  getIndicadores: () => get('/indicadores'),

  // Inteligencia Artificial
  recomendarIA: (data) => post('/ia/recomendar', data).then(json),
  predecirIA:   (data) => post('/ia/predecir', data).then(json),
};
