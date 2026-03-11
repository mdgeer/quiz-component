# Deployment Guide & Explainer
## Quiz Component — The Divot

**Last updated:** March 2026

This document explains what was set up to deploy the quiz app to production, why each decision was made, and how to maintain it going forward.

---

## The Big Picture

The quiz app is a Node.js application — it needs a server running 24/7 to handle requests. A standard WordPress shared hosting account (like Bluehost) can't do this — it's designed for PHP, not persistent Node.js processes. So the app runs on a separate VPS (Virtual Private Server) at Hostinger, while the main thedivot.net site continues running on Bluehost unchanged.

Visitors reach the quiz at `quiz.thedivot.net`, which is a subdomain pointed at the VPS. The main site is completely unaffected.

---

## Infrastructure Overview

```
User's browser
     │
     ▼
quiz.thedivot.net  (DNS A record → Hostinger VPS IP)
     │
     ▼
Traefik (reverse proxy, handles SSL)
     │
     ▼
Quiz app container (Node.js on port 3000)
     │
     ├── Supabase (event tracking)
     └── Kit API (email subscription)
```

---

## Component Breakdown

### 1. Hostinger VPS
**What it is:** A virtual private server — essentially a Linux computer (Ubuntu 24.04) running in the cloud that you rent by the month. Unlike shared hosting, you have full control over what runs on it.

**Why we used it:** The quiz app needs Node.js, which shared hosting doesn't support. The VPS already existed (used for n8n) so there was no additional cost.

---

### 2. Docker & Docker Compose
**What it is:** Docker is a tool that packages an application and everything it needs to run into a self-contained unit called a container. Docker Compose is a tool for defining and running multiple containers together using a single config file (`docker-compose.yml`).

**Why we used it:** The VPS already used Docker for n8n, so it was the natural choice. Docker makes deployments reliable — the app runs identically every time, regardless of what else is on the server. It also keeps the quiz app isolated from n8n so they can't interfere with each other.

**The Dockerfile** (in the project root) tells Docker how to build the quiz app:
1. Start from a Node.js base image
2. Install dependencies
3. Build the React frontend (`npm run build`)
4. Start the Express server (`node server.js`)

It uses a two-stage build: the first stage installs everything needed to build the app (including dev tools), and the second stage only keeps what's needed to run it. This keeps the final image smaller.

---

### 3. Traefik
**What it is:** A reverse proxy that sits in front of your containers and routes incoming web traffic to the right one. It also handles SSL certificates automatically using Let's Encrypt.

**Why we used it:** It was already running on the VPS for n8n. Adding the quiz app to Traefik was just a matter of adding labels to the Docker Compose service — Traefik reads those labels and knows to route `quiz.thedivot.net` traffic to the quiz container. SSL (the `https://` padlock) was handled automatically with no extra steps.

**What the labels do** (in `docker-compose.yml`):
- `traefik.enable=true` — tells Traefik to manage this container
- `traefik.http.routers.quiz.rule=Host(\`quiz.thedivot.net\`)` — route traffic for this domain to this container
- `traefik.http.routers.quiz.tls.certresolver=mytlschallenge` — automatically get and renew an SSL cert
- `traefik.http.services.quiz.loadbalancer.server.port=3000` — the app listens on port 3000 internally

---

### 4. DNS (Domain Name System)
**What it is:** DNS translates a human-readable domain name (`quiz.thedivot.net`) into an IP address (`31.97.139.186`) that computers use to find each other.

**What we did:** Added an A record in Bluehost's DNS settings (where thedivot.net's DNS is managed, even though the domain is registered at GoDaddy):
- Type: `A`
- Name: `quiz`
- Value: `31.97.139.186` (the VPS's IP address)

This means: "when anyone asks where `quiz.thedivot.net` is, send them to `31.97.139.186`."

The rest of the site (`thedivot.net`, `www.thedivot.net`) was untouched — those records still point to Bluehost.

---

### 5. Environment Variables
**What they are:** Configuration values that live on the server rather than in the code. Things like API keys and database passwords.

**Why we use them:** Secrets should never be committed to a GitHub repository (which is public). Instead, they're stored in a `.env` file on the server that only you can access. The app reads them at runtime.

**Where they live on the server:** `~/.env` on the VPS. The Docker Compose file reads this file and passes the values into the container.

**Current variables:**
- `KIT_API_KEY` — authenticates requests to the Kit email API
- `DATABASE_URL` — connection string for the Supabase PostgreSQL database

---

## How Deployments Work

Every time you want to update the live site:

1. Make changes locally and push to GitHub
2. SSH into the VPS
3. Run:
```bash
cd /root/quiz-component && git pull && cd ~ && docker compose up -d --build quiz
```

What this does:
- `git pull` — downloads the latest code from GitHub
- `docker compose up -d --build quiz` — rebuilds the Docker image with the new code and restarts the container. The `-d` flag runs it in the background. The existing n8n container is not touched.

The build takes about 30–60 seconds. There's a brief downtime during the container restart (a few seconds).

---

## Adding a New Quiz

1. Create `src/quizConfigs/your-quiz-name.js` (copy `golf-iq.js` as a template)
2. Register it in `src/quizConfigs/index.js`
3. Push to GitHub and deploy (steps above)
4. It'll be live at `quiz.thedivot.net/your-quiz-name`

No server configuration changes needed — the routing is handled automatically by React Router.

---

## Maintenance Notes

### Rotating credentials
The Kit API key and Supabase database password were exposed in conversation history and should be rotated:
1. Generate a new Kit API key in the Kit dashboard
2. Reset the Supabase database password in Project Settings → Database
3. Update `~/.env` on the VPS with the new values
4. Run `docker compose restart quiz`

### Updating the app
Follow the deployment steps above. Docker caches layers, so rebuilds are fast when only source files change.

### Checking logs
```bash
docker compose logs quiz
```

### Checking container status
```bash
docker ps
```
