import { useAuthStore } from "../stores/authStore.js";

/**
 * Componente que muestra la información de un favor en forma de tarjeta.
 * Integra la lógica de RF-014 (Completar) y RF-015 (Confirmar).
 */
export default function FavorCard({ favor, onCancel, onAccept, onComplete, onConfirm }) {
  // Obtenemos el ID del usuario real desde el store global
  const currentUserId = useAuthStore((s) => s.user?.id);
  
  const isOwner = favor.requesterId === currentUserId || favor.requester?.id === currentUserId;
  const isExecutor = favor.executorId === currentUserId || favor.executor?.id === currentUserId;
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

      {/* Información adicional */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
        <span>📍 {favor.location}</span>

        {favor.deadline && (
          <span className={isExpired ? "text-red-400" : ""}>
            ⏰ {new Date(favor.deadline).toLocaleString("es-CO")}
            {isExpired && " — vencido"}
          </span>
        )}

        <span>👤 {favor.requester?.name || "Usuario"}</span>
        
        {/* Etiqueta de estado para seguimiento visual */}
        <span className="bg-gray-100 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">
          {favor.status}
        </span>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col gap-2 mt-2">
        
        {/* Cancelar (Solo el dueño si está disponible) */}
        {isOwner && favor.status === "AVAILABLE" && (
          <button
            onClick={() => onCancel(favor.id)}
            className="w-full text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors"
          >
            Cancelar solicitud
          </button>
        )}

        {/* Aceptar (No soy el dueño y está disponible) */}
        {!isOwner && !isExpired && favor.status === "AVAILABLE" && (
          <button
            onClick={() => onAccept(favor.id)}
            className="w-full text-sm text-white bg-emerald-500 rounded-xl py-2 hover:bg-emerald-600 transition-colors font-medium"
          >
            ✅ Aceptar favor
          </button>
        )}

        {/*  Marcar como completado (Solo el ejecutor si está aceptado) */}
        {isExecutor && favor.status === "ACCEPTED" && (
          <button
            onClick={() => onComplete(favor.id)}
            className="w-full text-sm text-emerald-600 border border-emerald-200 rounded-xl py-2 hover:bg-emerald-50 transition-colors font-medium"
          >
            Marcar como completado
          </button>
        )}

        {/*  Confirmar finalización (Solo el dueño si el ejecutor ya marcó completado) */}
        {isOwner && favor.status === "COMPLETED" && (
          <button
            onClick={() => onConfirm(favor.id)}
            className="w-full text-sm text-white bg-blue-600 rounded-xl py-2 hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            ⭐ Confirmar y Cerrar Favor
          </button>
        )}

      </div>
    </article>
  );
}