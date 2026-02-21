from sqlalchemy.orm import Session
from app.db.base import Base
from app.db.session import engine
from app.models.user import User, UserRole
from app.core.security import hash_password
from app.core.config import settings

def init_db():
    Base.metadata.create_all(bind=engine)

    with Session(engine) as db:
        if not db.query(User).filter(User.email == settings.admin_email).first():
            admin = User(
                name="Admin",
                email=settings.admin_email,
                password_hash=hash_password(settings.admin_password),
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(admin)
            db.commit()