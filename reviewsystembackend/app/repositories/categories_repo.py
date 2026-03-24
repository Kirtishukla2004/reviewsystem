from typing import List
from app.db.dbhelper import DbHelper
from app.models.categories import Category

class CategoriesRepository:
    def __init__(self):
        self._db_helper = DbHelper()

    async def get_Categories(self) -> List[Category]:
        results = await self._db_helper.execute_sp_async("sp_GetCategories")
        rows = results[0]  
        category_list: List[Category] = []

        for row in rows:
            category = Category(
                id=row["Id"],
                category=row["Category"],
            )
            category_list.append(category)

        return category_list