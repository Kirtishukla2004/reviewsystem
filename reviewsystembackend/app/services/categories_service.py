
from typing import List
from app.repositories.categories_repo import CategoriesRepository
from app.models.feedback import Feedback  

class CategoriesService:
    def __init__(self):
        self._repo = CategoriesRepository()

    async def get_Categories(self) -> List[Feedback]: 
        return await self._repo.get_Categories()