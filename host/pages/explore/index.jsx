import { useState, useEffect } from "react";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import FilterSidebar from "../../components/Explore/FilterSidebar";
import IdeaCard from "../../components/Explore/IdeaCard";
import IdeaModal from "../../components/Explore/IdeaModal";
import SideBar from "@/components/Dashboard/SideBar";
import Header from "@/components/Dashboard/Header";

const CATEGORIES = ["All", "AI", "Fintech", "Health", "E-commerce", "SaaS", "Energy", "Education"];
const DIFFICULTY = ["Beginner", "Intermediate", "Advanced"];

const DUMMY_IDEAS = [
  {
    id: 1,
    title: "AI Writing Assistant for Medical Records",
    pitch: "Help healthcare professionals dictate notes and generate accurate medical reports with an AI-powered assistant.",
    category: "AI",
    difficulty: "Advanced",
    budget: "$$$$",
    validation: 92,
    stats: { demand: "High", competition: "Medium", feasibility: "Medium" },
    problem: "Healthcare professionals spend 30% of their time on documentation, leading to burnout and errors.",
    audience: "Hospitals, private practices, medical transcriptionists.",
    marketGap: "Existing transcription software is general and lacks medical terminology precision.",
    mvp: ["Voice-to-text with medical library", "Automated SOAP note generation", "HIPAA-compliant cloud storage"],
    votes: { up: 1240, down: 45 }
  },
  {
    id: 2,
    title: "Solar Savings Calculator for Homeowners",
    pitch: "A SaaS tool that uses satellite imagery to calculate solar ROI and available local tax incentives.",
    category: "Energy",
    difficulty: "Intermediate",
    budget: "$$",
    validation: 85,
    stats: { demand: "Medium", competition: "Low", feasibility: "High" },
    problem: "Homeowners find solar ROI complex to calculate due to varying state incentives and local electricity rates.",
    audience: "Homeowners looking to go green, solar installation companies.",
    marketGap: "Current calculators don't include live local incentive updates.",
    mvp: ["Satellite roof analysis", "Live state tax incentive API", "Installer marketplace"],
    votes: { up: 890, down: 12 }
  },
  {
    id: 3,
    title: "Local Farm-to-Table Marketplace",
    pitch: "Connect local farmers directly with consumers for seasonal, zero-waste produce delivery within your zip code.",
    category: "E-commerce",
    difficulty: "Beginner",
    budget: "$",
    validation: 78,
    stats: { demand: "High", competition: "High", feasibility: "Low" },
    problem: "Fresh produce loses nutritional value during long-haul shipping, and consumers want to support local agriculture.",
    audience: "Local farmers, health-conscious urban dwellers.",
    marketGap: "Big grocery apps lack true transparency in sourcing and farm-direct shipping.",
    mvp: ["Farmer dashboard for inventory", "Customer search by zip code", "Subscription model"],
    votes: { up: 670, down: 110 }
  },
  {
    id: 4,
    title: "On-Demand Micro-Consulting for Developers",
    pitch: "A platform to hire senior developers for 15-minute code reviews or architecture brainstorm sessions.",
    category: "SaaS",
    difficulty: "Intermediate",
    budget: "$$$",
    validation: 88,
    stats: { demand: "High", competition: "Medium", feasibility: "High" },
    problem: "Traditional consulting is too expensive for small tasks, and Stack Overflow takes too long for nuances.",
    audience: "Junior and mid-level developers, early-stage startups.",
    marketGap: "Codementor is the closest, but a focus on 15-min micro-bursts is missing.",
    mvp: ["Scheduling system", "Live video/screen share integration", "Rating system"],
    votes: { up: 950, down: 25 }
  }
];

export default function ExplorePage() {
  const { user } = useUser();
  const userId = user?.id;
  const [ideas, setIdeas] = useState(DUMMY_IDEAS);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BASE_URL}/api/ideas/all`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const formattedIdeas = data.data.map(idea => ({
            id: idea._id,
            title: idea.title,
            pitch: idea.description,
            category: idea.category || "AI",
            difficulty: "Intermediate",
            budget: "$$",
            validation: idea.validationScore || 0,
            stats: { demand: "High", competition: "Medium", feasibility: "Medium" },
            problem: idea.analysisResult?.feedback || "Pending validation insights.",
            audience: idea.targetAudience || "General Market",
            marketGap: idea.analysisResult?.pros?.[0] || "Identified market need.",
            mvp: idea.analysisResult?.pros || ["Market research phase"],
            votes: { up: idea.views || 0, down: idea.saves || 0 },
            upvotedBy: idea.upvotedBy || [],
            downvotedBy: idea.downvotedBy || []
          }));
          setIdeas(formattedIdeas);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch ideas", err);
        setLoading(false);
      });

    if (userId) {
      fetch(`${process.env.BASE_URL}/api/ideas/saved/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setSavedIds(data.data.map(idea => idea._id || idea.id));
          }
        })
        .catch(console.error);
    }
  }, [userId]);

  const [category, setCategory] = useState("All");
  const [diff, setDiff] = useState("Beginner");
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [search, setSearch] = useState("");

  const filteredIdeas = ideas.filter((idea) =>
    (category === "All" || idea.category === category) &&
    (
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.pitch.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleVote = async (id, type) => {
    if (!userId) {
      alert("Please log in to vote.");
      return;
    }
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/ideas/${id}/${type}vote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      const result = await res.json();
      if (result.success) {
        setIdeas(prev => prev.map(idea => {
          if (idea.id === id) {
            let nextUp = idea.upvotedBy.filter(u => u !== userId);
            let nextDown = idea.downvotedBy.filter(u => u !== userId);
            if (type === 'up' && !idea.upvotedBy.includes(userId)) nextUp.push(userId);
            if (type === 'down' && !idea.downvotedBy.includes(userId)) nextDown.push(userId);

            return {
              ...idea,
              upvotedBy: nextUp,
              downvotedBy: nextDown,
              votes: {
                up: type === 'up' && !idea.upvotedBy.includes(userId) ? idea.votes.up + 1 : (type === 'down' && idea.upvotedBy.includes(userId) ? Math.max(0, idea.votes.up - 1) : idea.votes.up),
                down: type === 'down' && !idea.downvotedBy.includes(userId) ? idea.votes.down + 1 : (type === 'up' && idea.downvotedBy.includes(userId) ? Math.max(0, idea.votes.down - 1) : idea.votes.down)
              }
            };
          }
          return idea;
        }));

        if (selectedIdea && selectedIdea.id === id) {
          setSelectedIdea(prev => {
            let nextUp = prev.upvotedBy.filter(u => u !== userId);
            let nextDown = prev.downvotedBy.filter(u => u !== userId);
            if (type === 'up' && !prev.upvotedBy.includes(userId)) nextUp.push(userId);
            if (type === 'down' && !prev.downvotedBy.includes(userId)) nextDown.push(userId);

            return {
              ...prev,
              upvotedBy: nextUp,
              downvotedBy: nextDown,
              votes: {
                up: type === 'up' && !prev.upvotedBy.includes(userId) ? prev.votes.up + 1 : (type === 'down' && prev.upvotedBy.includes(userId) ? Math.max(0, prev.votes.up - 1) : prev.votes.up),
                down: type === 'down' && !prev.downvotedBy.includes(userId) ? prev.votes.down + 1 : (type === 'up' && prev.downvotedBy.includes(userId) ? Math.max(0, prev.votes.down - 1) : prev.votes.down)
              }
            };
          });
        }
      }
    } catch (err) {
      console.error("Vote failed", err);
    }
  };

  const handleSave = async (id) => {
    if (!userId) {
      alert("Please log in to save ideas.");
      return;
    }
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/ideas/${id}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.success) {
        setSavedIds(data.savedIdeas.map(id => id.toString()));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Explore Startup Ideas | IdeaProof</title>
        <meta name="description" content="Discover and validate startup ideas across various industries." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-stone-50/50 font-sans flex">

        {/* ── Dashboard Sidebar (fixed left) ── */}
        <div className="fixed top-0 left-0 h-screen w-48 z-50">
          <SideBar />
        </div>

        {/* ── Main area (offset by sidebar) ── */}
        <div className="flex-1 ml-48">

          {/* Fixed top header */}
          <Header />

          {/* Scrollable content below header */}
          <div className="pt-16">

            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12 flex gap-10">

              {/* ── Filter Sidebar ── */}
              <FilterSidebar
                CATEGORIES={CATEGORIES}
                DIFFICULTY={DIFFICULTY}
                selectedCategory={category} setCategory={setCategory}
                selectedDiff={diff} setDiff={setDiff}
              />

              {/* ── Main Feed ── */}
              <div className="flex-1 min-w-0">

                {/* Page header */}
                <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded tracking-widest">
                        Live Discoveries
                      </span>
                      <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest italic">
                        {filteredIdeas.length} Active Concepts
                      </span>
                    </div>
                    <h1 className="text-4xl font-serif-display text-stone-900 tracking-tight leading-tight">
                      Explore Startup Ideas
                    </h1>
                  </div>

                  {/* Sort buttons */}
                  <div className="flex bg-white p-1.5 rounded-2xl border border-stone-200/60 shadow-sm shrink-0">
                    <button className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl shadow-lg">
                      Newest
                    </button>
                    <button className="px-4 py-2 text-stone-500 text-xs font-bold rounded-xl hover:bg-stone-50 transition-colors">
                      Popular
                    </button>
                    <button className="px-4 py-2 text-stone-500 text-xs font-bold rounded-xl hover:bg-stone-50 transition-colors">
                      Top Rated
                    </button>
                  </div>
                </header>

                {/* Search bar */}
                <div className="mb-8">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search ideas..."
                    className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
                  />
                </div>

                {/* Ideas grid */}
                {filteredIdeas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredIdeas.map((idea) => (
                      <IdeaCard
                        key={idea.id}
                        idea={idea}
                        onClick={(i) => setSelectedIdea(i)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <svg width="24" height="24" fill="none" stroke="#a8a29e" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                        <path d="M11 8v6M8 11h6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif-display text-stone-900 mb-2 italic">
                      Zero matches found.
                    </h3>
                    <p className="text-stone-400 text-sm max-w-xs mx-auto mb-8 leading-relaxed">
                      Try adjusting your filters or search keywords to find your next unicorn.
                    </p>
                    <button
                      onClick={() => { setCategory("All"); setSearch(""); }}
                      className="px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-orange-700 active:scale-95 transition-all"
                    >
                      Reset Search Filters
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-stone-200/60 mt-12">
              <div className="max-w-[1200px] mx-auto px-10 flex justify-between items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                  Built for Serial Explorers
                </span>
                <div className="flex gap-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    © 2026 IdeaProof Labs
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Status: Fully Hyperlinkable
                  </span>
                </div>
              </div>
            </footer>

          </div>
        </div>
      </div>

      <IdeaModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        onVote={handleVote}
        onSave={handleSave}
        isSaved={selectedIdea ? savedIds.includes(selectedIdea.id.toString()) : false}
      />
    </>
  );
}