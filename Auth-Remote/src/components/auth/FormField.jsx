import { useState } from "react";

export default function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  touched,
  autoComplete,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword    = type === "password";
  const inputType     = isPassword ? (showPassword ? "text" : "password") : type;
  const hasError      = touched && error;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-medium text-stone-700"
      >
        {label}
        {required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>

      {/* Input wrapper */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={`w-full px-4 py-2.5 text-sm text-stone-900 bg-white border rounded-xl outline-none transition-all placeholder:text-stone-400
            ${hasError
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-stone-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
            }`}
        />

        {/* Show/hide password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors bg-transparent border-none cursor-pointer p-0"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}