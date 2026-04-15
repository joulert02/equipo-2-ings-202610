// Renderiza una tarjeta individual de favor mostrando título, descripción, ubicación, recompensa,
// plazo y solicitante. Gestiona acciones de Cancelar, Aceptar y Completar.
export default function FavorCard({ favor, onCancel, onAccept, onComplete }) {
  // Según el código de tu compañero, el ID de prueba para el ejecutor es 2
  const CURRENT_USER_ID = 2; 
  
  const isOwner = favor.requesterId === CURRENT_USER_ID;
  const isExpired = favor.deadline && new Date(favor.deadline) < new Date();

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
      {/* Cabecera: Título y Recompensa */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-gray-800 text-base leading-tight">{favor.title}</h2>
        <span className="text-emerald-600 font-bold whitespace-nowrap text-sm">
          ${favor.reward.toLocaleString("es-CO")}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-gray-500 text-sm">{favor.description}</p>

      {/* Meta info: Ubicación, Fecha y Solicitante */}
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

      {/* Contenedor de Botones de Acción */}
      <div className="flex gap-2 mt-2">
        
        {/* RF-008: El dueño puede cancelar si el favor aún está disponible */}
        {isOwner && favor.status === "AVAILABLE" && (
          <button
            onClick={() => onCancel(favor.id)}
            className="flex-1 text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors"
          >
            Cancelar solicitud
          </button>
        )}

        {/* RF-011: El usuario (si no es el dueño) puede aceptar un favor disponible */}
        {!isOwner && !isExpired && favor.status === "AVAILABLE" && (
          <button
            onClick={() => onAccept(favor.id)}
            className="flex-1 text-sm text-white bg-emerald-500 rounded-xl py-2 hover:bg-emerald-600 transition-colors font-medium"
          >
            ✅ Aceptar favor
          </button>
        )}

        {/* RF-014: El ejecutor puede marcarlo como completado una vez aceptado */}
        {/* Se usa !isOwner y status ACCEPTED siguiendo la lógica de tu compañero */}
        {!isOwner && favor.status === "ACCEPTED" && (
          <button
            onClick={() => onComplete(favor.id)}
            className="flex-1 text-sm text-emerald-600 border border-emerald-200 rounded-xl py-2 hover:bg-emerald-50 transition-colors font-medium"
          >
            🏁 Marcar como completado
          </button>
        )}
      </div>
    </article>
  );
}