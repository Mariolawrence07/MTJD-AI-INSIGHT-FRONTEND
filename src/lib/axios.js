import axios from "axios";

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:5001").replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

export default axiosInstance;