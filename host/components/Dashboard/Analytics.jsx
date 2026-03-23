import React from 'react';
import dynamic from 'next/dynamic';

const RemoteDashboard = dynamic(
  () => import("AnalyticsRemote/Dashboard"),
  { ssr: false, loading: () => (
    <div className="w-full min-h-screen bg-stone-50 flex items-center justify-center">
       <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-4 border-stone-200 border-t-orange-500 animate-spin" />
          <span className="text-xs font-black text-stone-400 uppercase tracking-widest animate-pulse">Initializing Founder Analytics...</span>
       </div>
    </div>
  )}
);

const Analytics = () => {
  return (<RemoteDashboard />);
}

export default Analytics