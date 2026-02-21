from sqlalchemy import String, Float
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id: Mapped[int] = mapped_column(primary_key=True)
    name_model: Mapped[str]
    license_plate: Mapped[str] = mapped_column(String, unique=True)
    vehicle_type: Mapped[str]
    max_capacity_kg: Mapped[float]
    odometer: Mapped[float]
    status: Mapped[str] = mapped_column(default="Available")
    region: Mapped[str]
    acquisition_cost: Mapped[float]