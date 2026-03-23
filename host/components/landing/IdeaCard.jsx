import { useState } from "react";
import { CATEGORY_STYLES } from "../../constants/LandingData.js";

export default function IdeaCard({ idea }) {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(idea.votes);

  const handleVote = () => {
    setVoted((prev) => !prev);
    setVotes((v) => (voted ? v - 1 : v + 1));
  };

  const categoryClass = CATEGORY_STYLES[idea.category] || CATEGORY_STYLES["SaaS"];

  return (
    <article className="flex flex-col gap-3 bg-white border border-stone-200 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:border-stone-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-100">

      {/* Author row */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-semibold text-stone-500 shrink-0">
          {idea.avatar}
        </div>
        <span className="text-xs text-stone-400 flex-1">{idea.author}</span>
        {idea.trending && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
            Trending
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-stone-900 leading-snug">
        {idea.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-stone-500 leading-relaxed flex-1">
        {idea.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${categoryClass}`}>
          {idea.category}
        </span>

        <div className="flex items-center gap-3">
          {/* Vote button */}
          <button
            onClick={handleVote}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer font-sans ${
              voted
                ? "bg-orange-50 text-orange-500 border-orange-200"
                : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200"
            }`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill={voted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {votes}
          </button>

          {/* Comment count */}
          <span className="flex items-center gap-1 text-xs text-stone-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {idea.comments}
          </span>
        </div>
      </div>
    </article>
  );
}