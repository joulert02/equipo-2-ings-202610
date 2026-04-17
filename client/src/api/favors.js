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
 * Acepta un favor disponible.
 * - Permite que un usuario se asigne como ejecutor
 * - Retorna el favor actualizado
 */
export const acceptFavor = (id) =>
  api.patch(`/favors/${id}/accept`).then((r) => r.data);

/**
 * Marca un favor como completado.
 * - Cambia el estado del favor a "COMPLETED"
 * - Retorna el favor actualizado
 */
export const completeFavor = (id) =>
  api.patch(`/favors/${id}/complete`).then((r) => r.data);