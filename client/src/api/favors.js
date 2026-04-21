import { api } from "./client.js";

/**
 * Obtiene la lista de favores disponibles (Feed).
 */
export const getFavors = () => 
  api.get("/favors").then((r) => r.data);

/**
 * Crea un nuevo favor.
 */
export const createFavor = (data) => 
  api.post("/favors", data).then((r) => r.data);

/**
 * Cancela un favor existente (Solo el solicitante).
 */
export const cancelFavor = (id) => 
  api.patch(`/favors/${id}/cancel`).then((r) => r.data);

/**
 * Acepta un favor disponible .
 */
export const acceptFavor = (id) => 
  api.patch(`/favors/${id}/accept`).then((r) => r.data);

/**
 * MARCAR COMO COMPLETADO .
 */
export const completeFavor = (id) => 
  api.patch(`/favors/${id}/complete`).then((r) => r.data);

/**
 * Obtiene los favores que yo acepté realizar.
 */
export const getMyAcceptedFavors = () => 
  api.get("/favors/accepted").then((r) => r.data);