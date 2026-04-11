import { useEffect, useState } from "react";
import { getMyAcceptedFavors } from "../api/favors.js";

export default function MyFavorsPage() {
  const [favors, setFavors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyAcceptedFavors()
      .then(setFavors)
      .catch(() => alert("No se pudieron cargar tus favores"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <h1 className="font-bold text-gray-800 text-lg">Mis favores aceptados</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-3">
        {loading && <p className="text-center text-gray-400 text-sm">Cargando...</p>}
        {!loading && favors.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-12">
            Aún no has aceptado ningún favor.
          </p>
        )}
        {favors.map((favor) => (
          <article key={favor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold text-gray-800 text-base">{favor.title}</h2>
              <span className="text-emerald-600 font-bold text-sm">
                ${favor.reward.toLocaleString("es-CO")}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{favor.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
              <span>📍 {favor.location}</span>
              {favor.deadline && (
                <span>⏰ {new Date(favor.deadline).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })}</span>
              )}
            </div>

            {/* RF-013 — Contacto del solicitante */}
            <div className="mt-2 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-sm">
              <p className="font-medium text-emerald-800">Contacto del solicitante</p>
              <p className="text-gray-600">👤 {favor.requester?.name}</p>
              <p className="text-gray-600">📞 {favor.requester?.phone}</p>
            </div>

            {/* RF-014 — Marcar como completado */}
            <button
              className="mt-1 w-full text-sm text-white bg-blue-500 rounded-xl py-2 hover:bg-blue-600 transition-colors font-medium"
              onClick={() => alert(`Funcionalidad RF-014 pendiente para favor #${favor.id}`)}
            >
              ✔️ Marcar como completado
            </button>
          </article>
        ))}
      </main>
    </div>
  );
}