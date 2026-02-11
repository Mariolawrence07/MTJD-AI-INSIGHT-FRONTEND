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

export const useUserStore = create((set, get) => ({
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

  // ✅ ADD THIS
  forgotPassword: async ({ email }) => {
    set({ loading: true });
    try {
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(res.data?.message || "Check your email for a reset link.");
      set({ loading: false });
      return { success: true };
    } catch (e) {
      const msg = e.response?.data?.message || "Unable to send reset email";
      toast.error(msg);
      set({ loading: false });
      return { success: false, error: msg };
    }
  },

  // ✅ ADD THIS (you already have /reset-password route)
  resetPassword: async ({ token, newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return { success: false };
    }

    set({ loading: true });
    try {
      const res = await api.post("/auth/reset-password", { token, newPassword });
      toast.success(res.data?.message || "Password reset successful. Please log in.");
      set({ loading: false });
      return { success: true };
    } catch (e) {
      const msg = e.response?.data?.message || "Reset failed";
      toast.error(msg);
      set({ loading: false });
      return { success: false, error: msg };
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