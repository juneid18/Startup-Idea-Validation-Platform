import AuthLayout from "../components/auth/AuthLayout";
import LoginPanel from "../components/auth/LoginPanel";
import OAuthButtons from "../components/auth/OAuthButtons";
import FormField from "../components/auth/FormField";
import {
  AuthDivider,
  SubmitButton,
  ApiErrorBanner,
} from "../components/auth/AuthUI";
import { useAuthForm } from "../hooks/useAuthForm";
import {
  useAuth as useClerkAuth,
  useUser as useClerkUser,
} from "@clerk/clerk-react";
import { loginUser, saveToken } from "../utils/authApi";
import { ERROR_MESSAGES, REDIRECT_AFTER_LOGIN } from "../constants/authData";
import { useEffect } from "react";

const INITIAL = { email: "", password: "" };

export default function LoginPage({ onSuccess }) {
  const { isSignedIn, getToken } = useClerkAuth();
  const { user: clerkUser } = useClerkUser();

  const {
    fields,
    errors,
    touched,
    loading,
    apiError,
    setLoading,
    setApiError,
    handleChange,
    handleBlur,
    validate,
  } = useAuthForm(INITIAL);

  useEffect(() => {
    if (isSignedIn && clerkUser) {
      handleClerkSuccess();
    }
  }, [isSignedIn, clerkUser]);
  const handleClerkSuccess = async () => {
    try {
      const token = await getToken();

      // Sync with our backend
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

      saveToken(token);

      if (typeof onSuccess === "function") {
        onSuccess({ token, user });
      } else {
        window.location.href = `${process.env.BASE_URL}/explore`;
      }
    } catch (err) {
      console.error("Clerk sync error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const { token } = await loginUser(fields);
      saveToken(token);
      window.location.href = REDIRECT_AFTER_LOGIN;
    } catch {
      setApiError(ERROR_MESSAGES.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout panelContent={<LoginPanel />}>
      <div className="mb-8">
        <h1 className="font-serif-display text-3xl text-stone-900 tracking-tight mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-stone-500">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-stone-900 font-medium underline underline-offset-2 hover:text-orange-500 transition-colors"
          >
            Sign up free
          </a>
        </p>
      </div>

      <OAuthButtons mode="login" />
      <AuthDivider />
      <ApiErrorBanner message={apiError} />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={fields.email}
          placeholder="you@example.com"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          autoComplete="email"
          required
        />
        <div className="flex flex-col gap-1.5">
          <FormField
            label="Password"
            name="password"
            type="password"
            value={fields.password}
            placeholder="••••••••"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            autoComplete="current-password"
            required
          />
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-xs text-stone-400 hover:text-stone-700 no-underline"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <SubmitButton
            loading={loading}
            label="Log in to IdeaProof"
            loadingLabel="Logging in..."
          />
        </div>
      </form>

      <p className="text-xs text-stone-400 text-center mt-6 leading-relaxed">
        By continuing, you agree to our{" "}
        <a href="/terms" className="underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </AuthLayout>
  );
}
