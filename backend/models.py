# models.py
from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    id: int
    name: str
    age: int
    email: str
    phone: str
    access: str


@dataclass
class Asset:
    id: int
    assetName: str
    assetTag: str
    category: str
    status: str
    location: str


@dataclass
class WorkOrder:
    id: int
    title: str
    description: str
    priority: str
    assetId: Optional[int]
    dueDate: str
