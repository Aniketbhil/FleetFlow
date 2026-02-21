from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.vehicle import Vehicle
from app.core.rbac import require_roles

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/kpis")
def kpis(
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER", "FINANCE")),
):
    total = db.query(Vehicle).count()
    in_shop = db.query(Vehicle).filter(Vehicle.status == "IN_SHOP").count()

    return {
        "active_fleet": total - in_shop,
        "maintenance_alerts": in_shop,
        "utilization_rate": (total - in_shop) / total if total else 0,
    }