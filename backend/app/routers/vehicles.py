from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.vehicle import Vehicle
from app.core.rbac import require_roles
from app.realtime.manager import manager

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.get("/")
def list_vehicles(
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER", "DISPATCHER", "SAFETY", "FINANCE")),
):
    return db.query(Vehicle).all()


@router.post("/")
async def create_vehicle(
    data: dict,
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER")),
):
    v = Vehicle(**data)
    db.add(v)
    db.commit()
    db.refresh(v)

    await manager.broadcast({"event": "vehicle_created", "id": v.id})

    return v


@router.patch("/{vehicle_id}/status")
async def update_status(
    vehicle_id: int,
    status: str,
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER")),
):
    v = db.get(Vehicle, vehicle_id)
    v.status = status
    db.commit()

    await manager.broadcast({"event": "vehicle_updated", "id": vehicle_id})

    return v