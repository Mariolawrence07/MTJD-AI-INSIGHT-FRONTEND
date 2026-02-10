import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return { success: false, error: "Passwords do not match" };
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });

      set({ user: res.data, loading: false });

      toast.success("Signup successful!");
      return { success: true };
    } catch (error) {
      set({ loading: false });

      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);

      return { success: false, error: message };
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });

      set({ user: res.data, loading: false });
      toast.success("Login successful!");
      return { success: true }; // MUST RETURN THIS
    } catch (error) {
      set({ loading: false });

      const msg = error.response?.data?.message || "An error occurred";
      toast.error(msg);

      return { success: false };
    }
  },
  forgotPassword: async ({ email }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/forgot-password", { email });

      set({ loading: false });
      toast.success(res.data?.message || "Check your email for a reset link.");
      return { success: true };
    } catch (error) {
      set({ loading: false });
      const msg = error.response?.data?.message || "Unable to send reset email";
      toast.error(msg);
      return { success: false, error: msg };
    }
  },

  resetPassword: async ({ token, newPassword, confirmPassword }) => {
    set({ loading: true });

    if (newPassword !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return { success: false, error: "Passwords do not match" };
    }

    try {
      const res = await axios.post("/auth/reset-password", {
        token,
        newPassword,
      });

      set({ loading: false });
      toast.success(
        res.data?.message || "Password reset successful. Please log in.",
      );
      return { success: true };
    } catch (error) {
      set({ loading: false });
      const msg = error.response?.data?.message || "Reset failed";
      toast.error(msg);
      return { success: false, error: msg };
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout",
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile"); // sends cookies
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      // if 401, try refreshing token
      if (error.response?.status === 401) {
        try {
          await get().refreshToken(); // calls /auth/refresh-token
          const retry = await axios.get("/auth/profile"); // retry profile
          set({ user: retry.data, checkingAuth: false });
        } catch (refreshError) {
          set({ user: null, checkingAuth: false });
        }
      } else {
        set({ user: null, checkingAuth: false });
      }
    }
  },

  refreshToken: async () => {
    try {
      await axios.post("/auth/refresh-token");
      return true;
    } catch (error) {
      set({ user: null });
      throw error;
    }
  },
}));

// Axios interceptor for token refresh
let refreshPromise = null;

const PUBLIC_AUTH_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
];

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";

    // ✅ do NOT refresh for public auth routes
    if (PUBLIC_AUTH_ROUTES.some((path) => url.includes(path))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
