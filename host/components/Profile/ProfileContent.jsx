import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

const ProfileContent = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [backstory, setBackstory] = useState("");
  const [location, setLocation] = useState("");
  const [expertise, setExpertise] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBackstory(user.backstory || "");
      setLocation(user.location || "");
      setExpertise(user.expertise ? user.expertise.join(", ") : "");
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/auth/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name,
          backstory,
          location,
          expertise: expertise.split(",").map((s) => s.trim()).filter((s) => s),
        }),
      });

      const data = await res.json();
      if (data.success) {
        updateUser(data.user);
        setIsEditing(false);
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const initials = user.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "??";

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
      <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded tracking-widest">
                Public Persona
              </span>
              <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest italic tracking-wider">
                Level 12 Founder
              </span>
            </div>
            <h1 className="text-4xl font-serif-display text-stone-900 tracking-tight leading-tight italic">
              {isEditing ? "Editing Profile" : "Your Profile"}
            </h1>
          </div>
          <button
            onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${isEditing
                ? "bg-stone-50 text-stone-500 border border-stone-200"
                : "bg-stone-900 text-white shadow-xl shadow-stone-200 hover:scale-105 active:scale-95"
              }`}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Main Profile Info */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-white border border-stone-200/60 rounded-[32px] p-10 flex flex-col gap-8 relative overflow-hidden shadow-sm">
            {/* Abstract background for header area */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center gap-8 relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-stone-900 p-0.5 shadow-xl shadow-stone-200 group relative">
                <div className="w-full h-full rounded-[30px] bg-white flex items-center justify-center">
                  {/* <span className="text-3xl font-black text-stone-900 italic font-serif-display">JM</span> */}
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || "Profile picture"}
                      className="w-full h-full object-contain rounded-[30px]"
                    />
                  ) : (
                    <span className="text-3xl font-black text-stone-900 italic font-serif-display">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-white flex items-center justify-center shadow-lg">
                  <span className="text-[10px] text-white">⚡</span>
                </div>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="text-2xl font-serif-display text-stone-900 bg-stone-50 border-none rounded-xl p-2 w-full outline-orange-200"
                    />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location (e.g. Mumbai, IN)"
                      className="text-sm text-stone-500 bg-stone-50 border-none rounded-xl p-2 w-full outline-orange-200"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif-display text-stone-900 italic mb-1">
                      {user.name || "Anonymous Founder"}
                    </h2>
                    <p className="text-sm text-stone-400 font-sans tracking-wide">
                      {user.location || "Earth"}
                    </p>
                  </>
                )}
                <div className="flex gap-4 mt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      Ideas Validated
                    </span>
                    <span className="text-lg font-bold text-stone-800">
                      {user.ideasCount || 0}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-stone-100 self-end mb-1" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                      Network Connections
                    </span>
                    <span className="text-lg font-bold text-stone-800">
                      1.2K
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">
                The Backstory
              </h4>
              {isEditing ? (
                <textarea
                  value={backstory}
                  onChange={(e) => setBackstory(e.target.value)}
                  rows={4}
                  placeholder="Tell us your founder story..."
                  className="w-full text-sm text-stone-600 bg-stone-50 border-none rounded-2xl p-4 outline-orange-200 resize-none"
                />
              ) : (
                <p className="text-sm text-stone-600 leading-relaxed italic max-w-2xl">
                  “{user.backstory ||
                    "No backstory provided yet. Add one to show the world your founder roots."}”
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-orange-500 text-white px-8 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200/60 rounded-[32px] p-8 shadow-sm">
              <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-6">
                Expertise Stack
              </h4>
              {isEditing ? (
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  placeholder="Comma separated skills..."
                  className="w-full text-xs font-bold bg-stone-50 border-none rounded-xl p-3 outline-orange-200"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(user.expertise && user.expertise.length > 0
                    ? user.expertise
                    : ["General Founder"]
                  ).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-stone-50 border border-stone-100 rounded-xl text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white border border-stone-200/60 rounded-[32px] p-8 shadow-sm">
              <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-6">
                Social Nodes
              </h4>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all">
                  𝕏
                </button>
                <button className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all">
                  in
                </button>
                <button className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all">
                  GH
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar within content */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-stone-900 rounded-[32px] p-8 text-white shadow-xl shadow-stone-200 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(249,115,22,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="text-lg font-serif-display italic mb-2 relative z-10">
              Upgrade to Pro
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed mb-6 relative z-10">
              Access high-fidelity validation data and 1:1 mentorship sessions.
            </p>
            <button className="w-full py-3 bg-white text-stone-900 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-orange-50 transition-all active:scale-95 relative z-10">
              Upgrade Now
            </button>
          </div>

          <div className="bg-white border border-stone-200/60 rounded-[32px] p-8 shadow-sm">
            <h4 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-6">
              Recent Wins
            </h4>
            <div className="space-y-6">
              {[
                {
                  title: "Top Niches List",
                  desc: "Successfully curated 20 niches.",
                },
                {
                  title: "AI Expert Badge",
                  desc: "Awarded for consistent validation.",
                },
              ].map((win, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-sm">
                    🏆
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">
                      {win.title}
                    </p>
                    <p className="text-xs text-stone-400">{win.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
