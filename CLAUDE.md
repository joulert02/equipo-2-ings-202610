# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FavUPB** — web app for on-demand favor exchange within a university. Users post favors with a reward, others accept and complete them.

Two separate apps, both ES modules:
- `server/` — Express + Prisma + PostgreSQL REST API
- `client/` — React 18 + Vite SPA (Tailwind, Zustand, React Router v6)

## Commands

### Server (`cd server`)
```bash
npm run dev          # nodemon, hot-reload
npm run start        # production
npx prisma migrate dev   # apply migrations
npx prisma db seed       # seed dev data
npx prisma studio        # GUI for DB
```

### Client (`cd client`)
```bash
npm run dev          # Vite dev server on :5173 (proxies /api → :3000)
npm run build
npm run preview
```

## Environment Setup

Copy `server/.env.example` → `server/.env` and fill in:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — min 16 chars
- `SEED_USER_PHONE` / `SEED_USER_PASSWORD` — for dev seed only

## Architecture

### Auth Flow
JWT-based. Server signs tokens with `JWT_SECRET`; client stores them via Zustand `persist` in localStorage under key `favupb-auth`. Every API call injects `Authorization: Bearer <token>` via an axios interceptor in `client/src/api/client.js`. Server validates with `server/src/middleware/authenticate.js`, which populates `req.user = { id, name, phone }`.

### Favor Lifecycle
```
AVAILABLE → ACCEPTED → COMPLETED → CLOSED
         ↘ CANCELLED
```
- Requester creates favor (AVAILABLE)
- Executor accepts (`/api/favors/:id/accept` → ACCEPTED)
- Executor marks done (`/api/favors/:id/complete` → COMPLETED)
- Requester confirms (`/api/favors/:id/confirm` → CLOSED)
- Requester can cancel while AVAILABLE

### Server Structure
- `src/routes/` — thin Express routers, all behind `authenticate` middleware
- `src/controllers/favors.controller.js` — all favor business logic
- `src/controllers/auth.controller.js` — register/login with bcrypt + JWT
- `src/lib/` — `jwt.js`, `password.js`, `prisma.js` (singleton client)

### Client Structure
- `src/api/` — `client.js` (axios instance), `auth.js`, `favors.js` (API call functions)
- `src/stores/authStore.js` — Zustand store, only state held globally
- `src/pages/` — `FeedPage` (browse/accept favors), `MyFavorsPage` (own requests + accepted), `LoginPage`, `RegisterPage`
- `src/components/` — `FavorCard`, `CreateFavorModal`, `ProtectedRoute`, `RootRedirect`
- `src/hooks/useAuthHydration.js` — waits for Zustand persist rehydration before rendering protected routes

### Vite Proxy
`/api/*` in dev is proxied to `http://localhost:3000`, so client code only uses relative `/api` paths — no env vars needed client-side.
