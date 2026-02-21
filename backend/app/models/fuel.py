from sqlalchemy import Column, Integer, Float
from app.db.base import Base


class Fuel(Base):
    __tablename__ = "fuel"

    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer)
    liters = Column(Float)
    cost = Column(Float)