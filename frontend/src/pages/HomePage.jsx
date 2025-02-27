import React from "react";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";
import Chat from "../components/Chat";

function HomePage() {
  const {
    selectedUser,
    isUsersLoading,
    isMessagesLoading,
    getUsers,
    getMessages,
  } = useChatStore();

  return (
    <div className="container min-h-screen flex justify-between gap-4">
      <Sidebar />
      {selectedUser ? (
        <Chat />
      ) : (
        <div className="flex items-center justify-center w-full">
          <p className="text-center text-gray-500">
            No user selected. Please select a user from the sidebar.
          </p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
