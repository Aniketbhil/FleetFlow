from sqlalchemy import Column, Integer, String
from app.db.base import Base


class Maintenance(Base):
    __tablename__ = "maintenance"

    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer)
    issue = Column(String)
    status = Column(String, default="OPEN")