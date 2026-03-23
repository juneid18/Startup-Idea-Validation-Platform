import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
    LayoutDashboard, 
    Compass, 
    Bookmark, 
    Users, 
    Sparkles, 
    User, 
    LogOut,
    Send as SubmitingIcon,
    Settings
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const SideBar = () => {
    const router = useRouter();
    const { logout } = useAuth();

    const SidebarItem = ({ icon: Icon, label, active = false, route }) => (
        <button
            onClick={() => router.push(route)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${active
                    ? "bg-orange-50 text-orange-600 font-bold border border-orange-100 shadow-sm"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                }`}
        >
            <span className="w-5 h-5 flex items-center justify-center opacity-60">
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
            </span>
            {label}
        </button>
    );

    return (
        <>
            <aside className="w-full md:!w-64 !shrink-0 border-r border-stone-200/60 bg-white p-6 md:min-h-screen flex flex-col gap-8 sticky top-0 h-fit">
                <div>
                    <div className="flex items-center gap-2 mb-8 ml-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]" />
                        <Link href="/" className="font-serif-display text-xl text-stone-900 tracking-tight italic">
                            IdeaProof
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-1.5">
                        <SidebarItem
                            label="Dashboard"
                            active={router.pathname === "/dashboard"}
                            icon={LayoutDashboard}
                            route="/dashboard"
                        />
                        <SidebarItem
                            label="Explore"
                            active={router.pathname === "/explore"}
                            icon={Compass}
                            route="/explore"
                        />
                        <SidebarItem
                            label="Submit Idea"
                            active={router.pathname === "/submit"}
                            icon={SubmitingIcon}
                            route="/submit"
                        />
                        <SidebarItem
                            label="Saved Ideas"
                            active={router.pathname === "/saved"}
                            icon={Bookmark}
                            route="/saved"
                        />
                        <SidebarItem
                            label="Recommendations"
                            active={router.pathname === "/recommendations"}
                            icon={Sparkles}
                            route="/recommendations"
                        />
                        <SidebarItem
                            label="Network"
                            active={router.pathname === "/network"}
                            icon={Users}
                            route="/network"
                        />
                        <SidebarItem
                            label="Recent Activity"
                            active={router.pathname === "/recent-activity"}
                            icon={Compass}
                            route="/recent-activity"
                        />
                    </nav>
                </div>

                <div className="mt-auto pt-8 border-t border-stone-100">
                    <SidebarItem
                        label="Account Profile"
                        active={router.pathname === "/profile"}
                        icon={User}
                        route="/profile"
                    />
                    <SidebarItem
                        label="Settings"
                        active={router.pathname === "/settings"}
                        icon={Settings}
                        route="/settings"
                    />
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 mt-2 rounded-xl text-sm transition-all text-red-500 hover:bg-red-50 font-medium"
                    >
                        <span className="w-5 h-5 flex items-center justify-center opacity-70">
                            <LogOut size={18} strokeWidth={2} />
                        </span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
