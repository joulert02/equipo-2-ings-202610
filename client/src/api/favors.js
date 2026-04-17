import axios from "axios";

/**
 * Configura una instancia de Axios con la URL base de la API.
 */
const api = axios.create({ baseURL: "/api" });

/**
 * Obtiene la lista de favores disponibles.
 * - Realiza una petición GET al endpoint /favors
 * - Retorna únicamente los datos de la respuesta
 */
export const getFavors = () =>
  api.get("/favors").then((r) => r.data);

/**
 * Crea un nuevo favor.
 * - Envía los datos del favor al servidor
 * - Permite incluir título, descripción, ubicación, recompensa y fecha límite opcional
 * - Retorna el favor creado
 */
export const createFavor = (data) =>
  api.post("/favors", data).then((r) => r.data);

/**
 * Cancela un favor existente.
 * - Envía una petición PATCH al endpoint correspondiente
 * - Retorna el favor actualizado
 */
export const cancelFavor = (id) =>
  api.patch(`/favors/${id}/cancel`).then((r) => r.data);

/**
 * Confirma la finalización de un favor.
 * - Envía una petición PATCH al endpoint correspondiente
 * - Actualiza el estado del favor en el sistema
 * - Retorna el favor actualizado
 */
export const confirmFavorCompletion = (id) =>
  api.patch(`/favors/${id}/confirm`).then((r) => r.data); 