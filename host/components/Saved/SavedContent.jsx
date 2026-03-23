import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import IdeaCard from '../Explore/IdeaCard';
import IdeaModal from '../Explore/IdeaModal';

const SavedContent = () => {
    const { user } = useUser();
    const userId = user?.id;
    const [savedIdeas, setSavedIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIdea, setSelectedIdea] = useState(null);

    useEffect(() => {
        if (!userId) return;
        fetch(`${process.env.BASE_URL}/api/ideas/saved/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const mapped = data.data.map(idea => ({
                        id: idea._id,
                        title: idea.title,
                        pitch: idea.description,
                        category: idea.category || "General",
                        difficulty: "Intermediate",
                        budget: "$$",
                        validation: idea.validationScore || 0,
                        stats: { demand: "High", competition: "Medium", feasibility: "Medium" },
                        problem: idea.analysisResult?.feedback || "Pending feedback",
                        audience: idea.targetAudience,
                        marketGap: idea.analysisResult?.pros?.[0] || "Identified market need.",
                        mvp: idea.analysisResult?.pros || ["Research mode"],
                        votes: { up: idea.views || 0, down: idea.saves || 0 },
                        upvotedBy: idea.upvotedBy || [],
                        downvotedBy: idea.downvotedBy || []
                    }));
                    setSavedIdeas(mapped);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [userId]);

    const handleSave = async (id) => {
        if (!userId) return alert("Please log in to manage saved ideas.");
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/ideas/${id}/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();
            if (data.success) {
                // If it was removed from backend, remove from UI instantly
                if (!data.saved) {
                    setSavedIdeas(prev => prev.filter(idea => idea.id !== id));
                    if (selectedIdea && selectedIdea.id === id) setSelectedIdea(null);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleVote = async (id, type) => {
        if (!userId) return alert("Please log in to vote.");
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/ideas/${id}/${type}vote`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId })
            });
            const result = await res.json();
            if (result.success) {
                setSavedIdeas(prev => prev.map(idea => {
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

    return (
        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
            <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded tracking-widest">Personal Library</span>
                        <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest italic">{savedIdeas.length} Ideas Stashed</span>
                    </div>
                    <h1 className="text-4xl font-serif-display text-stone-900 tracking-tight leading-tight italic">Saved Ideas</h1>
                </div>

                <div className="flex bg-white p-1.5 rounded-2xl border border-stone-200/60 shadow-sm">
                    <button className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl shadow-lg">Newest First</button>
                    <button className="px-4 py-2 text-stone-500 text-xs font-bold rounded-xl hover:bg-stone-50 transition-colors">By Validation</button>
                </div>
            </header>

            {savedIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {savedIdeas.map((idea) => (
                        <IdeaCard
                            key={idea.id}
                            idea={idea}
                            onClick={(i) => setSelectedIdea(i)}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white/50 rounded-3xl border border-dashed border-stone-200">
                    <div className="w-16 h-16 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Bookmark className="text-stone-400" size={24} />
                    </div>
                    <h3 className="text-xl font-serif-display text-stone-900 mb-2 italic">Your stashed ideas will appear here.</h3>
                    <p className="text-stone-400 text-sm max-w-xs mx-auto mb-8 leading-relaxed">Browse the explore page and click the save icon on ideas you want to revisit later.</p>
                    <button className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-stone-100 hover:bg-stone-800 active:scale-95 transition-all">
                        Browse Ideas
                    </button>
                </div>
            )}

            <IdeaModal
                idea={selectedIdea}
                onClose={() => setSelectedIdea(null)}
                onVote={handleVote}
                onSave={handleSave}
                isSaved={true}
            />
        </div>
    );
};

export default SavedContent;
