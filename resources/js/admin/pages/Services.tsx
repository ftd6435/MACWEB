import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Edit2, 
    Trash2, 
    Eye, 
    HardHat, 
    CheckCircle, 
    XCircle,
    ChevronLeft,
    ChevronRight,
    Save,
    X,
    LayoutGrid,
    List,
    Image as ImageIcon,
    Type,
    AlignLeft,
    Layers,
    ArrowUpDown
} from "lucide-react";
import axios from "axios";

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string;
    image: string | null;
    features: string[];
    is_active: boolean;
    order: number;
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState<Partial<Service>>({
        title: "",
        description: "",
        icon: "HardHat",
        is_active: true,
        features: []
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            // In a real app, this would be /api/admin/services
            const response = await axios.get("/api/cms/global");
            setServices(response.data.services || []);
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (service: Service | null = null) => {
        if (service) {
            setEditingService(service);
            setFormData(service);
        } else {
            setEditingService(null);
            setFormData({
                title: "",
                description: "",
                icon: "HardHat",
                is_active: true,
                features: []
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mock save for now
        console.log("Saving service:", formData);
        setIsModalOpen(false);
    };

    const filteredServices = services.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">Gestion des Services</h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <HardHat className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {services.length} services configurés pour le site
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-3" />
                        Nouveau Service
                    </button>
                </div>
            </header>

            {/* Toolbar Section */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#F1F5F9]">
                        <button 
                            onClick={() => setViewMode("grid")}
                            className={`p-3 rounded-xl smooth-animation ${viewMode === "grid" ? "bg-white text-[#00B8D4] shadow-sm" : "text-[#9E9E9E] hover:text-[#212121]"}`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => setViewMode("list")}
                            className={`p-3 rounded-xl smooth-animation ${viewMode === "list" ? "bg-white text-[#00B8D4] shadow-sm" : "text-[#9E9E9E] hover:text-[#212121]"}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <button className="flex items-center px-6 py-4 bg-white border border-[#E2E8F0] text-[#616161] rounded-2xl hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation font-black text-[10px] uppercase tracking-widest">
                        <Filter className="w-4 h-4 mr-3" />
                        Filtres
                    </button>
                    
                    <button className="flex items-center px-6 py-4 bg-white border border-[#E2E8F0] text-[#616161] rounded-2xl hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation font-black text-[10px] uppercase tracking-widest">
                        <ArrowUpDown className="w-4 h-4 mr-3" />
                        Trier
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white h-96 rounded-[2.5rem] border border-[#F1F5F9] animate-pulse" />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="content"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}
                    >
                        {filteredServices.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`bg-white border border-[#F1F5F9] shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-animation group ${
                                    viewMode === "grid" ? "rounded-[2.5rem] p-8" : "rounded-3xl p-6 flex items-center justify-between"
                                }`}
                            >
                                <div className={viewMode === "list" ? "flex items-center space-x-6 flex-1" : ""}>
                                    <div className={`p-4 rounded-2xl bg-[#00B8D4]/5 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation shrink-0 ${viewMode === "grid" ? "w-16 h-16 flex items-center justify-center mb-8" : "w-14 h-14 flex items-center justify-center"}`}>
                                        <HardHat className="w-8 h-8" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${service.is_active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                                                {service.is_active ? "Actif" : "Inactif"}
                                            </span>
                                            {viewMode === "grid" && (
                                                <button className="p-2 hover:bg-[#F8FAFC] rounded-xl text-[#9E9E9E] hover:text-[#212121] smooth-animation">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-black text-[#212121] mb-2 truncate group-hover:text-[#00B8D4] smooth-animation">{service.title}</h3>
                                        <p className="text-sm text-[#757575] font-medium leading-relaxed line-clamp-2">{service.description}</p>
                                    </div>
                                </div>

                                <div className={`flex items-center ${viewMode === "grid" ? "mt-10 pt-8 border-t border-[#F1F5F9] justify-between" : "ml-8 space-x-3"}`}>
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#F1F5F9] flex items-center justify-center overflow-hidden">
                                                <div className="w-full h-full bg-[#00B8D4]/10" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => handleOpenModal(service)}
                                            className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-xl smooth-animation">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal - Quick Edit/Create */}
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
                            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
                        >
                            <div className="p-10 flex items-center justify-between border-b border-[#F1F5F9] shrink-0">
                                <div>
                                    <h2 className="text-2xl font-black text-[#212121]">{editingService ? "Modifier le Service" : "Nouveau Service"}</h2>
                                    <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">Détails de la prestation</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Titre du Service
                                        </label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="Ex: Construction Résidentielle"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Layers className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Icône
                                        </label>
                                        <select 
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({...formData, icon: e.target.value})}
                                        >
                                            <option value="HardHat">Casque (Construction)</option>
                                            <option value="Home">Maison (Habitat)</option>
                                            <option value="Building">Immeuble (Bureau)</option>
                                            <option value="Tool">Outil (Maintenance)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                        <AlignLeft className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Description Complète
                                    </label>
                                    <textarea 
                                        rows={4}
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                        placeholder="Décrivez en détail ce service..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                        <ImageIcon className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Image de Couverture
                                    </label>
                                    <div className="w-full h-48 bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-[2rem] flex flex-col items-center justify-center text-[#9E9E9E] hover:border-[#00B8D4] hover:bg-[#00B8D4]/5 smooth-animation cursor-pointer group">
                                        <Plus className="w-8 h-8 mb-3 group-hover:scale-110 smooth-animation" />
                                        <span className="text-xs font-black uppercase tracking-widest">Ajouter une image</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-3xl">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-12 h-6 rounded-full p-1 smooth-animation cursor-pointer ${formData.is_active ? "bg-[#00B8D4]" : "bg-[#E2E8F0]"}`} onClick={() => setFormData({...formData, is_active: !formData.is_active})}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm smooth-animation ${formData.is_active ? "translate-x-6" : "translate-x-0"}`} />
                                        </div>
                                        <span className="text-xs font-black text-[#212121] uppercase tracking-widest">Rendre ce service actif</span>
                                    </div>
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
