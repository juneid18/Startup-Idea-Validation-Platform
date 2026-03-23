import dynamic from 'next/dynamic';

const RemoteSubmit = dynamic(
  () => import("SubmitIdeaRemote/SubmitIdea"),
  { ssr: false, loading: () => (
    <div className="w-full min-h-screen bg-stone-50 flex items-center justify-center">
       <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-4 border-stone-200 border-t-orange-500 animate-spin" />
          <span className="text-xs font-black text-stone-400 uppercase tracking-widest animate-pulse">Initializing Submit Form...</span>
       </div>
    </div>
  )}
);

const SubmitContent = () => {
  return (
    <div className="flex-1 min-w-0 overflow-x-hidden relative">
      <RemoteSubmit />
    </div>
  );
}

export default SubmitContent;