import axios from "axios";
import { useAuthStore } from "../stores/authStore.js";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
});

api.interceptors.request.use((config) => {
  // getState() se invoca en cada petición, no al cargar el módulo, para que el token
  // se mantenga actualizado después de iniciar o cerrar sesión.
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
