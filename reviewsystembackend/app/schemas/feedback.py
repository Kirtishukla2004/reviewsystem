from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class FeedbackPublic(BaseModel):
    id: int
    categoryname: str
    subcategory: str
    reviewtype: str
    reviewtext: str
    recommended: Optional[bool] = None
    created_at: datetime
    ishidden: bool = False
    sentimentreason:Optional[str]=None

    class Config:
        from_attributes = True


class PaginatedFeedback(BaseModel):
    data: List[FeedbackPublic]
    total: int
    page: int
    total_pages: int
    has_more: bool

class UpdateFeedback(BaseModel):
    categoryid: int
    subcategory: str
    reviewtype: str
    reviewtext: str
    recommended: Optional[bool] = None
    ishidden: bool = False
    isblocked: bool = False
    sentimentscore: Optional[float] = None
    sentimentlabel: Optional[str] = None
    sentimentreason:Optional[str]=None

class Deltereview(BaseModel):
    id:int
    reviewtext:str
    deletereason:str