from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.schemas.domain import DiagnosticRequest, DiagnosticResponse

router = APIRouter()

@router.post("/diagnose", response_model=DiagnosticResponse)
def run_ai_diagnosis(req: DiagnosticRequest):
    prompt_text = req.prompt.lower()
    device = req.selectedDevice or "Selected Device"

    if "screen" in prompt_text or "display" in prompt_text or "crack" in prompt_text:
        return DiagnosticResponse(
            id=f"diag-{int(datetime.utcnow().timestamp())}",
            deviceName=device,
            issueTitle="Display & Touch Digitizer Damage Detected",
            summary=f"AI analysis of your {device} indicates a damaged OLED/LCD panel or flex cable issue.",
            confidenceScore=96 if req.hasImage else 89,
            severity="medium",
            recommendedRepairType="DIY",
            estimatedTime="35 - 45 Mins",
            estimatedCost=259.98,
            possibleCauses=[
                "Physical impact causing OLED matrix fracture",
                "Separated touch digitizer flex connector"
            ],
            repairStepsSummary=[
                "Heat outer perimeter to softening waterproof seal.",
                "Lift panel at 45-degree angle.",
                "Install certified OEM display module."
            ]
        )

    return DiagnosticResponse(
        id=f"diag-{int(datetime.utcnow().timestamp())}",
        deviceName=device,
        issueTitle="General Hardware Inspection Required",
        summary=f"AI inspection recommends a full diagnostic checkup for your {device}.",
        confidenceScore=84,
        severity="low",
        recommendedRepairType="Either",
        estimatedTime="30 Mins",
        estimatedCost=49.99,
        possibleCauses=["Minor internal ribbon cable disconnection"],
        repairStepsSummary=["Perform hard reboot", "Check connections under magnification"]
    )
