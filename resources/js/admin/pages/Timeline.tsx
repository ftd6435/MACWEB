import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalPortal from "../../components/ModalPortal";
import { useToast } from "../../services/ToastContext";
import {
    Plus,
    Edit2,
    Trash2,
    History,
    Calendar,
    Save,
    X,
    Type,
    AlignLeft,
    Layers,
    ChevronUp,
    ChevronDown,
} from "lucide-react";
import axios from "axios";

interface Milestone {
    id: number;
    year: string;
    title: string;
    description: string;
    icon: string | null;
    order: number;
}

export default function AdminTimeline() {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(
        null,
    );
    const [formData, setFormData] = useState<Partial<Milestone>>({
        year: "",
        title: "",
        description: "",
        icon: "History",
    });

    useEffect(() => {
        fetchTimeline();
    }, []);

    const fetchTimeline = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/cms/about");
            setMilestones(response.data.timeline || []);
        } catch (error) {
            console.error("Failed to fetch timeline", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (milestone: Milestone | null = null) => {
        if (milestone) {
            setEditingMilestone(milestone);
            setFormData(milestone);
        } else {
            setEditingMilestone(null);
            setFormData({
                year: "",
                title: "",
                description: "",
                icon: "History",
            });
        }
        setIsModalOpen(true);
    };

    const { toast } = useToast();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving milestone:", formData);
        setIsModalOpen(false);
        toast(
            editingMilestone
                ? "Événement mis à jour avec succès"
                : "Événement créé avec succès",
        );
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Historique de l'Entreprise
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <History className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {milestones.length} jalons chronologiques
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouvel Événement
                </button>
            </header>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white h-32 rounded-[2.5rem] border border-[#F1F5F9] animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="relative">
                        {/* Vertical line for visual timeline */}
                        <div className="absolute left-12 top-0 bottom-0 w-1 bg-[#F1F5F9] rounded-full hidden md:block"></div>

                        <div className="space-y-8 relative">
                            {milestones.map((milestone, idx) => (
                                <motion.div
                                    key={milestone.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-10 group"
                                >
                                    <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-24">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-white border-4 border-[#F8FAFC] shadow-lg flex items-center justify-center text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation z-10">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 smooth-animation flex flex-col md:flex-row items-center gap-8">
                                        <div className="shrink-0 text-center md:text-left">
                                            <span className="text-3xl font-black text-[#00B8D4]">
                                                {milestone.year}
                                            </span>
                                        </div>

                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-xl font-black text-[#212121] mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-sm text-[#757575] font-medium leading-relaxed">
                                                {milestone.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-3 shrink-0">
                                            <div className="flex flex-col space-y-1 mr-2">
                                                <button className="p-1.5 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation">
                                                    <ChevronUp className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation">
                                                    <ChevronDown className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleOpenModal(milestone)
                                                }
                                                className="p-4 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-2xl smooth-animation"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button className="p-4 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Timeline Modal */}
            <ModalPortal>
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
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
                                        <h2 className="text-2xl font-black text-[#212121]">
                                            {editingMilestone
                                                ? "Modifier l'Événement"
                                                : "Nouvel Événement"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Étape marquante de l'entreprise
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSave}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Année
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.year}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        year: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: 2018"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Titre de l'Étape
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: Création de MAC Construction"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <AlignLeft className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Description
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                            placeholder="Détaillez cette étape importante..."
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
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
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
            </ModalPortal>
        </div>
    );
}
