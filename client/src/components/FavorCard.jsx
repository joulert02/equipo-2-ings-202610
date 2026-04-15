// Renderiza una tarjeta individual de favor mostrando detalles y acciones dinámicas.
export default function FavorCard({ favor, onCancel, onConfirm }) {
  // Se utiliza el ID 2 para las pruebas de desarrollo local.
  const CURRENT_USER_ID = 2; 
  
  // Lógica para determinar si la fecha límite ya pasó.
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

      {/* Descripción del favor */}
      <p className="text-gray-500 text-sm">{favor.description}</p>

      {/* Metadatos: Ubicación, Fecha y Solicitante */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
        <span>📍 {favor.location}</span>
        {favor.deadline && (
          <span className={isExpired ? "text-red-400" : ""}>
            ⏰ {new Date(favor.deadline).toLocaleString("es-CO", { 
              dateStyle: "short", 
              timeStyle: "short" 
            })}
            {isExpired && " — vencido"}
          </span>
        )}
        <span>👤 {favor.requester?.name || "Usuario"}</span>
      </div>

      {/* ACCIONES DINÁMICAS */}

      {/* Botón Cancelar: Solo si soy el dueño y el favor sigue disponible. */}
      {favor.requesterId === CURRENT_USER_ID && favor.status === "AVAILABLE" && (
        <button
          onClick={() => onCancel(favor.id)}
          className="mt-2 w-full text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors"
        >
          Cancelar solicitud
        </button>
      )}

      {/* RF-015: Confirmar finalización. */}
      {/* Solo aparece si soy el dueño (requesterId) y el ejecutor ya marcó como COMPLETED. */}
      {favor.requesterId === CURRENT_USER_ID && favor.status === "COMPLETED" && (
        <button
          onClick={() => onConfirm(favor.id)}
          className="mt-2 w-full text-sm text-blue-600 border border-blue-200 rounded-xl py-2 hover:bg-blue-50 transition-colors font-medium"
        >
          🏁 Confirmar finalización
        </button>
      )}
    </article>
  );
}