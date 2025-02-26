import { create } from "zustand";
import axiosInstance from "../lib/axios";

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
    } catch (error) {
      console.error(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
