import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FavorCard from "../components/FavorCard.jsx";

// Mock the auth store so tests don't depend on real Zustand persist/localStorage
vi.mock("../stores/authStore.js", () => ({
  useAuthStore: (selector) => selector({ user: { id: 1 }, token: "tok" }),
}));

const baseFavor = {
  id: 1,
  title: "Llevar paquete",
  description: "Entregar en bloque 14",
  location: "Bloque 14",
  reward: 5000,
  status: "AVAILABLE",
  deadline: null,
  requesterId: 2,
  requester: { id: 2, name: "Otro usuario" },
  executorId: null,
  executor: null,
};

describe("FavorCard", () => {
  it("renders the favor title and reward", () => {
    render(<FavorCard favor={baseFavor} onAccept={vi.fn()} />);
    expect(screen.getByText("Llevar paquete")).toBeInTheDocument();
    expect(screen.getByText(/5\.000/)).toBeInTheDocument();
  });

  it("shows accept button when the current user is NOT the owner", () => {
    // currentUserId = 1, requesterId = 2 → not the owner
    render(<FavorCard favor={baseFavor} onAccept={vi.fn()} />);
    expect(screen.getByText(/Aceptar favor/i)).toBeInTheDocument();
  });

  it("shows cancel button when the current user IS the owner", () => {
    // currentUserId = 1, requesterId = 1 → owner
    const ownFavor = { ...baseFavor, requesterId: 1, requester: { id: 1, name: "Yo" } };
    render(<FavorCard favor={ownFavor} onCancel={vi.fn()} />);
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
  });

  it("shows complete button for the executor when status is ACCEPTED", () => {
    // currentUserId = 1 → executor
    const acceptedFavor = {
      ...baseFavor,
      status: "ACCEPTED",
      executorId: 1,
      executor: { id: 1, name: "Yo" },
    };
    render(<FavorCard favor={acceptedFavor} onComplete={vi.fn()} />);
    expect(screen.getByText(/Marcar como completado/i)).toBeInTheDocument();
  });

  it("shows confirm button for the owner when status is COMPLETED", () => {
    // currentUserId = 1 → owner, executor already marked it done
    const completedFavor = {
      ...baseFavor,
      requesterId: 1,
      requester: { id: 1, name: "Yo" },
      status: "COMPLETED",
      executorId: 2,
    };
    render(<FavorCard favor={completedFavor} onConfirm={vi.fn()} />);
    expect(screen.getByText(/Confirmar/i)).toBeInTheDocument();
  });
});
