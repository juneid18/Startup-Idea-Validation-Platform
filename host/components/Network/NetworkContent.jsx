import React, { useState, useEffect } from 'react';
import { Search, SearchX } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

const NetworkContent = () => {
    const { user } = useUser();
    const userId = user?.id;

    const [search, setSearch] = useState("");
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [connectedIds, setConnectedIds] = useState([]);

    // We can populate connectedIds from the user's DB profile if we fetched it, 
    // or we can just fetch the logged-in user explicitly. Since getAllUsers returns all users,
    // we can find the logged-in user in the array and extract connections!
    useEffect(() => {
        fetch(`${process.env.BASE_URL}/api/auth/users`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    let formatArr = data.data;

                    if (userId) {
                        const me = formatArr.find(u => u.clerkId === userId || u._id === userId);
                        if (me?.connections) setConnectedIds(me.connections);
                        // Filter out self
                        formatArr = formatArr.filter(u => u.clerkId !== userId && u._id !== userId);
                    }

                    const formatted = formatArr.map((u, i) => {
                        const displayName = u.name || u.username || "Unknown Founder";
                        const isConnected = me => me?.connections?.includes(u.clerkId || u._id);
                        return {
                            id: u.clerkId || u._id, // Prefer clerkId for frontend 
                            name: displayName,
                            role: "Ecosystem Builder",
                            expertise: u.expertise && u.expertise.length > 0 ? u.expertise : ["Startup", "Innovation"],
                            bio: u.backstory || "Actively participating in the IdeaProof ecosystem to discover validation opportunities.",
                            initials: displayName.substring(0, 2).toUpperCase(),
                            connections: (u.connections?.length || 0) + (u.votesCount || 0) + Math.floor(Math.random() * 20) + 5,
                            status: i % 3 === 0 ? "Online" : "Active"
                        };
                    });
                    setMembers(formatted);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch users", err);
                setLoading(false);
            });
    }, [userId]);

    const handleConnect = async (targetId) => {
        if (!userId) return alert("Must be logged in to connect");

        try {
            const res = await fetch(`${process.env.BASE_URL}/api/auth/connect`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, targetId })
            });
            const data = await res.json();
            if (data.success) {
                setConnectedIds(data.connections);
                // Optimistically increment the target's connection count purely for UI
                setMembers(prev => prev.map(m => {
                    if (m.id === targetId) {
                        return { ...m, connections: data.connected ? m.connections + 1 : m.connections - 1 };
                    }
                    return m;
                }));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
            <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded tracking-widest">Global Ecosystem</span>
                        <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest italic">{members.length} Hub Members</span>
                    </div>
                    <h1 className="text-4xl font-serif-display text-stone-900 tracking-tight leading-tight italic">Founder Network</h1>
                </div>

                <div className="flex flex-1 max-w-sm sm:ml-auto">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} strokeWidth={2.5} />
                        <input
                            type="text"
                            placeholder="Search experts or skills..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white border border-stone-200/60 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-stone-400 shadow-sm"
                        />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {filteredMembers.map((member) => (
                    <div
                        key={member.id}
                        className="group bg-white border border-stone-200/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1 flex flex-col gap-6 relative overflow-hidden"
                    >
                        {/* Status Glow */}
                        <div className={`absolute top-6 right-6 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)] ${member.status === "Online" ? "bg-green-500" :
                            member.status === "Busy" ? "bg-orange-400" : "bg-stone-300"
                            }`} />

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-stone-900 flex items-center justify-center p-0.5 shadow-lg shadow-stone-100 group-hover:scale-105 transition-transform">
                                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                                    <span className="text-sm font-black text-stone-900 italic font-serif-display">{member.initials}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900 transition-colors group-hover:text-orange-600">{member.name}</h3>
                                <p className="text-xs font-black uppercase text-stone-400 tracking-widest">{member.role}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm text-stone-600 italic leading-relaxed line-clamp-2">“{member.bio}”</p>
                            <div className="flex flex-wrap gap-2">
                                {member.expertise.map(skill => (
                                    <span key={skill} className="px-2.5 py-1 bg-stone-50 border border-stone-100 rounded-lg text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-50">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-stone-400 uppercase tracking-tighter">Connections</span>
                                <span className="text-sm font-bold text-stone-900">{member.connections}+</span>
                            </div>
                            <button
                                onClick={() => handleConnect(member.id)}
                                className={`px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-sm ${connectedIds.includes(member.id)
                                    ? "bg-stone-200 text-stone-600 hover:bg-red-100 hover:text-red-500"
                                    : "bg-stone-900 text-white hover:bg-orange-600 active:scale-95"
                                    }`}
                            >
                                {connectedIds.includes(member.id) ? "Disconnect ✕" : "Connect"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMembers.length === 0 && (
                <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <SearchX className="text-stone-400" size={24} />
                    </div>
                    <h3 className="text-xl font-serif-display text-stone-900 mb-2 italic">No matches found.</h3>
                    <p className="text-stone-400 text-sm max-w-xs mx-auto mb-8 leading-relaxed">Try looking for different expertise or founder names.</p>
                </div>
            )}
        </div>
    );
};

export default NetworkContent;
