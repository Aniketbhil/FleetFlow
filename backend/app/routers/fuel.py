from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.fuel import Fuel
from app.core.rbac import require_roles

router = APIRouter(prefix="/fuel", tags=["Fuel"])


@router.get("/")
def list_fuel(
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER", "FINANCE")),
):
    return db.query(Fuel).all()


@router.post("/")
def add_fuel(
    data: dict,
    db: Session = Depends(get_db),
    user=Depends(require_roles("FINANCE")),
):
    f = Fuel(**data)
    db.add(f)
    db.commit()
    return f