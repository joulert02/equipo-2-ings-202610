import axios from "axios";

const api = axios.create({ baseURL: "/api" });

/**
 * RF-009 — Obtener favores disponibles
 */
export const getFavors = () => api.get("/favors").then((r) => r.data);

/**
 * RF-005 — Crear solicitud de favor
 * @param {{ title, description, location, reward, deadline? }} data
 */
export const createFavor = (data) => api.post("/favors", data).then((r) => r.data);

/**
 * RF-008 — Cancelar solicitud
 * @param {number} id
 */
export const cancelFavor = (id) => api.patch(`/favors/${id}/cancel`).then((r) => r.data);