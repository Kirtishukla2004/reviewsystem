from fastapi import APIRouter
from typing import List
from app.services.categories_service import CategoriesService
from app.schemas.categories import Categories
from app.models.categories import Category

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

@router.get("/", response_model=List[Categories])
async def get_categories():
    services = CategoriesService()
    return await services.get_Categories()