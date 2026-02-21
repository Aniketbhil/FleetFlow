from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True)
    model = Column(String)
    plate = Column(String, unique=True)
    capacity = Column(Float)
    odometer = Column(Float, default=0)
    status = Column(String, default="AVAILABLE")