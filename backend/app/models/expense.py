from sqlalchemy import Column, Integer, Float, String
from app.db.base import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer)
    amount = Column(Float)
    description = Column(String)