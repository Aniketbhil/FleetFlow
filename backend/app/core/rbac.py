from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.user import User
from app.core.config import settings

security = HTTPBearer()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    cred: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    try:
        payload = jwt.decode(cred.credentials, settings.secret_key, algorithms=["HS256"])
        user_id = int(payload["sub"])
    except:
        raise HTTPException(401, "Invalid token")

    user = db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(403, "Inactive user")

    return user

def require_roles(*roles):
    def checker(user: User = Depends(get_current_user)):
        if user.role not in roles:
            raise HTTPException(403, "Insufficient permissions")
        return user
    return checker