import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../services/AuthContext";
import { ToastProvider } from "../services/ToastContext";
import axios from "axios";
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Users,
    Settings,
    User as UserIcon,
    LogOut,
    Menu,
    X,
    Briefcase,
    CheckCircle,
    HardHat,
    Star,
    History,
    BarChart3,
    Inbox,
    Layers,
    Tag,
    ChevronDown,
    Building2,
    Mail,
    HeartHandshake,
} from "lucide-react";

type MenuItem = {
    path: string;
    icon: JSX.Element;
    label: string;
};

type MenuGroup = {
    id: string;
    label: string;
    items: MenuItem[];
};

export default function AdminLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        general: true,
        content: true,
        company: true,
        leads: true,
        system: true,
    });
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [unreadLeads, setUnreadLeads] = useState<{
        contact: number;
        career: number;
        partnership: number;
    }>({ contact: 0, career: 0, partnership: 0 });

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/auth/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const menuGroups: MenuGroup[] = [
        {
            id: "general",
            label: "Général",
            items: [
                {
                    path: "/admin",
                    icon: <LayoutDashboard className="w-6 h-6" />,
                    label: "Dashboard",
                },
            ],
        },
        {
            id: "content",
            label: "Contenu",
            items: [
                {
                    path: "/admin/articles",
                    icon: <FileText className="w-6 h-6" />,
                    label: "Articles",
                },
                {
                    path: "/admin/categories",
                    icon: <Layers className="w-6 h-6" />,
                    label: "Catégories",
                },
                {
                    path: "/admin/tags",
                    icon: <Tag className="w-6 h-6" />,
                    label: "Tags",
                },
                {
                    path: "/admin/projects",
                    icon: <Briefcase className="w-6 h-6" />,
                    label: "Projets",
                },
                {
                    path: "/admin/services",
                    icon: <HardHat className="w-6 h-6" />,
                    label: "Services",
                },
                {
                    path: "/admin/media",
                    icon: <ImageIcon className="w-6 h-6" />,
                    label: "Médiathèque",
                },
            ],
        },
        {
            id: "company",
            label: "Entreprise",
            items: [
                {
                    path: "/admin/team",
                    icon: <Users className="w-6 h-6" />,
                    label: "Équipe",
                },
                {
                    path: "/admin/testimonials",
                    icon: <Star className="w-6 h-6" />,
                    label: "Témoignages",
                },
                {
                    path: "/admin/timeline",
                    icon: <History className="w-6 h-6" />,
                    label: "Historique",
                },
                {
                    path: "/admin/offices",
                    icon: <Building2 className="w-6 h-6" />,
                    label: "Bureaux",
                },
                {
                    path: "/admin/stats",
                    icon: <BarChart3 className="w-6 h-6" />,
                    label: "Stats & Features",
                },
            ],
        },
        {
            id: "leads",
            label: "Demandes",
            items: [
                {
                    path: "/admin/leads",
                    icon: <Inbox className="w-6 h-6" />,
                    label: "Demandes",
                },
                {
                    path: "/admin/job-listings",
                    icon: <Briefcase className="w-6 h-6" />,
                    label: "Offres d’emploi",
                },
            ],
        },
        {
            id: "system",
            label: "Système",
            items: [
                {
                    path: "/admin/profile",
                    icon: <UserIcon className="w-6 h-6" />,
                    label: "Mon profil",
                },
                ...(user?.role !== "editor"
                    ? [
                          {
                              path: "/admin/users",
                              icon: <Users className="w-6 h-6" />,
                              label: "Utilisateurs",
                          },
                      ]
                    : []),
                {
                    path: "/admin/settings",
                    icon: <Settings className="w-6 h-6" />,
                    label: "Paramètres",
                },
            ],
        },
    ];

    const flatMenuItems = menuGroups.flatMap((g) => g.items);

    const isPathActive = (path: string) =>
        path === "/admin"
            ? location.pathname === "/admin"
            : location.pathname.startsWith(path);

    useEffect(() => {
        let isMounted = true;

        const fetchCounts = async () => {
            try {
                const res = await axios.get("/api/admin/leads/unread-counts");
                if (!isMounted) return;
                setUnreadLeads({
                    contact: Number(res.data?.contact || 0),
                    career: Number(res.data?.career || 0),
                    partnership: Number(res.data?.partnership || 0),
                });
            } catch {
                if (!isMounted) return;
                setUnreadLeads({ contact: 0, career: 0, partnership: 0 });
            }
        };

        fetchCounts();
        const id = window.setInterval(fetchCounts, 30000);

        return () => {
            isMounted = false;
            window.clearInterval(id);
        };
    }, []);

    return (
        <div className="h-screen overflow-hidden bg-[#F8FAFC] flex font-sans selection:bg-[#00B8D4]/30">
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
                } bg-[#212121] text-white smooth-animation flex flex-col z-50 fixed inset-y-0 left-0 lg:sticky lg:top-0 lg:h-screen border-r border-white/5 shadow-2xl shadow-[#212121]/40`}
            >
                <div className="px-8 pt-10 pb-8 shrink-0">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex-1 flex justify-center">
                            <div
                                className={`bg-white rounded-[1.75rem] shadow-lg shadow-black/20 flex items-center justify-center smooth-animation ${
                                    isSidebarOpen
                                        ? "px-5 py-3"
                                        : "px-4 py-3"
                                }`}
                            >
                                <img
                                    src={
                                        isSidebarOpen
                                            ? "/img/header_logo.png"
                                            : "/img/logo.png"
                                    }
                                    alt="Logo"
                                    className={`group-hover:scale-[1.03] smooth-animation ${
                                        isSidebarOpen
                                            ? "h-10 w-auto"
                                            : "h-9 w-auto"
                                    }`}
                                />
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-xl smooth-animation"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-8">
                    {!isSidebarOpen ? (
                        <nav className="space-y-2">
                            {flatMenuItems.map((item) => {
                                const isActive = isPathActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        title={item.label}
                                        className={`flex items-center justify-center p-4 rounded-2xl smooth-animation group ${
                                            isActive
                                                ? "bg-[#00B8D4] text-white shadow-xl shadow-[#00B8D4]/20"
                                                : "text-white/40 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        <div
                                            className={`w-6 h-6 shrink-0 smooth-animation ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                                        >
                                            {item.icon}
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>
                    ) : (
                        <nav className="space-y-6">
                            {menuGroups.map((group) => (
                                <div key={group.id} className="space-y-2">
                                    <button
                                        onClick={() =>
                                            setOpenGroups((prev) => ({
                                                ...prev,
                                                [group.id]: !prev[group.id],
                                            }))
                                        }
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 smooth-animation"
                                    >
                                        <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                                            {group.label}
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-white/40 smooth-animation ${
                                                openGroups[group.id]
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {openGroups[group.id] && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    height: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    height: "auto",
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    height: 0,
                                                }}
                                                className="overflow-hidden space-y-2"
                                            >
                                                {group.items.map((item) => {
                                                    const isActive =
                                                        isPathActive(
                                                            item.path,
                                                        );
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
                                                            <div
                                                                className={`w-6 h-6 shrink-0 smooth-animation ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                                                            >
                                                                {item.icon}
                                                            </div>
                                                            <span
                                                                className={`ml-4 text-sm uppercase tracking-widest font-black ${
                                                                    isActive
                                                                        ? "opacity-100"
                                                                        : "opacity-70 group-hover:opacity-100"
                                                                }`}
                                                            >
                                                                {item.label}
                                                            </span>
                                                            {isActive && (
                                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-lg"></div>
                                                            )}
                                                        </Link>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>
                    )}
                </div>

                <div className="px-8 pb-10 pt-6 shrink-0">
                    <div
                        className={`bg-white/5 rounded-[2rem] p-4 border border-white/10 shadow-lg shadow-black/20 ${
                            !isSidebarOpen && "flex justify-center"
                        }`}
                    >
                        {isSidebarOpen ? (
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#00B8D4] flex items-center justify-center font-black text-white text-sm shadow-lg shadow-[#00B8D4]/20 shrink-0 overflow-hidden">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        (user?.name?.charAt(0) || "A")
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-black truncate">
                                        {user?.name || "Administrateur"}
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                                        <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">
                                            En ligne
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    title="Déconnexion"
                                    className="p-3 bg-white/5 hover:bg-red-400 text-red-400 hover:text-white rounded-2xl smooth-animation shrink-0"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="p-4 text-red-400 hover:bg-red-400 hover:text-white rounded-2xl smooth-animation"
                            >
                                <LogOut className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-0 ml-0">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-[#F1F5F9] flex items-center justify-between px-10 shrink-0 sticky top-0 z-40">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-3 bg-[#F8FAFC] text-[#212121] hover:bg-[#00B8D4] hover:text-white rounded-2xl smooth-animation"
                    >
                        {isSidebarOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>

                    <div className="flex items-center space-x-6">
                        <div className="hidden sm:flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                Système Opérationnel
                            </span>
                        </div>
                        <div className="w-px h-8 bg-[#F1F5F9]"></div>
                        <div className="flex items-center space-x-3">
                            <Link
                                to="/admin/leads?tab=contact"
                                title="Nouveaux contacts"
                                className="relative p-3 bg-[#F8FAFC] text-[#616161] hover:text-[#00B8D4] rounded-2xl smooth-animation"
                            >
                                <Mail className="w-5 h-5" />
                                {unreadLeads.contact > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                        {unreadLeads.contact > 99 ? "99+" : unreadLeads.contact}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/admin/leads?tab=career"
                                title="Nouvelles candidatures"
                                className="relative p-3 bg-[#F8FAFC] text-[#616161] hover:text-[#00B8D4] rounded-2xl smooth-animation"
                            >
                                <Briefcase className="w-5 h-5" />
                                {unreadLeads.career > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                        {unreadLeads.career > 99 ? "99+" : unreadLeads.career}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/admin/leads?tab=partnership"
                                title="Nouvelles demandes de partenariat"
                                className="relative p-3 bg-[#F8FAFC] text-[#616161] hover:text-[#00B8D4] rounded-2xl smooth-animation"
                            >
                                <HeartHandshake className="w-5 h-5" />
                                {unreadLeads.partnership > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                        {unreadLeads.partnership > 99 ? "99+" : unreadLeads.partnership}
                                    </span>
                                )}
                            </Link>
                            <div className="w-px h-8 bg-[#F1F5F9]"></div>
                            <Link
                                to="/admin/settings"
                                title="Paramètres"
                                className="p-3 bg-[#F8FAFC] text-[#616161] hover:text-[#00B8D4] rounded-2xl smooth-animation"
                            >
                                <Settings className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <ToastProvider>
                            <Outlet />
                        </ToastProvider>
                    </div>
                </div>
            </main>
        </div>
    );
}
