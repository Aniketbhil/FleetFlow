import re
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt

from app.core.config import settings

ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)

def validate_password(password: str):
    if len(password) < 6:
        raise ValueError("Minimum 6 characters")
    if not re.search(r"[A-Z]", password):
        raise ValueError("Must include uppercase")
    if not re.search(r"[a-z]", password):
        raise ValueError("Must include lowercase")
    if not re.search(r"\d", password):
        raise ValueError("Must include digit")
    if not re.search(r"[^\w\s]", password):
        raise ValueError("Must include special character")

def create_token(user_id: int):
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(hours=settings.token_expire_hours),
    }
    return jwt.encode(payload, settings.secret_key, algorithm=ALGORITHM)