import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if AuthContext is finished loading (ready) and there's no user
    if (ready && !user) {
      router.push("/login");
    }
  }, [ready, user, router]);

  // While loading, show a simple spinner or nothing
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If ready and no user, we return null because useEffect will trigger the redirect
  if (!user) return null;

  // If user is authenticated, render the page
  return <>{children}</>;
}
