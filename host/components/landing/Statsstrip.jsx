import { STATS } from "../../constants/LandingData.js";

export default function StatsStrip() {
  return (
    <div className="bg-stone-900 py-10 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center flex flex-col gap-1">
            <span className="font-serif-display text-4xl text-white leading-none">
              {stat.value}
            </span>
            <span className="text-sm text-white/50 font-normal">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}