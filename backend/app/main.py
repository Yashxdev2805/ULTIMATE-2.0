from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import health, diagnose, parts, bookings

app = FastAPI(
    title="Thinkkaro RepairHub API",
    description="High-performance FastAPI microservice backend for Thinkkaro (RepairHub)",
    version="2.0.0"
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(diagnose.router, prefix="/api", tags=["AI Diagnostics"])
app.include_router(parts.router, prefix="/api", tags=["Commerce Parts"])
app.include_router(bookings.router, prefix="/api", tags=["Doorstep Bookings"])

@app.get("/")
def read_root():
    return {
        "message": "Thinkkaro RepairHub FastAPI Microservice is Operational",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
