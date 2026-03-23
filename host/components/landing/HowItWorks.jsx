import { HOW_IT_WORKS_STEPS } from "../../constants/LandingData.js";

const STEP_ICONS = [
  <svg key="post" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="chat" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1M3 6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 4V6z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="chart" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="check" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">

        {/* Centered heading */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-orange-500">
            The Process
          </span>
          <h2 className="mt-3 font-serif-display text-4xl md:text-5xl leading-tight tracking-tight text-stone-900">
            From idea to <em className="not-italic text-orange-500">validated startup</em>
          </h2>
          <p className="mt-3 text-base text-stone-500 max-w-md mx-auto leading-relaxed">
            Four simple steps to go from a rough concept to a
            community-backed, fundable idea.
          </p>
        </div>

        {/* Steps grid with connector line on desktop */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 steps-connector">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative z-10 bg-white border border-stone-200 rounded-2xl p-6 transition-all duration-200 hover:border-stone-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-100"
            >
              <span className="font-serif-display text-3xl text-stone-200 leading-none block mb-3">
                {step.number}
              </span>
              <div className="text-stone-800 mb-4">
                {STEP_ICONS[i]}
              </div>
              <h3 className="text-sm font-semibold text-stone-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}