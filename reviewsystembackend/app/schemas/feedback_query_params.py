from pydantic import BaseModel

class FeedbackQueryParams(BaseModel):
    page: int = 1
    limit: int = 10