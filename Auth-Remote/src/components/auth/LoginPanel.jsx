const TESTIMONIAL = {
  quote:  "IdeaProof helped me validate my SaaS idea in 3 days. Got 200+ votes before writing a single line of code.",
  author: "Priya S.",
  role:   "Founder, LaunchKit",
  avatar: "PS",
};

const STATS = [
  { value: "18K+",  label: "Founders" },
  { value: "4.2K+", label: "Ideas validated" },
  { value: "340+",  label: "Ideas funded" },
];

export default function LoginPanel() {
  return (
    <div className="flex flex-col gap-12">

      {/* Stats row */}
      <div className="flex gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span className="font-serif-display text-3xl text-white leading-none">
              {s.value}
            </span>
            <span className="text-xs text-white/40">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Testimonial card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {/* Quote mark */}
        <div className="font-serif-display text-5xl text-orange-500/60 leading-none mb-3">
          &ldquo;
        </div>
        <p className="text-base text-white/80 leading-relaxed mb-5">
          {TESTIMONIAL.quote}
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-semibold text-orange-300">
            {TESTIMONIAL.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{TESTIMONIAL.author}</p>
            <p className="text-xs text-white/40">{TESTIMONIAL.role}</p>
          </div>
        </div>
      </div>

    </div>
  );
}