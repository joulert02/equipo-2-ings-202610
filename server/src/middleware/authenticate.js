import { verifyToken } from "../lib/jwt.js";

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7).trim() : null;

  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const payload = verifyToken(token);
    const id = Number(payload.sub);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = {
      id,
      name: payload.name,
      phone: payload.phone,
    };
    next();
  } catch {
    return res.status(401).json({ message: "Sesión inválida o expirada" });
  }
}
