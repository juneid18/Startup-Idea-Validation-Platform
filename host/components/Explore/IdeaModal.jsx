import Tag from "./Tag";
import { useUser } from "@clerk/nextjs";

const IdeaModal = ({ idea, onClose, onVote, onSave, isSaved }) => {
  const { user } = useUser();
  const userId = user?.id;

  if (!idea) return null;

  const hasUpvoted = userId && idea.upvotedBy?.includes(userId);
  const hasDownvoted = userId && idea.downvotedBy?.includes(userId);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 z-[100]">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white w-full max-w-4xl h-[85vh] md:h-[520px] max-h-[90vh] rounded-3xl relative z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">

        {/* Close Button Mobile */}
        <button onClick={onClose} className="md:hidden absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-20">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 5L5 15M5 5l10 10" /></svg>
        </button>

        {/* Left Side: Detail & Hero */}
        <div className="md:w-[40%] bg-stone-900 p-10 flex flex-col justify-between text-white relative">
          <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(ellipse_100%_50%_at_50%_0%,rgba(249,115,22,0.15),transparent)] pointer-events-none" />

          <div>
            <Tag color="orange">{idea.category}</Tag>
            <h2 className="text-3xl font-serif-display leading-tight tracking-tight mt-6 mb-4">{idea.title}</h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">{idea.pitch}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="block text-[10px] text-white/30 uppercase font-black tracking-widest mb-1 italic">Validation</span>
                <span className="text-2xl font-serif-display text-orange-400">{idea.validation}%</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="block text-[10px] text-white/30 uppercase font-black tracking-widest mb-1 italic">Vibe Check</span>
                <span className="text-2xl font-serif-display text-green-400">Positive</span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => onVote(idea.id, 'up')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${hasUpvoted ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-white text-stone-900 active:scale-95 hover:bg-orange-500 hover:text-white"
                  }`}
              >
                {hasUpvoted ? "Upvoted ✓" : "Upvote Idea"}
              </button>
              <button
                onClick={() => onVote(idea.id, 'down')}
                className={`w-12 h-12 flex items-center justify-center border rounded-xl transition-all ${hasDownvoted ? "bg-red-500 text-white border-red-500" : "border-white/20 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
                  }`}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </button>
            </div>
            <p className="text-[10px] text-center text-white/30 font-serif-display italic tracking-widest flex items-center justify-center gap-4 mt-4">
              <span>{idea.votes.up} Upvotes</span>
              <span>{idea.votes.down} Downvotes</span>
            </p>
          </div>
        </div>

        {/* Right Side: Implementation Detail */}
        <div className="flex-1 p-10 bg-white relative overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-stone-50 [&::-webkit-scrollbar-thumb]:bg-stone-900 [&::-webkit-scrollbar-thumb]:rounded-full">

          <div className="absolute top-10 right-10">
            <button
              onClick={() => onSave(idea.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${isSaved ? "bg-stone-200 text-stone-500" : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                }`}
            >
              <svg width="14" height="14" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
              {isSaved ? "Saved" : "Save Idea"}
            </button>
          </div>

          <div className="max-w-xl mx-auto pt-4 md:pt-0">
            <section className="mb-10">
              <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">The Problem</h4>
              <p className="text-stone-800 text-sm leading-relaxed italic">{idea.problem}</p>
            </section>

            <section className="mb-10">
              <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">Target Audience</h4>
              <p className="text-stone-800 text-sm leading-relaxed">{idea.audience}</p>
            </section>

            <section className="mb-10">
              <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">Market Gap</h4>
              <p className="text-stone-800 text-sm leading-relaxed">{idea.marketGap}</p>
            </section>

            <section>
              <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">Implementation Roadmaps (MVP)</h4>
              <ul className="space-y-3">
                {idea.mvp.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-stone-800 font-medium">
                    <span className="w-5 h-5 rounded-md bg-stone-100 flex items-center justify-center text-[10px] font-black text-stone-500">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-16 pt-8 border-t border-stone-100 flex justify-between items-center text-stone-400 text-[11px] uppercase tracking-widest font-black">
              <span>Last Validated Today</span>
              <button onClick={onClose} className="text-orange-600 font-black italic hover:scale-110 transition-transform">Close Detailed View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaModal;