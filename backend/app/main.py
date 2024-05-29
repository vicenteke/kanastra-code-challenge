from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import (
    file,
)

app = FastAPI()

app.include_router(file.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
