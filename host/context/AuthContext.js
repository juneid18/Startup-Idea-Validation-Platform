import { createContext, useContext, useState, useEffect } from "react";
import { useUser, useAuth as useClerkAuth } from "@clerk/nextjs";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  const { isLoaded, user: clerkUser } = useUser();
  const { getToken } = useClerkAuth();

  // ── 1. Rehydrate from localStorage on mount ─────────────────
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("auth_token");
      const savedUser = localStorage.getItem("auth_user");

      if (savedToken) setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("auth_user");
    } finally {
      setReady(true);
    }
  }, []);

  // ── 2. Rehydrate from Clerk (if found) ──────────────────────
  useEffect(() => {
    if (isLoaded && clerkUser && !user) {
      handleClerkRehydration();
    }
  }, [isLoaded, clerkUser, user]);

  const handleClerkRehydration = async () => {
    try {
      const token = await getToken();

      // Auto-rehydrate. Note: We could also sync with backend here
      const authUser = {
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        name: clerkUser.fullName,
        avatar: clerkUser.imageUrl
      };

      login(token, authUser);
    } catch (err) {
      console.warn("Clerk rehydration failed:", err);
    }
  };

  // ── Called after login or signup ──────────────────────────
  const login = (token, user) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  // ── Called on logout ──────────────────────────────────────
  const { signOut } = useClerkAuth();

  const logout = async () => {
    try {
      // 1. Clerk sign out (if applicable)
      if (typeof signOut === "function") {
        await signOut();
      }

      // 2. Local backend logout
      await fetch(`${process.env.BASE_URL}/api/auth/logout`, { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // 3. Clear local state regardless of errors
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      setToken(null);
      setUser(null);

      // Redirect to login
      window.location.href = "http://localhost:3000/login";
    }
  };

  // ── Update user data (e.g. after profile edit) ────────────
  const updateUser = (updatedUser) => {
    const merged = { ...user, ...updatedUser };
    localStorage.setItem("auth_user", JSON.stringify(merged));
    setUser(merged);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, ready, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};