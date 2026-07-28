from fastapi import APIRouter
from datetime import datetime
from app.schemas.domain import HealthStatus

router = APIRouter()

@router.get("/health", response_model=HealthStatus)
def get_health():
    return HealthStatus(
        status="healthy",
        service="Thinkkaro RepairHub FastAPI Service",
        version="2.0.0",
        timestamp=datetime.utcnow().isoformat()
    )
