from typing import List

from fastapi import params
from app.db.dbhelper import DbHelper
from app.models.feedback import Feedback
from app.schemas.feedback import UpdateFeedback


class FeedbackRepository:
    def __init__(self):
        self._db_helper = DbHelper()

    async def get_feedback(self, page: int, limit: int) -> dict:
        offset = (page - 1) * limit
        results = await self._db_helper.execute_sp_async("sp_GetFeedback",  (offset, limit))
        total = results[0][0]["total"] 
        rows = results[1]              
        feedback_list: List[Feedback] = []
        for row in rows:
            feedback = Feedback(
                id=row["Id"],
                categoryname=row["Category"],
                subcategory=row["SubCategory"],
                reviewtype=row["Review_type"],
                reviewtext=row["Review_text"],
                ishidden=bool(row["is_hidden"]),
                isblocked=bool(row["is_blocked"]),
                created_at=row["Created_at"],
                sentimentscore=float(row["Sentiment_score"]) if row["Sentiment_score"] is not None else None,
                recommended=bool(row["Recommended"])if row["Recommended"] is not None else None,
                sentimentlabel=row["Sentiment_Label"] if row["Sentiment_Label"] is not None else None,
                sentimentreason=row["Reason"],

        )
            feedback_list.append(feedback)
        return {"data": feedback_list, "total": total}
    
    async def update_feedback(self, feedback: UpdateFeedback):
        params = (feedback.categoryid,feedback.subcategory,feedback.reviewtype,
        feedback.reviewtext,
        feedback.ishidden,
        feedback.isblocked,
        feedback.sentimentscore,
        feedback.recommended,
        feedback.sentimentlabel,
        feedback.sentimentreason,
        )
        try:
            res=await self._db_helper.executespupdate_async("sp_UpdateFeedback", params)
            return res
        except Exception as e:
            print("error in updateing feedback",e)
    async def delete_feedback(self,id:int):
        res=await self._db_helper.execute_delete_sp("sp_DeleteFeedback", (id,))
        print("result",res)
        return res
    async def delete_review(self,id:int):
        await self._db_helper.execute_delete_sp("sp_delete_review_and_report",(id,))

