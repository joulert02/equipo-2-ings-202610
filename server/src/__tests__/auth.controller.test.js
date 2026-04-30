import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock Prisma before importing the controller so the controller
// never opens a real DB connection during tests.
vi.mock("../lib/prisma.js", () => ({
  default: {
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

import prisma from "../lib/prisma.js";
import { register, login } from "../controllers/auth.controller.js";

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("auth controller", () => {
  beforeEach(() => vi.clearAllMocks());

  describe("register", () => {
    it("returns 400 when phone is missing", async () => {
      const req = { body: { password: "password123" } };
      const res = makeRes();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("returns 400 for an invalid Colombian phone number", async () => {
      const req = { body: { phone: "1234567890", password: "password123" } };
      const res = makeRes();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("returns 400 when password is shorter than 8 characters", async () => {
      const req = { body: { phone: "3001234567", password: "short" } };
      const res = makeRes();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("returns 201 on successful registration", async () => {
      prisma.user.create.mockResolvedValue({
        id: 1,
        name: "Usuario 4567",
        phone: "3001234567",
        createdAt: new Date(),
      });
      const req = { body: { phone: "3001234567", password: "validpassword" } };
      const res = makeRes();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 409 when the phone number is already registered", async () => {
      prisma.user.create.mockRejectedValue({ code: "P2002" });
      const req = { body: { phone: "3001234567", password: "validpassword" } };
      const res = makeRes();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
    });
  });

  describe("login", () => {
    it("returns 400 when credentials are missing", async () => {
      const req = { body: {} };
      const res = makeRes();
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("returns 401 when user is not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      const req = { body: { phone: "3001234567", password: "validpassword" } };
      const res = makeRes();
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("returns 400 for an invalid phone format", async () => {
      const req = { body: { phone: "badphone", password: "validpassword" } };
      const res = makeRes();
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
