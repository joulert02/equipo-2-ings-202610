import prisma from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { signToken } from "../lib/jwt.js";

const PHONE_REGEX = /^3\d{9}$/;
const MIN_PASSWORD = 8;

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    createdAt: user.createdAt,
  };
}

export async function register(req, res) {
  const { phone, password, name } = req.body ?? {};

  if (!phone || !password) {
    return res.status(400).json({ message: "Teléfono y contraseña son obligatorios" });
  }

  if (typeof phone !== "string" || !PHONE_REGEX.test(phone.trim())) {
    return res.status(400).json({
      message: "El teléfono debe ser un celular colombiano de 10 dígitos (ej. 3001234567)",
    });
  }

  if (typeof password !== "string" || password.length < MIN_PASSWORD) {
    return res.status(400).json({
      message: `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres`,
    });
  }

  const normalizedPhone = phone.trim();
  const displayName =
    typeof name === "string" && name.trim().length > 0
      ? name.trim()
      : `Usuario ${normalizedPhone.slice(-4)}`;

  try {
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        phone: normalizedPhone,
        passwordHash,
        name: displayName,
      },
    });
    res.status(201).json({
      message: "Registro exitoso. Ya puedes iniciar sesión.",
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Este número ya está registrado" });
    }
    console.error("register:", error);
    res.status(500).json({ message: "Error al registrar la cuenta" });
  }
}

export async function login(req, res) {
  const { phone, password } = req.body ?? {};

  if (!phone || !password) {
    return res.status(400).json({ message: "Teléfono y contraseña son obligatorios" });
  }

  if (typeof phone !== "string" || !PHONE_REGEX.test(phone.trim())) {
    return res.status(400).json({
      message: "El teléfono debe ser un celular colombiano de 10 dígitos (ej. 3001234567)",
    });
  }

  if (typeof password !== "string") {
    return res.status(400).json({ message: "La contraseña no es válida" });
  }

  const normalizedPhone = phone.trim();

  try {
    const user = await prisma.user.findUnique({ where: { phone: normalizedPhone } });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = signToken({
      sub: String(user.id),
      name: user.name,
      phone: user.phone,
    });

    res.json({
      token,
      user: publicUser(user),
    });
  } catch (error) {
    console.error("login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}
