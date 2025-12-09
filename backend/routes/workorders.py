from fastapi import APIRouter
from fastapi.responses import JSONResponse
import crud
from schemas import WorkOrderCreate

router = APIRouter(prefix="/workorders", tags=["WorkOrders"])


@router.post("/")
def create(order: WorkOrderCreate):
    data, status = crud.create_workorder(order)
    return JSONResponse(status_code=status, content=data)


@router.get("/")
def list_workorders():
    return crud.get_workorders()


@router.get("/{work_id}")
def get(work_id: int):
    data, status = crud.get_workorder(work_id)
    return JSONResponse(status_code=status, content=data)


@router.put("/{work_id}")
def update(work_id: int, order: WorkOrderCreate):
    data, status = crud.update_workorder(work_id, order)
    return JSONResponse(status_code=status, content=data)


@router.delete("/{work_id}")
def delete(work_id: int):
    data, status = crud.delete_workorder(work_id)
    return JSONResponse(status_code=status, content=data)
