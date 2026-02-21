from datetime import date

from sqlalchemy import Float, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class FuelExpense(Base):
    __tablename__ = "fuel_expenses"

    id: Mapped[int] = mapped_column(primary_key=True)

    vehicle_id: Mapped[int] = mapped_column(ForeignKey("vehicles.id"))

    trip_id: Mapped[int | None] = mapped_column(
        ForeignKey("trips.id"),
        nullable=True,
    )

    liters: Mapped[float] = mapped_column(Float)

    cost: Mapped[float] = mapped_column(Float)

    date: Mapped[date] = mapped_column(Date)