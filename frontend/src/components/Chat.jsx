import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { SendHorizontal } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Chat() {
  const {
    messages,
    isMessagesLoading,
    sendMessage,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();

  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);
  const chatInputRef = useRef(null);

  const [isOnline, setIsOnline] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    subscribeToMessages();
    chatInputRef.current.focus();

    setIsOnline(onlineUsers?.includes(selectedUser?._id));
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser]);

  useEffect(() => {
    handleAutoScroll();
  }, [messages]);

  const handleAutoScroll = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0D0D0D] space-y-4 p-4 rounded-md">
      <div className="flex items-center mb-4 border-b border-zinc-800 pb-4">
        <div className="size-[3rem] rounded-full overflow-hidden">
          <img
            src={
              selectedUser?.profilePic ||
              "https://images.unsplash.com/photo-1634896941598-b6b500a502a7?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt=""
            className="object-cover object-top w-full h-full"
          />
        </div>
        <div className="font-semibold text-lg ml-4">
          <h3>{selectedUser?.fullName}</h3>
          {
            <span
              className={`text-xs ${
                isOnline ? "text-green-500" : "text-red-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          }
        </div>
      </div>

      <div className="grow-2 space-y-2 overflow-y-auto" ref={chatContainerRef}>
        {isMessagesLoading ? (
          <p className="text-gray-400 text-center">Loading messages...</p>
        ) : messages?.length > 0 ? (
          messages.map((msg, index) => (
            <div key={msg._id || index}>
              {msg.sender?._id === authUser._id || msg.sender === "self" ? (
                <div className="flex justify-end">
                  <div className="bg-[#1A66FF] text-white p-2 rounded-md">
                    {msg.message}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="bg-[#212121] text-white p-2 rounded-md">
                    {msg.message}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No messages yet.</p>
        )}
      </div>

      <form
        className="shrink-0 flex gap-4 items-center"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-[#212121] w-full rounded-md outline-none px-4 py-3"
          ref={chatInputRef}
        />
        <button
          type="submit"
          className="bg-[#1A66FF] text-white rounded-md p-2 cursor-pointer hover:bg-[#0055ff] duration-100"
        >
          <SendHorizontal />
        </button>
      </form>
    </div>
  );
}

export default Chat;
