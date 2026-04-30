# FavUPB — Server

REST API built with Node.js and Express for managing favor requests within the university community. Handles user authentication, favor creation, acceptance, cancellation, and completion tracking.

---

## What does this folder do?

This folder contains the entire backend of the application. It exposes a REST API consumed by the React client, manages all business logic, connects to a PostgreSQL database through Prisma ORM, and handles authentication via JWT tokens with bcrypt password hashing.

---

## How do I install this part of the project?

### Prerequisites
- Node.js v18 or higher — download at [nodejs.org](https://nodejs.org)
- PostgreSQL v12 or higher — download at [postgresql.org](https://www.postgresql.org)
- pgAdmin 4 (comes bundled with PostgreSQL) — used to manage the database visually
- Git

### Steps

**1. Clone the repository and navigate to the server folder**
```bash
git clone <repository-url>
cd equipo-2-ings-202610/server
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Copy the example file and fill in your values:
```bash
copy .env.example .env
```

Open `.env` and set your values:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/favupb"
PORT=3000
JWT_SECRET="your_long_random_secret_min_16_chars"
# JWT_EXPIRES_IN=7d   (optional, defaults to 7d)
# SEED_USER_PHONE="3001234567"       (optional, for development seed)
# SEED_USER_PASSWORD="dev123456"     (optional, for development seed)
```

**4. Create the PostgreSQL database**

Open pgAdmin 4, right-click on **Databases → Create → Database**, name it `favupb`, and click Save.

**5. Run database migrations**
```bash
npx prisma migrate deploy
```

**6. Seed the database with a test user**
```bash
node prisma/seed.js
```

This creates a test user using the phone and password defined in your `.env` file.

---

## How do I run this part of the project?

**Development mode** (with auto-reload via nodemon):
```bash
npm run dev
```
The server will be available at `http://localhost:3000`

**Production mode:**
```bash
npm start
```

**Verify the server is running:**

Open `http://localhost:3000/api/health` in your browser — it should return `{ "ok": true }`.

---

## What standards should be followed in this part of the project?

- **JSDoc** — all exported functions must have a JSDoc comment explaining what they do, their parameters, return values, and any validations performed.
- **MVC architecture** — business logic lives in `controllers/`, route definitions in `routes/`, and database utilities in `lib/`. Never put business logic directly in route files.
- **Error handling** — all controller functions must use `try/catch` and return appropriate HTTP status codes: `400` for validation errors, `401` for authentication errors, `403` for permission errors, `404` for not found, `409` for conflicts, `500` for server errors.
- **Authentication** — all protected routes must use the `authenticate` middleware from `src/middleware/authenticate.js`. Never use `fakeAuth` in code that will be merged to `development`.
- **Environment variables** — never hardcode secrets, passwords, or configuration values. Always use `process.env` and document new variables in `.env.example`.
- **Commits** — messages must be written in English and follow the format: `type: short description` (e.g. `feat: add mark as completed endpoint`).

---

## What version of JavaScript does it use?

**ES2022 (ESModules)**. The project uses `"type": "module"` in `package.json`, so all imports use `import/export` syntax. Node.js v18 or higher is required.

---

## What do I need for the database?

- **PostgreSQL v12 or higher** must be installed and running.
- Create a database named `favupb` in pgAdmin before running migrations.
- Set the `DATABASE_URL` in your `.env` file with your PostgreSQL credentials.
- Run `npx prisma migrate deploy` to apply all migrations.
- Run `node prisma/seed.js` to create the development test user.
- The database schema is defined in `prisma/schema.prisma`. When you modify the schema, create a new migration with `npx prisma migrate dev --name description-of-change`.

---

## API endpoints

| Method | Route | Auth required | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Register with phone and password |
| `POST` | `/api/auth/login` | No | Login — returns JWT token and user |
| `GET` | `/api/favors` | Yes | List all available favors |
| `POST` | `/api/favors` | Yes | Create a new favor request |
| `PATCH` | `/api/favors/:id/cancel` | Yes | Cancel own favor (must be AVAILABLE) |
| `PATCH` | `/api/favors/:id/accept` | Yes | Accept an available favor |
| `PATCH` | `/api/favors/:id/complete` | Yes | Mark accepted favor as completed — executor only, favor must be ACCEPTED |
| `GET` | `/api/favors/accepted` | Yes | List favors accepted by the current user |
| `GET` | `/api/health` | No | Health check |

All protected endpoints require the header: `Authorization: Bearer <token>`

---

## File structure

```
server/
├── .env.example                     — Environment variables template
├── package.json                     — Dependencies and scripts
├── prisma/
│   ├── schema.prisma                — Database schema (User, Favor models)
│   ├── seed.js                      — Creates development test user
│   └── migrations/                  — Migration history (auto-generated)
└── src/
    ├── index.js                     — Entry point: configures Express, registers routers, validates JWT_SECRET
    ├── controllers/
    │   ├── auth.controller.js       — register() and login() logic (bcrypt + JWT)
    │   └── favors.controller.js     — getFavors(), createFavor(), cancelFavor(), acceptFavor(), markFavorAsCompleted(), getMyAcceptedFavors()
    ├── routes/
    │   ├── auth.js                  — POST /register and POST /login
    │   └── favors.js                — All /favors endpoints with authenticate middleware
    ├── middleware/
    │   └── authenticate.js          — Verifies JWT from Authorization header, attaches req.user
    └── lib/
        ├── prisma.js                — Singleton Prisma client instance
        ├── jwt.js                   — signToken(), verifyToken(), assertJwtConfigured()
        └── password.js              — hashPassword(), verifyPassword() using bcryptjs
```

---

## Main dependencies

| Package | Purpose |
|---|---|
| `express` | Web framework for Node.js |
| `@prisma/client` + `prisma` | ORM for PostgreSQL |
| `cors` | Cross-origin request handling |
| `dotenv` | Loads environment variables from `.env` |
| `bcryptjs` | Secure password hashing (10 rounds) |
| `jsonwebtoken` | JWT signing and verification |
| `nodemon` | Auto-reload during development |
