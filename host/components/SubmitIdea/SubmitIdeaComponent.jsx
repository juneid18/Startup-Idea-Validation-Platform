import React from 'react';
import dynamic from 'next/dynamic';


const SubmitIdeaComponent = () => {
    const SubmitIdeaDashboard = dynamic(
      () => import("SubmitIdeaRemote/SubmitIdea"),
      { ssr: false, loading: () => (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
           <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-full border-4 border-stone-200 border-t-orange-500 animate-spin" />
              <span className="text-xs font-black text-stone-400 uppercase tracking-widest animate-pulse">Initializing...</span>
           </div>
        </div>
      )}
    );
  return (<SubmitIdeaDashboard />);    
}

export default SubmitIdeaComponent