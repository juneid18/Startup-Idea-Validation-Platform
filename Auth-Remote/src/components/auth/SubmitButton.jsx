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
