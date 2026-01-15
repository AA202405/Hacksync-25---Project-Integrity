import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  withCredentials: false,
  timeout: 20000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Central place to log errors; UI can still handle them per-call
    // eslint-disable-next-line no-console
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

