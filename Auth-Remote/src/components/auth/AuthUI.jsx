export function AuthDivider({ label = "or continue with email" }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-stone-200" />
      <span className="text-xs text-stone-400 font-medium whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-stone-200" />
    </div>
  );
}

export function SubmitButton({ loading, label, loadingLabel }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
          </svg>
          {loadingLabel || "Please wait..."}
        </>
      ) : label}
    </button>
  );
}

export function ApiErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 mb-4">
      <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round"/>
        <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round"/>
      </svg>
      <span>{message}</span>
    </div>
  );
}