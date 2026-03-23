import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-stone-900 py-24 px-6 text-center overflow-hidden">

      {/* Orange glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(232,84,10,0.18),transparent)]" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
          Stop building in the dark.
          <br />
          <em className="not-italic text-orange-400">Start validating today.</em>
        </h2>

        <p className="mt-5 text-base text-white/50 leading-relaxed max-w-md mx-auto">
          Join thousands of founders who use IdeaProof to test their ideas
          before investing months of work.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            href="/submit"
            className="inline-block px-7 py-3.5 bg-white text-stone-900 text-base font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20 transition-all no-underline"
          >
            Submit Your Idea — Free
          </Link>
          <Link
            href="/explore"
            className="inline-block px-7 py-3.5 bg-transparent text-white/80 text-base font-medium rounded-lg border border-white/20 hover:border-white/50 hover:text-white transition-all no-underline"
          >
            Explore the community
          </Link>
        </div>
      </div>
    </section>
  );
}