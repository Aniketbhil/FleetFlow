from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseModel):
    app_name: str = os.getenv("APP_NAME", "FleetFlow API")
    secret_key: str = os.getenv("SECRET_KEY")
    token_expire_hours: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", 12))
    database_url: str = os.getenv("DATABASE_URL")
    admin_email: str = os.getenv("ADMIN_EMAIL")
    admin_password: str = os.getenv("ADMIN_PASSWORD")

settings = Settings()