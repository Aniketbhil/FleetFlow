from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.core.security import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(data: dict, db: Session = Depends(get_db)):
    u = User(
        name=data["name"],
        email=data["email"],
        password=hash_password(data["password"]),
        role=data.get("role", "MANAGER"),
    )
    db.add(u)
    db.commit()
    return {"msg": "registered"}


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    u = db.query(User).filter(User.email == data["email"]).first()
    if not u or not verify_password(data["password"], u.password):
        raise HTTPException(401, "Invalid credentials")

    return {"token": create_token({"sub": str(u.id), "role": u.role})}