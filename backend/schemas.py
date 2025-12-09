# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    name: str
    age: int
    email: EmailStr
    phone: str
    access: str


class UserOut(UserCreate):
    id: int


class AssetCreate(BaseModel):
    assetName: str
    assetTag: str
    category: str
    status: str
    location: str


class AssetOut(AssetCreate):
    id: int


class WorkOrderCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    priority: Optional[str] = ""
    assetId: Optional[int] = None
    dueDate: Optional[str] = ""


class WorkOrderOut(WorkOrderCreate):
    id: int
