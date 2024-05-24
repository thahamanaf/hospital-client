import React from "react";
import Avatar from "../Avatar";

const Header = () => {
  return (
    <div className="border shadow-sm h-16 bg-white sticky top-0 z-50 w-[calc(100dvw-97px)]">
      <div className="flex items-center justify-end h-full px-5">
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
