from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.rbac import get_db, require_roles
from app.models.user import User, UserRole

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("")
def list_users(db: Session = Depends(get_db),
               admin = Depends(require_roles(UserRole.ADMIN))):
    return db.query(User).all()

@router.patch("/{user_id}/role")
def update_role(user_id: int, role: UserRole,
                db: Session = Depends(get_db),
                admin = Depends(require_roles(UserRole.ADMIN))):

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(404, "User not found")

    user.role = role
    db.commit()
    return {"message": "Role updated"}

@router.patch("/{user_id}/status")
def update_status(user_id: int, is_active: bool,
                  db: Session = Depends(get_db),
                  admin = Depends(require_roles(UserRole.ADMIN))):

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(404, "User not found")

    user.is_active = is_active
    db.commit()
    return {"message": "Status updated"}