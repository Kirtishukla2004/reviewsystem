import json
from groq import AsyncGroq
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE_DIR, "../data/AiPrompt.txt"), "r") as f:
    SYSTEM_PROMPT = f.read()
client = AsyncGroq(api_key=os.getenv("AIAPIKEY"))
async def analyze_review(text: str) -> dict:
    response = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Review: {text}"}
        ],
        temperature=0.2,
        max_tokens=256,
    )

    raw = response.choices[0].message.content

    result = json.loads(raw)  
    return result