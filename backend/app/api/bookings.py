from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class CreateBookingRequest(BaseModel):
    deviceBrand: str
    deviceModel: str
    issueDescription: str
    customerName: str
    customerPhone: str
    address: str
    city: str
    pincode: str
    appointmentDate: str
    appointmentTime: str

@router.post("/bookings")
def create_booking(req: CreateBookingRequest):
    booking_id = f"TK-{hash(req.customerName + req.appointmentDate) % 900000 + 100000}"
    return {
        "success": True,
        "bookingId": booking_id,
        "message": "Doorstep repair appointment confirmed",
        "status": "Order Confirmed",
        "data": req
    }
