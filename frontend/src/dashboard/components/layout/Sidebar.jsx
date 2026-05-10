import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    ListTodo,
    Calendar,
    Bot,
    CreditCard,
    Trash2,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Flame
} from "lucide-react";
import { cn } from "../../lib/utils";

const GENERAL_LINKS = [
    { name: "All Task", href: "/tasks", icon: ListTodo },
    { name: "Agenda", href: "/agenda", icon: Calendar },
    { name: "AI Chat", href: "/chat", icon: Bot },
];

const APPEARANCE_LINKS = [
    { name: "Trash", href: "/trash", icon: Trash2 },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Logout", href: "/logout", icon: LogOut, textClass: "text-red-500" },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const renderLink = (link) => {
        const isActive = location.pathname === link.href || (link.href === "/tasks" && location.pathname.startsWith("/tasks"));
        if (link.href === '/logout') {
            return (
                <button
                    key={link.name}
                    onClick={() => {
                        import('../../../services/api').then(({ clearAuthSession }) => {
                            clearAuthSession()
                            window.location.href = '/'
                        })
                    }}
                    className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group text-gray-600 hover:bg-secondary/5 hover:text-secondary",
                        link.textClass
                    )}
                    title={collapsed ? link.name : undefined}
                >
                    <link.icon className={cn("w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 text-gray-400 group-hover:text-secondary", link.textClass)} />
                    {!collapsed && <span>{link.name}</span>}
                </button>
            )
        }

        return (
            <Link
                key={link.name}
                to={link.href}
                className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group",
                    isActive ? "bg-primary/10 text-primary font-bold" : "text-gray-600 hover:bg-secondary/5 hover:text-secondary",
                    link.textClass
                )}
                title={collapsed ? link.name : undefined}
            >
                <link.icon className={cn("w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-gray-400 group-hover:text-secondary", link.textClass)} />
                {!collapsed && <span>{link.name}</span>}
            </Link>
        );
    };

    return (
        <aside
            className={cn(
                "bg-white border-r border-border flex flex-col transition-all duration-300 relative shadow-sm",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3.5 top-8 bg-white border border-border rounded-full p-1 text-gray-500 hover:text-primary shadow-md z-10 transition-transform hover:scale-110"
            >
                {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <div className="p-6 flex items-center gap-2">
                <div className="relative flex-shrink-0">
                    <div className="bg-primary p-1.5 rounded-lg text-white shadow-lg shadow-primary/20">
                        <Flame className="w-6 h-6" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                {!collapsed && (
                    <span className="font-bold text-xl tracking-tight text-[#172018]">
                        MadagAIscar
                        <span className="text-red-500 text-2xl leading-none">°</span>
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-8 pb-6">
                {/* General */}
                <div>
                    {!collapsed && <p className="text-xs font-semibold text-gray-400 mb-3 px-4 uppercase tracking-wider">General</p>}
                    <div className="flex flex-col gap-1">
                        {GENERAL_LINKS.map(renderLink)}
                    </div>
                </div>

                {/* Appearance */}
                <div className="mt-auto">
                    {!collapsed && <p className="text-xs font-semibold text-gray-400 mb-3 px-4 uppercase tracking-wider">Appearance</p>}
                    <div className="flex flex-col gap-1">
                        {APPEARANCE_LINKS.map(renderLink)}
                    </div>
                </div>
            </div>
        </aside>
    );
}
