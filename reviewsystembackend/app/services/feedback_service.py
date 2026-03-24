from typing import List, Optional
from app.repositories.feedback_repo import FeedbackRepository
from app.models.feedback import Feedback
from app.schemas.feedback import UpdateFeedback
from app.services.ReviewAnalyserAi_service  import analyze_review
class FeedbackService:
    def __init__(self):
        self._repo = FeedbackRepository()

    async def get_feedback(self, page: int, limit: int) -> List[Feedback]:
        return await self._repo.get_feedback(page, limit)
    
    async def update_feedback(self, data: UpdateFeedback):
        ai_result = await analyze_review(data.reviewtext)
        label = ai_result.get("sentiment_label", "")
        score = float(ai_result.get("sentiment_score", 0.0))
        ai_hidden = ai_result.get("is_hidden", False)
        ai_blocked = ai_result.get("is_blocked", False)
        is_hidden = ai_hidden or (
            (label == "sarcastic" and score >= 0.6) or
            (label == "disrespectful" and score >= 0.5) or
            (label == "negative" and score >= 0.85) or
            (label == "abusive" and score < 0.8))
        is_blocked = ai_blocked or (
            label == "abusive" and score >= 0.8)
        feedback = UpdateFeedback(
            categoryid=data.categoryid,
            subcategory=data.subcategory,
            reviewtype=data.reviewtype,
            reviewtext=data.reviewtext,
            recommended=data.recommended,
            ishidden=is_hidden,
            isblocked=is_blocked,
            sentimentscore=score,
            sentimentlabel=label,
            sentimentreason=ai_result.get("reason")
            )
        return await self._repo.update_feedback(feedback)

    async def delete_review(self,id:int):
        return await self._repo.delete_review(id)