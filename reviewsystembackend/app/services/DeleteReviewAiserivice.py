from groq import AsyncGroq
import os
from app.services.feedback_service import FeedbackService

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "../data/DeleteAIPrompt.txt"), "r") as f:
    SYSTEM_PROMPT = f.read()

class DeleteReviewAiService:
    def __init__(self):
        self._client = AsyncGroq(api_key=os.getenv("AIAPIKEY"))
        self._feedback_service = FeedbackService()

    async def judge_report(self, id: int, reviewtext: str, deletereason: str) -> str:
        response = await self._client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Review: {reviewtext}\nReason for removal: {deletereason}"}
            ],
            temperature=0.1,
            max_tokens=10,
        )
        result = response.choices[0].message.content.strip().upper()
        print(result)
        if result == "VALID":
            await self._feedback_service.delete_review(id=id)
            return "VALID"
        
        return "INVALID"