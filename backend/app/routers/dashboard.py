from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.rbac import get_db, require_roles
from app.models.vehicle import Vehicle
from app.models.trip import Trip
from app.models.user import UserRole

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/kpis")
def kpis(db: Session = Depends(get_db),
         user = Depends(require_roles(
             UserRole.ADMIN,
             UserRole.MANAGER,
             UserRole.FINANCIAL_ANALYST))):

    active_fleet = db.query(Vehicle).filter(Vehicle.status == "OnTrip").count()
    in_shop = db.query(Vehicle).filter(Vehicle.status == "InShop").count()
    total = db.query(Vehicle).count()

    utilization = (active_fleet / total * 100) if total else 0

    return {
        "active_fleet": active_fleet,
        "maintenance_alerts": in_shop,
        "utilization_rate": utilization
    }