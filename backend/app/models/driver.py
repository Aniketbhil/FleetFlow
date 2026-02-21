from datetime import date
from sqlalchemy import String, Float, Date
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class Driver(Base):
    __tablename__ = "drivers"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str]

    license_number: Mapped[str]

    license_category: Mapped[str]

    license_expiry_date: Mapped[date] = mapped_column(Date)

    status: Mapped[str] = mapped_column(default="OffDuty")

    safety_score: Mapped[float] = mapped_column(default=100.0)