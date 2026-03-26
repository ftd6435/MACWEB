import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../services/AuthContext";
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Briefcase,
    MessageSquare,
    Bell,
    CheckCircle,
    HardHat,
    Star,
    History,
    BarChart3,
    Inbox
} from "lucide-react";

export default function AdminLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/auth/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const menuItems = [
        { path: "/admin", icon: <LayoutDashboard />, label: "Dashboard" },
        { path: "/admin/articles", icon: <FileText />, label: "Articles" },
        { path: "/admin/projects", icon: <Briefcase />, label: "Projets" },
        { path: "/admin/services", icon: <HardHat />, label: "Services" },
        { path: "/admin/team", icon: <Users />, label: "Équipe" },
        { path: "/admin/testimonials", icon: <Star />, label: "Témoignages" },
        { path: "/admin/timeline", icon: <History />, label: "Historique" },
        { path: "/admin/stats", icon: <BarChart3 />, label: "Statistiques" },
        { path: "/admin/leads", icon: <Inbox />, label: "Demandes" },
        { path: "/admin/media", icon: <ImageIcon />, label: "Médiathèque" },
        { path: "/admin/settings", icon: <Settings />, label: "Paramètres" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-[#00B8D4]/30">
            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {!isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(true)}
                        className="fixed inset-0 bg-[#212121]/40 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`${
                    isSidebarOpen ? "w-80" : "w-28"
                } bg-[#212121] text-white smooth-animation flex flex-col z-50 fixed inset-y-0 lg:relative border-r border-white/5 shadow-2xl shadow-[#212121]/40`}
            >
                <div className="p-10 flex items-center justify-between">
                    <Link to="/" className="flex items-center group overflow-hidden">
                        <img src="/img/header_logo.png" alt="Logo" className="h-12 w-auto brightness-0 invert group-hover:scale-110 smooth-animation" />
                    </Link>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 hover:bg-white/10 rounded-xl smooth-animation">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-6 space-y-2 mt-8">
                    {menuItems.map((item) => {
                        const isActive = item.path === "/admin"
                            ? location.pathname === "/admin"
                            : location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center p-4 rounded-2xl smooth-animation group ${
                                    isActive
                                        ? "bg-[#00B8D4] text-white shadow-xl shadow-[#00B8D4]/20"
                                        : "text-white/40 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <div className={`w-6 h-6 shrink-0 smooth-animation ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                                    {item.icon}
                                </div>
                                {isSidebarOpen && (
                                    <span className={`ml-4 text-sm uppercase tracking-widest font-black ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                                        {item.label}
                                    </span>
                                )}
                                {isActive && isSidebarOpen && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-lg"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-8 mt-auto">
                    <div className={`bg-white/5 rounded-[2rem] p-6 border border-white/5 ${!isSidebarOpen && "flex justify-center"}`}>
                        {isSidebarOpen ? (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#00B8D4] flex items-center justify-center font-black text-white text-lg shadow-lg shadow-[#00B8D4]/20">
                                        {user?.name?.charAt(0) || "A"}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black truncate">{user?.name || "Administrateur"}</p>
                                        <div className="flex items-center mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                                            <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">En ligne</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center w-full py-4 bg-white/5 rounded-xl text-red-400 hover:bg-red-400 hover:text-white smooth-animation font-black text-[10px] uppercase tracking-widest"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleLogout} className="p-4 text-red-400 hover:bg-red-400 hover:text-white rounded-2xl smooth-animation">
                                <LogOut className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-[#F1F5F9] flex items-center justify-between px-10 shrink-0 sticky top-0 z-40">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-3 bg-[#F8FAFC] text-[#212121] hover:bg-[#00B8D4] hover:text-white rounded-2xl smooth-animation">
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center space-x-6">
                        <div className="hidden sm:flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Système Opérationnel</span>
                        </div>
                        <div className="w-px h-8 bg-[#F1F5F9]"></div>
                        <button className="p-3 bg-[#F8FAFC] text-[#616161] hover:text-[#00B8D4] rounded-2xl smooth-animation">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
