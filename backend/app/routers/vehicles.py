from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.rbac import get_db, require_roles
from app.models.vehicle import Vehicle
from app.models.user import UserRole

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

@router.post("")
def create_vehicle(v: dict,
                   db: Session = Depends(get_db),
                   manager = Depends(require_roles(UserRole.ADMIN, UserRole.MANAGER))):

    vehicle = Vehicle(**v)
    db.add(vehicle)
    db.commit()
    return vehicle

@router.get("")
def list_vehicles(db: Session = Depends(get_db),
                  user = Depends(require_roles(
                      UserRole.ADMIN,
                      UserRole.MANAGER,
                      UserRole.DISPATCHER))):

    return db.query(Vehicle).all()