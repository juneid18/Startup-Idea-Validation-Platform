import Link from "next/link";
import { TRENDING_IDEAS } from "../../constants/LandingData.js";
import IdeaCard from "./IdeaCard.jsx";

export default function TrendingIdeas() {
  return (
    <section id="ideas" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-orange-500">
              Trending Now
            </span>
            <h2 className="mt-3 font-serif-display text-4xl md:text-5xl leading-tight tracking-tight text-stone-900 max-w-lg">
              Ideas the community <em className="not-italic text-orange-500">loves</em>
            </h2>
            <p className="mt-3 text-base text-stone-500 max-w-md leading-relaxed">
              Discover validated startup ideas being discussed by thousands of
              founders right now.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-sm font-medium text-stone-800 border border-stone-200 px-4 py-2 rounded-lg hover:bg-stone-50 hover:border-stone-400 transition-all no-underline whitespace-nowrap"
          >
            View all ideas →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRENDING_IDEAS.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

      </div>
    </section>
  );
}