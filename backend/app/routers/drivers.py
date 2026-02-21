from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.driver import Driver
from app.core.rbac import require_roles

router = APIRouter(prefix="/drivers", tags=["Drivers"])


@router.get("/")
def list_drivers(
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER", "DISPATCHER", "SAFETY")),
):
    return db.query(Driver).all()


@router.post("/")
def create_driver(
    data: dict,
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER", "SAFETY")),
):
    d = Driver(**data)
    db.add(d)
    db.commit()
    return d