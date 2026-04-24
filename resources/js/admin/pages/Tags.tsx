import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ModalPortal from "../../components/ModalPortal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToast } from "../../services/ToastContext";
import { Plus, Search, Edit2, Trash2, X, Save, Tag } from "lucide-react";

type TagItem = {
    id: number;
    name: string;
    slug: string;
    articles_count?: number;
};

type TagForm = {
    name: string;
};

export default function AdminTags() {
    const [tags, setTags] = useState<TagItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<TagItem | null>(null);
    const [pendingDelete, setPendingDelete] = useState<TagItem | null>(null);
    const [formData, setFormData] = useState<TagForm>({ name: "" });
    const { toast } = useToast();

    const fetchTags = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/tags");
            setTags(response.data || []);
        } catch (err: any) {
            const msg = err.response?.data?.message || "Impossible de charger les tags";
            toast(msg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return tags;
        return tags.filter((t) => t.name.toLowerCase().includes(q));
    }, [tags, searchTerm]);

    const openModal = (tag: TagItem | null = null) => {
        if (tag) {
            setEditingTag(tag);
            setFormData({ name: tag.name });
        } else {
            setEditingTag(null);
            setFormData({ name: "" });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");
            const payload = { name: formData.name };
            if (editingTag) {
                await axios.put(`/api/tags/${editingTag.id}`, payload);
            } else {
                await axios.post("/api/tags", payload);
            }
            await fetchTags();
            setIsModalOpen(false);
            toast(editingTag ? "Tag mis à jour" : "Tag créé");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.name?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const handleDelete = async (tag: TagItem) => {
        setPendingDelete(tag);
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/tags/${pendingDelete.id}`);
            await fetchTags();
            toast("Tag supprimé");
            setPendingDelete(null);
        } catch (err: any) {
            const msg = err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Tags
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {tags.length} tags
                    </p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouveau Tag
                </button>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
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
                                        <th className="px-8 py-6">Tag</th>
                                        <th className="px-8 py-6">Slug</th>
                                        <th className="px-8 py-6">Utilisation</th>
                                        <th className="px-8 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1F5F9]">
                                    {filtered.map((t) => (
                                        <tr
                                            key={t.id}
                                            className="hover:bg-[#F8FAFC]/50 smooth-animation group"
                                        >
                                            <td className="px-8 py-6">
                                                <p className="font-black text-[#212121] text-sm">
                                                    {t.name}
                                                </p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-xs font-bold text-[#9E9E9E]">
                                                    {t.slug}
                                                </p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs font-black text-[#212121]">
                                                    {t.articles_count || 0}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => openModal(t)}
                                                        className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-xl smooth-animation"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(t)}
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
                                className="fixed inset-0 m-auto w-full max-w-xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
                            >
                                <div className="p-10 flex items-center justify-between border-b border-[#F1F5F9] shrink-0">
                                    <div>
                                        <h2 className="text-2xl font-black text-[#212121]">
                                            {editingTag ? "Modifier le Tag" : "Nouveau Tag"}
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
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ name: e.target.value })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
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
                title="Supprimer le tag ?"
                message={
                    pendingDelete ? `Cette action supprimera "${pendingDelete.name}".` : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingDelete(null)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
