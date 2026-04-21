import { useEffect, useState } from "react";
import { getMyAcceptedFavors, getMyRequestedFavors, completeFavor, confirmFavorCompletion, cancelFavor } from "../api/favors.js";
import FavorCard from "../components/FavorCard.jsx";
import { useAuthStore } from "../stores/authStore.js";

/**
 * Página que muestra los favores relacionados con el usuario:
 * 1. Favores que aceptó realizar (RF-014).
 * 2. Favores que solicitó y están en proceso (RF-015).
 */
export default function MyFavorsPage() {
  const [acceptedFavors, setAcceptedFavors] = useState([]);
  const [requestedFavors, setRequestedFavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    loadAllFavors();
  }, []);

  async function loadAllFavors() {
    setLoading(true);
    try {
      const [accepted, requested] = await Promise.all([
        getMyAcceptedFavors(),
        getMyRequestedFavors()
      ]);
      setAcceptedFavors(accepted);
      setRequestedFavors(requested);
    } catch (e) {
      if (e.response?.status === 401) logout();
      alert("Error al cargar tus favores");
    } finally {
      setLoading(false);
    }
  }

  // Lógica para RF-014: Completar (Ejecutor)
  async function handleComplete(id) {
    if (!confirm("¿Confirmar que terminaste este favor?")) return;
    try {
      await completeFavor(id);
      loadAllFavors();
      alert("¡Favor marcado como completado! El dueño ahora debe confirmarlo.");
    } catch (e) {
      alert(e.response?.data?.message || "Error al completar el favor");
    }
  }

  // Lógica para RF-015: Confirmar y Cerrar (Dueño)
  async function handleConfirm(id) {
    if (!confirm("¿Confirmar que este favor fue completado satisfactoriamente?")) return;
    try {
      await confirmFavorCompletion(id);
      loadAllFavors();
      alert("¡Favor finalizado con éxito!");
    } catch (e) {
      alert(e.response?.data?.message || "Error al confirmar la finalización");
    }
  }

  // Lógica para Cancelar (Solo si sigue AVAILABLE)
  async function handleCancel(id) {
    if (!confirm("¿Cancelar esta solicitud?")) return;
    try {
      await cancelFavor(id);
      loadAllFavors();
    } catch (e) {
      alert(e.response?.data?.message || "Error al cancelar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-lg mx-auto flex flex-col gap-8">
        
        {/* SECCIÓN 1: Favores que yo acepté hacer */}
        <section>
          <header className="mb-4">
            <h2 className="font-bold text-gray-800 text-xl">Favores que acepté</h2>
            <p className="text-xs text-gray-500">Favores de otros que tú te comprometiste a realizar.</p>
          </header>

          <div className="flex flex-col gap-3">
            {loading && <p className="text-center text-gray-400 text-sm animate-pulse">Cargando...</p>}
            
            {!loading && acceptedFavors.length === 0 && (
              <div className="bg-white p-6 rounded-2xl border border-dashed text-center">
                <p className="text-gray-400 text-sm">No tienes favores pendientes por realizar.</p>
              </div>
            )}

            {acceptedFavors.map((favor) => (
              <FavorCard 
                key={favor.id} 
                favor={favor} 
                onComplete={handleComplete} 
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: Favores que yo pedí */}
        <section>
          <header className="mb-4">
            <h2 className="font-bold text-gray-800 text-xl">Favores que pedí</h2>
            <p className="text-xs text-gray-500">Tus solicitudes. Confirma aquí cuando te las cumplan.</p>
          </header>

          <div className="flex flex-col gap-3">
            {loading && <p className="text-center text-gray-400 text-sm animate-pulse">Cargando...</p>}
            
            {!loading && requestedFavors.length === 0 && (
              <div className="bg-white p-6 rounded-2xl border border-dashed text-center">
                <p className="text-gray-400 text-sm">No has pedido ningún favor todavía.</p>
              </div>
            )}

            {requestedFavors.map((favor) => (
              <FavorCard 
                key={favor.id} 
                favor={favor} 
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}