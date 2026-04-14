import { Navigate } from "react-router-dom";
import { useAuthHydration } from "../hooks/useAuthHydration.js";
import { useAuthStore } from "../stores/authStore.js";

/**
 * Waits for auth persistence to hydrate, then sends the user to /feed or /login.
 * Avoids redirecting through /feed when there is no session (extra hop and flash).
 */
export default function RootRedirect() {
  const hydrated = useAuthHydration();

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-sm">
        Cargando sesión…
      </div>
    );
  }

  const token = useAuthStore.getState().token;
  return <Navigate to={token ? "/feed" : "/login"} replace />;
}
