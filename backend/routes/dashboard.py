from fastapi import APIRouter
import crud

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/counts")
def counts():
    return crud.get_counts()





