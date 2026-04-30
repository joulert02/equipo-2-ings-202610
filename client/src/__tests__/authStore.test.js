import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../stores/authStore.js";

describe("authStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.getState().logout();
  });

  it("starts with no token and no user", () => {
    const { token, user } = useAuthStore.getState();
    expect(token).toBeNull();
    expect(user).toBeNull();
  });

  it("setSession stores token and user correctly", () => {
    useAuthStore.getState().setSession("tok123", { id: 1, name: "Ana" });
    const { token, user } = useAuthStore.getState();
    expect(token).toBe("tok123");
    expect(user.id).toBe(1);
    expect(user.name).toBe("Ana");
  });

  it("logout clears token and user", () => {
    useAuthStore.getState().setSession("tok123", { id: 1, name: "Ana" });
    useAuthStore.getState().logout();
    const { token, user } = useAuthStore.getState();
    expect(token).toBeNull();
    expect(user).toBeNull();
  });
});
