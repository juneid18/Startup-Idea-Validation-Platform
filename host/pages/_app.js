import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import React from "react";
import ReactDOM from "react-dom";
import { ClerkProvider } from "@clerk/nextjs";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";

// Expose the host's React on window so the MF remote can reference it
// via webpack externals instead of bundling its own copy.
if (typeof window !== "undefined") {
  window.React = React;
  window.ReactDOM = ReactDOM;
}
const PROTECTED_ROUTES = [
  "/dashboard", "/explore", "/submit", "/saved",
  "/recommendations", "/network", "/recent-activity"
];


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isProtected = PROTECTED_ROUTES.some(route => router.pathname.startsWith(route));
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <AuthProvider>
        {isProtected ? (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </ClerkProvider>
  );
}
