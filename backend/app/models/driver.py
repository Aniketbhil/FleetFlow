from sqlalchemy import Column, Integer, String, Date
from app.db.base import Base


class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    license_expiry = Column(Date)
    status = Column(String, default="ON_DUTY")