import React, { useState, useEffect } from 'react';
import {
   BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
   PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// ── Dummy Data ──────────────────────────────────────────────

const OVERVIEW_METRICS = [
   { label: "Total Ideas Viewed", value: "2,840", trend: "+12.5%", color: "orange" },
   { label: "Saved Ideas", value: "48", trend: "+4.2%", color: "stone" },
   { label: "Most Explored", value: "HealthTech", trend: "Hot", color: "orange" },
   { label: "Avg Validation Score", value: "82%", trend: "+2.1%", color: "green" },
];

const CATEGORY_DISTRIBUTION = [
   { name: 'AI/ML', value: 400 },
   { name: 'Health', value: 300 },
   { name: 'Fintech', value: 300 },
   { name: 'Energy', value: 200 },
   { name: 'SaaS', value: 278 },
];

const TREND_DATA = [
   { day: 'Mon', views: 4000 },
   { day: 'Tue', views: 3000 },
   { day: 'Wed', views: 2000 },
   { day: 'Thu', views: 2780 },
   { day: 'Fri', views: 1890 },
   { day: 'Sat', views: 2390 },
   { day: 'Sun', views: 3490 },
];

// Matching the landing page's premium orange & stone palette
const COLORS = ['#f97316', '#262626', '#44403c', '#a8a29e', '#e7e5e4'];

const RECENT_IDEAS = [
   { id: 1, title: 'AI MedScribe', category: 'Health', score: 92, time: '2 mins ago' },
   { id: 2, title: 'Solarcalc SaaS', category: 'Energy', score: 85, time: '1 hr ago' },
   { id: 3, title: 'FarmDirect', category: 'E-commerce', score: 78, time: '4 hrs ago' },
];

const TOP_IDEAS = [
   { rank: 1, title: 'Medical AI Assistant', views: '4.2k', saves: 240 },
   { rank: 2, title: 'Solar Savings ROI', views: '3.8k', saves: 180 },
   { rank: 3, title: 'Micro-Consulting ML', views: '2.9k', saves: 120 },
];

// ── Shared UI Sub-components ──────────────────────────────────

const MetricCard = ({ label, value, trend, color }) => (
   <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-[11px] font-black uppercase text-stone-400 tracking-wider mb-2 block italic">{label}</span>
      <div className="flex items-end justify-between">
         <span className="text-2xl font-serif-display font-bold text-stone-900 leading-none">{value}</span>
         <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${trend.includes('+') ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
            {trend}
         </span>
      </div>
   </div>
);

// ── Main Dashboard ────────────────────────────────────────────

export default function Dashboard() {
   const [dashboardData, setDashboardData] = useState({
      overview: OVERVIEW_METRICS,
      categoryDistribution: CATEGORY_DISTRIBUTION,
      recentIdeas: RECENT_IDEAS
   });

   useEffect(() => {
      fetch(`${process.env.BASE_URL}/api/ideas/analytics`)
         .then(res => res.json())
         .then(data => {
            if (data.success && data.data) {
               setDashboardData(prev => ({
                  ...prev,
                  overview: data.data.overview || prev.overview,
                  categoryDistribution: data.data.categoryDistribution || prev.categoryDistribution,
                  recentIdeas: data.data.recentIdeas || prev.recentIdeas
               }));
            }
         })
         .catch(err => console.error("Failed to fetch analytics:", err));
   }, []);

   return (
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">

         {/* Top Header */}
         <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
               <h1 className="text-3xl font-serif-display text-stone-900 tracking-tight leading-none mb-3">Founder Analytics</h1>
               <p className="text-stone-400 text-sm max-w-sm leading-relaxed">Deep insights into your validation patterns and trending startup niches.</p>
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-stone-200/60 shadow-sm">
               <button className="px-4 py-2 bg-stone-900 text-white text-[11px] font-black uppercase tracking-widest rounded-lg">Realtime</button>
               <button className="px-4 py-2 text-stone-500 text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-stone-50">Last week</button>
            </div>
         </header>

         {/* Section 1: Overview Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dashboardData.overview.map((metric, i) => (
               <MetricCard key={i} {...metric} />
            ))}
         </div>

         {/* Main Grid: Mixed insights */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            {/* Section 5: Trends Over Time */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-100 p-8 shadow-sm">
               <div className="flex justify-between items-start mb-8">
                  <div>
                     <h3 className="text-lg font-bold text-stone-900 mb-1">Activity Trend</h3>
                     <p className="text-xs text-stone-400 font-medium">Daily views across your validation funnel</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-50 border border-stone-100 rounded-lg text-[10px] font-black uppercase tracking-widest">
                     <span>Views</span>
                  </div>
               </div>

               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={TREND_DATA}>
                        <defs>
                           <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                        <XAxis dataKey="day" hide />
                        <Tooltip
                           contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontFamily: 'Inter', fontSize: '11px' }}
                           cursor={{ stroke: '#f97316', strokeWidth: 2, strokeDasharray: '4 4' }}
                        />
                        <Area type="monotone" dataKey="views" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Section 3: Category Distribution */}
            <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-sm">
               <h3 className="text-lg font-bold text-stone-900 mb-1">Niche Explorer</h3>
               <p className="text-xs text-stone-400 font-medium mb-8">Ideas distribution by industry</p>

               <div className="h-48 w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={dashboardData.categoryDistribution}
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                           stroke="none"
                        >
                           {dashboardData.categoryDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Pie>
                        <Tooltip
                           contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }}
                        />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="space-y-3">
                  {dashboardData.categoryDistribution.slice(0, 3).map((item, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                           <span className="text-xs text-stone-600 font-bold">{item.name}</span>
                        </div>
                        <span className="text-[10px] font-black text-stone-400 tracking-widest">{item.value} Ideas</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Bottom Section: Recent & Ranked */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Section 2: Recent Activity */}
            <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-sm overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-stone-900 tracking-tight">Recent Insights</h3>
                  <button className="text-[11px] font-black uppercase text-orange-600 hover:text-orange-700 transition-colors italic tracking-widest pl-4">View All</button>
               </div>
               <div className="space-y-6">
                  {dashboardData.recentIdeas.length === 0 ? (
                     <div className="text-stone-400 text-sm italic py-4">No ideas validated yet.</div>
                  ) : dashboardData.recentIdeas.map((idea) => (
                     <div key={idea.id} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-2xl bg-stone-50 flex items-center justify-center p-0.5 border border-stone-100 group-hover:bg-orange-50 group-hover:border-orange-100 group-hover:scale-110 transition-all">
                              <span className="text-[10px] font-black text-stone-400 group-hover:text-orange-600">ID{idea.id ? String(idea.id).slice(-3) : 'X'}</span>
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-stone-900 leading-none mb-1 group-hover:text-orange-600 transition-colors">{idea.title}</h4>
                              <span className="text-[10px] uppercase font-black tracking-widest text-stone-400 italic">{idea.category} • {idea.time}</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <span className="block text-sm font-black text-stone-900">{idea.score}%</span>
                           <span className="block text-[9px] uppercase tracking-tighter text-stone-400 font-bold">Validated</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Section 6: Top Ranked Ideas */}
            <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-sm">
               <h3 className="text-lg font-bold text-stone-900 mb-8 tracking-tight">Global Leaderboard</h3>
               <div className="space-y-4">
                  {TOP_IDEAS.map((idea, i) => (
                     <div key={i} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100/50 hover:border-orange-200 transition-all text-stone-900">
                        <div className="flex items-center gap-4">
                           <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black italic shadow-lg shadow-stone-200 ${i === 0 ? 'bg-stone-900 text-white' : 'bg-white text-stone-400'
                              }`}>
                              #{idea.rank}
                           </span>
                           <div>
                              <h4 className="text-sm font-bold lowercase italic tracking-tight">{idea.title}</h4>
                              <div className="flex gap-2.5 mt-1">
                                 <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest underline decoration-orange-500/30 underline-offset-4">{idea.views} Views</span>
                                 <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest underline decoration-orange-500/30 underline-offset-4">{idea.saves} Saves</span>
                              </div>
                           </div>
                        </div>
                        <button className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all">
                           →
                        </button>
                     </div>
                  ))}
               </div>
            </div>

         </div>

         {/* Section 4: Validation Radar / Progress */}
         <div className="mt-12 bg-stone-900 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden text-white">
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/20 blur-[100px] -translate-x-32 -translate-y-32" />
            <div className="relative z-10 flex-1">
               <h3 className="text-2xl font-serif-display italic tracking-tight mb-2">Network Health Check</h3>
               <p className="text-stone-400 text-sm max-w-sm mb-8">Average scores across the entire ecosystem validation network.</p>

               <div className="space-y-6">
                  {['Demand', 'Competition', 'Feasibility'].map((metric, i) => (
                     <div key={metric}>
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 italic">{metric}</span>
                           <span className="text-[10px] font-bold tracking-widest">8{i}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{ width: `${80 + i * 5}%` }} />
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="h-48 w-full md:w-48 bg-white/5 rounded-full border border-white/10 flex items-center justify-center relative">
               <div className="text-center">
                  <span className="block text-4xl font-serif-display mb-1">84%</span>
                  <span className="block text-[9px] font-black text-stone-500 uppercase tracking-[0.2em] italic">Overall Score</span>
               </div>
            </div>
         </div>

      </main>
   );
}
