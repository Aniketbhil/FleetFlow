from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth_service import register_user, login_user
from app.core.rbac import get_db, get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    register_user(db, data.name, data.email, data.password)
    return {"message": "User registered"}

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    token = login_user(db, data.email, data.password)
    return {"access_token": token}

@router.get("/me")
def me(user = Depends(get_current_user)):
    return {"id": user.id, "email": user.email, "role": user.role}