import React from 'react';
import IdeaCard from '../Explore/IdeaCard';

const RECOMMENDED_DASHBOARD = [
    {
        id: 101,
        title: "Micro-SaaS for Architectural Visualization",
        pitch: "An automated tool that converts 2D floor plans into 3D walkthroughs using spatial AI.",
        category: "AI",
        difficulty: "Intermediate",
        budget: "$$$",
        validation: 95,
        stats: { demand: "High", competition: "Low", feasibility: "Medium" }
    },
    {
        id: 102,
        title: "Ed-Tech Marketplace for Vernacular Coding",
        pitch: "Learn high-demand cloud engineering in regional languages with AI-powered translation.",
        category: "Education",
        difficulty: "Beginner",
        budget: "$",
        validation: 88,
        stats: { demand: "Very High", competition: "Medium", feasibility: "High" }
    }
];

const RecommendationsContent = () => {
    return (
        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
            <header className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded tracking-widest">AI Curation</span>
                    <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest italic tracking-wider">Based on Your Expertise Stack</span>
                </div>
                <h1 className="text-4xl font-serif-display text-stone-900 tracking-tight leading-tight italic">Recommended For You</h1>
            </header>

            <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* AI Insights Card */}
                <div className="bg-stone-900 rounded-[32px] p-10 mb-12 text-white relative overflow-hidden group shadow-2xl shadow-stone-200">
                     <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500 rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                     
                     <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-2xl font-serif-display italic mb-4">Founder-Idea Fit Analysis</h3>
                            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
                                Our AI has analyzed your **Expertise Stack (GTM Strategy, SaaS Finance)** and identified a high overlap with the following **Market Gaps**.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center sm:items-end">
                            <div className="flex gap-4">
                                <span className="text-[10px] font-black uppercase text-stone-500 px-3 py-1 bg-white/5 rounded-lg border border-white/10">SaaS Enthusiast</span>
                                <span className="text-[10px] font-black uppercase text-orange-400 px-3 py-1 bg-orange-400/10 rounded-lg border border-orange-400/20">High Efficiency</span>
                            </div>
                        </div>
                     </div>
                </div>

                <div className="space-y-12">
                    <section>
                        <div className="flex items-center justify-between mb-8">
                             <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">High Potential Niches</h4>
                             <button className="text-[11px] font-bold text-stone-900 underline underline-offset-4 decoration-stone-200 hover:decoration-orange-500 transition-all">View All Beta Concepts</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {RECOMMENDED_DASHBOARD.map((idea) => (
                                <IdeaCard key={idea.id} idea={idea} onClick={() => {}} />
                            ))}
                        </div>
                    </section>

                    <section className="bg-white border border-stone-200/60 rounded-[32px] p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 font-serif-display text-8xl pointer-events-none italic">Insight</div>
                        <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-8">Next Step Recommendations</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {[
                                { title: "Refine MVP", desc: "Your 'AI Med-Scribe' idea needs a sharper focus on voice-to-text accuracy in quiet environments.", action: "Launch Editor" },
                                { title: "Join Discussion", desc: "A roundtable for 'Vertical SaaS' is starting tomorrow at 5PM GMT.", action: "Set Reminder" },
                                { title: "Survey Early Adopters", desc: "We've found 15 hospitals that match your audience profile.", action: "View Leads" }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <h5 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors">{step.title}</h5>
                                    <p className="text-xs text-stone-500 leading-relaxed italic">{step.desc}</p>
                                    <button className="self-start text-[10px] font-black text-orange-600 uppercase tracking-widest mt-auto hover:scale-105 transition-transform">{step.action} →</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RecommendationsContent;
