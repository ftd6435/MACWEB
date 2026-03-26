import React, { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../services/AuthContext";
import {
    LayoutDashboard,
    FileText,
    Image,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Briefcase,
    MessageSquare,
    Bell,
    ChevronRight,
    Plus,
    TrendingUp,
    Clock,
    CheckCircle,
    ArrowUpRight,
    Search,
    Calendar,
    Filter,
    MoreHorizontal
} from "lucide-react";

function AdminDashboard() {
    const stats = [
        { label: "Total Articles", count: 12, trend: "+2 ce mois", icon: <FileText />, color: "text-[#00B8D4]", bg: "bg-[#00B8D4]/10" },
        { label: "Projets Actifs", count: 8, trend: "3 en cours", icon: <Briefcase />, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Commentaires", count: 45, trend: "+12 nouveaux", icon: <MessageSquare />, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Médiathèque", count: 124, trend: "1.2 GB utilisé", icon: <Image />, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-[#212121]">Tableau de Bord</h1>
                    <p className="text-[#616161] font-medium mt-1">Bienvenue, voici un aperçu de votre activité aujourd'hui.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Rechercher..." 
                            className="pl-12 pr-6 py-3 bg-white border border-[#E2E8F0] rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-medium w-64 smooth-animation"
                        />
                    </div>
                    <button className="p-3 bg-white border border-[#E2E8F0] rounded-2xl text-[#616161] hover:text-[#00B8D4] hover:border-[#00B8D4] smooth-animation relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-[#F1F5F9] shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-animation"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                {React.cloneElement(stat.icon as React.ReactElement, { className: "w-6 h-6" })}
                            </div>
                            <span className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest bg-[#F8FAFC] px-3 py-1 rounded-full">{stat.trend}</span>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-[#212121] mb-1">{stat.count}</p>
                            <p className="text-xs font-black text-[#757575] uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-[#F1F5F9] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-xl font-black text-[#212121]">Activités Récentes</h2>
                            <p className="text-xs text-[#9E9E9E] font-bold mt-1 uppercase tracking-widest">Dernières 24 heures</p>
                        </div>
                        <button className="p-2 hover:bg-[#F8FAFC] rounded-xl smooth-animation">
                            <MoreHorizontal className="w-5 h-5 text-[#9E9E9E]" />
                        </button>
                    </div>
                    <div className="space-y-8">
                        {[
                            { title: "Nouvel article publié", desc: "L'Avenir de la Construction Durable en Afrique", time: "Il y a 2h", type: "article", icon: <FileText className="text-blue-500" /> },
                            { title: "Nouveau commentaire reçu", desc: "Jean Dupont a commenté sur votre dernier article", time: "Il y a 5h", type: "comment", icon: <MessageSquare className="text-amber-500" /> },
                            { title: "Projet mis à jour", desc: "Résidence Horizon - Phase 2 terminée", time: "Hier à 16:45", type: "project", icon: <Briefcase className="text-emerald-500" /> },
                            { title: "Nouvelle image ajoutée", desc: "Gallery_Project_X_01.jpg", time: "Hier à 10:20", type: "media", icon: <Image className="text-purple-500" /> },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start group">
                                <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center shrink-0 mr-5 group-hover:bg-white group-hover:shadow-md smooth-animation">
                                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-black text-[#212121] truncate">{item.title}</p>
                                        <span className="text-[10px] font-bold text-[#9E9E9E] ml-4">{item.time}</span>
                                    </div>
                                    <p className="text-xs text-[#616161] font-medium truncate">{item.desc}</p>
                                </div>
                                <button className="ml-4 opacity-0 group-hover:opacity-100 smooth-animation text-[#00B8D4]">
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-10 py-4 border-2 border-dashed border-[#E2E8F0] rounded-2xl text-xs font-black text-[#9E9E9E] uppercase tracking-widest hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation">
                        Voir tout l'historique
                    </button>
                </div>

                {/* Quick Actions & System Info */}
                <div className="space-y-8">
                    <div className="bg-[#212121] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-[#212121]/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 smooth-animation"></div>
                        <h2 className="text-xl font-black mb-8 relative z-10">Actions Rapides</h2>
                        <div className="grid grid-cols-1 gap-4 relative z-10">
                            <Link to="/admin/articles" className="flex items-center justify-between p-5 bg-white/10 hover:bg-[#00B8D4] rounded-2xl smooth-animation group/btn">
                                <div className="flex items-center">
                                    <div className="p-2 bg-white/10 rounded-xl mr-4">
                                        <Plus className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold">Nouvel Article</span>
                                </div>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 smooth-animation" />
                            </Link>
                            <Link to="/admin/projects" className="flex items-center justify-between p-5 bg-white/10 hover:bg-[#00B8D4] rounded-2xl smooth-animation group/btn">
                                <div className="flex items-center">
                                    <div className="p-2 bg-white/10 rounded-xl mr-4">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold">Nouveau Projet</span>
                                </div>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 smooth-animation" />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] p-8 shadow-sm">
                        <h3 className="text-xs font-black text-[#212121] uppercase tracking-widest mb-6">État du Système</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></div>
                                    <span className="text-xs font-bold text-[#616161]">Base de données</span>
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 uppercase">En ligne</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></div>
                                    <span className="text-xs font-bold text-[#616161]">Serveur de médias</span>
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 uppercase">Stable</span>
                            </div>
                            <div className="pt-4 border-t border-[#F1F5F9]">
                                <p className="text-[10px] font-bold text-[#9E9E9E] uppercase tracking-widest mb-2">Espace Stockage</p>
                                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00B8D4] w-[65%]"></div>
                                </div>
                                <p className="text-[10px] font-bold text-[#616161] mt-2">1.2 GB sur 2.0 GB utilisés</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdminArticles() {
    const [articles] = useState([
        { id: 1, title: "10 Étapes pour des Fondations Solides", author: "Michel Diallo", date: "15 Mar 2024", status: "Publié", views: "1.2k", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=100" },
        { id: 2, title: "Les Innovations du BTP en 2024", author: "Claire Kouadio", date: "10 Mar 2024", status: "Brouillon", views: "450", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=100" },
        { id: 3, title: "L'Avenir de la Construction Durable", author: "Amadou Diallo", date: "05 Mar 2024", status: "Publié", views: "3.5k", image: "https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=100" },
    ]);

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-[#212121]">Articles</h1>
                    <p className="text-[#616161] font-medium mt-1">Gérez vos publications et l'engagement de vos lecteurs.</p>
                </div>
                <button className="inline-flex items-center justify-center px-8 py-4 bg-[#00B8D4] text-white font-black rounded-2xl shadow-xl shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel Article
                </button>
            </header>

            <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-sm overflow-hidden">
                <div className="p-8 border-b border-[#F1F5F9] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Filtrer les articles..." 
                                className="pl-12 pr-6 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-medium w-64 smooth-animation"
                            />
                        </div>
                        <button className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-[#616161] hover:text-[#00B8D4] smooth-animation">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-black text-[#9E9E9E] uppercase tracking-widest">
                        <span>Afficher :</span>
                        <select className="bg-transparent border-none focus:ring-0 text-[#212121] cursor-pointer">
                            <option>Tous</option>
                            <option>Publiés</option>
                            <option>Brouillons</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-[0.2em] bg-[#F8FAFC]">
                                <th className="px-8 py-5">Article</th>
                                <th className="px-8 py-5">Auteur</th>
                                <th className="px-8 py-5">Stats</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5">Statut</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-[#F8FAFC]/50 smooth-animation group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <img src={article.image} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                                            <p className="font-black text-[#212121] text-sm group-hover:text-[#00B8D4] smooth-animation leading-tight">{article.title}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center text-[10px] font-black">
                                                {article.author.charAt(0)}
                                            </div>
                                            <span className="text-xs font-bold text-[#616161]">{article.author}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center text-[#9E9E9E] text-xs font-bold">
                                            <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                                            {article.views}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-xs font-bold text-[#757575]">{article.date}</td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                            article.status === "Publié" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                        }`}>
                                            {article.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-[#616161] hover:text-[#00B8D4] smooth-animation">
                                                <Settings className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-red-400 smooth-animation">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-8 border-t border-[#F1F5F9] flex items-center justify-between">
                    <p className="text-xs font-bold text-[#9E9E9E]">Affichage de 3 sur 12 articles</p>
                    <div className="flex space-x-2">
                        <button className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation">&lt;</button>
                        <button className="w-8 h-8 rounded-lg bg-[#00B8D4] text-white font-bold text-xs shadow-lg shadow-[#00B8D4]/20">1</button>
                        <button className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
        { path: "/admin/media", icon: <Image />, label: "Médiathèque" },
        { path: "/admin/comments", icon: <MessageSquare />, label: "Commentaires" },
        { path: "/admin/users", icon: <Users />, label: "Utilisateurs" },
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
                        <img src="/img/logo.png" alt="Logo" className="h-10 w-auto brightness-0 invert group-hover:scale-110 smooth-animation" />
                        {isSidebarOpen && (
                            <div className="ml-4">
                                <span className="font-black text-xl tracking-tight italic block leading-none">MAC</span>
                                <span className="text-[8px] text-white/40 font-black uppercase tracking-widest mt-1 block">Panel Admin</span>
                            </div>
                        )}
                    </Link>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 hover:bg-white/10 rounded-xl smooth-animation">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-6 space-y-2 mt-8">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
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
                        <Routes>
                            <Route path="/" element={<AdminDashboard />} />
                            <Route path="/articles" element={<AdminArticles />} />
                            <Route path="/projects" element={<div className="p-20 text-center"><Briefcase className="w-20 h-20 mx-auto text-[#00B8D4] mb-6 opacity-20" /><h2 className="text-2xl font-black text-[#212121]">Gestion des Projets</h2><p className="text-[#616161] font-medium mt-2">Section en cours de développement...</p></div>} />
                            <Route path="/media" element={<div className="p-20 text-center"><Image className="w-20 h-20 mx-auto text-[#00B8D4] mb-6 opacity-20" /><h2 className="text-2xl font-black text-[#212121]">Médiathèque</h2><p className="text-[#616161] font-medium mt-2">Section en cours de développement...</p></div>} />
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
}
