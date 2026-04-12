import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Briefcase,
    MapPin,
    Calendar,
    Tag,
    Save,
    X,
    Type,
    AlignLeft,
    Image as ImageIcon,
    ExternalLink,
    Clock,
    Users,
    Maximize2,
    Target,
    ShieldCheck,
    Layers,
    Ruler,
    CheckSquare,
    AlertCircle,
    CheckCircle2,
    Minus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ModalPortal from "../../components/ModalPortal";
import ImageUploader from "../../components/ImageUploader";
import { useToast } from "../../services/ToastContext";

interface Metric {
    label: string;
    value: string;
}

interface Challenge {
    title: string;
    desc: string;
    solution: string;
}

interface GalleryItem {
    url: string;
    title: string;
}

interface TechnicalDetails {
    specifications: string[];
    materials: string[];
    standards: string[];
}

interface Project {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    description: string;
    details: string | null;
    location: string;
    year: string | null;
    client_name: string | null;
    category_id: number | null;
    metrics: Metric[] | null;
    challenges: Challenge[] | null;
    technical_details: TechnicalDetails | null;
    gallery: GalleryItem[] | null;
    is_featured: boolean;
    is_published: boolean;
    views: number;
    category?: { name: string };
}

interface ProjectForm {
    title: string;
    description: string;
    details: string;
    location: string;
    year: string;
    client_name: string;
    image: string | null;
    category_id: number | null;
    metrics: Metric[];
    challenges: Challenge[];
    technical_details: TechnicalDetails;
    gallery: GalleryItem[];
    is_featured: boolean;
    is_published: boolean;
}

const emptyForm: ProjectForm = {
    title: "",
    description: "",
    details: "",
    location: "",
    year: String(new Date().getFullYear()),
    client_name: "",
    category_id: null,
    image: null,
    metrics: [{ label: "", value: "" }],
    challenges: [{ title: "", desc: "", solution: "" }],
    technical_details: {
        specifications: [""],
        materials: [""],
        standards: [""],
    },
    gallery: [{ url: "", title: "" }],
    is_featured: false,
    is_published: false,
};

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState<ProjectForm>({ ...emptyForm });
    const [activeTab, setActiveTab] = useState<
        "general" | "metrics" | "challenges" | "technical" | "gallery"
    >("general");

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
            setFormData({
                title: project.title,
                description: project.description,
                details: project.details || "",
                location: project.location,
                year: project.year || String(new Date().getFullYear()),
                client_name: project.client_name || "",
                category_id: project.category_id,
                image: project.image || null,
                metrics: project.metrics?.length
                    ? project.metrics
                    : [{ label: "", value: "" }],
                challenges: project.challenges?.length
                    ? project.challenges
                    : [{ title: "", desc: "", solution: "" }],
                technical_details: project.technical_details || {
                    specifications: [""],
                    materials: [""],
                    standards: [""],
                },
                gallery: project.gallery?.length
                    ? project.gallery
                    : [{ url: "", title: "" }],
                is_featured: project.is_featured,
                is_published: project.is_published,
            });
        } else {
            setEditingProject(null);
            setFormData({ ...emptyForm });
        }
        setActiveTab("general");
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
                                className="fixed inset-0 m-auto w-full max-w-5xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
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

                                {/* Tabs */}
                                <div className="flex border-b border-[#F1F5F9] px-10 shrink-0 overflow-x-auto">
                                    {(
                                        [
                                            {
                                                key: "general",
                                                label: "Général",
                                            },
                                            {
                                                key: "metrics",
                                                label: "Métriques",
                                            },
                                            {
                                                key: "challenges",
                                                label: "Défis & Solutions",
                                            },
                                            {
                                                key: "technical",
                                                label: "Technique",
                                            },
                                            {
                                                key: "gallery",
                                                label: "Galerie",
                                            },
                                        ] as const
                                    ).map((tab) => (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() =>
                                                setActiveTab(tab.key)
                                            }
                                            className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-2 smooth-animation whitespace-nowrap ${
                                                activeTab === tab.key
                                                    ? "border-[#00B8D4] text-[#00B8D4]"
                                                    : "border-transparent text-[#9E9E9E] hover:text-[#212121]"
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <form
                                    onSubmit={handleSave}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar flex-1"
                                >
                                    {/* GENERAL TAB */}
                                    {activeTab === "general" && (
                                        <div className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                        <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                        Titre du Projet
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.title}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                title: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                        placeholder="Ex: Résidence Les Palmiers"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                        <MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                        Localisation
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={
                                                            formData.location
                                                        }
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                location:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                        placeholder="Dakar, Sénégal"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                        <Calendar className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                        Année
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.year}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                year: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                        placeholder="2024"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                        <Users className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                        Nom du Client
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            formData.client_name
                                                        }
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                client_name:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                        placeholder="Groupe Immobilier Dakar"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                        <Tag className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                        Catégorie
                                                    </label>
                                                    <select
                                                        value={
                                                            formData.category_id ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                category_id: e
                                                                    .target
                                                                    .value
                                                                    ? Number(
                                                                          e
                                                                              .target
                                                                              .value,
                                                                      )
                                                                    : null,
                                                            })
                                                        }
                                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                    >
                                                        <option value="">
                                                            Sans catégorie
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                    <AlignLeft className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                    Description Principale
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    required
                                                    value={formData.description}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                                    placeholder="Présentation principale du projet..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                    <AlignLeft className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                    Description Complémentaire
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={formData.details}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            details:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                                    placeholder="Paragraphe complémentaire sur les standards, l'environnement..."
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                        <ImageIcon className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                        Image Principale
                                                    </label>
                                                    <ImageUploader
                                                        value={formData.image}
                                                        onChange={(url) =>
                                                            setFormData({
                                                                ...formData,
                                                                image: url,
                                                            })
                                                        }
                                                        label="Ajouter une photo"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center space-y-4">
                                                    <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-3xl">
                                                        <div className="flex items-center space-x-3">
                                                            <div
                                                                className={`w-12 h-6 rounded-full p-1 smooth-animation cursor-pointer ${formData.is_featured ? "bg-[#00B8D4]" : "bg-[#E2E8F0]"}`}
                                                                onClick={() =>
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            is_featured:
                                                                                !formData.is_featured,
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={`w-4 h-4 bg-white rounded-full shadow-sm smooth-animation ${formData.is_featured ? "translate-x-6" : "translate-x-0"}`}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-black text-[#212121] uppercase tracking-widest">
                                                                Mettre en avant
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-3xl">
                                                        <div className="flex items-center space-x-3">
                                                            <div
                                                                className={`w-12 h-6 rounded-full p-1 smooth-animation cursor-pointer ${formData.is_published ? "bg-emerald-500" : "bg-[#E2E8F0]"}`}
                                                                onClick={() =>
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            is_published:
                                                                                !formData.is_published,
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={`w-4 h-4 bg-white rounded-full shadow-sm smooth-animation ${formData.is_published ? "translate-x-6" : "translate-x-0"}`}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-black text-[#212121] uppercase tracking-widest">
                                                                Publié
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* METRICS TAB */}
                                    {activeTab === "metrics" && (
                                        <div className="space-y-6">
                                            <p className="text-sm text-[#757575] font-medium">
                                                Ajoutez les métriques clés du
                                                projet (Client, Superficie,
                                                Durée, Équipe, etc.)
                                            </p>
                                            {formData.metrics.map(
                                                (metric, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-start gap-4"
                                                    >
                                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                                            <input
                                                                type="text"
                                                                value={
                                                                    metric.label
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...formData.metrics,
                                                                        ];
                                                                    updated[i] =
                                                                        {
                                                                            ...updated[
                                                                                i
                                                                            ],
                                                                            label: e
                                                                                .target
                                                                                .value,
                                                                        };
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            metrics:
                                                                                updated,
                                                                        },
                                                                    );
                                                                }}
                                                                className="w-full px-5 py-3.5 bg-[#F8FAFC] border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                                placeholder="Ex: Superficie"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={
                                                                    metric.value
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...formData.metrics,
                                                                        ];
                                                                    updated[i] =
                                                                        {
                                                                            ...updated[
                                                                                i
                                                                            ],
                                                                            value: e
                                                                                .target
                                                                                .value,
                                                                        };
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            metrics:
                                                                                updated,
                                                                        },
                                                                    );
                                                                }}
                                                                className="w-full px-5 py-3.5 bg-[#F8FAFC] border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                                placeholder="Ex: 25 000 m²"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated =
                                                                    formData.metrics.filter(
                                                                        (
                                                                            _,
                                                                            idx,
                                                                        ) =>
                                                                            idx !==
                                                                            i,
                                                                    );
                                                                setFormData({
                                                                    ...formData,
                                                                    metrics:
                                                                        updated.length
                                                                            ? updated
                                                                            : [
                                                                                  {
                                                                                      label: "",
                                                                                      value: "",
                                                                                  },
                                                                              ],
                                                                });
                                                            }}
                                                            className="p-3 bg-[#F8FAFC] text-[#9E9E9E] hover:bg-red-50 hover:text-red-500 rounded-xl smooth-animation shrink-0 mt-0.5"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        metrics: [
                                                            ...formData.metrics,
                                                            {
                                                                label: "",
                                                                value: "",
                                                            },
                                                        ],
                                                    })
                                                }
                                                className="flex items-center px-5 py-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation text-xs font-black uppercase tracking-widest"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />{" "}
                                                Ajouter une métrique
                                            </button>
                                        </div>
                                    )}

                                    {/* CHALLENGES TAB */}
                                    {activeTab === "challenges" && (
                                        <div className="space-y-8">
                                            <p className="text-sm text-[#757575] font-medium">
                                                Décrivez les défis rencontrés et
                                                les solutions apportées par MAC.
                                            </p>
                                            {formData.challenges.map(
                                                (challenge, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] space-y-4 relative"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated =
                                                                    formData.challenges.filter(
                                                                        (
                                                                            _,
                                                                            idx,
                                                                        ) =>
                                                                            idx !==
                                                                            i,
                                                                    );
                                                                setFormData({
                                                                    ...formData,
                                                                    challenges:
                                                                        updated.length
                                                                            ? updated
                                                                            : [
                                                                                  {
                                                                                      title: "",
                                                                                      desc: "",
                                                                                      solution:
                                                                                          "",
                                                                                  },
                                                                              ],
                                                                });
                                                            }}
                                                            className="absolute top-4 right-4 p-2 text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                        <div className="flex items-start space-x-3">
                                                            <AlertCircle className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                                                            <div className="flex-1 space-y-3">
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        challenge.title
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        const updated =
                                                                            [
                                                                                ...formData.challenges,
                                                                            ];
                                                                        updated[
                                                                            i
                                                                        ] = {
                                                                            ...updated[
                                                                                i
                                                                            ],
                                                                            title: e
                                                                                .target
                                                                                .value,
                                                                        };
                                                                        setFormData(
                                                                            {
                                                                                ...formData,
                                                                                challenges:
                                                                                    updated,
                                                                            },
                                                                        );
                                                                    }}
                                                                    className="w-full px-5 py-3 bg-white border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-black text-[#212121] smooth-animation"
                                                                    placeholder="Titre du défi"
                                                                />
                                                                <textarea
                                                                    rows={2}
                                                                    value={
                                                                        challenge.desc
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        const updated =
                                                                            [
                                                                                ...formData.challenges,
                                                                            ];
                                                                        updated[
                                                                            i
                                                                        ] = {
                                                                            ...updated[
                                                                                i
                                                                            ],
                                                                            desc: e
                                                                                .target
                                                                                .value,
                                                                        };
                                                                        setFormData(
                                                                            {
                                                                                ...formData,
                                                                                challenges:
                                                                                    updated,
                                                                            },
                                                                        );
                                                                    }}
                                                                    className="w-full px-5 py-3 bg-white border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#616161] smooth-animation resize-none"
                                                                    placeholder="Description du problème..."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start space-x-3 pt-4 border-t border-[#E2E8F0]">
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                                                            <textarea
                                                                rows={2}
                                                                value={
                                                                    challenge.solution
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...formData.challenges,
                                                                        ];
                                                                    updated[i] =
                                                                        {
                                                                            ...updated[
                                                                                i
                                                                            ],
                                                                            solution:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        };
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            challenges:
                                                                                updated,
                                                                        },
                                                                    );
                                                                }}
                                                                className="w-full px-5 py-3 bg-white border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none flex-1"
                                                                placeholder="Solution MAC apportée..."
                                                            />
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        challenges: [
                                                            ...formData.challenges,
                                                            {
                                                                title: "",
                                                                desc: "",
                                                                solution: "",
                                                            },
                                                        ],
                                                    })
                                                }
                                                className="flex items-center px-5 py-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation text-xs font-black uppercase tracking-widest"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />{" "}
                                                Ajouter un défi
                                            </button>
                                        </div>
                                    )}

                                    {/* TECHNICAL TAB */}
                                    {activeTab === "technical" && (
                                        <div className="space-y-8">
                                            {/* Specifications */}
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-black text-[#212121] uppercase tracking-widest flex items-center">
                                                    <Ruler className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                    Spécifications Techniques
                                                </h4>
                                                {formData.technical_details.specifications.map(
                                                    (spec, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] shrink-0" />
                                                            <input
                                                                type="text"
                                                                value={spec}
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...formData
                                                                                .technical_details
                                                                                .specifications,
                                                                        ];
                                                                    updated[i] =
                                                                        e.target.value;
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            technical_details:
                                                                                {
                                                                                    ...formData.technical_details,
                                                                                    specifications:
                                                                                        updated,
                                                                                },
                                                                        },
                                                                    );
                                                                }}
                                                                className="flex-1 px-5 py-3 bg-[#F8FAFC] border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                                placeholder="Ex: Structure béton armé haute résistance"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated =
                                                                        formData.technical_details.specifications.filter(
                                                                            (
                                                                                _,
                                                                                idx,
                                                                            ) =>
                                                                                idx !==
                                                                                i,
                                                                        );
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            technical_details:
                                                                                {
                                                                                    ...formData.technical_details,
                                                                                    specifications:
                                                                                        updated.length
                                                                                            ? updated
                                                                                            : [
                                                                                                  "",
                                                                                              ],
                                                                                },
                                                                        },
                                                                    );
                                                                }}
                                                                className="p-2 text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            technical_details: {
                                                                ...formData.technical_details,
                                                                specifications:
                                                                    [
                                                                        ...formData
                                                                            .technical_details
                                                                            .specifications,
                                                                        "",
                                                                    ],
                                                            },
                                                        })
                                                    }
                                                    className="flex items-center px-4 py-2 text-[#616161] hover:text-[#00B8D4] smooth-animation text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    <Plus className="w-3 h-3 mr-1.5" />{" "}
                                                    Ajouter
                                                </button>
                                            </div>

                                            {/* Materials */}
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-black text-[#212121] uppercase tracking-widest flex items-center">
                                                    <Layers className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                    Matériaux Utilisés
                                                </h4>
                                                {formData.technical_details.materials.map(
                                                    (mat, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] shrink-0" />
                                                            <input
                                                                type="text"
                                                                value={mat}
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...formData
                                                                                .technical_details
                                                                                .materials,
                                                                        ];
                                                                    updated[i] =
                                                                        e.target.value;
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            technical_details:
                                                                                {
                                                                                    ...formData.technical_details,
                                                                                    materials:
                                                                                        updated,
                                                                                },
                                                                        },
                                                                    );
                                                                }}
                                                                className="flex-1 px-5 py-3 bg-[#F8FAFC] border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                                placeholder="Ex: Béton haute performance C30/37"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated =
                                                                        formData.technical_details.materials.filter(
                                                                            (
                                                                                _,
                                                                                idx,
                                                                            ) =>
                                                                                idx !==
                                                                                i,
                                                                        );
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            technical_details:
                                                                                {
                                                                                    ...formData.technical_details,
                                                                                    materials:
                                                                                        updated.length
                                                                                            ? updated
                                                                                            : [
                                                                                                  "",
                                                                                              ],
                                                                                },
                                                                        },
                                                                    );
                                                                }}
                                                                className="p-2 text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            technical_details: {
                                                                ...formData.technical_details,
                                                                materials: [
                                                                    ...formData
                                                                        .technical_details
                                                                        .materials,
                                                                    "",
                                                                ],
                                                            },
                                                        })
                                                    }
                                                    className="flex items-center px-4 py-2 text-[#616161] hover:text-[#00B8D4] smooth-animation text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    <Plus className="w-3 h-3 mr-1.5" />{" "}
                                                    Ajouter
                                                </button>
                                            </div>

                                            {/* Standards */}
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-black text-[#212121] uppercase tracking-widest flex items-center">
                                                    <CheckSquare className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                    Normes & Certifications
                                                </h4>
                                                {formData.technical_details.standards.map(
                                                    (std, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] shrink-0" />
                                                            <input
                                                                type="text"
                                                                value={std}
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...formData
                                                                                .technical_details
                                                                                .standards,
                                                                        ];
                                                                    updated[i] =
                                                                        e.target.value;
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            technical_details:
                                                                                {
                                                                                    ...formData.technical_details,
                                                                                    standards:
                                                                                        updated,
                                                                                },
                                                                        },
                                                                    );
                                                                }}
                                                                className="flex-1 px-5 py-3 bg-[#F8FAFC] border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                                placeholder="Ex: Normes parasismiques en vigueur"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated =
                                                                        formData.technical_details.standards.filter(
                                                                            (
                                                                                _,
                                                                                idx,
                                                                            ) =>
                                                                                idx !==
                                                                                i,
                                                                        );
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            technical_details:
                                                                                {
                                                                                    ...formData.technical_details,
                                                                                    standards:
                                                                                        updated.length
                                                                                            ? updated
                                                                                            : [
                                                                                                  "",
                                                                                              ],
                                                                                },
                                                                        },
                                                                    );
                                                                }}
                                                                className="p-2 text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            technical_details: {
                                                                ...formData.technical_details,
                                                                standards: [
                                                                    ...formData
                                                                        .technical_details
                                                                        .standards,
                                                                    "",
                                                                ],
                                                            },
                                                        })
                                                    }
                                                    className="flex items-center px-4 py-2 text-[#616161] hover:text-[#00B8D4] smooth-animation text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    <Plus className="w-3 h-3 mr-1.5" />{" "}
                                                    Ajouter
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* GALLERY TAB */}
                                    {activeTab === "gallery" && (
                                        <div className="space-y-6">
                                            <p className="text-sm text-[#757575] font-medium">
                                                Ajoutez les images de la galerie
                                                du projet avec un titre
                                                descriptif.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {formData.gallery.map(
                                                    (item, i) => (
                                                        <div
                                                            key={i}
                                                            className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] space-y-3 relative"
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated =
                                                                        formData.gallery.filter(
                                                                            (
                                                                                _,
                                                                                idx,
                                                                            ) =>
                                                                                idx !==
                                                                                i,
                                                                        );
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            gallery:
                                                                                updated.length
                                                                                    ? updated
                                                                                    : [
                                                                                          {
                                                                                              url: "",
                                                                                              title: "",
                                                                                          },
                                                                                      ],
                                                                        },
                                                                    );
                                                                }}
                                                                className="absolute top-3 right-3 p-1.5 text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </button>
                                                            <ImageUploader
                                                                value={
                                                                    item.url ||
                                                                    null
                                                                }
                                                                onChange={(
                                                                    url,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...formData.gallery,
                                                                        ];
                                                                    updated[i] =
                                                                        {
                                                                            ...updated[
                                                                                i
                                                                            ],
                                                                            url:
                                                                                url ||
                                                                                "",
                                                                        };
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            gallery:
                                                                                updated,
                                                                        },
                                                                    );
                                                                }}
                                                                label="Image"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={
                                                                    item.title
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...formData.gallery,
                                                                        ];
                                                                    updated[i] =
                                                                        {
                                                                            ...updated[
                                                                                i
                                                                            ],
                                                                            title: e
                                                                                .target
                                                                                .value,
                                                                        };
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            gallery:
                                                                                updated,
                                                                        },
                                                                    );
                                                                }}
                                                                className="w-full px-4 py-3 bg-white border-none rounded-xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-xs font-bold text-[#212121] smooth-animation"
                                                                placeholder="Titre (ex: Vue d'ensemble)"
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        gallery: [
                                                            ...formData.gallery,
                                                            {
                                                                url: "",
                                                                title: "",
                                                            },
                                                        ],
                                                    })
                                                }
                                                className="flex items-center px-5 py-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation text-xs font-black uppercase tracking-widest"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />{" "}
                                                Ajouter une image
                                            </button>
                                        </div>
                                    )}

                                    {/* Save / Cancel */}
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
