from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.rbac import get_db, require_roles
from app.models.driver import Driver
from app.models.user import UserRole

router = APIRouter(prefix="/drivers", tags=["Drivers"])

@router.post("")
def create_driver(d: dict,
                  db: Session = Depends(get_db),
                  officer = Depends(require_roles(
                      UserRole.ADMIN,
                      UserRole.SAFETY_OFFICER))):

    driver = Driver(**d)
    db.add(driver)
    db.commit()
    return driver

@router.get("")
def list_drivers(db: Session = Depends(get_db),
                 user = Depends(require_roles(
                     UserRole.ADMIN,
                     UserRole.SAFETY_OFFICER,
                     UserRole.DISPATCHER))):

    return db.query(Driver).all()