# 🌱 SmartGarden – Sistema Inteligente de Monitoreo Agrícola Escolar con IA

> **Proyecto educativo** – Universidad Continental

SmartGarden es una plataforma web educativa basada en **IoT + Inteligencia Artificial**, diseñada para monitorear variables ambientales de un huerto escolar y generar alertas inteligentes y predicciones automáticas para mejorar el cuidado de cultivos.

---

## 📌 Descripción del Proyecto

El sistema permite:

- ✅ Monitorear variables ambientales del cultivo en tiempo real
- ✅ Visualizar datos históricos y actuales
- ✅ Generar alertas automáticas basadas en umbrales críticos
- ✅ Realizar predicciones con Machine Learning
- ✅ Apoyar el aprendizaje **STEAM** en estudiantes

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
- **Axios** – Consumo de API
- **CSS** – Estilos

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

---

## 📂 Estructura del Proyecto

```
Semana7Proyectos/
└── HADEPEJA-main/
    └── HADEPEJA-main/
        ├── backend/              # API REST (FastAPI)
        │   ├── src/
        │   │   ├── domain/       # Entidades y puertos
        │   │   ├── application/  # Casos de uso
        │   │   ├── infrastructure/ # Adaptadores y DB
        │   │   └── ia/          # Modelo de ML
        │   └── requirements.txt
        │
        ├── smartgarden-school/   # Frontend (React)
        │   └── src/
        │       ├── pages/       # Páginas principales
        │       ├── components/  # Componentes React
        │       ├── context/     # Contextos React
        │       └── styles/      # Estilos CSS
        │
        └── db-backend.sql       # Esquema de base de datos
```

### Arquitectura Aplicada

**Arquitectura Hexagonal (Ports & Adapters)**

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
│  - alerta_use_case.py                   │
│  - experimento_use_case.py              │
│  - sensor_use_case.py                   │
│  - recomendacion_use_case.py             │
├─────────────────────────────────────────┤
│    Domain Layer (Entities + Ports)       │
│  - entidades: alerta, sensor, etc.      │
│  - puertos: repository interfaces       │
├─────────────────────────────────────────┤
│  Infrastructure Layer (Adapters)        │
│  - postgres_repository.py                │
│  - motor_ia.py                          │
└─────────────────────────────────────────┘
```

---

## ⚙️ Instalación del Proyecto

### Prerrequisitos

| Requisito | Versión Mínima |
|-----------|----------------|
| **Node.js** | 18.x |
| **Python** | 3.10+ |
| **PostgreSQL** | 14.x |
| **Git** | 2.x |

---

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/JoseDelgadillo277/Semana7Proyectos.git
cd Semana7Proyectos
```

---

### 2️⃣ Configurar la Base de Datos

1. Instalar **PostgreSQL** (si no está instalado)
2. Crear una base de datos llamada `smartgarden`:

```sql
CREATE DATABASE smartgarden;
```

3. Ejecutar el script SQL:

```bash
psql -U postgres -d smartgarden -f HADEPEJA-main/db-backend.sql
```

---

### 3️⃣ Configurar el Backend

#### a) Crear entorno virtual

```bash
cd HADEPEJA-main/HADEPEJA-main/backend
python -m venv .venv
```

#### b) Activar el entorno virtual

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate
```

**Windows (CMD):**
```cmd
.venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source .venv/bin/activate
```

#### c) Instalar dependencias

```bash
pip install -r requirements.txt
```

#### d) Configurar variables de entorno

Crear archivo `.env` en `backend/src/`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/smartgarden

# API
API_HOST=0.0.0.0
API_PORT=8000

# ML Model
MODEL_PATH=model/model.pkl
```

> ⚠️ **Nota:** Reemplazar `postgres:password` con tus credenciales reales

#### e) Entrenar el modelo de IA (opcional)

```bash
cd HADEPEJA-main/HADEPEJA-main/backend/src/ia
python entrenar_modelo.py
```

Esto generará el archivo `model/model.pkl` necesario para las predicciones.

#### f) Ejecutar el Backend

```bash
cd HADEPEJA-main/HADEPEJA-main/backend
uvicorn src.main:app --reload --port 8000
```

**Endpoints disponibles:**

| Endpoint | Descripción |
|----------|-------------|
| `http://localhost:8000` | API principal |
| `http://localhost:8000/docs` | Documentación Swagger |
| `http://localhost:8000/redoc` | Documentación ReDoc |

---

### 4️⃣ Configurar el Frontend

#### a) Instalar dependencias

```bash
cd HADEPEJA-main/HADEPEJA-main/smartgarden-school
npm install
```

#### b) Configurar API base

En `src/api.js`, verificar que apunte al backend:

```javascript
const API_URL = 'http://localhost:8000';
```

#### c) Ejecutar el Frontend

```bash
npm start
```

La aplicación estará disponible en: **http://localhost:3000**

---

## 📊 Funcionalidades del Sistema

### Módulos Principales

| Módulo | Descripción |
|--------|-------------|
| **Dashboard** | Métricas en tiempo real |
| **Sensores** | Registro y visualización de datos |
| **Experimentos** | Gestión de experimentos |
| **Alertas** | Notificaciones críticas |
| **Recomendaciones** | Sugerencias IA |
| **Usuarios** | Administración |

### Características

- ✅ Registro de variables ambientales
- ✅ Visualización de datos en gráficos
- ✅ Generación de alertas automáticas
- ✅ Predicción inteligente con Machine Learning
- ✅ Dashboard interactivo
- ✅ Interfaz responsiva

---

## 🧪 Inteligencia Artificial Integrada

### Modelo Predictivo

El sistema utiliza un modelo de **Machine Learning** entrenado con Scikit-learn que:

1. **Analiza** las variables ambientales (temperatura, humedad, luminosidad)
2. **Detecta** condiciones críticas para el cultivo
3. **Predice** el estado de salud de las plantas
4. **Genera** recomendaciones automáticas

### Ejemplo de Predicciones

| Condición | Alerta |
|-----------|--------|
| Humedad < 30% | ⚠️ CRÍTICO: Necesita riego inmediato |
| Temperatura > 35°C | 🔥 ADVERTENCIA: Exceso de calor |
| Luminosidad < 200 lux | 🌑 RECOMENDACIÓN: Aumentar luz |

---

## 🔧 Endpoints de la API

### Sensores
- `GET /api/sensores` – Listar todos los sensores
- `POST /api/sensores` – Crear sensor
- `GET /api/sensores/{id}` – Obtener sensor por ID

### Alertas
- `GET /api/alertas` – Listar alertas
- `POST /api/alertas` – Crear alerta
- `GET /api/alertas/ultimas` – Últimas alertas

### Experimentos
- `GET /api/experimentos` – Listar experimentos
- `POST /api/experimentos` – Crear experimento

### Recomendaciones
- `GET /api/recomendaciones` – Obtener recomendaciones IA

---

## 📚 Uso Educativo

Este proyecto está diseñado para:

- **Ingeniería de Software** – Prácticas de desarrollo
- **Desarrollo Web** – Full Stack con React + FastAPI
- **IoT** – Simulación de sensores y datos
- **Machine Learning** – Introducción a ML educativo
- **Trabajo Colaborativo** – Git y GitHub

---

## 🤝 Contribuciones

1. Fork del repositorio
2. Crear una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit de cambios (`git commit -m 'Agregar característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abrir un Pull Request

---

## 📄 Licencia

Este proyecto es de uso académico – Universidad Continental

---

## 👨‍💻 Autores

Proyecto desarrollado por:

| # | Nombre | Apellido |
|---|--------|----------|
| 1 | Ñaupari | Camarena Julio |
| 2 | Munive | Rios Antony |
| 3 | Delgadillo | Pantoja José |
| 4 | Vera | Zea Johanna Hade |
| 5 | Soto | Escobar Giancarlo |
| 6 | Cuicapuz | Remigio Nayely |

**Universidad:** Universidad Continental

**Curso:** Taller de Proyectos I