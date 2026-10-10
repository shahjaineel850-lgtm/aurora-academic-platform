# Aurora Classroom — PS-04 Hackathon 2026

A responsive academic collaboration prototype for students, faculty, deans, and administrators. The repository contains a Next.js App Router frontend and a FastAPI/PostgreSQL backend scaffold with persistent core workflows and a seeded academic-risk scenario.

## What's included

- `frontend/`: Next.js 14, React, TypeScript, Tailwind, Recharts, Zod, and reusable dashboard components.
- `backend/`: FastAPI, Pydantic, SQLAlchemy 2, Alembic setup, JWT authentication, Argon2 password hashing, and core course/submission/recommendation/alert/intervention/user endpoints.
- `docker-compose.yml`: local PostgreSQL and API service.
- `.env.example` files: safe local configuration placeholders.

## Run the frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>. The UI is currently a self-contained demo dashboard with a role switcher and interactive local prototype actions. The role switcher is for demonstration only and is **not authentication or authorization**. API helpers are provided in `src/lib/api.ts`; connecting every screen to the backend remains integration work.

## Run the backend with Docker

From the repository root:

```bash
cp backend/.env.example backend/.env
# Optional: create a root .env for Compose overrides.
docker compose up --build
```

API docs: <http://localhost:8000/docs>  
Health: <http://localhost:8000/health>

Compose passes `DEMO_MODE=true` by default and the backend creates a development scenario on first start. For a local Python environment instead:

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# For a quick local run, set DATABASE_URL=sqlite:///./aurora.db in .env
uvicorn app.main:app --reload
```

## Development-only demo accounts

When `DEMO_MODE=true`, seeded accounts are created on an empty database:

| Role | Email | Password |
|---|---|---|
| Student | `student@aurora.demo` | `StudentDemo2026!` |
| Faculty | `faculty@aurora.demo` | `FacultyDemo2026!` |
| Dean | `dean@aurora.demo` | `DeanDemo2026!` |
| Admin | `admin@aurora.demo` | `AdminDemo2026!` |

**These credentials are for local development only.** Set `DEMO_MODE=false`, replace `JWT_SECRET`, use a strong database password, and configure trusted origins before any non-local deployment. Do not use seeded credentials in production.

## API notes and implementation status

All API routes use `/api/v1`; authentication uses short-lived JWT bearer tokens. The backend includes login/me/logout, courses, assignments, submissions and grading, recommendation status, alerts/acknowledgement, interventions, admin user management, and illustrative insights/analytics responses.

Some contract endpoints intentionally return empty collections or `501 Not Implemented` for resource persistence, assessments, and announcements. Full event-derived analytics, refresh-token rotation/revocation, upload storage, comprehensive audit logging, rate limiting, and full migration history still need implementation before this can be considered production-ready. Do not interpret prototype risk scores as diagnoses; the example rule-based scenario should be reviewed in context.

## Database migrations

Alembic is configured in `backend/alembic.ini` and `backend/migrations`. The initial migration creates current SQLAlchemy tables. To apply it from `backend/`:

```bash
alembic upgrade head
```

For schema changes, create and review a migration before deploying. The app currently also calls `Base.metadata.create_all()` for convenient prototype bootstrapping.

## Tests and checks

```bash
cd backend
pytest
python -m compileall app
```

Frontend checks:

```bash
cd frontend
npm run build
npm test
```

Tests and builds must be run in an environment with the declared dependencies installed. This package was assembled as a starter implementation; no passing test/build claim is made here. Expand tests to cover RBAC/ownership, validation, API contracts, risk calculations, recommendations, and intervention state transitions before judging it complete.

## Assumptions

- Demo academic data is illustrative, not real student data.
- Risk/recommendation text is rule-based prototype copy, not an AI/ML result.
- The frontend is a reviewable role-aware UI shell; it does not yet consume all backend routes.
- File uploads are not enabled. The API rejects non-HTTPS external file references but does not implement a managed upload/download service.
- Deans see prototype aggregate responses; production student-level access must be explicitly authorized by institutional policy and backend rules.
