import dynamic from 'next/dynamic';

const LoadingUI = () => (
  <div className="w-full min-h-screen bg-stone-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 rounded-full border-4 border-stone-200 border-t-orange-500 animate-spin" />
      <span className="text-xs font-black text-stone-400 uppercase tracking-widest animate-pulse">Initializing Submit Form...</span>
    </div>
  </div>
);

const ErrorUI = ({ error }) => (
  <div className="w-full min-h-screen bg-stone-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4 max-w-md text-center px-4">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-red-500 text-xl">✕</span>
      </div>
      <h2 className="text-sm font-black text-stone-700 uppercase tracking-widest">
        Failed to Load Form
      </h2>
      <p className="text-xs text-stone-400">
        {error?.message || 'Remote form module could not be loaded.'}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="text-xs font-bold text-orange-500 uppercase tracking-widest border border-orange-200 px-4 py-2 rounded hover:bg-orange-50 transition"
      >
        Retry
      </button>
    </div>
  </div>
);

const RemoteSubmit = dynamic(
  () => import("SubmitIdeaRemote/SubmitIdea").catch((err) => {
    console.error("[SubmitRemote] Module load error:", err);
    const RemoteSubmitErrorFallback = () => (
      <ErrorUI error={{ message: `Could not load remote: ${err.message}` }} />
    );
    return RemoteSubmitErrorFallback;
  }),
  { ssr: false, loading: () => <LoadingUI /> }
);

const SubmitContent = () => {
  return (
    <div className="flex-1 min-w-0 overflow-x-hidden relative">
      <RemoteSubmit />
    </div>
  );
}

export default SubmitContent;