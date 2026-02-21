from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.rbac import get_db, require_roles
from app.models.maintenance import MaintenanceLog
from app.models.vehicle import Vehicle
from app.models.user import UserRole

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])

@router.post("")
def add_log(data: dict,
            db: Session = Depends(get_db),
            manager = Depends(require_roles(
                UserRole.ADMIN,
                UserRole.MANAGER))):

    vehicle = db.get(Vehicle, data["vehicle_id"])
    vehicle.status = "InShop"

    log = MaintenanceLog(**data)
    db.add(log)
    db.commit()

    return log