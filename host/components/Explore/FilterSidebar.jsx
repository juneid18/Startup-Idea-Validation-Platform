const FilterSidebar = ({ selectedCategory, setCategory, selectedDiff, setDiff, CATEGORIES, DIFFICULTY }) => {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-8 sticky top-24 h-fit">
      <div>
        <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.15em] mb-4">Industries</h4>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-left px-3 py-2 rounded-xl text-sm transition-all flex justify-between items-center ${
                selectedCategory === cat 
                  ? "bg-orange-50 text-orange-700 font-bold border border-orange-100" 
                  : "text-stone-500 hover:bg-stone-100/50 hover:text-stone-900"
              }`}
            >
              {cat}
              {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.15em] mb-4">Difficulty</h4>
        <div className="flex flex-col gap-1.5">
          {DIFFICULTY.map((diff) => (
            <label key={diff} className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer hover:bg-stone-100/50 transition-colors group">
              <input 
                type="radio" 
                name="difficulty" 
                className="w-4 h-4 border-2 border-stone-300 text-orange-600 focus:ring-transparent focus:ring-offset-0 transition-all rounded" 
                onChange={() => setDiff(diff)}
                checked={selectedDiff === diff}
              />
              <span className={`text-sm ${selectedDiff === diff ? "text-stone-900 font-bold" : "text-stone-500 group-hover:text-stone-900"}`}>{diff}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-5 bg-stone-900 rounded-2xl relative overflow-hidden shadow-xl shadow-stone-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -translate-y-16 translate-x-16" />
        <h5 className="text-white text-sm font-bold mb-1 relative z-10 italic">Premium Insights</h5>
        <p className="text-white/70 text-[11px] mb-4 relative z-10 leading-relaxed">
          Unlock market deep dives, expert feedback, and real-world implementation roadmaps.
        </p>
        <button className="w-full py-2 bg-white text-stone-900 text-xs font-black uppercase tracking-widest rounded-lg shadow-lg active:scale-95 transition-all relative z-10">
          Go Pro
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;