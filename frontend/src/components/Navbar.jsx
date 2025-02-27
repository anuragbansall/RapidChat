import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="flex items-center justify-between px-8 py-6 border-b-[1px] border-zinc-700">
      <h2 className="text-2xl font-semibold">
        <Link href="/" className="flex gap-2 items-center">
          <Logo />
          <span>RapidChat</span>
        </Link>
      </h2>
      <div className="flex gap-4">
        {[
          {
            label: "Settings",
            icon: <Settings />,
            isProtected: false,
          },
          {
            label: "Profile",
            icon: <UserPen />,
            isProtected: true,
          },
          {
            label: "Logout",
            icon: <LogOut />,
            isProtected: true,
            onClick: logout,
          },
        ]
          .filter((item) => !item.isProtected || authUser)
          .map((item, index) => (
            <Link
              key={index}
              href="#"
              className="flex items-center gap-2"
              onClick={item.onClick}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Navbar;
