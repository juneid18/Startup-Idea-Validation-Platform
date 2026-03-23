import AuthLayout from "../components/auth/AuthLayout";
import SignupPanel from "../components/auth/SignupPanel";
import OAuthButtons from "../components/auth/OAuthButtons";
import FormField from "../components/auth/FormField";
import {
  AuthDivider,
  SubmitButton,
  ApiErrorBanner,
} from "../components/auth/AuthUI";
import { useAuthForm } from "../hooks/useAuthForm";
import { signupUser, saveToken } from "../utils/authApi";
import { ERROR_MESSAGES, REDIRECT_AFTER_SIGNUP } from "../constants/authData";

const INITIAL_FIELDS = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignupPage({ onSuccess }) {
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
  } = useAuthForm(INITIAL_FIELDS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const { token, user } = await signupUser(fields);
      saveToken(token);
      if (typeof onSuccess === "function") {
        // Module Federation mode — pass data to host
        onSuccess({ token, user });
      } else {
        // Standalone mode
        window.location.href = REDIRECT_AFTER_SIGNUP;
      }
    } catch (err) {
      setApiError(
        err.message === "email_exists"
          ? ERROR_MESSAGES.emailExists
          : ERROR_MESSAGES.signupFailed,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout panelContent={<SignupPanel />}>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-serif-display text-3xl text-stone-900 tracking-tight mb-2">
          Create your account
        </h1>
        <p className="text-sm text-stone-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-stone-900 font-medium underline underline-offset-2 hover:text-orange-500 transition-colors"
          >
            Log in
          </a>
        </p>
      </div>

      {/* OAuth */}
      <OAuthButtons mode="signup" />

      {/* Divider */}
      <AuthDivider />

      {/* API Error */}
      <ApiErrorBanner message={apiError} />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 mt-4"
      >
        <FormField
          label="Full name"
          name="name"
          type="text"
          value={fields.name}
          placeholder="Rohan Mehta"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          autoComplete="name"
          required
        />
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
        <FormField
          label="Password"
          name="password"
          type="password"
          value={fields.password}
          placeholder="Min. 8 characters"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          autoComplete="new-password"
          required
        />
        <FormField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={fields.confirmPassword}
          placeholder="Repeat your password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          autoComplete="new-password"
          required
        />

        {/* Password strength hint */}
        {fields.password.length > 0 && (
          <PasswordStrength password={fields.password} />
        )}

        <div className="mt-2">
          <SubmitButton
            loading={loading}
            label="Create account"
            loadingLabel="Creating account..."
          />
        </div>
      </form>

      {/* Terms */}
      <p className="text-xs text-stone-400 text-center mt-6 leading-relaxed">
        By signing up, you agree to our{" "}
        <a
          href="/terms"
          className="underline underline-offset-2 hover:text-stone-600"
        >
          Terms
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="underline underline-offset-2 hover:text-stone-600"
        >
          Privacy Policy
        </a>
        .
      </p>
    </AuthLayout>
  );
}

// ── Password strength indicator ────────────────────────────
function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number or symbol", pass: /[0-9!@#$%^&*]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
  ];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="flex flex-col gap-2">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i < score ? colors[score] : "bg-stone-200"
              }`}
            />
          ))}
        </div>
        <span
          className={`text-xs font-medium ${score >= 3 ? "text-green-600" : score >= 2 ? "text-yellow-600" : "text-red-500"}`}
        >
          {labels[score]}
        </span>
      </div>
      {/* Checks */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`text-xs flex items-center gap-1 ${c.pass ? "text-green-600" : "text-stone-400"}`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              {c.pass ? (
                <polyline
                  points="20 6 9 17 4 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <circle cx="12" cy="12" r="10" />
              )}
            </svg>
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
