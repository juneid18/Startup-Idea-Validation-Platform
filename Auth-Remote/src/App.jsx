import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SSOCallback from "./pages/SSOCallback";
import { ClerkProvider } from "@clerk/clerk-react";

export default function App({ page = "login" }) {
  const content = (() => {
    if (page === "signup") return <SignupPage />;
    if (page === "forgot-password") return <ForgotPasswordPage />;
    if (page === "sso-callback") return <SSOCallback />;
    return <LoginPage />;
  })();

  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
      {content}
    </ClerkProvider>
  );
}