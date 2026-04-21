import { useAuthStore } from "../stores/authStore.js";

/**
 * Componente que muestra la información de un favor en forma de tarjeta.
 * Integra la lógica de autenticación real y las acciones de completar.
 */
export default function FavorCard({ favor, onCancel, onAccept, onComplete }) {
  // Obtenemos el ID del usuario real desde el store global
  const currentUserId = useAuthStore((s) => s.user?.id);
  
  const isOwner = favor.requesterId === currentUserId;
  const isExpired = favor.deadline && new Date(favor.deadline) < new Date();

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
      
      {/* Cabecera: Título y Recompensa */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-gray-800 text-base leading-tight">
          {favor.title}
        </h2>
        <span className="text-emerald-600 font-bold whitespace-nowrap text-sm">
          ${favor.reward.toLocaleString("es-CO")}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-gray-500 text-sm">{favor.description}</p>

      {/* Info adicional */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
        <span>📍 {favor.location}</span>
        {favor.deadline && (
          <span className={isExpired ? "text-red-400" : ""}>
            ⏰ {new Date(favor.deadline).toLocaleString("es-CO")}
            {isExpired && " — vencido"}
          </span>
        )}
        <span>👤 {favor.requester?.name}</span>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-2 mt-2">
        
        {/* Caso 1: Soy el dueño y el favor sigue disponible -> Puedo cancelar */}
        {isOwner && favor.status === "AVAILABLE" && (
          <button
            onClick={() => onCancel(favor.id)}
            className="flex-1 text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors"
          >
            Cancelar solicitud
          </button>
        )}

        {/* Caso 2: No soy el dueño y está disponible -> Puedo aceptar */}
        {!isOwner && !isExpired && favor.status === "AVAILABLE" && (
          <button
            onClick={() => onAccept(favor.id)}
            className="flex-1 text-sm text-white bg-emerald-500 rounded-xl py-2 hover:bg-emerald-600 transition-colors font-medium"
          >
            ✅ Aceptar favor
          </button>
        )}

        {/* Caso 3: Soy el ejecutor y ya lo acepté -> Puedo completar  */}
        {!isOwner && favor.status === "ACCEPTED" && favor.executorId === currentUserId && (
          <button
            onClick={() => onComplete(favor.id)}
            className="flex-1 text-sm text-emerald-600 border border-emerald-200 rounded-xl py-2 hover:bg-emerald-50 transition-colors font-medium"
          >
            Marcar como completado
          </button>
        )}
      </div>
    </article>
  );
}