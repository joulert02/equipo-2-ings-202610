import { Navigate } from "react-router-dom";
import { useAuthHydration } from "../hooks/useAuthHydration.js";
import { useAuthStore } from "../stores/authStore.js";

/**
 * Espera a que la persistencia de autenticación se hidrate, luego redirige al usuario a /feed o /login.
 * Evita redirigir a /feed cuando no hay sesión (ahorrando un salto extra y el parpadeo de la UI).
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
