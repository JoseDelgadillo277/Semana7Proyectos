🌱 SmartGarden – Sistema Inteligente de Monitoreo Agrícola Escolar con IA

SmartGarden es una plataforma web educativa basada en IoT + Inteligencia Artificial, diseñada para monitorear variables ambientales de un huerto escolar y generar alertas inteligentes y predicciones automáticas para mejorar el cuidado de cultivos.

El sistema integra sensores simulados, backend con FastAPI, frontend React y modelos de Machine Learning.

📌 Descripción del Proyecto

El proyecto SmartGarden permite:

Monitorear variables ambientales del cultivo
Visualizar datos en tiempo real
Generar alertas automáticas
Realizar predicciones con IA
Apoyar el aprendizaje STEAM en estudiantes

Variables monitoreadas:

Temperatura
Humedad del suelo
Luminosidad
Estado del cultivo

🧠 Tecnologías Utilizadas

Frontend:

React
JavaScript
CSS
Axios

Backend:

Python
FastAPI
Uvicorn
SQLAlchemy

Machine Learning:

Scikit-learn
Pandas
Joblib

Base de datos:

PostgreSQL

Control de versiones:

Git
GitHub

📂 Arquitectura del Proyecto

El sistema está dividido en:

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

Arquitectura aplicada:

Arquitectura Hexagonal (Backend)

Separación:

Domain
Application
Infrastructure
Adapters

⚙️ Instalación del Proyecto
1️⃣ Clonar repositorio
git clone https://github.com/JoseDelgadillo277/Semana7Proyectos.git

Entrar al proyecto:

cd Semana7Proyectos
🚀 Instalación Backend

Entrar a carpeta backend:

cd backend

Crear entorno virtual:

Windows:

python -m venv .venv

Activar entorno virtual:

.venv\Scripts\activate

Instalar dependencias:

pip install -r requirements.txt
📄 Configurar archivo .env

Crear archivo:

.env

Ejemplo:

DATABASE_URL=postgresql://usuario:password@localhost/smartgarden
MODEL_PATH=model/model.pkl

🧠 Entrenar Modelo de Inteligencia Artificial

Ejecutar:

python train_model.py

Esto generará:

model.pkl

El modelo permite generar predicciones del estado del cultivo.

▶️ Ejecutar Backend

Dentro de:

backend

Ejecutar:

uvicorn src.main:app --reload --port 8000

Servidor disponible en:

http://localhost:8000

Documentación automática:

http://localhost:8000/docs

🌐 Instalación Frontend

Abrir nueva terminal

Entrar:

cd frontend

Instalar dependencias:

npm install

Ejecutar aplicación:

npm start

Disponible en:

http://localhost:3000

📊 Funcionalidades del Sistema

El sistema permite:

✔ Registro de variables ambientales
✔ Visualización de datos del cultivo
✔ Generación de alertas automáticas
✔ Predicción inteligente con Machine Learning
✔ Dashboard interactivo
✔ Integración backend + frontend
✔ Arquitectura limpia (Hexagonal)

🧪 Inteligencia Artificial Integrada

El sistema utiliza un modelo entrenado con:

Scikit-learn

Capaz de:

analizar variables ambientales
detectar condiciones críticas
generar alertas inteligentes
apoyar decisiones de riego

Ejemplo:

Humedad baja → alerta crítica
Temperatura alta → advertencia
Luminosidad baja → recomendación
📚 Uso Educativo

Este proyecto está orientado a:

Ingeniería de Software
Ingeniería Web
IoT aplicado a educación
Machine Learning básico
Arquitectura empresarial
Arquitectura hexagonal

Aplicado en contexto:

Huerto Inteligente Escolar STEAM

👨‍💻 Autor

Proyecto desarrollado por:

Ñaupari Camarena Julio;  Munive Rios Antony ; Delgadillo Pantoja José ; Vera Zea Jhoanna;  Soto Escobar Giancarlo & Cuicapuza Remigio Nayely

Curso:

Taller de Proyectos I - Ingeniería de Sistemas e Informática

Universidad Continental

Proyecto académico basado en:

IoT + Inteligencia Artificial + Arquitectura Hexagonal

📌 Estado del Proyecto

Proyecto en desarrollo activo

Incluye:

✔ Backend funcional
✔ Frontend funcional
✔ Base de datos conectada
✔ Modelo ML entrenado
✔ Generación de alertas inteligentes
