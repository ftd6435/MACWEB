import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Plus,
    Edit2,
    Trash2,
    Briefcase,
    Save,
    X,
    Search,
    MapPin,
    Calendar,
    CheckCircle2,
    Mail,
} from "lucide-react";
import axios from "axios";
import ModalPortal from "../../components/ModalPortal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToast } from "../../services/ToastContext";

type JobListing = {
    id: number;
    title: string;
    department: string | null;
    location: string | null;
    contract_type: string | null;
    description: string;
    requirements: string[] | null;
    responsibilities: string[] | null;
    is_active: boolean;
    is_featured: boolean;
    published_at: string | null;
    expires_at: string | null;
    applications_count?: number;
    created_at?: string;
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

const listToText = (list: string[] | null | undefined) =>
    Array.isArray(list) ? list.join("\n") : "";

const textToList = (text: string) =>
    text
        .split(/\r?\n/g)
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

export default function AdminJobListings() {
    const { toast } = useToast();
    const [items, setItems] = useState<JobListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [pendingDelete, setPendingDelete] = useState<JobListing | null>(null);
    const [pendingRejectionEmail, setPendingRejectionEmail] =
        useState<JobListing | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<JobListing | null>(null);
    const [formData, setFormData] = useState<Partial<JobListing>>({
        title: "",
        department: "",
        location: "",
        contract_type: "CDI",
        description: "",
        requirements: [],
        responsibilities: [],
        is_active: true,
        is_featured: false,
        published_at: "",
        expires_at: "",
    });
    const [requirementsText, setRequirementsText] = useState("");
    const [responsibilitiesText, setResponsibilitiesText] = useState("");

    const load = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/admin/job-listings");
            setItems(res.data || []);
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                "Impossible de charger les offres";
            toast(msg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return items;
        return items.filter((j) => {
            const hay = [
                j.title,
                j.department || "",
                j.location || "",
                j.contract_type || "",
            ]
                .join(" ")
                .toLowerCase();
            return hay.includes(q);
        });
    }, [items, search]);

    const openModal = (job: JobListing | null = null) => {
        if (job) {
            setEditing(job);
            setFormData({
                ...job,
                published_at: job.published_at
                    ? String(job.published_at).slice(0, 10)
                    : "",
                expires_at: job.expires_at ? String(job.expires_at).slice(0, 10) : "",
            });
            setRequirementsText(listToText(job.requirements));
            setResponsibilitiesText(listToText(job.responsibilities));
        } else {
            setEditing(null);
            setFormData({
                title: "",
                department: "",
                location: "",
                contract_type: "CDI",
                description: "",
                requirements: [],
                responsibilities: [],
                is_active: true,
                is_featured: false,
                published_at: "",
                expires_at: "",
            });
            setRequirementsText("");
            setResponsibilitiesText("");
        }
        setIsModalOpen(true);
    };

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");

            const title = String(formData.title || "").trim();

            const payload = {
                title,
                department: String(formData.department || "").trim() || null,
                location: String(formData.location || "").trim() || null,
                contract_type: String(formData.contract_type || "").trim() || null,
                description: String(formData.description || "").trim(),
                requirements: textToList(requirementsText),
                responsibilities: textToList(responsibilitiesText),
                is_active: !!formData.is_active,
                is_featured: !!formData.is_featured,
                published_at:
                    String(formData.published_at || "").trim() || null,
                expires_at: String(formData.expires_at || "").trim() || null,
            };

            if (editing) {
                await axios.put(`/api/admin/job-listings/${editing.id}`, payload);
            } else {
                await axios.post("/api/admin/job-listings", payload);
            }

            await load();
            setIsModalOpen(false);
            toast(editing ? "Offre mise à jour" : "Offre créée");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.title?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/job-listings/${pendingDelete.id}`);
            await load();
            toast("Offre supprimée");
            setPendingDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const confirmSendRejections = async () => {
        if (!pendingRejectionEmail) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post(
                `/api/admin/job-listings/${pendingRejectionEmail.id}/send-rejection-emails`,
                {},
            );
            const queued = Number(res.data?.queued || 0);
            const msg =
                res.data?.message ||
                (queued > 0
                    ? `${queued} email(s) de rejet envoyé(s).`
                    : "Aucune candidature rejetée à notifier.");
            toast(msg);
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                "Impossible d'envoyer les emails de rejet";
            toast(msg, "error");
        } finally {
            setPendingRejectionEmail(null);
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Offres d’Emploi
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {items.length} offres
                    </p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouvelle Offre
                </button>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-40 bg-white rounded-[2.5rem] border border-[#F1F5F9] animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filtered.map((job, idx) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-animation p-8"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div className="min-w-0">
                                    <h3 className="text-lg font-black text-[#212121] truncate">
                                        {job.title}
                                    </h3>
                                </div>
                                <div className="flex items-center space-x-2 shrink-0">
                                    <button
                                        onClick={() =>
                                            setPendingRejectionEmail(job)
                                        }
                                        className="p-3 bg-[#F8FAFC] text-[#616161] hover:text-[#00B8D4] rounded-2xl smooth-animation"
                                        title="Envoyer email de rejet aux candidatures rejetées"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => openModal(job)}
                                        className="p-3 bg-[#F8FAFC] text-[#616161] hover:text-[#00B8D4] rounded-2xl smooth-animation"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setPendingDelete(job)}
                                        className="p-3 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                {job.department && (
                                    <span className="flex items-center">
                                        <Briefcase className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                        {job.department}
                                    </span>
                                )}
                                {job.location && (
                                    <span className="flex items-center">
                                        <MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                        {job.location}
                                    </span>
                                )}
                                {job.published_at && (
                                    <span className="flex items-center">
                                        <Calendar className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                        {String(job.published_at).slice(0, 10)}
                                    </span>
                                )}
                                <span className="flex items-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                    {job.is_active ? "Actif" : "Inactif"}
                                </span>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-xs font-black text-[#616161]">
                                    {job.contract_type || "—"}
                                </div>
                                <div className="text-xs font-black text-[#616161]">
                                    {job.applications_count ?? 0} candidatures
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setPendingRejectionEmail(job)}
                                className="mt-6 w-full flex items-center justify-center px-6 py-4 bg-white border border-[#E2E8F0] text-[#616161] rounded-2xl hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation font-black text-[10px] uppercase tracking-widest"
                            >
                                <Mail className="w-4 h-4 mr-3" />
                                Envoyer les emails de rejet
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

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
                                className="fixed inset-0 m-auto w-full max-w-3xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
                            >
                                <div className="p-10 flex items-center justify-between border-b border-[#F1F5F9] shrink-0">
                                    <div>
                                        <h2 className="text-2xl font-black text-[#212121]">
                                            {editing
                                                ? "Modifier l’offre"
                                                : "Nouvelle offre"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Carrières / Offres d’emploi
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
                                    onSubmit={save}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Titre
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title || ""}
                                            onChange={(e) => {
                                                const v = e.target.value;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    title: v,
                                                }));
                                            }}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Département
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.department || ""}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        department:
                                                            e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: Ingénierie"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Localisation
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.location || ""}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        location:
                                                            e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: Conakry, Guinée"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Contrat
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.contract_type || ""}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        contract_type:
                                                            e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: CDI"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Description
                                        </label>
                                        <textarea
                                            required
                                            value={formData.description || ""}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[140px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Exigences (1 ligne = 1 item)
                                            </label>
                                            <textarea
                                                value={requirementsText}
                                                onChange={(e) =>
                                                    setRequirementsText(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[160px]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Responsabilités (1 ligne = 1 item)
                                            </label>
                                            <textarea
                                                value={responsibilitiesText}
                                                onChange={(e) =>
                                                    setResponsibilitiesText(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[160px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Publié le
                                            </label>
                                            <input
                                                type="date"
                                                value={
                                                    String(
                                                        formData.published_at ||
                                                            "",
                                                    ) || ""
                                                }
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        published_at:
                                                            e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Expire le
                                            </label>
                                            <input
                                                type="date"
                                                value={
                                                    String(
                                                        formData.expires_at ||
                                                            "",
                                                    ) || ""
                                                }
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        expires_at:
                                                            e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <label className="inline-flex items-center space-x-3 px-6 py-4 bg-[#F8FAFC] rounded-2xl">
                                            <input
                                                type="checkbox"
                                                checked={!!formData.is_active}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        is_active:
                                                            e.target.checked,
                                                    }))
                                                }
                                                className="h-4 w-4"
                                            />
                                            <span className="text-xs font-black uppercase tracking-widest text-[#212121]">
                                                Active
                                            </span>
                                        </label>
                                        <label className="inline-flex items-center space-x-3 px-6 py-4 bg-[#F8FAFC] rounded-2xl">
                                            <input
                                                type="checkbox"
                                                checked={!!formData.is_featured}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        is_featured:
                                                            e.target.checked,
                                                    }))
                                                }
                                                className="h-4 w-4"
                                            />
                                            <span className="text-xs font-black uppercase tracking-widest text-[#212121]">
                                                Featured
                                            </span>
                                        </label>
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
                title="Supprimer l’offre ?"
                message={
                    pendingDelete
                        ? `Cette action supprimera "${pendingDelete.title}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingDelete(null)}
                onConfirm={confirmDelete}
            />

            <ConfirmDialog
                open={!!pendingRejectionEmail}
                title="Envoyer les emails de rejet ?"
                message={
                    pendingRejectionEmail
                        ? `Cette action enverra un email aux candidatures rejetées pour "${pendingRejectionEmail.title}".`
                        : ""
                }
                confirmText="Envoyer"
                cancelText="Annuler"
                onCancel={() => setPendingRejectionEmail(null)}
                onConfirm={confirmSendRejections}
            />
        </div>
    );
}
