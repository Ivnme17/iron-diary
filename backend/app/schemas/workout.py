from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ExerciseBase(BaseModel):
    name: str
    sets: int
    reps: int
    weight: float

class ExerciseCreate(ExerciseBase):
    pass

class ExerciseResponse(ExerciseBase):
    id: int
    workout_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class WorkoutBase(BaseModel):
    name: str
    date: datetime

class WorkoutCreate(WorkoutBase):
    exercises: List[ExerciseCreate]

class WorkoutUpdate(BaseModel):
    name: Optional[str] = None
    date: Optional[datetime] = None
    exercises: Optional[List[ExerciseCreate]] = None

class WorkoutResponse(WorkoutBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    exercises: List[ExerciseResponse]

    class Config:
        from_attributes = True
