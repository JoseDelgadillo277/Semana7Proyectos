from sqlalchemy import create_engine, Column, Integer, String, Float, Text, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import uuid
from sqlalchemy.dialects.postgresql import UUID, JSONB
from datetime import datetime

DATABASE_URL = "postgresql://postgres:12345@localhost:5432/hadepeja"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class UserDB(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), unique=True, nullable=False)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    password_hash = Column(Text, nullable=False)
    rol = Column(String(20), default='estudiante')
    avatar = Column(Text)
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SensorReadingDB(Base):
    __tablename__ = "sensor_readings"
    id = Column(Integer, primary_key=True, index=True)
    humedad_suelo = Column(Float, nullable=False)
    temperatura = Column(Float, nullable=False)
    luminosidad = Column(Float, nullable=False)
    humedad_ambiental = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AlertaDB(Base):
    __tablename__ = "alertas"
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(20), nullable=False)
    variable = Column(String(100), nullable=False)
    mensaje = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class RecomendacionDB(Base):
    __tablename__ = "recomendaciones"
    id = Column(Integer, primary_key=True, index=True)
    prioridad = Column(String(20), nullable=False)
    accion = Column(String(255), nullable=False)
    descripcion = Column(Text)
    variable = Column(String(100))
    icono = Column(String(10), default='💡')
    confianza = Column(Float)
    aplicada = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ExperimentoDB(Base):
    __tablename__ = "experimentos"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(255), nullable=False)
    hipotesis = Column(Text, nullable=False)
    cultivo = Column(String(100))
    duracion = Column(Integer)
    progreso = Column(Integer, default=0)
    estado = Column(String(20), default='pendiente')
    observaciones = Column(Integer, default=0)
    variables = Column(JSONB, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

class EtapaCultivoDB(Base):
    __tablename__ = "etapas_cultivo"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    estado = Column(String(20), default='pendiente')
    fecha = Column(String(50))
    icono = Column(String(10), default='🌱')
    descripcion = Column(Text)
    datos = Column(JSONB)
    created_at = Column(DateTime, default=datetime.utcnow)

class SystemConfigDB(Base):
    __tablename__ = "system_config"
    id = Column(Integer, primary_key=True, index=True)
    humedad_min = Column(Float, default=25)
    humedad_max = Column(Float, default=80)
    temp_min = Column(Float, default=15)
    temp_max = Column(Float, default=35)
    luz_min = Column(Float, default=200)
    luz_max = Column(Float, default=1000)
    intervalo_sensor = Column(Integer, default=10)
    alertas_email = Column(Boolean, default=True)
    alertas_dashboard = Column(Boolean, default=True)
    cultivo_actual = Column(String(100), default='Tomate Cherry')
    etapa_actual = Column(String(100), default='Crecimiento Vegetativo')
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

Base.metadata.create_all(bind=engine)
