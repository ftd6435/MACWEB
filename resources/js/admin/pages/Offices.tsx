import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalPortal from "../../components/ModalPortal";
import ConfirmDialog from "../../components/ConfirmDialog";
import ImageUploader from "../../components/ImageUploader";
import { useToast } from "../../services/ToastContext";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Save,
    X,
    MapPin,
    Building2,
    Phone,
    Mail,
    CheckCircle,
    XCircle,
} from "lucide-react";
import axios from "axios";

interface Office {
    id: number;
    name: string;
    city: string;
    country: string;
    address: string;
    phone: string | null;
    email: string | null;
    image: string | null;
    is_headquarters: boolean;
    map_lat: string | number | null;
    map_lng: string | number | null;
    is_active: boolean;
    order: number;
}

export default function AdminOffices() {
    const { toast } = useToast();
    const [offices, setOffices] = useState<Office[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffice, setEditingOffice] = useState<Office | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Office | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<Office>>({
        name: "",
        city: "",
        country: "",
        address: "",
        phone: "",
        email: "",
        image: null,
        is_headquarters: false,
        map_lat: null,
        map_lng: null,
        is_active: true,
        order: 0,
    });

    const fetchOffices = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/admin/offices");
            setOffices(res.data || []);
        } catch {
            toast("Impossible de charger les bureaux", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOffices();
    }, []);

    const filteredOffices = useMemo(() => {
        const t = searchTerm.trim().toLowerCase();
        const list = offices.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        if (!t) return list;
        return list.filter((o) => {
            const hay = `${o.name} ${o.city} ${o.country} ${o.address}`.toLowerCase();
            return hay.includes(t);
        });
    }, [offices, searchTerm]);

    const openModal = (office: Office | null = null) => {
        if (office) {
            setEditingOffice(office);
            setFormData(office);
        } else {
            setEditingOffice(null);
            setFormData({
                name: "",
                city: "",
                country: "",
                address: "",
                phone: "",
                email: "",
                image: null,
                is_headquarters: false,
                map_lat: null,
                map_lng: null,
                is_active: true,
                order: filteredOffices.length,
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            const payload = {
                name: formData.name,
                city: formData.city,
                country: formData.country,
                address: formData.address,
                phone: formData.phone || null,
                email: formData.email || null,
                image: formData.image || null,
                is_headquarters: formData.is_headquarters ?? false,
                map_lat: formData.map_lat !== "" ? formData.map_lat : null,
                map_lng: formData.map_lng !== "" ? formData.map_lng : null,
                is_active: formData.is_active ?? true,
                order: formData.order ?? 0,
            };

            if (editingOffice) {
                await axios.put(`/api/admin/offices/${editingOffice.id}`, payload);
            } else {
                await axios.post("/api/admin/offices", payload);
            }

            await fetchOffices();
            setIsModalOpen(false);
            toast(editingOffice ? "Bureau mis à jour" : "Bureau créé");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.name?.[0] ||
                err.response?.data?.errors?.city?.[0] ||
                err.response?.data?.errors?.country?.[0] ||
                err.response?.data?.errors?.address?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/offices/${pendingDelete.id}`);
            await fetchOffices();
            setPendingDelete(null);
            toast("Bureau supprimé");
        } catch {
            toast("Échec de la suppression", "error");
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Nos Bureaux
                    </h1>
                    <p className="text-[#757575] font-medium mt-2">
                        Gérer les bureaux affichés sur la page Contact.
                    </p>
                </div>
                <button
                    onClick={() => openModal(null)}
                    className="flex items-center px-8 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-5 h-5 mr-3" />
                    Nouveau Bureau
                </button>
            </header>

            <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-sm overflow-hidden">
                <div className="p-8 border-b border-[#F1F5F9] flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Rechercher un bureau..."
                            className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                        />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">
                        {filteredOffices.length} éléments
                    </div>
                </div>

                <div className="p-8">
                    {isLoading ? (
                        <div className="py-16 text-center text-sm font-bold text-[#9E9E9E]">
                            Chargement...
                        </div>
                    ) : filteredOffices.length === 0 ? (
                        <div className="py-16 text-center text-sm font-bold text-[#9E9E9E]">
                            Aucun bureau trouvé
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredOffices.map((o) => (
                                <div
                                    key={o.id}
                                    className="bg-white border border-[#F1F5F9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-animation"
                                >
                                    <div className="h-40 bg-[#F8FAFC] border-b border-[#F1F5F9] relative overflow-hidden">
                                        {o.image ? (
                                            <img
                                                src={o.image}
                                                alt={o.city}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                                Image manquante
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 flex items-center gap-2">
                                            {o.is_headquarters && (
                                                <span className="px-3 py-1 rounded-full bg-white/90 text-[#212121] text-[10px] font-black uppercase tracking-widest">
                                                    Siège
                                                </span>
                                            )}
                                            {!o.is_active && (
                                                <span className="px-3 py-1 rounded-full bg-white/90 text-[#212121] text-[10px] font-black uppercase tracking-widest">
                                                    Désactivé
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="text-sm font-black text-[#212121] leading-snug">
                                                    {o.name}
                                                </p>
                                                <p className="text-xs font-bold text-[#616161] mt-1">
                                                    {o.city}, {o.country}
                                                </p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mt-3">
                                                    Ordre: {o.order ?? 0}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-1 shrink-0">
                                                <button
                                                    onClick={() => openModal(o)}
                                                    className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setPendingDelete(o)}
                                                    className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-4 border-t border-[#F1F5F9]">
                                            <p className="flex items-start text-xs font-bold text-[#616161]">
                                                <MapPin className="w-4 h-4 mr-3 text-[#9E9E9E] mt-0.5 shrink-0" />
                                                <span className="leading-relaxed">
                                                    {o.address}
                                                </span>
                                            </p>
                                            {o.phone && (
                                                <p className="flex items-center text-xs font-bold text-[#616161]">
                                                    <Phone className="w-4 h-4 mr-3 text-[#9E9E9E]" />
                                                    {o.phone}
                                                </p>
                                            )}
                                            {o.email && (
                                                <p className="flex items-center text-xs font-bold text-[#616161]">
                                                    <Mail className="w-4 h-4 mr-3 text-[#9E9E9E]" />
                                                    {o.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

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
                                            {editingOffice
                                                ? "Modifier le bureau"
                                                : "Nouveau bureau"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Informations de localisation
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
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Nom *
                                            </label>
                                            <div className="relative">
                                                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                                                <input
                                                    required
                                                    value={formData.name || ""}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                    className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Ordre
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.order ?? 0}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        order: Number(e.target.value),
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Ville *
                                            </label>
                                            <input
                                                required
                                                value={formData.city || ""}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        city: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Pays *
                                            </label>
                                            <input
                                                required
                                                value={formData.country || ""}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        country: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Adresse *
                                        </label>
                                        <textarea
                                            required
                                            value={formData.address || ""}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    address: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold min-h-[120px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Téléphone
                                            </label>
                                            <input
                                                value={formData.phone || ""}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email || ""}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Latitude
                                            </label>
                                            <input
                                                value={
                                                    formData.map_lat !== null &&
                                                    formData.map_lat !== undefined
                                                        ? String(formData.map_lat)
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        map_lat: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Longitude
                                            </label>
                                            <input
                                                value={
                                                    formData.map_lng !== null &&
                                                    formData.map_lng !== undefined
                                                        ? String(formData.map_lng)
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        map_lng: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Image
                                        </label>
                                        <ImageUploader
                                            value={formData.image ? String(formData.image) : null}
                                            onChange={(url) =>
                                                setFormData({ ...formData, image: url })
                                            }
                                            label="Changer l'image"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    is_headquarters:
                                                        !(formData.is_headquarters ?? false),
                                                })
                                            }
                                            className={`flex items-center justify-between px-6 py-4 rounded-2xl border smooth-animation ${
                                                formData.is_headquarters
                                                    ? "bg-[#E0F7FA] border-[#B2EBF2]"
                                                    : "bg-[#F8FAFC] border-[#E2E8F0]"
                                            }`}
                                        >
                                            <span className="text-xs font-black uppercase tracking-widest text-[#212121]">
                                                Siège Social
                                            </span>
                                            {formData.is_headquarters ? (
                                                <CheckCircle className="w-5 h-5 text-[#00B8D4]" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-[#9E9E9E]" />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    is_active: !(formData.is_active ?? true),
                                                })
                                            }
                                            className={`flex items-center justify-between px-6 py-4 rounded-2xl border smooth-animation ${
                                                formData.is_active
                                                    ? "bg-[#E0F7FA] border-[#B2EBF2]"
                                                    : "bg-[#F8FAFC] border-[#E2E8F0]"
                                            }`}
                                        >
                                            <span className="text-xs font-black uppercase tracking-widest text-[#212121]">
                                                Actif
                                            </span>
                                            {formData.is_active ? (
                                                <CheckCircle className="w-5 h-5 text-[#00B8D4]" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-[#9E9E9E]" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex items-center space-x-4 pt-2 shrink-0">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="flex-1 flex items-center justify-center py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                                        >
                                            {isSaving ? (
                                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Save className="w-5 h-5 mr-3" />
                                                    Enregistrer
                                                </>
                                            )}
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
                title="Supprimer le bureau ?"
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

