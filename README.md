# Review System

An anonymous review platform where anyone can drop a review about food, colleges, events, or anything else. No login required.

---

## What it does

- Anyone can submit a review anonymously
- Reviews are analysed by AI for sentiment before being saved
- Sarcastic, disrespectful, or abusive reviews are automatically hidden or blocked
- Users can report a review for removal — AI reads the report and deletes it if the reason is valid
- Rate limited to 4 reviews per IP per day
- Pagination, filtering by category, recommendation, and search

---

## Tech Stack

**Frontend**
- React + Vue 
- Tailwind CSS

**Backend**
- FastAPI/python
- MSSQL
- Stored Procedures for all DB operations

**AI**
- Groq API 
- Sentiment analysis on every review
- Auto moderation on reports

---

## Features

- Anonymous review submission
- AI sentiment analysis — label, score, reason
- Auto hide/block based on sentiment label and score
- Report system — user reports → AI judges → auto deletes if valid
- Rate limiting — 4 reviews per IP per 24 hours
- Pagination — load more reviews
- Filter by category, recommendation, search by text
- Hidden review cards with reason shown, user can reveal if they want

---

## Project Structure
```
ReviewSystem/
├── reviewsystembackend/
│   ├── app/
│   │   ├── data/          # AI prompts
│   │   ├── db/            # DB helper
│   │   ├── models/        # Data models
│   │   ├── repositories/  # DB queries
│   │   ├── routers/       # API routes
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic + AI
│   │   └── main.py
│   └── requirements.txt
└── reviewsystemui/
    └── src/
        ├── Components/
        └── services/
```

---

## Running Locally

**Backend**
```bash
cd reviewsystembackend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**
```bash
cd reviewsystemui
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in `reviewsystembackend/`:
```
AIAPIKEY=your_groq_api_key
DB_SERVER=your_db_server
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /reviews/getreviews | Get paginated reviews |
| POST | /reviews/updatereview | Submit a new review |
| POST | /reviews/deletereview | Report + AI judges + auto delete |
| GET | /categories | Get all categories |
| GET | /health | Health check |

---

Built by Dinesh
