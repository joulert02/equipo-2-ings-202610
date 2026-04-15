import axios from "axios";

const api = axios.create({ baseURL: "/api" });

// Obtener lista de favores disponibles
export const getFavors = () => api.get("/favors").then((r) => r.data);

// Crear un nuevo favor
export const createFavor = (data) => api.post("/favors", data).then((r) => r.data);

//  Cancelar un favor (Solicitante)
export const cancelFavor = (id) => api.patch(`/favors/${id}/cancel`).then((r) => r.data);

// RF-011: Aceptar un favor (Ejecutor) - 
export const acceptFavor = (id) => api.patch(`/favors/${id}/accept`).then((r) => r.data);

// RF-014: Marcar como completado (Ejecutor)
export const completeFavor = (id) => api.patch(`/favors/${id}/complete`).then((r) => r.data);