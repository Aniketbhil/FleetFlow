from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.maintenance import Maintenance
from app.models.vehicle import Vehicle
from app.core.rbac import require_roles

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])


@router.post("/")
def create_log(
    data: dict,
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER", "SAFETY")),
):
    m = Maintenance(**data)

    v = db.get(Vehicle, data["vehicle_id"])
    v.status = "IN_SHOP"

    db.add(m)
    db.commit()
    return m