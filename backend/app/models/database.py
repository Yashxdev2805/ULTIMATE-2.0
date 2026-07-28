"""
Database Connection & Models Setup (SQLAlchemy / SQLite)
"""
from sqlalchemy import create_engine, Column, String, Float, Integer, Boolean, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./thinkkaro.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class PartModel(Base):
    __tablename__ = "parts"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    brand = Column(String)
    price = Column(Float)
    condition = Column(String)
    stock_count = Column(Integer)
    rating = Column(Float)
    description = Column(Text)

class BookingModel(Base):
    __tablename__ = "bookings"

    id = Column(String, primary_key=True, index=True)
    customer_name = Column(String)
    customer_email = Column(String)
    customer_phone = Column(String)
    device_brand = Column(String)
    device_model = Column(String)
    issue_description = Column(Text)
    status = Column(String)
    appointment_date = Column(String)
    appointment_time = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

Base.metadata.create_all(bind=engine)
