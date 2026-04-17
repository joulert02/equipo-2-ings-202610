/**
 * Componente que muestra la información de un favor en forma de tarjeta.
 * - Presenta datos como título, descripción, ubicación, recompensa y solicitante
 * - Evalúa condiciones para habilitar acciones según el usuario y el estado del favor
 * - Permite ejecutar acciones como cancelar, aceptar o completar
 */
export default function FavorCard({ favor, onCancel, onAccept, onComplete }) {

  /**
   * Identificador del usuario actual (simulado).
   */
  const CURRENT_USER_ID = 2;

  /**
   * Determina si el usuario actual es el creador del favor.
   */
  const isOwner = favor.requesterId === CURRENT_USER_ID;

  /**
   * Verifica si el favor ya superó su fecha límite.
   */
  const isExpired = favor.deadline && new Date(favor.deadline) < new Date();

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">

      {/* Sección de cabecera: muestra título y recompensa */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-gray-800 text-base leading-tight">
          {favor.title}
        </h2>
        <span className="text-emerald-600 font-bold whitespace-nowrap text-sm">
          ${favor.reward.toLocaleString("es-CO")}
        </span>
      </div>

      {/* Sección de descripción del favor */}
      <p className="text-gray-500 text-sm">{favor.description}</p>

      {/* Información adicional: ubicación, fecha límite y solicitante */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
        <span>📍 {favor.location}</span>

        {favor.deadline && (
          <span className={isExpired ? "text-red-400" : ""}>
            ⏰{" "}
            {new Date(favor.deadline).toLocaleString("es-CO", {
              dateStyle: "short",
              timeStyle: "short",
            })}
            {isExpired && " — vencido"}
          </span>
        )}

        <span>👤 {favor.requester?.name}</span>
      </div>

      {/* Contenedor de acciones disponibles según el estado del favor */}
      <div className="flex gap-2 mt-2">

        {/* Permite cancelar el favor si el usuario es el creador y aún está disponible */}
        {isOwner && favor.status === "AVAILABLE" && (
          <button
            onClick={() => onCancel(favor.id)}
            className="flex-1 text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors"
          >
            Cancelar solicitud
          </button>
        )}

        {/* Permite aceptar el favor si no es el creador, no está vencido y sigue disponible */}
        {!isOwner && !isExpired && favor.status === "AVAILABLE" && (
          <button
            onClick={() => onAccept(favor.id)}
            className="flex-1 text-sm text-white bg-emerald-500 rounded-xl py-2 hover:bg-emerald-600 transition-colors font-medium"
          >
            Aceptar favor
          </button>
        )}

        {/* Permite marcar como completado si el favor ya fue aceptado */}
        {!isOwner && favor.status === "ACCEPTED" && (
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