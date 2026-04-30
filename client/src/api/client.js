import axios from "axios";
import { useAuthStore } from "../stores/authStore.js";

// In dev, Vite proxies /api → localhost:3000 so no env var needed.
// In production, set VITE_API_URL to the server's Vercel URL.
const baseURL = import.meta.env.VITE_API_URL ?? "/api";

export const api = axios.create({ baseURL });

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
