import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

export function assertJwtConfigured() {
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET debe estar definido en .env con al menos 16 caracteres");
  }
}

export function signToken(payload) {
  assertJwtConfigured();
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token) {
  assertJwtConfigured();
  return jwt.verify(token, secret);
}
