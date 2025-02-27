import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/status/");
      set({ authUser: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });

    try {
      const response = await axiosInstance.post("/auth/signup/", data);
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });

    try {
      await axiosInstance.post("/auth/logout/");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const response = await axiosInstance.post("/auth/login/", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
