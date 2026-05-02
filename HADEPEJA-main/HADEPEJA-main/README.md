# 🌱 SmartGarden – Sistema Inteligente de Monitoreo Agrícola Escolar con IA

> **Proyecto educativo** – Universidad Continental

SmartGarden es una plataforma web educativa basada en **IoT + Inteligencia Artificial**, diseñada para monitorear variables ambientales de un huerto escolar y generar alertas inteligentes y predicciones automáticas para mejorar el cuidado de cultivos.

El sistema integra sensores simulados, backend con FastAPI, frontend React y modelos de Machine Learning.

---

## 📌 Descripción del Proyecto

El proyecto SmartGarden permite:

- ✅ Monitorear variables ambientales del cultivo
- ✅ Visualizar datos en tiempo real
- ✅ Generar alertas automáticas
- ✅ Realizar predicciones con IA
- ✅ Apoyar el aprendizaje STEAM en estudiantes

### Variables Monitoreadas

| Variable | Descripción |
|----------|-------------|
| 🌡️ Temperatura | Grados Celsius |
| 💧 Humedad del suelo | Porcentaje (%) |
| ☀️ Luminosidad | Lux |
| 🌿 Estado del cultivo | Salud de la planta |

---

## 🧠 Tecnologías Utilizadas

### Frontend

- **React** – Interfaz de usuario
- **JavaScript** – Lógica
- **CSS** – Estilos
- **Axios** – Consumo de API

### Backend

- **Python** – Lenguaje principal
- **FastAPI** – Framework web
- **Uvicorn** – Servidor ASGI
- **SQLAlchemy** – ORM

### Machine Learning

- **Scikit-learn** – Modelos predictivos
- **Pandas** – Análisis de datos
- **Joblib** – Serialización de modelos

### Base de Datos

- **PostgreSQL** – Base de datos relacional

### Control de Versiones

- **Git**
- **GitHub**

---

## 📂 Arquitectura del Proyecto

El sistema está dividido en:

```
SmartGarden
│
├── frontend (React)
│
├── backend (FastAPI)
│
├── modelo ML
│
├── base de datos PostgreSQL
│
└── archivo .env configuración
```

### Arquitectura Aplicada

**Arquitectura Hexagonal (Backend)**

Separación:

- **Domain** – Entidades y reglas de negocio
- **Application** – Casos de uso
- **Infrastructure** – Implementaciones y base de datos
- **Adapters** – Puertos de comunicación

---

## ⚙️ Instalación del Proyecto

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/JoseDelgadillo277/Semana7Proyectos.git
cd Semana7Proyectos
```

---

### 🚀 Instalación Backend

#### Entrar a carpeta backend

```bash
cd backend
```

#### Crear entorno virtual (Windows)

```bash
python -m venv .venv
```

#### Activar entorno virtual

```powershell
.venv\Scripts\activate
```

#### Instalar dependencias

```bash
pip install -r requirements.txt
```

---

### 📄 Configurar archivo .env

Crear archivo `.env` en la raíz del backend:

```env
DATABASE_URL=postgresql://usuario:password@localhost/smartgarden
MODEL_PATH=model/model.pkl
```

---

### 🧠 Entrenar Modelo de Inteligencia Artificial

```bash
python train_model.py
```

Esto generará: `model.pkl`

El modelo permite generar predicciones del estado del cultivo.

---

### ▶️ Ejecutar Backend

```bash
cd backend
uvicorn src.main:app --reload --port 8000
```

| Recurso | URL |
|---------|-----|
| Servidor | http://localhost:8000 |
| Documentación Swagger | http://localhost:8000/docs |

---

### 🌐 Instalación Frontend

#### Abrir nueva terminal

```bash
cd frontend
```

#### Instalar dependencias

```bash
npm install
```

#### Ejecutar aplicación

```bash
npm start
```

**Disponible en:** http://localhost:3000

---

## 📊 Funcionalidades del Sistema

El sistema permite:

- ✔ Registro de variables ambientales
- ✔ Visualización de datos del cultivo
- ✔ Generación de alertas automáticas
- ✔ Predicción inteligente con Machine Learning
- ✔ Dashboard interactivo
- ✔ Integración backend + frontend
- ✔ Arquitectura limpia (Hexagonal)

---

## 🧪 Inteligencia Artificial Integrada

El sistema utiliza un modelo entrenado con:

- **Scikit-learn**

### Capaz de:

- ✅ Analizar variables ambientales
- ✅ Detectar condiciones críticas
- ✅ Generar alertas inteligentes
- ✅ Apoyar decisiones de riego

### Ejemplo de Predicciones

| Condición | Alerta |
|-----------|--------|
| Humedad baja | ⚠️ Alerta crítica |
| Temperatura alta | 🔥 Advertencia |
| Luminosidad baja | 💡 Recomendación |

---

## 📚 Uso Educativo

Este proyecto está orientado a:

- 📖 Ingeniería de Software
- 📖 Ingeniería Web
- 📖 IoT aplicado a educación
- 📖 Machine Learning básico
- 📖 Arquitectura empresarial
- 📖 Arquitectura hexagonal

**Aplicado en contexto:** Huerto Inteligente Escolar STEAM

---

## 👨‍💻 Autores

Proyecto desarrollado por:

| # | 👤 Integrante |
|---|---------------|
| 1 | **Ñaupari Camarena Julio** |
| 2 | **Munive Rios Antony** |
| 3 | **Delgadillo Pantoja José** |
| 4 | **Vera Zea Johanna Hade** |
| 5 | **Soto Escobar Giancarlo** |
| 6 | **Cuicapuz Remigio Nayely** |

---

### Universidad

**Universidad Continental**

### Curso

**Taller de Proyectos I**

---

## 📌 Estado del Proyecto

> ✅ Proyecto en desarrollo activo

### Incluyen:

- ✅ Backend funcional
- ✅ Frontend funcional
- ✅ Base de datos conectada
- ✅ Modelo ML entrenado
- ✅ Generación de alertas inteligentes

---

## 🔧 Tecnologías del Proyecto

```
┌─────────────────────────────────────────┐
│              Frontend                   │
│            (React + Axios)              │
└──────────────────┬──────────────────────┘
                   │ HTTP
┌──────────────────▼──────────────────────┐
│              Backend                     │
│            (FastAPI + Uvicorn)           │
├─────────────────────────────────────────┤
│  Application Layer (Use Cases)           │
├─────────────────────────────────────────┤
│    Domain Layer (Entities + Ports)       │
├─────────────────────────────────────────┤
│  Infrastructure Layer (Adapters)        │
│  - PostgreSQL                            │
│  - Motor IA (Scikit-learn)              │
└─────────────────────────────────────────┘
```

---

**Proyecto académico basado en:** IoT + Inteligencia Artificial + Arquitectura Hexagonal

---

*SmartGarden – 🌱 Cultivando el futuro con tecnología*