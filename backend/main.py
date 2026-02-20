from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, workouts, users
from app.database import engine
from app.models import user, workout

user.Base.metadata.create_all(bind=engine)
workout.Base.metadata.create_all(bind=engine)

app = FastAPI(title="DiarioDeHierro API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(workouts.router, prefix="/api/workouts", tags=["workouts"])

@app.get("/")
async def root():
    return {"message": "DiarioDeHierro API"}
