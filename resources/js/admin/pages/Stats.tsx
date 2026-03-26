import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Plus, 
    Edit2, 
    Trash2, 
    BarChart3, 
    Save, 
    X, 
    Type, 
    Hash,
    Layers,
    ChevronUp,
    ChevronDown,
    Activity,
    Users,
    Briefcase,
    Building2
} from "lucide-react";
import axios from "axios";

interface Stat {
    id: number;
    label: string;
    value: string;
    sub_label: string | null;
    icon: string | null;
    group: string;
    order: number;
}

export default function AdminStats() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState<Stat | null>(null);
    const [formData, setFormData] = useState<Partial<Stat>>({
        label: "",
        value: "",
        sub_label: "",
        icon: "Activity",
        group: "home"
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/cms/global");
            // stats are grouped by 'group' in the response
            const groupedStats = response.data.stats || {};
            const allStats = Object.values(groupedStats).flat() as Stat[];
            setStats(allStats);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (stat: Stat | null = null) => {
        if (stat) {
            setEditingStat(stat);
            setFormData(stat);
        } else {
            setEditingStat(null);
            setFormData({
                label: "",
                value: "",
                sub_label: "",
                icon: "Activity",
                group: "home"
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving stat:", formData);
        setIsModalOpen(false);
    };

    const groups = ["home", "about"];

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">Statistiques & Chiffres</h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {stats.length} indicateurs de performance affichés
                    </p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouvelle Statistique
                </button>
            </header>

            {groups.map(group => (
                <div key={group} className="space-y-6">
                    <div className="flex items-center space-x-4 ml-4">
                        <div className="w-1.5 h-8 bg-[#00B8D4] rounded-full"></div>
                        <h2 className="text-xl font-black text-[#212121] uppercase tracking-widest">Groupe: {group === 'home' ? 'Accueil' : 'À Propos'}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.filter(s => s.group === group).map((stat, idx) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 smooth-animation group"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="p-3 rounded-2xl bg-[#00B8D4]/5 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <button 
                                            onClick={() => handleOpenModal(stat)}
                                            className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-3xl font-black text-[#212121] tracking-tight">{stat.value}</p>
                                    <p className="text-xs font-black text-[#757575] uppercase tracking-widest">{stat.label}</p>
                                    {stat.sub_label && (
                                        <p className="text-[10px] font-medium text-[#9E9E9E] mt-2 italic">{stat.sub_label}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Stat Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-[#212121]/60 backdrop-blur-md z-[60]"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 m-auto w-full max-w-xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
                        >
                            <div className="p-10 flex items-center justify-between border-b border-[#F1F5F9] shrink-0">
                                <div>
                                    <h2 className="text-2xl font-black text-[#212121]">{editingStat ? "Modifier la Stat" : "Nouvelle Statistique"}</h2>
                                    <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">Données chiffrées de l'entreprise</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Hash className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Valeur (Chiffre)
                                        </label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.value}
                                            onChange={(e) => setFormData({...formData, value: e.target.value})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="Ex: 150+"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Libellé
                                        </label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.label}
                                            onChange={(e) => setFormData({...formData, label: e.target.value})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="Ex: Projets Terminés"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                        <Layers className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Groupe d'affichage
                                    </label>
                                    <select 
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                        value={formData.group}
                                        onChange={(e) => setFormData({...formData, group: e.target.value})}
                                    >
                                        <option value="home">Page d'Accueil</option>
                                        <option value="about">Page À Propos</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                        <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Sous-titre (Optionnel)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={formData.sub_label || ""}
                                        onChange={(e) => setFormData({...formData, sub_label: e.target.value})}
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        placeholder="Ex: À travers toute l'Afrique"
                                    />
                                </div>

                                <div className="flex items-center space-x-4 pt-4 shrink-0">
                                    <button 
                                        type="submit"
                                        className="flex-1 flex items-center justify-center py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                                    >
                                        <Save className="w-5 h-5 mr-3" />
                                        Enregistrer
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 flex items-center justify-center py-5 px-6 bg-white border border-[#E2E8F0] text-[#616161] rounded-[1.5rem] hover:bg-red-50 hover:text-red-500 hover:border-red-100 smooth-animation font-black text-xs uppercase tracking-widest"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
