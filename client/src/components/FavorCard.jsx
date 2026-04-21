import { useAuthStore } from "../stores/authStore.js";

// Renderiza una tarjeta individual de favor mostrando título, descripción, ubicación, recompensa,
// plazo y solicitante. Solo muestra botón cancelar si el usuario actual es el solicitante.
export default function FavorCard({ favor, onCancel, onAccept }) {
  const currentUserId = useAuthStore((s) => s.user?.id);
  const isOwner = favor.requesterId === currentUserId;
  const isExpired = favor.deadline && new Date(favor.deadline) < new Date();

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-gray-800 text-base leading-tight">{favor.title}</h2>
        <span className="text-emerald-600 font-bold whitespace-nowrap text-sm">
          ${favor.reward.toLocaleString("es-CO")}
        </span>
      </div>

      <p className="text-gray-500 text-sm">{favor.description}</p>

      <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
        <span>📍 {favor.location}</span>
        {favor.deadline && (
          <span className={isExpired ? "text-red-400" : ""}>
            ⏰ {new Date(favor.deadline).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })}
            {isExpired && " — vencido"}
          </span>
        )}
        <span>👤 {favor.requester?.name}</span>
      </div>

      <div className="flex gap-2 mt-2">
        {isOwner && (
          <button
            onClick={() => onCancel(favor.id)}
            className="flex-1 text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors"
          >
            Cancelar solicitud
          </button>
        )}
        {!isOwner && !isExpired && (
          <button
            onClick={() => onAccept(favor.id)}
            className="flex-1 text-sm text-white bg-emerald-500 rounded-xl py-2 hover:bg-emerald-600 transition-colors font-medium"
          >
            ✅ Aceptar favor
          </button>
        )}
      </div>
    </article>
  );
}
