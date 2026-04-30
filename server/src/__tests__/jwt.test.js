import { describe, it, expect } from "vitest";
import { signToken, verifyToken, assertJwtConfigured } from "../lib/jwt.js";

// JWT_SECRET is injected via vitest.config.js → test.env

describe("jwt utils", () => {
  it("assertJwtConfigured does not throw with a valid secret", () => {
    expect(() => assertJwtConfigured()).not.toThrow();
  });

  it("signToken returns a three-part JWT string", () => {
    const token = signToken({ sub: "1", name: "Test" });
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
  });

  it("verifyToken decodes the correct payload", () => {
    const token = signToken({ sub: "42", name: "Maria" });
    const payload = verifyToken(token);
    expect(payload.sub).toBe("42");
    expect(payload.name).toBe("Maria");
  });

  it("verifyToken throws on a tampered token", () => {
    expect(() => verifyToken("invalid.token.here")).toThrow();
  });
});
