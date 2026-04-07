import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Eye,
    Briefcase,
    MapPin,
    Calendar,
    Tag,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    Save,
    X,
    Type,
    AlignLeft,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    DollarSign,
    Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ModalPortal from "../../components/ModalPortal";
import { useToast } from "../../services/ToastContext";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    category_id: number | null;
    year: number | null;
    duration: string | null;
    budget: string | null;
    is_featured: boolean;
    image?: string;
    category?: { name: string };
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: "",
        description: "",
        location: "",
        year: new Date().getFullYear(),
        is_featured: false,
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/projects");
            setProjects(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (project: Project | null = null) => {
        if (project) {
            setEditingProject(project);
            setFormData(project);
        } else {
            setEditingProject(null);
            setFormData({
                title: "",
                description: "",
                location: "",
                year: new Date().getFullYear(),
                is_featured: false,
            });
        }
        setIsModalOpen(true);
    };

    const { toast } = useToast();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving project:", formData);
        setIsModalOpen(false);
        toast(
            editingProject
                ? "Projet mis à jour avec succès"
                : "Projet créé avec succès",
        );
    };

    const filteredProjects = projects.filter(
        (p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Gestion des Projets
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {projects.length} projets dans le portfolio
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouveau Projet
                </button>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un projet..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading
                    ? [1, 2, 3].map((i) => (
                          <div
                              key={i}
                              className="bg-white h-96 rounded-[2.5rem] border border-[#F1F5F9] animate-pulse"
                          />
                      ))
                    : filteredProjects.map((project, idx) => (
                          <motion.div
                              key={project.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="bg-white border border-[#F1F5F9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-animation group"
                          >
                              <div className="relative h-48 overflow-hidden">
                                  {project.image ? (
                                      <img
                                          src={project.image}
                                          alt={project.title}
                                          className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                      />
                                  ) : (
                                      <div className="w-full h-full bg-[#F8FAFC] flex items-center justify-center">
                                          <Briefcase className="w-12 h-12 text-[#E2E8F0]" />
                                      </div>
                                  )}
                                  <div className="absolute top-4 left-4">
                                      <span
                                          className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${project.is_featured ? "bg-[#00B8D4] text-white shadow-lg shadow-[#00B8D4]/20" : "bg-white/90 text-[#212121] backdrop-blur-sm"}`}
                                      >
                                          {project.is_featured
                                              ? "Mis en avant"
                                              : "Standard"}
                                      </span>
                                  </div>
                              </div>

                              <div className="p-8">
                                  <div className="flex items-center text-[10px] font-black text-[#00B8D4] uppercase tracking-widest mb-2">
                                      <Tag className="w-3 h-3 mr-2" />
                                      {project.category?.name ||
                                          "Sans catégorie"}
                                  </div>
                                  <h3 className="text-lg font-black text-[#212121] mb-4 group-hover:text-[#00B8D4] smooth-animation truncate">
                                      {project.title}
                                  </h3>

                                  <div className="space-y-3 mb-8">
                                      <div className="flex items-center text-xs font-medium text-[#757575]">
                                          <MapPin className="w-4 h-4 mr-3 text-[#9E9E9E]" />
                                          {project.location}
                                      </div>
                                      <div className="flex items-center text-xs font-medium text-[#757575]">
                                          <Calendar className="w-4 h-4 mr-3 text-[#9E9E9E]" />
                                          {project.year}
                                      </div>
                                  </div>

                                  <div className="flex items-center justify-between pt-6 border-t border-[#F1F5F9]">
                                      <div className="flex items-center space-x-2">
                                          <button
                                              onClick={() =>
                                                  handleOpenModal(project)
                                              }
                                              className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation"
                                          >
                                              <Edit2 className="w-4 h-4" />
                                          </button>
                                          <button className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-xl smooth-animation">
                                              <Trash2 className="w-4 h-4" />
                                          </button>
                                      </div>
                                      <a
                                          href={`/projects/${project.id}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-emerald-50 hover:text-emerald-600 rounded-xl smooth-animation"
                                      >
                                          <ExternalLink className="w-4 h-4" />
                                      </a>
                                  </div>
                              </div>
                          </motion.div>
                      ))}
            </div>

            {/* Project Modal */}
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
                                className="fixed inset-0 m-auto w-full max-w-4xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
                            >
                                <div className="p-10 flex items-center justify-between border-b border-[#F1F5F9] shrink-0">
                                    <div>
                                        <h2 className="text-2xl font-black text-[#212121]">
                                            {editingProject
                                                ? "Modifier le Projet"
                                                : "Nouveau Projet Portfolio"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Détails de la réalisation
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Titre du Projet
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
                                                placeholder="Ex: Villa Horizon"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Localisation
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.location}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        location:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ville, Pays"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <AlignLeft className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            required
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                            placeholder="Présentation courte du projet..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Année
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.year || ""}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        year: parseInt(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Clock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Durée
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.duration || ""}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        duration:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: 12 mois"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <DollarSign className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Budget
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.budget || ""}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        budget: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: 50M FCFA"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <ImageIcon className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Image Principale
                                            </label>
                                            <div className="w-full h-40 bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-[2rem] flex flex-col items-center justify-center text-[#9E9E9E] hover:border-[#00B8D4] hover:bg-[#00B8D4]/5 smooth-animation cursor-pointer group">
                                                <Plus className="w-8 h-8 mb-2 group-hover:scale-110 smooth-animation" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">
                                                    Ajouter une photo
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-3xl">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className={`w-12 h-6 rounded-full p-1 smooth-animation cursor-pointer ${formData.is_featured ? "bg-[#00B8D4]" : "bg-[#E2E8F0]"}`}
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                is_featured:
                                                                    !formData.is_featured,
                                                            })
                                                        }
                                                    >
                                                        <div
                                                            className={`w-4 h-4 bg-white rounded-full shadow-sm smooth-animation ${formData.is_featured ? "translate-x-6" : "translate-x-0"}`}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-black text-[#212121] uppercase tracking-widest">
                                                        Mettre en avant sur
                                                        l'accueil
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 pt-4 shrink-0">
                                        <button
                                            type="submit"
                                            className="flex-1 flex items-center justify-center py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                                        >
                                            <Save className="w-5 h-5 mr-3" />
                                            Enregistrer le Projet
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
