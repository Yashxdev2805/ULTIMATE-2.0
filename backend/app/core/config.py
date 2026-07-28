import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Thinkkaro RepairHub API"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    CORS_ORIGINS: list = ["http://localhost:3000", "http://127.0.0.1:3000"]

    class Config:
        case_sensitive = True

settings = Settings()
