import { useEffect, useState } from "react";
import { getFavors, cancelFavor, acceptFavor } from "../api/favors.js";
import FavorCard from "../components/FavorCard.jsx";
import CreateFavorModal from "../components/CreateFavorModal.jsx";

export default function FeedPage() {
  const [favors, setFavors]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { loadFavors(); }, []);

  // Carga la lista de favores desde el servidor, maneja estados de carga y muestra errores al usuario.
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

  // Cancela un favor con confirmación previa. Si es exitoso, lo elimina del feed; si falla, muestra el error.
  async function handleCancel(id) {
    if (!confirm("¿Cancelar esta solicitud?")) return;
    try {
      await cancelFavor(id);
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al cancelar");
    }
  }

  // Acepta un favor. Si es exitoso, lo elimina del feed (ya no está disponible); si falla, muestra el error.
  async function handleAccept(id) {
    try {
      await acceptFavor(id);
      setFavors((prev) => prev.filter((f) => f.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Error al aceptar");
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
        {favors.map((favor) => (
          <FavorCard key={favor.id} favor={favor} onCancel={handleCancel} onAccept={handleAccept} />
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