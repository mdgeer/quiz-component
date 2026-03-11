# Product Requirements Document
## Quiz Component — The Divot

**Last updated:** March 2026

---

## Overview

A standalone, configurable quiz platform hosted at `quiz.thedivot.net`. The platform allows The Divot to publish multiple interactive quizzes that test readers on golf knowledge, capture email subscribers, and track engagement data.

The first quiz — The Golf IQ Test — serves as the template for all future quizzes on the platform.

---

## Goals

1. **Grow the email list** — Capture name and email from users who complete a quiz, and add them to Kit with quiz-specific tags and answer data.
2. **Drive engagement** — Give readers a reason to spend time on-site and share a result.
3. **Build an owned asset** — A reusable platform that can host multiple quizzes without rebuilding anything from scratch.

---

## User Flow

1. User lands on a quiz URL (e.g. `quiz.thedivot.net/golf-iq`)
2. Intro screen — headline, description, CTA to start
3. 10 questions — one at a time, with image, context, and 4 answer choices
4. Email capture screen — user enters name and email to receive their score
5. Success state — confirmation message shown

---

## Features

### Quiz Engine
- Config-driven: each quiz is a single JS file defining questions, answers, copy, and options
- Supports correct/incorrect answer tracking with optional feedback delay
- Calculates a percentage score at completion
- Session ID generated per visit to tie events together

### Email Capture
- Name and email collected after quiz completion (before score is revealed)
- Client-side email format validation
- Rate limiting: max 5 submissions per 15 minutes per IP
- Error handling with user-facing message on failure

### Kit Integration
- Creates or updates subscriber in Kit on submission
- Stores each answer as a custom field (`quiz_answer_0` through `quiz_answer_9`)
- Stores score as a percentage (`the_golf_iq_test_score`)
- Stores submission date (`subscribed_on`)
- Applies a quiz-specific tag (`the_golf_iq_test`)

### Event Tracking (Supabase)
- Events recorded to `quiz_events` table:
  - `quiz_started` — when user clicks Start
  - `answer_selected` — on each answer, with question index
  - `quiz_completed` — on final answer, with score
  - `email_submitted` — on successful form submission
- Each event stores: `session_id`, `quiz_slug`, `event_type`, `question_index`, `score`, `created_at`

### Analytics (Looker Studio)
- Connected directly to Supabase via PostgreSQL
- Scorecards tracking: quizzes started, quizzes completed, emails submitted
- Enables funnel analysis (started → completed → submitted)

### Multi-Quiz Hub
- `quiz.thedivot.net/` displays a hub page listing all available quizzes
- Each quiz lives at its own path: `quiz.thedivot.net/[quiz-slug]`
- Adding a new quiz requires only a new config file — no server changes

### Security
- HTTP security headers (via Helmet)
- Rate limiting on the subscribe endpoint
- Row-level security enabled on Supabase table
- Secrets managed via environment variables, never committed to code

---

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Email platform | Kit (formerly ConvertKit) |
| Hosting | Hostinger VPS (Ubuntu 24.04) |
| Containerization | Docker + Docker Compose |
| Reverse proxy / SSL | Traefik |
| DNS | Managed via Bluehost, registered at GoDaddy |
| Analytics | Looker Studio |
| Version control | GitHub |

---

## Out of Scope (v1)

- SEO / server-side rendering
- Per-quiz meta tags / Open Graph
- Score reveal before email capture
- Leaderboards or social sharing
- Admin UI for managing quizzes
- Authentication

---

## Future Considerations

- Per-quiz meta tags and Open Graph images for social sharing
- Score reveal page with answer breakdown (post-email)
- Additional quizzes on the platform
- Credential rotation for Kit API key and Supabase database password
