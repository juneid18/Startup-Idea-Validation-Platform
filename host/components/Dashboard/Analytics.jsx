import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const LoadingUI = () => (
  <div className="w-full min-h-screen bg-stone-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 rounded-full border-4 border-stone-200 border-t-orange-500 animate-spin" />
      <span className="text-xs font-black text-stone-400 uppercase tracking-widest animate-pulse">
        Initializing Founder Analytics...
      </span>
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
        Failed to Load Analytics
      </h2>
      <p className="text-xs text-stone-400">
        {error?.message || 'Remote module could not be loaded.'}
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[AnalyticsRemote] Failed to load:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUI error={this.state.error} />;
    }
    return this.props.children;
  }
}

const RemoteDashboard = dynamic(
  () =>
    import('AnalyticsRemote/Dashboard').catch((err) => {
      console.error('[AnalyticsRemote] Module load error:', err);
      // return a fallback component instead of throwing
      const RemoteErrorFallback = () => (
        <ErrorUI
          error={{ message: `Could not load remote: ${err.message}` }}
        />
      );
      return RemoteErrorFallback;
    }),
  { ssr: false, loading: () => <LoadingUI /> }
);

const Analytics = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingUI />}>
        <RemoteDashboard />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Analytics;