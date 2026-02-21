from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.db.session import get_db
from app.models.trip import Trip
from app.models.vehicle import Vehicle
from app.models.driver import Driver
from app.core.rbac import require_roles

router = APIRouter(prefix="/trips", tags=["Trips"])


@router.get("/")
def list_trips(
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER", "DISPATCHER", "FINANCE")),
):
    return db.query(Trip).all()


@router.post("/")
def create_trip(
    data: dict,
    db: Session = Depends(get_db),
    user=Depends(require_roles("DISPATCHER")),
):
    v = db.get(Vehicle, data["vehicle_id"])
    d = db.get(Driver, data["driver_id"])

    if v.status != "AVAILABLE":
        raise HTTPException(400, "Vehicle unavailable")

    if data["cargo_weight"] > v.capacity:
        raise HTTPException(400, "Over capacity")

    if d.license_expiry < date.today():
        raise HTTPException(400, "Driver license expired")

    t = Trip(**data)
    db.add(t)

    v.status = "ON_TRIP"
    d.status = "ON_TRIP"

    db.commit()
    return t