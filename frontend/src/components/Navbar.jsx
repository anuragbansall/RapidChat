import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { authUser } = useAuthStore();
  console.log(authUser);

  return (
    <div className="flex items-center justify-between px-8 py-6 border-b-[1px] border-zinc-700">
      <h2 className="text-2xl font-semibold">
        <a href="/">RapidChat</a>
      </h2>
    </div>
  );
}

export default Navbar;
