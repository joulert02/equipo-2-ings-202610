import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavors, cancelFavor, acceptFavor, completeFavor } from "../api/favors.js";
import FavorCard from "../components/FavorCard.jsx";
import CreateFavorModal from "../components/CreateFavorModal.jsx";
import { useAuthStore } from "../stores/authStore.js";

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
      setFavors(await getFavors());
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

  async function handleCancel(id) {
    if (!confirm("¿Cancelar esta solicitud?")) return;
    try {
      await cancelFavor(id);
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al cancelar");
    }
  }

  async function handleAccept(id) {
    try {
      await acceptFavor(id);
      // Al aceptar, el favor cambia de estado y ya no debe estar en el feed público
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al aceptar");
    }
  }

  async function handleComplete(id) {
    if (!confirm("¿Confirmar que este favor fue completado?")) return;
    try {
      await completeFavor(id);
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al completar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-10 gap-2">
        <div className="min-w-0">
          <h1 className="font-bold text-gray-800 text-lg">FavUPB</h1>
          {userName && <p className="text-xs text-gray-500 truncate">{userName}</p>}
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
            className="bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-emerald-600"
          >
            + Publicar favor
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-3">
        {loading && <p className="text-center text-gray-400 text-sm">Cargando favores...</p>}

        {!loading && favors.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-12">
            No hay favores disponibles aún.
          </p>
        )}

        {favors.map((favor) => (
          <FavorCard 
            key={favor.id} 
            favor={favor} 
            onCancel={handleCancel} 
            onAccept={handleAccept}
            onComplete={handleComplete}
          />
        ))}
      </main>

      {showModal && (
        <CreateFavorModal
          onClose={() => setShowModal(false)}
          onCreated={(newFavor) => setFavors((prev) => [newFavor, ...prev])}
        />
      )}
    </div>
  );
}