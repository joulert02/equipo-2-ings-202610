import "dotenv/config";
import express from "express";
import cors from "cors";
import favorsRouter from "./routes/favors.js";
import authRouter from "./routes/auth.js";
import { assertJwtConfigured } from "./lib/jwt.js";

try {
  assertJwtConfigured();
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/favors", favorsRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Vercel exports the app directly; locally we listen
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;