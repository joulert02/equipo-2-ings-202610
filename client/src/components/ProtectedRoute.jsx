import { Navigate } from "react-router-dom";
import { useAuthHydration } from "../hooks/useAuthHydration.js";
import { useAuthStore } from "../stores/authStore.js";

export default function ProtectedRoute({ children }) {
  const hydrated = useAuthHydration();
  const token = useAuthStore((s) => s.token);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-sm">
        Cargando sesión…
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
