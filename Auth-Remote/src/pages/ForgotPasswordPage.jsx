import { useState } from "react";
import AuthLayout     from "../components/auth/AuthLayout";
import { SubmitButton, ApiErrorBanner } from "../components/auth/AuthUI";
import FormField      from "../components/auth/FormField";
import { useAuthForm }    from "../hooks/useAuthForm";
import { forgotPassword } from "../utils/authApi";

const INITIAL_FIELDS = { email: "" };

function ForgotPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h2 className="font-serif-display text-2xl text-white leading-tight mb-3">
          Happens to the <em className="not-italic text-orange-400">best of us.</em>
        </h2>
        <p className="text-sm text-white/50 leading-relaxed">
          Enter your email and we&apos;ll send you a link to reset your password.
          The link expires in 30 minutes.
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    fields, errors, touched, loading, apiError,
    setLoading, setApiError,
    handleChange, handleBlur, validate,
  } = useAuthForm(INITIAL_FIELDS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await forgotPassword(fields);
      setSubmitted(true);
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout panelContent={<ForgotPanel />}>

      {submitted ? (
        /* Success state */
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-serif-display text-2xl text-stone-900 mb-2">Check your inbox</h2>
          <p className="text-sm text-stone-500 leading-relaxed mb-6">
            We sent a reset link to <strong className="text-stone-800">{fields.email}</strong>.
            Check your spam folder if it doesn&apos;t arrive in a few minutes.
          </p>
          <a
            href="/login"
            className="text-sm font-medium text-stone-800 underline underline-offset-2 hover:text-orange-500 transition-colors no-underline"
          >
            ← Back to log in
          </a>
        </div>
      ) : (
        <>
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-serif-display text-3xl text-stone-900 tracking-tight mb-2">
              Reset your password
            </h1>
            <p className="text-sm text-stone-500">
              Remember it?{" "}
              <a href="/login" className="text-stone-900 font-medium underline underline-offset-2 hover:text-orange-500 transition-colors">
                Back to log in
              </a>
            </p>
          </div>

          <ApiErrorBanner message={apiError} />

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 mt-4">
            <FormField
              label="Email address"
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
            <div className="mt-2">
              <SubmitButton
                loading={loading}
                label="Send reset link"
                loadingLabel="Sending..."
              />
            </div>
          </form>
        </>
      )}
    </AuthLayout>
  );
}