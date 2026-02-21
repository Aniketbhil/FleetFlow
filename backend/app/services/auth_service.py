from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user import User, UserRole
from app.core.security import hash_password, verify_password, validate_password, create_token

def register_user(db: Session, name, email, password):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(400, "Email exists")

    validate_password(password)

    user = User(
        name=name,
        email=email,
        password_hash=hash_password(password),
        role=UserRole.DISPATCHER,
    )

    db.add(user)
    db.commit()

def login_user(db: Session, email, password):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(401, "Invalid credentials")

    return create_token(user.id)