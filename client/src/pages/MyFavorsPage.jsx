import { useEffect, useState } from "react";
import { getMyAcceptedFavors, completeFavor } from "../api/favors.js";
import FavorCard from "../components/FavorCard.jsx";
import { useAuthStore } from "../stores/authStore.js";

/**
 * Página que muestra los favores aceptados por el usuario.
 * Implementa la lógica real para la RF-014 (Marcar como completado).
 */
export default function MyFavorsPage() {
  const [favors, setFavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    loadMyFavors();
  }, []);

  async function loadMyFavors() {
    setLoading(true);
    try {
      const data = await getMyAcceptedFavors();
      setFavors(data);
    } catch (e) {
      if (e.response?.status === 401) logout();
      alert("Error al cargar tus favores aceptados");
    } finally {
      setLoading(false);
    }
  }

  // Lógica real para RF-014: Envía la petición al servidor en lugar de un alert
  async function handleComplete(id) {
    if (!confirm("¿Confirmar que terminaste este favor?")) return;
    try {
      await completeFavor(id);
      // Actualiza la lista para reflejar el cambio de estado
      loadMyFavors();
      alert("¡Favor marcado como completado! El dueño ahora debe confirmarlo.");
    } catch (e) {
      alert(e.response?.data?.message || "Error al completar el favor");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-lg mx-auto mb-6">
        <h1 className="font-bold text-gray-800 text-xl">Mis favores aceptados</h1>
      </header>

      <main className="max-w-lg mx-auto flex flex-col gap-3">
        {loading && <p className="text-center text-gray-400">Cargando...</p>}
        
        {!loading && favors.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No tienes favores pendientes por realizar.</p>
        )}

        {favors.map((favor) => (
          /* Usamos FavorCard para que el diseño sea consistente en toda la app */
          <FavorCard 
            key={favor.id} 
            favor={favor} 
            onComplete={handleComplete} 
          />
        ))}
      </main>
    </div>
  );
}