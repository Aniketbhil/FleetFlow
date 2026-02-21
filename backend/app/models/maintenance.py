from datetime import date

from sqlalchemy import Float, String, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class MaintenanceLog(Base):
    __tablename__ = "maintenance_logs"

    id: Mapped[int] = mapped_column(primary_key=True)

    vehicle_id: Mapped[int] = mapped_column(ForeignKey("vehicles.id"))

    description: Mapped[str]

    cost: Mapped[float] = mapped_column(Float)

    date: Mapped[date] = mapped_column(Date)