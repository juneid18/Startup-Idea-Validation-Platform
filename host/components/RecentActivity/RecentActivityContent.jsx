import React, { useState, useEffect } from 'react';
import {
    Zap,
    UserPlus,
    Trophy,
    Lightbulb,
    ShieldCheck
} from 'lucide-react';

const ActivityCard = ({ activity }) => {
    const Icon = activity.icon;
    return (
        <div className="group relative pl-8 pb-10 last:pb-0">
            {/* Timeline Line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-stone-200/60 group-last:bg-transparent" />

            {/* Connection Dot */}
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-stone-100 flex items-center justify-center text-xs shadow-sm shadow-stone-100 z-10 transition-transform group-hover:scale-110 group-hover:border-orange-200`}>
                <Icon size={12} className="text-stone-400" />
            </div>

            <div className="bg-white border border-stone-200/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:-translate-y-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight text-sm">
                        {activity.title}
                    </h3>
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest italic">{activity.time}</span>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed font-sans">{activity.description}</p>

                <div className="mt-4 flex gap-2">
                    <button className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] px-3 py-1 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                        View Details
                    </button>
                    <button className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] px-3 py-1 hover:text-stone-900 transition-colors">
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};

const RecentActivityContent = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.BASE_URL}/api/ideas/all`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const formattedActivities = data.data.slice(0, 10).map((idea, index) => {
                        return {
                            id: idea._id,
                            type: index === 0 ? "system" : "validation",
                            title: index === 0 ? "New Trend Detected" : `Idea Validated`,
                            description: `A new concept '${idea.title}' in the ${idea.category} sector reached a validation score of ${idea.validationScore}%.`,
                            time: new Date(idea.createdAt).toLocaleDateString(),
                            icon: index === 0 ? ShieldCheck : Zap,
                            color: index === 0 ? "stone" : "orange"
                        };
                    });
                    setActivities(formattedActivities);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch recent activity", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
            <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded tracking-widest">Live Stream</span>
                        <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest italic">{activities.length} New Notifications</span>
                    </div>
                    <h1 className="text-4xl font-serif-display text-stone-900 tracking-tight leading-tight italic">Recent Activity</h1>
                </div>

                <div className="flex bg-white p-1.5 rounded-2xl border border-stone-200/60 shadow-sm">
                    <button className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl shadow-lg font-sans">Latest</button>
                    <button className="px-4 py-2 text-stone-500 text-xs font-bold rounded-xl hover:bg-stone-50 transition-colors font-sans">Archived</button>
                </div>
            </header>

            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>

            <div className="mt-12 text-center pt-8 border-t border-stone-100">
                <button className="text-[11px] font-black text-stone-400 uppercase tracking-[0.3em] hover:text-stone-900 transition-all hover:scale-105">
                    Load Older Activity
                </button>
            </div>
        </div>
    );
};

export default RecentActivityContent;
