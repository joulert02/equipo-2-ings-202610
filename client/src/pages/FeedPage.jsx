import { useEffect, useState } from "react";
// Importamos las funciones necesarias de la API, incluyendo la de confirmar (RF-015)
import { getFavors, cancelFavor, confirmFavorCompletion } from "../api/favors.js";
import FavorCard from "../components/FavorCard.jsx";
import CreateFavorModal from "../components/CreateFavorModal.jsx";

export default function FeedPage() {
  const [favors, setFavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Carga inicial de datos al montar el componente
  useEffect(() => {
    loadFavors();
  }, []);

  async function loadFavors() {
    setLoading(true);
    try {
      setFavors(await getFavors());
    } catch {
      alert("No se pudieron cargar los favores");
    } finally {
      setLoading(false);
    }
  }

  // Manejador para cancelar un favor (Solo el solicitante)
  async function handleCancel(id) {
    if (!confirm("¿Cancelar esta solicitud?")) return;
    try {
      await cancelFavor(id);
      // Filtramos el favor del estado local para que desaparezca de la vista inmediatamente
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al cancelar");
    }
  }

  // RF-015: Confirma la finalización de un favor y lo elimina del feed
  async function handleConfirm(id) {
    if (!confirm("¿Confirmar que este favor fue completado?")) return;
    try {
      await confirmFavorCompletion(id);
      // Tras la respuesta exitosa del servidor, removemos el favor del listado
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al confirmar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="font-bold text-gray-800 text-lg">FavUPB</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-emerald-600"
        >
          + Publicar favor
        </button>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-3">
        {loading && (
          <p className="text-center text-gray-400 text-sm">Cargando favores...</p>
        )}
        
        {!loading && favors.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-12">
            No hay favores disponibles aún.<br />¡Sé el primero en publicar uno!
          </p>
        )}

        {/* Mapeo de favores: Pasamos las funciones a cada FavorCard */}
        {favors.map((favor) => (
          <FavorCard 
            key={favor.id} 
            favor={favor} 
            onCancel={handleCancel} 
            onConfirm={handleConfirm} // Vínculo crucial para el RF-015
          />
        ))}
      </main>

      {/* Modal para crear nuevos favores */}
      {showModal && (
        <CreateFavorModal
          onClose={() => setShowModal(false)}
          onCreated={(newFavor) => setFavors((prev) => [newFavor, ...prev])}
        />
      )}
    </div>
  );
 }