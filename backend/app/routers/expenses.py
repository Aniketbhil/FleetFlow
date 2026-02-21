from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.expense import Expense
from app.core.rbac import require_roles

router = APIRouter(prefix="/expenses", tags=["Expenses"])


@router.get("/")
def list_expenses(
    db: Session = Depends(get_db),
    user=Depends(require_roles("MANAGER", "FINANCE")),
):
    return db.query(Expense).all()


@router.post("/")
def add_expense(
    data: dict,
    db: Session = Depends(get_db),
    user=Depends(require_roles("FINANCE")),
):
    e = Expense(**data)
    db.add(e)
    db.commit()
    return e