/**
 * Componente que muestra la información de un favor en forma de tarjeta.
 * - Presenta detalles como título, descripción, ubicación, recompensa y solicitante
 * - Evalúa condiciones para mostrar acciones según el usuario y el estado del favor
 * - Permite cancelar o confirmar la finalización del favor
 */
export default function FavorCard({ favor, onCancel, onConfirm }) {

  /**
   * Identificador del usuario actual (usado para pruebas locales).
   */
  const CURRENT_USER_ID = 2;

  /**
   * Verifica si la fecha límite del favor ya ha pasado.
   */
  const isExpired =
    favor.deadline && new Date(favor.deadline) < new Date();

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">

      {/* Cabecera: muestra el título del favor y su recompensa */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-gray-800 text-base leading-tight">
          {favor.title}
        </h2>
        <span className="text-emerald-600 font-bold whitespace-nowrap text-sm">
          ${favor.reward.toLocaleString("es-CO")}
        </span>
      </div>

      {/* Descripción del favor */}
      <p className="text-gray-500 text-sm">
        {favor.description}
      </p>

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

        <span>👤 {favor.requester?.name || "Usuario"}</span>
      </div>

      {/* Acciones disponibles según el estado del favor */}

      {/* Permite cancelar si el usuario es el creador y el favor sigue disponible */}
      {favor.requesterId === CURRENT_USER_ID &&
        favor.status === "AVAILABLE" && (
          <button
            onClick={() => onCancel(favor.id)}
            className="mt-2 w-full text-sm text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors"
          >
            Cancelar solicitud
          </button>
        )}

      {/* Permite confirmar la finalización si el favor ya fue completado */}
      {favor.requesterId === CURRENT_USER_ID &&
        favor.status === "COMPLETED" && (
          <button
            onClick={() => onConfirm(favor.id)}
            className="mt-2 w-full text-sm text-blue-600 border border-blue-200 rounded-xl py-2 hover:bg-blue-50 transition-colors font-medium"
          >
            Confirmar finalización
          </button>
        )}
    </article>
  );
}