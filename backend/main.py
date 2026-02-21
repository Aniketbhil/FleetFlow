from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine

from app.routers import (
    auth,
    vehicles,
    drivers,
    trips,
    maintenance,
    fuel,
    expenses,
    dashboard,
    realtime,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FleetFlow — Real-Time System")

app.include_router(auth.router)
app.include_router(vehicles.router)
app.include_router(drivers.router)
app.include_router(trips.router)
app.include_router(maintenance.router)
app.include_router(fuel.router)
app.include_router(expenses.router)
app.include_router(dashboard.router)
app.include_router(realtime.router)


@app.get("/")
def root():
    return {"status": "LIVE"}