import Tag from "./Tag";

const IdeaCard = ({ idea, onClick }) => {
  return (
    <div 
      onClick={() => onClick(idea)}
      className="group relative bg-white border border-stone-200/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-orange-200/50 hover:-translate-y-1 cursor-pointer flex flex-col h-full overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-400/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
      
      <div className="flex justify-between items-start mb-4">
        <Tag color={idea.id % 2 === 0 ? "orange" : "blue"}>{idea.category}</Tag>
        <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-lg border border-stone-100">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
          <span className="text-[11px] font-bold text-stone-900">{idea.validation}% Validated</span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors leading-tight">
        {idea.title}
      </h3>
      <p className="text-sm text-stone-500 line-clamp-2 mb-6 leading-relaxed">
        {idea.pitch}
      </p>

      {/* Progress Bar */}
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">Validation Confidence</span>
          <span className="text-[10px] font-bold text-stone-900">{idea.validation}%</span>
        </div>
        <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-stone-900 to-orange-500 transition-all duration-500 ease-out" 
            style={{ width: `${idea.validation}%` }} 
          />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 text-center">
          {["Demand", "Competition", "Feasibility"].map((key) => (
            <div key={key} className="bg-stone-50 rounded-xl py-2 px-1 border border-stone-100/50">
              <span className="block text-[9px] text-stone-400 uppercase font-black tracking-tighter mb-0.5">{key}</span>
              <span className="block text-[11px] font-bold text-stone-900 capitalize italic">{idea.stats[key.toLowerCase()]}</span>
            </div>
          ))}
        </div>

        <button className="w-full py-3 bg-stone-900 text-white rounded-xl text-xs font-bold transition-all duration-300 active:scale-[0.98] group-hover:bg-orange-600 shadow-sm">
          Explore Details
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;