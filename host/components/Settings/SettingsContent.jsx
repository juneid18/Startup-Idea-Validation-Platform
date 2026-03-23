import React, { useState } from 'react';

const SettingsContent = () => {
    const [notifications, setNotifications] = useState(true);

    const SettingRow = ({ title, desc, action, danger = false }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 group">
            <div className="mb-4 sm:mb-0">
                <h4 className={`text-sm font-bold transition-colors ${danger ? 'text-red-600' : 'text-stone-900 group-hover:text-orange-600'}`}>{title}</h4>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">{desc}</p>
            </div>
            {action}
        </div>
    );
 const handleLogout = () => {    // Clear localStorage and redirect to login
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    window.location.href = "/login";
  };
    return (
        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
            <header className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase text-stone-400 border border-stone-200 px-2 py-0.5 rounded tracking-widest">Configuration</span>
                    <span className="text-[10px] font-black uppercase text-orange-600 tracking-widest italic tracking-wider">Sync Active</span>
                </div>
                <h1 className="text-4xl font-serif-display text-stone-900 tracking-tight leading-tight italic">Global Settings</h1>
            </header>

            <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* General Settings */}
                <section className="bg-white border border-stone-200/60 rounded-[32px] overflow-hidden mb-8 shadow-sm">
                    <div className="px-8 py-6 bg-stone-50 border-b border-stone-100">
                        <h3 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">Profile Configuration</h3>
                    </div>
                    <div className="p-8 divide-y divide-stone-50">
                        <SettingRow 
                            title="Public Profile Visibility" 
                            desc="Allow other founders to find your profile in the Network hub."
                            action={
                                <button className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-800 transition-all">
                                    Make Public
                                </button>
                            }
                        />
                        <SettingRow 
                            title="Validation Webhooks" 
                            desc="Receive real-time validation updates via Slack or Discord."
                            action={
                                <button className="px-6 py-2.5 bg-white border border-stone-200 text-stone-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-orange-200 hover:text-orange-600 transition-all">
                                    Connect Webhook
                                </button>
                            }
                        />
                        <SettingRow 
                            title="Smart Notifications" 
                            desc="Get alerted when high-conviction ideas match your expertise stack."
                            action={
                                <div onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${notifications ? 'bg-orange-500' : 'bg-stone-200'}`}>
                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            }
                        />
                    </div>
                </section>

                {/* Security Section */}
                <section className="bg-white border border-stone-200/60 rounded-[32px] overflow-hidden mb-8 shadow-sm">
                     <div className="px-8 py-6 bg-stone-50 border-b border-stone-100">
                        <h3 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em]">Security & Privacy</h3>
                    </div>
                    <div className="p-8 divide-y divide-stone-50">
                        <SettingRow 
                            title="Two-Factor Authentication" 
                            desc="Protect your validation data with an extra layer of security."
                            action={
                                <button className="px-6 py-2.5 text-stone-900 font-bold text-xs underline underline-offset-4 decoration-stone-200 hover:decoration-orange-500 transition-all">
                                    Setup 2FA
                                </button>
                            }
                        />
                        <SettingRow 
                            title="Data Export" 
                            desc="Download all your saved ideas and validation reports in JSON format."
                            action={
                                <button className="text-xs font-black text-stone-400 uppercase tracking-widest hover:text-stone-900">
                                    Request Export
                                </button>
                            }
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SettingsContent;
