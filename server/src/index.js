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

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/favors", favorsRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});