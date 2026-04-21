import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getFavors, 
  cancelFavor, 
  acceptFavor, 
  completeFavor, 
  confirmFavorCompletion 
} from "../api/favors.js";
import FavorCard from "../components/FavorCard.jsx";
import CreateFavorModal from "../components/CreateFavorModal.jsx";
import { useAuthStore } from "../stores/authStore.js";

/**
 * Página principal que muestra el listado de favores.
 * Integra la lógica de visualización, creación y actualización de estados.
 */
export default function FeedPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const userName = useAuthStore((s) => s.user?.name);

  const [favors, setFavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadFavors();
  }, []);

  async function loadFavors() {
    setLoading(true);
    try {
      const data = await getFavors();
      setFavors(data);
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }
      alert("No se pudieron cargar los favores");
    } finally {
      setLoading(false);
    }
  }

  //  Cancelar favor
  async function handleCancel(id) {
    if (!confirm("¿Cancelar esta solicitud?")) return;
    try {
      await cancelFavor(id);
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al cancelar");
    }
  }

  //  Aceptar favor
  async function handleAccept(id) {
    try {
      await acceptFavor(id);
      // Tras aceptar, el favor cambia de estado y se quita del feed público
      setFavors((prev) => prev.filter((f) => f.id !== id));
      alert("¡Favor aceptado con éxito!");
    } catch (e) {
      alert(e.response?.data?.message || "Error al aceptar");
    }
  }

  //  Marcar como completado
  async function handleComplete(id) {
    if (!confirm("¿Confirmar que terminaste este favor?")) return;
    try {
      await completeFavor(id);
      // Recargamos o filtramos para actualizar la vista
      loadFavors();
      alert("Favor marcado como completado. Esperando confirmación del dueño.");
    } catch (e) {
      alert(e.response?.data?.message || "Error al completar");
    }
  }

  // Confirmar finalización (Cerrar)
  async function handleConfirm(id) {
    if (!confirm("¿Confirmar que este favor fue completado satisfactoriamente?")) return;
    try {
      await confirmFavorCompletion(id);
      setFavors((prev) => prev.filter((f) => f.id !== id));
      alert("¡Favor cerrado y finalizado!");
    } catch (e) {
      alert(e.response?.data?.message || "Error al confirmar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Encabezado con info de usuario y logout */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10 gap-2">
        <div className="min-w-0">
          <h1 className="font-bold text-gray-800 text-lg">FavUPB</h1>
          {userName && <p className="text-xs text-gray-500 truncate">Hola, {userName}</p>}
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="text-gray-600 text-sm font-medium px-3 py-2 rounded-xl hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-emerald-600 shadow-sm"
          >
            + Publicar favor
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-3">
        {loading && <p className="text-center text-gray-400 text-sm animate-pulse">Cargando favores...</p>}

        {!loading && favors.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-12 bg-white p-8 rounded-2xl border border-dashed">
            No hay favores disponibles aún.<br/>¡Sé el primero en ayudar!
          </div>
        )}

        {favors.map((favor) => (
          <FavorCard 
            key={favor.id} 
            favor={favor} 
            onCancel={handleCancel} 
            onAccept={handleAccept}
            onComplete={handleComplete}
            onConfirm={handleConfirm}
          />
        ))}
      </main>

      {/* Modal para crear un nuevo favor */}
      {showModal && (
        <CreateFavorModal
          onClose={() => setShowModal(false)}
          onCreated={(newFavor) => setFavors((prev) => [newFavor, ...prev])}
        />
      )}
    </div>
  );
}