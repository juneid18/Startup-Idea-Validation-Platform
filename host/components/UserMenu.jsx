import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, User, LogOut, ChevronDown } from "lucide-react";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-100 transition-all border-none bg-transparent cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-stone-900 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] font-black text-white italic">{initials}</span>
          )}
        </div>
        <ChevronDown size={14} className={`text-stone-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-200/50 py-2 z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <div className="px-4 py-3 border-b border-stone-100 mb-1">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-0.5">Signed in as</p>
            <p className="text-sm font-bold text-stone-900 truncate">{user.name || user.email}</p>
          </div>

          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors no-underline"
          >
            <LayoutDashboard size={16} strokeWidth={2} />
            Dashboard
          </Link>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors no-underline"
          >
            <User size={16} strokeWidth={2} />
            My Profile
          </Link>

          <div className="h-px bg-stone-100 my-1 mx-2" />

          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer font-medium"
          >
            <LogOut size={16} strokeWidth={2} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
