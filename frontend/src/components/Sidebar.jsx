import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
  const { selectedUser, isUsersLoading, getUsers, getMessages, users } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="shrink-0 w-1/3 bg-[#0D0D0D] space-y-2 p-4 rounded-md">
      {users.map((user) => (
        <div
          key={user._id}
          className={`flex items-center gap-2 w-full ${
            selectedUser?._id === user._id ? "bg-zinc-800" : ""
          } p-2 rounded-md cursor-pointer hover:brightness-110 duration-200 border-b border-zinc-900`}
          onClick={() => getMessages(user)}
        >
          <div className="size-[3rem] rounded-full overflow-hidden">
            <img
              src={
                user.profilePic ||
                "https://images.unsplash.com/photo-1634896941598-b6b500a502a7?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              className="object-cover object-top w-full h-full"
            />
          </div>
          <div className="font-semibold text-lg leading-tight">
            <h3>{user.fullName}</h3>
            {onlineUsers?.includes(user._id) && (
              <span className="text-xs text-green-500">Online</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
