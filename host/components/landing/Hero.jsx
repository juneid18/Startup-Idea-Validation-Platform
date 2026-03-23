import Link from "next/link";
import { SOCIAL_PROOF_AVATARS } from "../../constants/LandingData.js";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center overflow-hidden">

      {/* Background gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#f0eef8,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,#fff0e8,transparent)]" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 z-0 opacity-40 hero-grid pointer-events-none" />

      {/* Live badge */}
      <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-8 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-500">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
        Community-powered idea validation
      </div>

      {/* Headline */}
      <h1 className="relative z-10 font-serif-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-stone-900 max-w-4xl">
        Build what the market{" "}
        <em className="not-italic text-orange-500">actually wants</em>
      </h1>

      {/* Subheading */}
      <p className="relative z-10 mt-6 text-lg text-stone-500 max-w-xl leading-relaxed">
        Share your startup idea, gather real feedback from founders and
        developers, and validate before you build — so you ship products
        people love.
      </p>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 mt-10">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 text-white text-base font-medium rounded-lg hover:bg-stone-700 hover:-translate-y-0.5 hover:shadow-lg transition-all no-underline"
        >
          Explore Ideas
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link
          href="/submit"
          className="inline-flex items-center px-7 py-3.5 bg-transparent text-stone-900 text-base font-medium rounded-lg border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all no-underline"
        >
          Submit Your Idea
        </Link>
      </div>

      {/* Social proof */}
      <div className="relative z-10 flex items-center gap-3 mt-6 text-sm text-stone-500">
        <div className="flex">
          {SOCIAL_PROOF_AVATARS.map(({ initials, bg }, i) => (
            <div
              key={initials}
              className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-semibold text-stone-600 ${bg} ${i !== 0 ? "-ml-2" : ""}`}
            >
              {initials}
            </div>
          ))}
        </div>
        <span>
          Joined by <strong className="text-stone-800 font-semibold">18,000+ founders</strong> this year
        </span>
      </div>
    </section>
  );
}