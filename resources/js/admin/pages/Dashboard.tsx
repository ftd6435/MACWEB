import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Briefcase,
    MessageSquare,
    Image as ImageIcon,
    TrendingUp,
    Search,
    Bell,
    MoreHorizontal,
    ArrowUpRight,
    Plus,
    ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const [metrics, setMetrics] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchMetrics = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("/api/admin/dashboard-metrics");
                if (!isMounted) return;
                setMetrics(res.data);
            } catch {
                if (!isMounted) return;
                setMetrics(null);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchMetrics();
        return () => {
            isMounted = false;
        };
    }, []);

    const stats = [
        {
            label: "Total Articles",
            count: Number(metrics?.articles?.total || 0),
            trend: `+${Number(metrics?.articles?.this_month || 0)} ce mois`,
            icon: <FileText />,
            color: "text-[#00B8D4]",
            bg: "bg-[#00B8D4]/10",
        },
        {
            label: "Projets",
            count: Number(metrics?.projects?.total || 0),
            trend: `${Number(metrics?.projects?.published || 0)} publiés`,
            icon: <Briefcase />,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Commentaires",
            count: Number(metrics?.comments?.total || 0),
            trend: `${Number(metrics?.comments?.pending || 0)} en attente`,
            icon: <MessageSquare />,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            label: "Médiathèque",
            count: Number(metrics?.media?.total || 0),
            trend: "Fichiers",
            icon: <ImageIcon />,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ];

    const newLeadsTotal =
        Number(metrics?.leads?.new?.contact || 0) +
        Number(metrics?.leads?.new?.career || 0) +
        Number(metrics?.leads?.new?.partnership || 0);

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
                        {!isLoading && newLeadsTotal > 0 && (
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
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
                            <p className="text-3xl font-black text-[#212121] mb-1">
                                {isLoading ? "…" : stat.count}
                            </p>
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
                            { title: "Nouvelle image ajoutée", desc: "Gallery_Project_X_01.jpg", time: "Hier à 10:20", type: "media", icon: <ImageIcon className="text-purple-500" /> },
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
