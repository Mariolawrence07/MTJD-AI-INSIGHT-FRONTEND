import axios from "axios";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5001")
  .replace(/\/$/, "");

const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true, // keep cookies if available, but don't rely on them
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status !== 401 || !original || original._retry) {
      return Promise.reject(err);
    }

    const url = original.url || "";
    const PUBLIC = ["/auth/login", "/auth/signup", "/auth/forgot-password", "/auth/reset-password", "/auth/refresh-token"];
    if (PUBLIC.some((p) => url.includes(p))) return Promise.reject(err);

    original._retry = true;

    try {
      if (!refreshPromise) {
        const refreshToken = localStorage.getItem("refreshToken");
        refreshPromise = api.post("/auth/refresh-token", { refreshToken });
      }

      const { data } = await refreshPromise;
      refreshPromise = null;

      if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);

      return api(original);
    } catch (e) {
      refreshPromise = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(e);
    }
  }
);

export default api;