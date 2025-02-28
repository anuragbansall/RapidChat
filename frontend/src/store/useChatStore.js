import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  users: [],

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
      console.log(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (selectedUser) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${selectedUser._id}`);
      set({ messages: response.data, selectedUser });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message) => {
    set({ isSendingMessage: true });
    try {
      const { selectedUser } = get();
      if (!selectedUser) {
        throw new Error("No user selected");
      }

      await axiosInstance.post(`/message/${selectedUser._id}`, { message });
      set((state) => ({
        messages: [...state.messages, { message, sender: "self" }],
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      console.log(error);
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (data) => {
      if (data.sender !== selectedUser._id) return;

      set((state) => ({
        messages: [...state.messages, data],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
