from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.routers.feedback import router as feedback_router
from app.routers.categories import router as categories_router

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Review System", version="0.1.0")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    "http://localhost:4173",
    "http://192.168.15.105:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(feedback_router)
app.include_router(categories_router)

@app.get("/health")
def health_check():
    return {"status": "ok"}