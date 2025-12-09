
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import crud
from schemas import UserCreate

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/")
def create(user: UserCreate):
    data, status = crud.create_user(user)
    return JSONResponse(status_code=status, content=data)


@router.get("/")
def list_users():
    return crud.get_users()


@router.get("/{user_id}")
def get(user_id: int):
    data, status = crud.get_user(user_id)
    return JSONResponse(status_code=status, content=data)


@router.put("/{user_id}")
def update(user_id: int, user: UserCreate):
    data, status = crud.update_user(user_id, user)
    return JSONResponse(status_code=status, content=data)


@router.delete("/{user_id}")
def delete(user_id: int):
    data, status = crud.delete_user(user_id)
    return JSONResponse(status_code=status, content=data)
