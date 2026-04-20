import { api } from "./client.js";

// Realiza GET a /favors para obtener lista de favores disponibles.
export const getFavors = () => api.get("/favors").then((r) => r.data);

// Realiza POST a /favors para crear nuevo favor. Acepta objeto con title, description,
// location, reward y deadline opcional.
export const createFavor = (data) => api.post("/favors", data).then((r) => r.data);

// Realiza PATCH a /favors/:id/cancel para cancelar un favor existente.
export const cancelFavor = (id) => api.patch(`/favors/${id}/cancel`).then((r) => r.data);