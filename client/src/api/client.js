import axios from "axios";
import { useAuthStore } from "../stores/authStore.js";

export const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  // getState() is invoked on every request, not at module load, so the token
  // stays current after login or logout.
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
