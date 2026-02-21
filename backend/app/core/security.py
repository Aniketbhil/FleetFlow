from argon2 import PasswordHasher
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings

ph = PasswordHasher()


def hash_password(p: str) -> str:
    return ph.hash(p)


def verify_password(p: str, h: str) -> bool:
    try:
        ph.verify(h, p)
        return True
    except Exception:
        return False


def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(
        minutes=settings.TOKEN_EXPIRE_MINUTES
    )
    data.update({"exp": expire})
    return jwt.encode(data, settings.SECRET_KEY, algorithm="HS256")