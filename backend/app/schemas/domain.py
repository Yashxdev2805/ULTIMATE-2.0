from pydantic import BaseModel
from typing import List, Optional

class DiagnosticRequest(BaseModel):
    prompt: str
    hasImage: bool = False
    selectedDevice: Optional[str] = None

class DiagnosticResponse(BaseModel):
    id: str
    deviceName: str
    issueTitle: str
    summary: str
    confidenceScore: int
    severity: str
    recommendedRepairType: str
    estimatedTime: str
    estimatedCost: float
    possibleCauses: List[str]
    repairStepsSummary: List[str]

class HealthStatus(BaseModel):
    status: str
    service: str
    version: str
    timestamp: str
