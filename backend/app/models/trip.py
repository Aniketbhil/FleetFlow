from sqlalchemy import Float, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[int] = mapped_column(primary_key=True)

    vehicle_id: Mapped[int] = mapped_column(ForeignKey("vehicles.id"))

    driver_id: Mapped[int] = mapped_column(ForeignKey("drivers.id"))

    cargo_weight: Mapped[float] = mapped_column(Float)

    origin: Mapped[str]

    destination: Mapped[str]

    status: Mapped[str] = mapped_column(default="Draft")

    start_odometer: Mapped[float] = mapped_column(Float)

    end_odometer: Mapped[float | None] = mapped_column(Float, nullable=True)