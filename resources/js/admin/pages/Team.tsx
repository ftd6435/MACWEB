import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalPortal from "../../components/ModalPortal";
import { useToast } from "../../services/ToastContext";
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Users,
    Linkedin,
    Save,
    X,
    User,
    Briefcase,
    Type,
    Link as LinkIcon,
    Camera,
    CheckCircle,
    XCircle,
    MoreVertical,
} from "lucide-react";
import axios from "axios";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string | null;
    image: string | null;
    linkedin: string | null;
    is_active: boolean;
    order: number;
}

export default function AdminTeam() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState<Partial<TeamMember>>({
        name: "",
        role: "",
        bio: "",
        linkedin: "",
        is_active: true,
    });

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/cms/about");
            setTeam(response.data.team || []);
        } catch (error) {
            console.error("Failed to fetch team", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (member: TeamMember | null = null) => {
        if (member) {
            setEditingMember(member);
            setFormData(member);
        } else {
            setEditingMember(null);
            setFormData({
                name: "",
                role: "",
                bio: "",
                linkedin: "",
                is_active: true,
            });
        }
        setIsModalOpen(true);
    };

    const { toast } = useToast();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving member:", formData);
        setIsModalOpen(false);
        toast(
            editingMember
                ? "Membre mis à jour avec succès"
                : "Membre ajouté avec succès",
        );
    };

    const filteredTeam = team.filter(
        (m) =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.role.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Gestion de l'Équipe
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {team.length} membres de l'équipe enregistrés
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Ajouter un Membre
                </button>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un membre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="bg-white h-80 rounded-[2.5rem] border border-[#F1F5F9] animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredTeam.map((member, idx) => (
                            <motion.div
                                key={member.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-animation group text-center flex flex-col items-center"
                            >
                                <div className="relative mb-6">
                                    <div className="w-28 h-28 rounded-[2rem] bg-[#F8FAFC] flex items-center justify-center overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 smooth-animation">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 text-[#9E9E9E]" />
                                        )}
                                    </div>
                                    <div
                                        className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl border-4 border-white flex items-center justify-center shadow-md ${member.is_active ? "bg-emerald-500" : "bg-red-500"}`}
                                    >
                                        {member.is_active ? (
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-[#212121] mb-1 group-hover:text-[#00B8D4] smooth-animation">
                                    {member.name}
                                </h3>
                                <p className="text-[10px] font-black text-[#00B8D4] uppercase tracking-[0.2em] mb-4">
                                    {member.role}
                                </p>

                                <div className="flex items-center space-x-2 mt-auto">
                                    <button
                                        onClick={() => handleOpenModal(member)}
                                        className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-xl smooth-animation">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-blue-50 hover:text-blue-600 rounded-xl smooth-animation"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Team Modal */}
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
                                            {editingMember
                                                ? "Modifier le Membre"
                                                : "Ajouter un Membre"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Informations du personnel
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
                                    <div className="flex flex-col items-center mb-8">
                                        <div className="w-32 h-32 rounded-[2.5rem] bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center text-[#9E9E9E] hover:border-[#00B8D4] hover:bg-[#00B8D4]/5 smooth-animation cursor-pointer relative group overflow-hidden">
                                            <Camera className="w-8 h-8 mb-2 group-hover:scale-110 smooth-animation" />
                                            <span className="text-[8px] font-black uppercase tracking-widest">
                                                Photo
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <User className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Nom Complet
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Briefcase className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Poste / Rôle
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.role}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        role: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: Architecte Principal"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <LinkIcon className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Profil LinkedIn
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.linkedin || ""}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    linkedin: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Biographie Courte
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formData.bio || ""}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    bio: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                            placeholder="Décrivez brièvement le parcours du membre..."
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-3xl">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`w-12 h-6 rounded-full p-1 smooth-animation cursor-pointer ${formData.is_active ? "bg-[#00B8D4]" : "bg-[#E2E8F0]"}`}
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        is_active:
                                                            !formData.is_active,
                                                    })
                                                }
                                            >
                                                <div
                                                    className={`w-4 h-4 bg-white rounded-full shadow-sm smooth-animation ${formData.is_active ? "translate-x-6" : "translate-x-0"}`}
                                                />
                                            </div>
                                            <span className="text-xs font-black text-[#212121] uppercase tracking-widest">
                                                Activer le membre
                                            </span>
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
