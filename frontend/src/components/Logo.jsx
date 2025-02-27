import { MessageSquareText } from "lucide-react";
import React from "react";

function Logo() {
  return (
    <div className="w-fit h-fit bg-[#1a66ff3f] p-3 rounded-md hover:bg-[#1a66ff98] transition-colors duration-200 cursor-pointer">
      <MessageSquareText />
    </div>
  );
}

export default Logo;
