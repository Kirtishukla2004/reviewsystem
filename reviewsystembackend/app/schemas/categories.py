from pydantic import BaseModel


class Categories(BaseModel):
    id: int
    category: str

