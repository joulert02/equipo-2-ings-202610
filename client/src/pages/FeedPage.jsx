import { useEffect, useState } from "react";
// Importa funciones para interactuar con la API de favores
import { getFavors, cancelFavor, confirmFavorCompletion } from "../api/favors.js";
import FavorCard from "../components/FavorCard.jsx";
import CreateFavorModal from "../components/CreateFavorModal.jsx";

/**
 * Página principal que muestra el listado de favores disponibles.
 * - Gestiona el estado global del feed
 * - Permite cancelar y confirmar favores
 * - Controla la visualización del modal de creación
 */
export default function FeedPage() {
  const [favors, setFavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  /**
   * Ejecuta la carga inicial de favores al montar el componente.
   */
  useEffect(() => {
    loadFavors();
  }, []);

  /**
   * Obtiene los favores desde la API y actualiza el estado.
   * - Activa indicador de carga mientras se realiza la petición
   * - Maneja errores mostrando un mensaje al usuario
   */
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

  /**
   * Cancela un favor existente.
   * - Solicita confirmación al usuario
   * - Elimina el favor del estado local tras cancelarlo
   */
  async function handleCancel(id) {
    if (!confirm("¿Cancelar esta solicitud?")) return;

    try {
      await cancelFavor(id);

      // Actualiza el estado eliminando el favor cancelado
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al cancelar");
    }
  }

  /**
   * Confirma la finalización de un favor.
   * - Solicita confirmación al usuario
   * - Elimina el favor del listado tras confirmarlo
   */
  async function handleConfirm(id) {
    if (!confirm("¿Confirmar que este favor fue completado?")) return;

    try {
      await confirmFavorCompletion(id);

      // Actualiza el estado eliminando el favor completado
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al confirmar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Encabezado de la página con título y acción principal */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="font-bold text-gray-800 text-lg">FavUPB</h1>

        {/* Botón para abrir el modal de creación */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-emerald-600"
        >
          + Publicar favor
        </button>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-3">

        {/* Indicador de carga */}
        {loading && (
          <p className="text-center text-gray-400 text-sm">
            Cargando favores...
          </p>
        )}

        {/* Mensaje cuando no hay datos */}
        {!loading && favors.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-12">
            No hay favores disponibles aún.<br />
            ¡Sé el primero en publicar uno!
          </p>
        )}

        {/* Renderiza cada favor usando el componente FavorCard */}
        {favors.map((favor) => (
          <FavorCard
            key={favor.id}
            favor={favor}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        ))}
      </main>

      {/* Modal para crear un nuevo favor */}
      {showModal && (
        <CreateFavorModal
          onClose={() => setShowModal(false)}

          // Agrega el nuevo favor al inicio del listado
          onCreated={(newFavor) =>
            setFavors((prev) => [newFavor, ...prev])
          }
        />
      )}
    </div>
  );
}