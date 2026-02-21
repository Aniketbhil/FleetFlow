from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.core.rbac import get_db, require_roles
from app.models.trip import Trip
from app.models.vehicle import Vehicle
from app.models.driver import Driver
from app.models.user import UserRole

router = APIRouter(prefix="/trips", tags=["Trips"])

@router.post("")
def create_trip(data: dict,
                db: Session = Depends(get_db),
                dispatcher = Depends(require_roles(
                    UserRole.ADMIN,
                    UserRole.DISPATCHER))):

    vehicle = db.get(Vehicle, data["vehicle_id"])
    driver = db.get(Driver, data["driver_id"])

    if vehicle.status != "Available":
        raise HTTPException(400, "Vehicle not available")

    if driver.status != "OnDuty":
        raise HTTPException(400, "Driver not on duty")

    if driver.license_expiry_date < date.today():
        raise HTTPException(400, "License expired")

    if data["cargo_weight"] > vehicle.max_capacity_kg:
        raise HTTPException(400, "Over capacity")

    trip = Trip(**data)
    db.add(trip)
    db.commit()
    return trip


@router.post("/{trip_id}/dispatch")
def dispatch_trip(trip_id: int,
                  db: Session = Depends(get_db),
                  dispatcher = Depends(require_roles(
                      UserRole.ADMIN,
                      UserRole.DISPATCHER))):

    trip = db.get(Trip, trip_id)
    vehicle = db.get(Vehicle, trip.vehicle_id)
    driver = db.get(Driver, trip.driver_id)

    vehicle.status = "OnTrip"
    driver.status = "OnTrip"
    trip.status = "Dispatched"

    db.commit()
    return {"message": "Trip dispatched"}


@router.post("/{trip_id}/complete")
def complete_trip(trip_id: int,
                  end_odometer: float,
                  db: Session = Depends(get_db),
                  dispatcher = Depends(require_roles(
                      UserRole.ADMIN,
                      UserRole.DISPATCHER))):

    trip = db.get(Trip, trip_id)
    vehicle = db.get(Vehicle, trip.vehicle_id)
    driver = db.get(Driver, trip.driver_id)

    trip.status = "Completed"
    trip.end_odometer = end_odometer
    vehicle.status = "Available"
    driver.status = "OffDuty"

    db.commit()
    return {"message": "Trip completed"}