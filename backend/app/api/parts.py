from fastapi import APIRouter
from typing import List

router = APIRouter()

MOCK_PARTS = [
    {
        "id": "part-1",
        "name": "iPhone 15 Pro Super Retina XDR OLED Display",
        "category": "Displays & Screens",
        "brand": "Apple",
        "price": 249.99,
        "condition": "OEM",
        "stockStatus": "In Stock",
        "stockCount": 14,
        "rating": 4.9,
    },
    {
        "id": "part-2",
        "name": "Galaxy S24 Ultra Dynamic AMOLED 2X Screen Assembly",
        "category": "Displays & Screens",
        "brand": "Samsung",
        "price": 279.99,
        "condition": "OEM",
        "stockStatus": "Low Stock",
        "stockCount": 3,
        "rating": 4.8,
    },
    {
        "id": "part-3",
        "name": "iPhone 15 Pro High-Capacity Battery Unit",
        "category": "Batteries & Charging",
        "brand": "Apple",
        "price": 129.99,
        "condition": "OEM",
        "stockStatus": "In Stock",
        "stockCount": 22,
        "rating": 4.9,
    }
]

@router.get("/parts")
def get_all_parts():
    return {"success": True, "data": MOCK_PARTS}
