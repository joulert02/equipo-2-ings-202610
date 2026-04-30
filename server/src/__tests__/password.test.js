import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../lib/password.js";

describe("password utils", () => {
  it("hashPassword returns a bcrypt hash", async () => {
    const hash = await hashPassword("mypassword");
    expect(hash).toMatch(/^\$2[ab]\$/);
  });

  it("verifyPassword returns true for the correct password", async () => {
    const hash = await hashPassword("correct-password");
    expect(await verifyPassword("correct-password", hash)).toBe(true);
  });

  it("verifyPassword returns false for a wrong password", async () => {
    const hash = await hashPassword("correct-password");
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });
});
