from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(
    "sqlite:///./fleetflow.db",
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()