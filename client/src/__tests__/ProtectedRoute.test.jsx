import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

// Control hydration and token state from the test
let mockToken = null;

vi.mock("../hooks/useAuthHydration.js", () => ({
  useAuthHydration: () => true,
}));

vi.mock("../stores/authStore.js", () => ({
  useAuthStore: (selector) => selector({ token: mockToken, user: null }),
}));

function renderWithRouter(token) {
  mockToken = token;
  render(
    <MemoryRouter initialEntries={["/feed"]}>
      <Routes>
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <div>Contenido protegido</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Página de login</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  it("redirects to /login when there is no token", () => {
    renderWithRouter(null);
    expect(screen.queryByText("Contenido protegido")).not.toBeInTheDocument();
    expect(screen.getByText("Página de login")).toBeInTheDocument();
  });

  it("renders children when a valid token exists", () => {
    renderWithRouter("valid-token");
    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
  });
});
