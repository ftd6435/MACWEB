import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    Star, 
    User, 
    Quote, 
    Save, 
    X, 
    Type, 
    Briefcase,
    MessageSquare,
    CheckCircle,
    XCircle
} from "lucide-react";
import axios from "axios";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    image: string | null;
    is_active: boolean;
    order: number;
}

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({
        name: "",
        role: "",
        content: "",
        is_active: true
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/cms/home");
            setTestimonials(response.data.testimonials || []);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (testimonial: Testimonial | null = null) => {
        if (testimonial) {
            setEditingTestimonial(testimonial);
            setFormData(testimonial);
        } else {
            setEditingTestimonial(null);
            setFormData({
                name: "",
                role: "",
                content: "",
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving testimonial:", formData);
        setIsModalOpen(false);
    };

    const filteredTestimonials = testimonials.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">Témoignages Clients</h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {testimonials.length} avis clients configurés
                    </p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouvel Avis
                </button>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un témoignage..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white h-40 rounded-[2.5rem] border border-[#F1F5F9] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredTestimonials.map((testimonial, idx) => (
                            <motion.div
                                key={testimonial.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-x-2 smooth-animation group flex flex-col md:flex-row items-center gap-8"
                            >
                                <div className="relative shrink-0">
                                    <div className="w-20 h-20 rounded-2xl bg-[#F8FAFC] flex items-center justify-center overflow-hidden border-2 border-white shadow-md group-hover:scale-110 smooth-animation">
                                        {testimonial.image ? (
                                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-8 h-8 text-[#9E9E9E]" />
                                        )}
                                    </div>
                                    <Quote className="absolute -top-3 -left-3 w-8 h-8 text-[#00B8D4]/20" />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                                        <h3 className="text-lg font-black text-[#212121] group-hover:text-[#00B8D4] smooth-animation">{testimonial.name}</h3>
                                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#E2E8F0]"></span>
                                        <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest">{testimonial.role}</p>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ml-auto ${testimonial.is_active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                                            {testimonial.is_active ? "Affiché" : "Masqué"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#757575] font-medium leading-relaxed italic">"{testimonial.content}"</p>
                                </div>

                                <div className="flex items-center space-x-3 shrink-0">
                                    <button 
                                        onClick={() => handleOpenModal(testimonial)}
                                        className="p-4 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-2xl smooth-animation"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button className="p-4 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Testimonial Modal */}
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
                                    <h2 className="text-2xl font-black text-[#212121]">{editingTestimonial ? "Modifier le Témoignage" : "Nouvel Avis Client"}</h2>
                                    <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">Ce que les clients disent de nous</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <User className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Nom du Client
                                        </label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="Ex: Jean Dupont"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Briefcase className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Entreprise / Titre
                                        </label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.role}
                                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="Ex: PDG de BuildCorp"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                        <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Témoignage
                                    </label>
                                    <textarea 
                                        rows={5}
                                        required
                                        value={formData.content}
                                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                        placeholder="Le contenu de l'avis client..."
                                    />
                                </div>

                                <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-3xl">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-12 h-6 rounded-full p-1 smooth-animation cursor-pointer ${formData.is_active ? "bg-[#00B8D4]" : "bg-[#E2E8F0]"}`} onClick={() => setFormData({...formData, is_active: !formData.is_active})}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm smooth-animation ${formData.is_active ? "translate-x-6" : "translate-x-0"}`} />
                                        </div>
                                        <span className="text-xs font-black text-[#212121] uppercase tracking-widest">Afficher ce témoignage</span>
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
