# routes/assets.py
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import crud as crud
from schemas import AssetCreate
from crud import get_asset_categories

router = APIRouter(prefix="/assets", tags=["Assets"])


@router.get("/categories")
def categories():
    return get_asset_categories()



@router.post("/")
def create(data: AssetCreate):
    res, status = crud.create_asset(data)
    return JSONResponse(status_code=status, content=res)


@router.get("/")
def all():
    return crud.get_assets()


@router.get("/{asset_id}")
def get(asset_id: int):
    res, status = crud.get_asset(asset_id)
    return JSONResponse(status_code=status, content=res)


@router.put("/{asset_id}")
def update(asset_id: int, data: AssetCreate):
    res, status = crud.update_asset(asset_id, data)
    return JSONResponse(status_code=status, content=res)


@router.delete("/{asset_id}")
def delete(asset_id: int):
    res, status = crud.delete_asset(asset_id)
    return JSONResponse(status_code=status, content=res)
