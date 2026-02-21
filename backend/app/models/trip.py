from sqlalchemy import Column, Integer, Float, String
from app.db.base import Base


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer)
    driver_id = Column(Integer)

    cargo_weight = Column(Float)
    origin = Column(String)
    destination = Column(String)

    status = Column(String, default="DRAFT")