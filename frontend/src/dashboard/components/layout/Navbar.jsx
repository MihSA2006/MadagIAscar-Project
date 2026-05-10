import { useState, useEffect } from "react";
import { Search, Mail, Bell, ChevronDown, User, Layers, HelpCircle, Sun, Moon, Crown, ChevronRight, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";
import { getAuthUser, clearAuthSession } from "../../../services/api";

export default function Navbar() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getAuthUser());
    }, []);

    const handleLogout = () => {
        clearAuthSession();
        window.location.href = '/';
    };

    return (
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 flex-shrink-0">
            {/* Left items */}
            <div className="flex items-center">
                <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-primary transition-colors">
                    Messages <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                </button>
            </div>

            {/* Right items */}
            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100">
                    <Search className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 relative">
                    <Mail className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-6 w-px bg-gray-200 mx-2"></div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        className="flex items-center gap-1.5 hover:bg-gray-50 p-1 rounded-full transition-all border border-transparent hover:border-gray-100"
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="User"
                            className={cn(
                                "w-9 h-9 rounded-full object-cover border-2 transition-all",
                                profileOpen ? "border-primary" : "border-gray-200"
                            )}
                        />
                        <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform duration-300", profileOpen && "rotate-180")} />
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                            {/* Header */}
                            <div className="flex items-center gap-3 p-4">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User Profile"
                                        className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 truncate">{user?.email?.split('@')[0] || "User"}</p>
                                    <p className="text-xs text-gray-400 truncate">{user?.email || "No email"}</p>
                                </div>
                            </div>

                            {/* Upgrade Banner */}
                            <div className="mx-2 mb-4 bg-gradient-to-r from-[#00843D] to-[#ef4444] p-4 rounded-[1.5rem] flex items-center justify-between shadow-lg shadow-green-700/20">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                                        <Crown className="w-5 h-5 text-white fill-white/20" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Upgrade profile</span>
                                </div>
                                <span className="bg-white text-gray-900 text-[10px] font-black px-2 py-1 rounded-full px-3">PRO</span>
                            </div>

                            {/* Menu Items */}
                            <div className="space-y-1 px-1">
                                {[
                                    { icon: User, label: "User Profile" },
                                    { icon: Layers, label: "Integrations" },
                                    { icon: HelpCircle, label: "Help Center" },
                                ].map((item, i) => (
                                    <button
                                        key={i}
                                        className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-2xl transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                            <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">{item.label}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
                                    </button>
                                ))}

                                {/* Dark Mode Toggle */}
                                <div className="flex items-center justify-between p-3.5 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <Sun className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm font-semibold text-gray-600">Dark Mode</span>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-100 rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Red Button */}
                            <div className="p-1 mt-2">
                                <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 text-red-500 bg-red-50 hover:bg-red-100 rounded-[1.5rem] transition-all group overflow-hidden relative">
                                    <LogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    <span className="text-sm font-black tracking-tight">Déconnexion</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
