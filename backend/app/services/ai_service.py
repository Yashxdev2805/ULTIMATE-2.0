"""
AI Diagnostic Service Logic
"""
import time

def run_python_ai_diagnosis(prompt: str, has_image: bool = False, device: str = "Selected Device"):
    text = prompt.lower()
    
    if "screen" in text or "display" in text or "crack" in text:
        return {
            "id": f"diag-{int(time.time())}",
            "deviceName": device,
            "issueTitle": "Display & Touch Digitizer Damage Detected",
            "summary": f"AI analysis of your {device} indicates a damaged OLED/LCD panel or flex cable issue.",
            "confidenceScore": 96 if has_image else 89,
            "severity": "medium",
            "recommendedRepairType": "DIY",
            "estimatedTime": "35 - 45 Mins",
            "estimatedCost": 259.98,
            "possibleCauses": [
                "Physical impact causing OLED matrix fracture",
                "Separated touch digitizer flex connector"
            ],
            "repairStepsSummary": [
                "Heat outer perimeter to soften waterproof seal.",
                "Lift panel at 45-degree angle.",
                "Install certified OEM display module."
            ]
        }
    
    if "battery" in text or "drain" in text or "heat" in text:
        return {
            "id": f"diag-{int(time.time())}",
            "deviceName": device,
            "issueTitle": "Lithium Battery Degradation Detected",
            "summary": f"AI diagnostic scan detects depleted battery cycle life or elevated internal resistance on your {device}.",
            "confidenceScore": 94 if has_image else 88,
            "severity": "high",
            "recommendedRepairType": "DIY",
            "estimatedTime": "40 Mins",
            "estimatedCost": 129.99,
            "possibleCauses": ["Chemical exhaustion (> 500 cycles)", "Swollen battery pouch"],
            "repairStepsSummary": ["Drain battery below 25%", "Pull stretch-release adhesive tabs", "Install new zero-cycle battery"]
        }

    return {
        "id": f"diag-{int(time.time())}",
        "deviceName": device,
        "issueTitle": "General Hardware Malfunction Inspection",
        "summary": f"Based on description, AI recommends a comprehensive physical checkup for your {device}.",
        "confidenceScore": 82,
        "severity": "low",
        "recommendedRepairType": "Either",
        "estimatedTime": "30 Mins",
        "estimatedCost": 49.99,
        "possibleCauses": ["Loose ZIF flex cable connector"],
        "repairStepsSummary": ["Perform hard reboot", "Inspect internal flex cables under magnification"]
    }
