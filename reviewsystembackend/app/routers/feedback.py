from fastapi import APIRouter, Depends, params, Request
from app.services.feedback_service import FeedbackService
from app.schemas.feedback import PaginatedFeedback, UpdateFeedback,Deltereview
from app.schemas.feedback_query_params import FeedbackQueryParams
from app.models.feedback import Feedback
from app.services.DeleteReviewAiserivice import DeleteReviewAiService
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)
@router.get("/getreviews", response_model=PaginatedFeedback)
async def get_feedback(params: FeedbackQueryParams = Depends()):
    service = FeedbackService()
    result = await service.get_feedback(params.page, params.limit)
    
    return PaginatedFeedback(
        data=result["data"],
        total=result["total"],
        page=params.page,
        total_pages=-(-result["total"] // params.limit),  
        has_more=params.page * params.limit < result["total"]
    )


# limiter = Limiter(key_func=get_remote_address)
@router.post("/updatereview")
# @limiter.limit("4/day")
async def update_feedback(request: Request, body: UpdateFeedback):
    service = FeedbackService()
    await service.update_feedback(data=body)
    return {"message": "saved"}

@router.post("/deletereview")
async def delete_review(body:Deltereview):
    service = DeleteReviewAiService()
    await service.judge_report(id=body.id,reviewtext=body.reviewtext,deletereason=body.deletereason)
    return {"message": "deleted"}