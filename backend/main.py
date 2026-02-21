from fastapi import FastAPI

from app.core.config import settings
from app.db.init_db import init_db
from app.routers import auth

app = FastAPI(title=settings.app_name)

@app.on_event("startup")
def startup():
    init_db()

app.include_router(auth.router)