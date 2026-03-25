import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    Image,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";

function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#212121]">
                Tableau de Bord
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Articles", count: 12, color: "bg-blue-100" },
                    { label: "Projets", count: 8, color: "bg-green-100" },
                    {
                        label: "Commentaires",
                        count: 45,
                        color: "bg-yellow-100",
                    },
                    { label: "Utilisateurs", count: 5, color: "bg-purple-100" },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className={`${stat.color} rounded-lg p-6`}
                        whileHover={{ translateY: -5 }}
                    >
                        <p className="text-4xl font-bold text-[#212121]">
                            {stat.count}
                        </p>
                        <p className="text-[#616161]">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function AdminArticles() {
    const [articles] = useState([
        {
            id: 1,
            title: "10 Étapes pour des Fondations Solides",
            author: "Michel",
            date: "2024-03-15",
        },
        {
            id: 2,
            title: "Les Innovations du BTP en 2024",
            author: "Claire",
            date: "2024-03-10",
        },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#212121]">
                    Gestion des Articles
                </h1>
                <button className="px-4 py-2 bg-[#00B8D4] text-white rounded-lg hover:bg-[#0097A7]">
                    Nouvel Article
                </button>
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#F5F5F5]">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-[#212121]">
                                Titre
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-[#212121]">
                                Auteur
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-[#212121]">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-[#212121]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr
                                key={article.id}
                                className="border-t border-[#E0E0E0] hover:bg-[#F5F5F5]"
                            >
                                <td className="px-6 py-3 text-[#212121]">
                                    {article.title}
                                </td>
                                <td className="px-6 py-3 text-[#616161]">
                                    {article.author}
                                </td>
                                <td className="px-6 py-3 text-[#9E9E9E]">
                                    {article.date}
                                </td>
                                <td className="px-6 py-3 space-x-2">
                                    <button className="text-[#00B8D4] hover:underline">
                                        Éditer
                                    </button>
                                    <button className="text-red-600 hover:underline">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AdminProjects() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#212121]">
                    Gestion des Projets
                </h1>
                <button className="px-4 py-2 bg-[#00B8D4] text-white rounded-lg hover:bg-[#0097A7]">
                    Nouveau Projet
                </button>
            </div>
            <p className="text-[#616161]">
                Interface de gestion des projets en développement
            </p>
        </div>
    );
}

function AdminSettings() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#212121]">Paramètres</h1>
            <div className="bg-white p-6 rounded-lg">
                <p className="text-[#616161]">
                    Interface de paramètres en développemet
                </p>
            </div>
        </div>
    );
}

export default function Admin() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname.includes(path);
    };

    const menuItems = [
        {
            path: "/admin",
            label: "Tableau de Bord",
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            path: "/admin/articles",
            label: "Articles",
            icon: <FileText className="w-5 h-5" />,
        },
        {
            path: "/admin/projects",
            label: "Projets",
            icon: <Image className="w-5 h-5" />,
        },
        {
            path: "/admin/comments",
            label: "Commentaires",
            icon: <Users className="w-5 h-5" />,
        },
        {
            path: "/admin/settings",
            label: "Paramètres",
            icon: <Settings className="w-5 h-5" />,
        },
    ];

    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            {/* Sidebar */}
            <motion.aside
                className={`bg-[#212121] text-white transition-all duration-300 ${
                    sidebarOpen ? "w-64" : "w-20"
                }`}
                initial={{ x: -270 }}
                animate={{ x: 0 }}
            >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    {sidebarOpen && (
                        <h2 className="text-xl font-bold">MAC Admin</h2>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1 hover:bg-white/10 rounded"
                    >
                        {sidebarOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <nav className="p-6 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive(item.path)
                                    ? "bg-[#00B8D4] text-white"
                                    : "text-white/75 hover:bg-white/10"
                            }`}
                        >
                            {item.icon}
                            {sidebarOpen && <span>{item.label}</span>}
                        </Link>
                    ))}

                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/75 hover:bg-white/10 mt-auto"
                    >
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && <span>Quitter</span>}
                    </Link>
                </nav>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/articles" element={<AdminArticles />} />
                        <Route path="/projects" element={<AdminProjects />} />
                        <Route path="/settings" element={<AdminSettings />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
