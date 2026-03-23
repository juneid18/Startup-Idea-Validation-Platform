const FEATURES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "18,000+ founders",
    desc:  "Join an active community validating ideas every day.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Real validation signals",
    desc:  "Votes, comments, and engagement metrics — not vanity stats.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Validate in days, not months",
    desc:  "Know if your idea has legs before investing serious time.",
  },
];

export default function SignupPanel() {
  return (
    <div className="flex flex-col gap-10">

      {/* Heading */}
      <div>
        <h2 className="font-serif-display text-3xl text-white leading-tight tracking-tight mb-3">
          Stop guessing.
          <br />
          <em className="not-italic text-orange-400">Start validating.</em>
        </h2>
        <p className="text-sm text-white/50 leading-relaxed max-w-xs">
          Your next startup idea deserves real feedback — not just friends
          saying &ldquo;sounds cool.&rdquo;
        </p>
      </div>

      {/* Feature list */}
      <div className="flex flex-col gap-5">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/70 shrink-0">
              {f.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-white mb-0.5">{f.title}</p>
              <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}