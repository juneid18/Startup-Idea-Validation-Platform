import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser, useAuth as useClerkAuth } from "@clerk/nextjs";

export default function SSOCallback() {
  const router = useRouter();
  const { login, user: authUser } = useAuth();
  const { isLoaded, user: clerkUser } = useUser();
  const { getToken } = useClerkAuth();

  useEffect(() => {
    console.log("Clerk State:", {
      isLoaded,
      hasUser: !!clerkUser,
      authUser: !!authUser,
    });

    if (isLoaded) {
      if (clerkUser && !authUser) {
        console.log("Found Clerk User, finalizing...");
        handleFinalize();
      } else if (!clerkUser) {
        console.log("No Clerk User found, starting 1s grace period...");
        const timeout = setTimeout(() => {
          if (!clerkUser) {
            console.warn("Still no user after 1s. Redirecting to login.");
            router.push("http://localhost:3000/login");
          }
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [isLoaded, clerkUser, authUser]);

  const handleFinalize = async () => {
    try {
      const token = await getToken();

      // Sync with backend (just in case it wasn't done)
      const res = await fetch(`${process.env.BASE_URL}/api/auth/sync-clerk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress,
          name: clerkUser.fullName,
          avatar: clerkUser.imageUrl,
        }),
      });

      const { user } = await res.json();

      // Log the user into our host's AuthContext
      login(token, user);

      // Finally redirect to explore
      router.push("/dashboard");
    } catch (err) {
      console.error("SSO Callback Error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-stone-50">
      <div className="flex flex-col items-center gap-4">
        {/* Simple spinner */}
        <div className="w-10 h-10 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-stone-500 font-medium animate-pulse">
          Completing secure login...
        </p>
      </div>
    </div>
  );
}
