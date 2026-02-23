from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.user import User
from app.models.workout import Workout, Exercise
from app.schemas.workout import WorkoutCreate, WorkoutResponse, WorkoutUpdate
from app.utils.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=WorkoutResponse)
async def create_workout(
    workout: WorkoutCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_workout = Workout(
        name=workout.name,
        date=workout.date,
        user_id=current_user.id
    )
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)
    
    for exercise_data in workout.exercises:
        db_exercise = Exercise(
            workout_id=db_workout.id,
            name=exercise_data.name,
            sets=exercise_data.sets,
            reps=exercise_data.reps,
            weight=exercise_data.weight
        )
        db.add(db_exercise)
    
    db.commit()
    db.refresh(db_workout)
    return db_workout

@router.get("/", response_model=List[WorkoutResponse])
async def get_workouts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    workouts = db.query(Workout).filter(Workout.user_id == current_user.id).offset(skip).limit(limit).all()
    return workouts

@router.get("/{workout_id}", response_model=WorkoutResponse)
async def get_workout(
    workout_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    workout = db.query(Workout).filter(
        Workout.id == workout_id,
        Workout.user_id == current_user.id
    ).first()
    if workout is None:
        raise HTTPException(status_code=404, detail="Workout not found")
    return workout

@router.put("/{workout_id}", response_model=WorkoutResponse)
async def update_workout(
    workout_id: int,
    workout_update: WorkoutUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    workout = db.query(Workout).filter(
        Workout.id == workout_id,
        Workout.user_id == current_user.id
    ).first()
    if workout is None:
        raise HTTPException(status_code=404, detail="Workout not found")
    
    if workout_update.name is not None:
        workout.name = workout_update.name
    if workout_update.date is not None:
        workout.date = workout_update.date
    
    if workout_update.exercises is not None:
        db.query(Exercise).filter(Exercise.workout_id == workout_id).delete()
        
        for exercise_data in workout_update.exercises:
            db_exercise = Exercise(
                workout_id=workout_id,
                name=exercise_data.name,
                sets=exercise_data.sets,
                reps=exercise_data.reps,
                weight=exercise_data.weight
            )
            db.add(db_exercise)
    
    db.commit()
    db.refresh(workout)
    return workout

@router.delete("/{workout_id}")
async def delete_workout(
    workout_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    workout = db.query(Workout).filter(
        Workout.id == workout_id,
        Workout.user_id == current_user.id
    ).first()
    if workout is None:
        raise HTTPException(status_code=404, detail="Workout not found")
    
    db.delete(workout)
    db.commit()
    return {"message": "Workout deleted successfully"}
