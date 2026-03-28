import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "../../constants/LandingData.js";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "../UserMenu";

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        scrolled
          ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-serif-display text-2xl text-stone-900 tracking-tight no-underline">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]" />
          IdeaProof
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-bold tracking-tight text-stone-600 border border-stone-200 rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all no-underline"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-bold tracking-tight text-white bg-stone-900 rounded-xl hover:bg-stone-700 transition-all active:scale-95 no-underline shadow-lg shadow-stone-200"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-stone-900 rounded transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-stone-900 rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-stone-900 rounded transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-stone-50/97 border-b border-stone-200 px-6 pb-6 pt-2 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-stone-800 py-2.5 border-b border-stone-100 no-underline"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-4">
            {user ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-1 mb-4">
                   <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center overflow-hidden">
                      {user.avatar ? <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" /> : <span className="text-white text-xs font-bold">JM</span>}
                   </div>
                   <div>
                      <p className="text-sm font-bold text-stone-900 leading-none mb-1">{user.name}</p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none">Pro Member</p>
                   </div>
                </div>
                <Link href="/dashboard" className="text-sm font-bold text-stone-600 py-3 border-b border-stone-100 no-underline">Dashboard</Link>
                <Link href="/profile"   className="text-sm font-bold text-stone-600 py-3 border-b border-stone-100 no-underline">My Profile</Link>
                <button 
                  onClick={logout}
                  className="w-full text-left text-sm font-bold text-red-500 py-3 bg-transparent border-none cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login"  className="flex-1 px-4 py-3 text-center text-sm font-bold text-stone-600 border border-stone-200 rounded-xl no-underline">Log in</Link>
                <Link href="/signup" className="flex-1 px-4 py-3 text-center text-sm font-bold text-white bg-stone-900 rounded-xl no-underline">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}