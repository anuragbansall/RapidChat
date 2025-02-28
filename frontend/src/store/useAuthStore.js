import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/status/");
      set({ authUser: response.data });

      get().connectSocket();
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

      get().connectSocket();
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

      get().disconnectSocket();
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

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const response = await axiosInstance.put("/auth/update-profile/", data);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (data) => {
      set({ onlineUsers: data });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();

    set({ socket: null });

    set({ onlineUsers: [] });
  },
}));
