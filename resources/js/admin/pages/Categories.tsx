import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ModalPortal from "../../components/ModalPortal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToast } from "../../services/ToastContext";
import { Plus, Search, Edit2, Trash2, X, Save, Layers } from "lucide-react";

type CategoryType = "general" | "article" | "project";

type Category = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    type: CategoryType;
    articles_count?: number;
    projects_count?: number;
};

type CategoryForm = {
    name: string;
    description: string;
    type: CategoryType;
};

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<"all" | CategoryType>("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Category | null>(null);
    const [formData, setFormData] = useState<CategoryForm>({
        name: "",
        description: "",
        type: "article",
    });

    const { toast } = useToast();

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const url =
                typeFilter === "all"
                    ? "/api/categories"
                    : `/api/categories?type=${typeFilter}`;
            const response = await axios.get(url);
            setCategories(response.data || []);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Impossible de charger les catégories";
            toast(msg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [typeFilter]);

    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return categories;
        return categories.filter((c) => c.name.toLowerCase().includes(q));
    }, [categories, searchTerm]);

    const openModal = (category: Category | null = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                description: category.description || "",
                type: category.type || "general",
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: "",
                description: "",
                type: typeFilter === "all" ? "article" : typeFilter,
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");
            const payload = {
                name: formData.name,
                description: formData.description || null,
                type: formData.type,
            };

            if (editingCategory) {
                await axios.put(`/api/categories/${editingCategory.id}`, payload);
            } else {
                await axios.post("/api/categories", payload);
            }

            setIsModalOpen(false);
            toast(editingCategory ? "Catégorie mise à jour" : "Catégorie créée");
            if (typeFilter !== "all" && typeFilter !== formData.type) {
                setTypeFilter(formData.type);
            } else {
                await fetchCategories();
            }
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.name?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const handleDelete = async (category: Category) => {
        setPendingDelete(category);
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/categories/${pendingDelete.id}`);
            await fetchCategories();
            toast("Catégorie supprimée");
            setPendingDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Catégories
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Layers className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {categories.length} catégories
                    </p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouvelle Catégorie
                </button>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher une catégorie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
                </div>
                <div className="flex items-center gap-3">
                    {(["all", "article", "project", "general"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTypeFilter(t)}
                            className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border smooth-animation ${
                                typeFilter === t
                                    ? "bg-[#212121] text-white border-[#212121] shadow-lg shadow-[#212121]/10"
                                    : "bg-white text-[#616161] border-[#E2E8F0] hover:border-[#00B8D4] hover:text-[#00B8D4]"
                            }`}
                        >
                            {t === "all" ? "Tous" : t}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white h-20 rounded-[2rem] border border-[#F1F5F9] animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-[0.2em] bg-[#F8FAFC]">
                                        <th className="px-8 py-6">Catégorie</th>
                                        <th className="px-8 py-6">Type</th>
                                        <th className="px-8 py-6">Utilisation</th>
                                        <th className="px-8 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1F5F9]">
                                    {filtered.map((c) => (
                                        <tr
                                            key={c.id}
                                            className="hover:bg-[#F8FAFC]/50 smooth-animation group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="min-w-0">
                                                        <p className="font-black text-[#212121] text-sm leading-tight truncate">
                                                            {c.name}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-[#9E9E9E] uppercase tracking-widest truncate">
                                                            {c.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#00B8D4]/10 text-[#00B8D4]">
                                                    {c.type || "general"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs font-black text-[#212121]">
                                                    {(c.articles_count || 0) +
                                                        (c.projects_count || 0)}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => openModal(c)}
                                                        className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(c)}
                                                        className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-xl smooth-animation"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </AnimatePresence>

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
                                            {editingCategory
                                                ? "Modifier la Catégorie"
                                                : "Nouvelle Catégorie"}
                                        </h2>
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
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Nom
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
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Type
                                            </label>
                                            <select
                                                value={formData.type}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        type: e.target
                                                            .value as CategoryType,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            >
                                                <option value="article">article</option>
                                                <option value="project">project</option>
                                                <option value="general">general</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
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
            </ModalPortal>

            <ConfirmDialog
                open={!!pendingDelete}
                title="Supprimer la catégorie ?"
                message={
                    pendingDelete
                        ? `Cette action supprimera "${pendingDelete.name}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingDelete(null)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
