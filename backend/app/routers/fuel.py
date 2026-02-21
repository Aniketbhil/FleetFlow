from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.rbac import get_db, require_roles
from app.models.fuel import FuelExpense
from app.models.user import UserRole

router = APIRouter(prefix="/fuel", tags=["Fuel"])

@router.post("")
def add_fuel(data: dict,
             db: Session = Depends(get_db),
             analyst = Depends(require_roles(
                 UserRole.ADMIN,
                 UserRole.FINANCIAL_ANALYST))):

    expense = FuelExpense(**data)
    db.add(expense)
    db.commit()
    return expense