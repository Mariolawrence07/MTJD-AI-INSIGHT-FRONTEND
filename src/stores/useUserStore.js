import { create } from "zustand";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const saveTokens = (data) => {
  if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);
  if (data?.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
};

const stripTokens = (data) => {
  const { accessToken, refreshToken, ...user } = data || {};
  return user;
};

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return { success: false };
    }

    set({ loading: true });
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      saveTokens(res.data);
      set({ user: stripTokens(res.data), loading: false });
      toast.success("Signup successful!");
      return { success: true };
    } catch (e) {
      set({ loading: false });
      toast.error(e.response?.data?.message || "Signup failed");
      return { success: false };
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await api.post("/auth/login", { email, password });
      saveTokens(res.data);
      set({ user: stripTokens(res.data), loading: false });
      toast.success("Login successful!");
      return { success: true };
    } catch (e) {
      set({ loading: false });
      toast.error(e.response?.data?.message || "Login failed");
      return { success: false };
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ user: null });
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await api.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch {
      set({ user: null, checkingAuth: false });
    }
  },
}));