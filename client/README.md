# FavUPB — Client

React web application for requesting and managing favors within the university community. Users can browse available favors, publish their own requests, accept favors from others, and track completion.

---

## What does this folder do?

This folder contains the entire frontend of the application. It is a single-page application (SPA) built with React 18 and Vite. It communicates with the backend REST API through HTTP requests using Axios, manages authentication state with Zustand, and handles all user-facing screens: login, registration, the favor feed, and the accepted favors list.

---

## How do I install this part of the project?

### Prerequisites
- Node.js v18 or higher — download at [nodejs.org](https://nodejs.org)
- The backend server must be running on `localhost:3000` before starting the client
- Git

### Steps

**1. Clone the repository and navigate to the client folder**
```bash
git clone <repository-url>
cd equipo-2-ings-202610/client
```

**2. Install dependencies**
```bash
npm install
```

---

## How do I run this part of the project?

**Development mode** (with hot reload):
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

**Production build:**
```bash
npm run build
```
Generates optimized files in the `dist/` folder.

**Preview production build locally:**
```bash
npm run preview
```

---

## What standards should be followed in this part of the project?

- **JSDoc** — all functions and components must have a JSDoc comment explaining what they do, their parameters, and return value.
- **Component naming** — PascalCase for all React components (e.g. `FavorCard`, `FeedPage`).
- **File naming** — camelCase for utility files, PascalCase for component files.
- **Formatting** — Prettier is used for consistent code formatting. Run `npx prettier --write .` before committing.
- **No hardcoded user IDs** — the authenticated user's ID must always come from `useAuthStore((s) => s.user?.id)`, never as a fixed value.
- **API calls** — all HTTP calls must go through `src/api/client.js` (the centralized Axios instance with the JWT interceptor), never through a locally created `axios.create()`.
- **Commits** — messages must be written in English and follow the format: `type: short description` (e.g. `feat: add accept favor button`).

---

## What version of JavaScript does it use?

**ES2022 (ESModules)**. The project uses `"type": "module"` in `package.json`, so all imports use `import/export` syntax. Node.js v18 or higher is required.

---

## What do I need for the database?

The client does not connect to the database directly. All data access goes through the backend API. Make sure the backend server is running and connected to PostgreSQL before starting the client.

---

## File structure

```
client/
├── index.html                  — Main HTML template
├── vite.config.js              — Vite configuration and API proxy
├── tailwind.config.js          — Tailwind CSS configuration
├── postcss.config.js           — PostCSS configuration
├── package.json                — Dependencies and scripts
└── src/
    ├── main.jsx                — React entry point
    ├── App.jsx                 — Root component and route definitions
    ├── index.css               — Global styles (Tailwind directives)
    ├── api/
    │   ├── client.js           — Centralized Axios instance with JWT interceptor
    │   ├── auth.js             — register() and login() API calls
    │   └── favors.js           — getFavors(), createFavor(), cancelFavor(), acceptFavor(), completeFavor(), getMyAcceptedFavors()
    ├── stores/
    │   └── authStore.js        — Zustand store for authentication state (token + user, persisted)
    ├── hooks/
    │   └── useAuthHydration.js — Waits for Zustand persistence to hydrate before rendering auth decisions
    ├── components/
    │   ├── FavorCard.jsx       — Displays a single favor with cancel, accept, or complete actions
    │   ├── CreateFavorModal.jsx — Form modal for publishing a new favor request
    │   ├── ProtectedRoute.jsx  — Redirects unauthenticated users to /login
    │   └── RootRedirect.jsx    — Redirects / to /feed or /login based on auth state
    └── pages/
        ├── LoginPage.jsx       — Login screen with phone and password form
        ├── RegisterPage.jsx    — Registration screen
        ├── FeedPage.jsx        — Main feed showing available favors
        └── MyFavorsPage.jsx    — Shows favors accepted by the current user
```

---

## Main dependencies

| Package | Purpose |
|---|---|
| `react` + `react-dom` | UI library |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP client for API calls |
| `zustand` | Lightweight global state management |
| `react-hook-form` | Performant form handling |
| `yup` + `@hookform/resolvers` | Schema-based form validation |
| `tailwindcss` | Utility-first CSS framework |
| `vite` | Build tool and dev server |
