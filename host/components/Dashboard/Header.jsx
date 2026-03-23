import React from "react";
import UserMenu from "@/components/UserMenu";

const Header = () => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-stone-200 flex items-center justify-end px-8 z-[100] transition-all">
      <div className="flex items-center gap-6">
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;