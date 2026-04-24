import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Inbox,
    Search,
    Filter,
    MoreHorizontal,
    Trash2,
    Mail,
    Phone,
    User,
    Calendar,
    MessageSquare,
    CheckCircle,
    X,
    Eye,
    Clock,
    Tag,
    ArrowRight,
    MapPin,
    Building2,
    Briefcase
} from "lucide-react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../../services/ToastContext";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModalPortal from "../../components/ModalPortal";

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    status: string;
    admin_notes?: string | null;
    created_at: string;
    source: "contact" | "career" | "partnership";
    resume_url?: string | null;
}

export default function AdminLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [activeTab, setActiveTab] = useState<Lead["source"]>("contact");
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [pendingDelete, setPendingDelete] = useState<Lead | null>(null);
    const { toast } = useToast();

    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false);
    const [emailForm, setEmailForm] = useState<{
        to: string;
        subject: string;
        body: string;
    }>({ to: "", subject: "", body: "" });

    const downloadResume = async (lead: Lead) => {
        if (!lead.resume_url) return;
        try {
            const res = await axios.get(lead.resume_url, {
                responseType: "blob",
            });

            const disposition =
                (res.headers?.["content-disposition"] as string | undefined) ||
                (res.headers?.["Content-Disposition"] as string | undefined);

            let filename = `cv-${lead.id}`;
            if (disposition) {
                const utfMatch = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
                const plainMatch = disposition.match(/filename\s*=\s*"?([^";]+)"?/i);
                const raw = (utfMatch?.[1] || plainMatch?.[1] || "").trim();
                if (raw) {
                    try {
                        filename = decodeURIComponent(raw);
                    } catch {
                        filename = raw;
                    }
                }
            }

            const blob = new Blob([res.data], {
                type: res.data?.type || "application/octet-stream",
            });
            const objectUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = objectUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(objectUrl);
        } catch (err: any) {
            const status = err.response?.status as number | undefined;
            const data = err.response?.data;

            let msg = "Impossible de télécharger le CV";
            if (status === 401) msg = "Session expirée. Reconnectez-vous.";
            if (status === 403) msg = "Accès refusé.";
            if (status === 404) msg = "CV introuvable.";

            if (data instanceof Blob) {
                try {
                    const text = await data.text();
                    const parsed = JSON.parse(text);
                    if (parsed?.message) msg = String(parsed.message);
                } catch {
                    // ignore
                }
            } else if (typeof data?.message === "string") {
                msg = data.message;
            }

            toast(msg, "error");
        }
    };

    const draftEmailForLead = (lead: Lead) => {
        const isCareer = lead.source === "career";
        const cleanSubject = String(lead.subject || "").replace(
            /^Candidature\s*-\s*/i,
            "",
        );
        const subject = isCareer
            ? `Suite à votre candidature — ${cleanSubject || "MAC"}`
            : `Suite à votre demande — ${lead.subject || "MAC"}`;

        const greeting = lead.name ? `Bonjour ${lead.name},` : "Bonjour,";
        const body = isCareer
            ? `${greeting}\n\nMerci pour votre candidature. Nous revenons vers vous concernant votre dossier.\n\nCordialement,\nÉquipe RH`
            : `${greeting}\n\nMerci pour votre message. Nous revenons vers vous dans les plus brefs délais.\n\nCordialement,\nÉquipe MAC`;

        setEmailForm({ to: lead.email, subject, body });
        setIsEmailModalOpen(true);
    };

    const sendEmail = async () => {
        if (!selectedLead) return;
        const to = emailForm.to.trim();
        const subject = emailForm.subject.trim();
        const body = emailForm.body.trim();

        if (!to || !subject || !body) {
            toast(
                "Veuillez renseigner le destinataire, l’objet et le message.",
                "error",
            );
            return;
        }

        setIsEmailSending(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/api/admin/leads/send-email", {
                source: selectedLead.source,
                id: selectedLead.id,
                to,
                subject,
                body,
            });
            toast("Email envoyé");
            setIsEmailModalOpen(false);
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.to?.[0] ||
                err.response?.data?.errors?.subject?.[0] ||
                err.response?.data?.errors?.body?.[0] ||
                "Impossible d'envoyer l'email";
            toast(msg, "error");
        } finally {
            setIsEmailSending(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab === "contact" || tab === "career" || tab === "partnership") {
            setActiveTab(tab);
        }
    }, [searchParams]);

    useEffect(() => {
        setFilterStatus("all");
        setSelectedLead(null);
    }, [activeTab]);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const [contactsRes, jobsRes, partnershipsRes] = await Promise.all([
                axios.get("/api/admin/contacts"),
                axios.get("/api/admin/job-applications"),
                axios.get("/api/admin/partnerships"),
            ]);

            const contacts = (contactsRes.data.data || []).map((c: any) => ({
                id: c.id,
                name: c.name,
                email: c.email,
                phone: c.phone || null,
                subject: [
                    "Contact",
                    c.project_type ? c.project_type : null,
                    c.project_location ? c.project_location : null,
                ]
                    .filter(Boolean)
                    .join(" - "),
                message: c.message,
                status: c.status,
                created_at: c.created_at,
                source: "contact" as const,
            }));

            const jobs = (jobsRes.data.data || []).map((a: any) => ({
                id: a.id,
                name: a.name,
                email: a.email,
                phone: a.phone || null,
                subject:
                    a.job_listing?.title
                        ? `Candidature - ${a.job_listing.title}`
                        : a.position
                          ? `Candidature - ${a.position}`
                          : "Candidature",
                message: a.cover_letter || "",
                status: a.status,
                admin_notes: a.admin_notes || null,
                created_at: a.created_at,
                source: "career" as const,
                resume_url: a.resume_path
                    ? `/api/admin/job-applications/${a.id}/resume`
                    : null,
            }));

            const partnerships = (partnershipsRes.data.data || []).map((p: any) => ({
                id: p.id,
                name: p.contact_person || p.company_name,
                email: p.email,
                phone: p.phone || null,
                subject: [
                    "Partenariat",
                    p.partnership_type ? p.partnership_type : null,
                    p.company_name ? `(${p.company_name})` : null,
                ]
                    .filter(Boolean)
                    .join(" "),
                message: p.message,
                status: p.status,
                created_at: p.created_at,
                source: "partnership" as const,
            }));

            const merged = [...contacts, ...jobs, ...partnerships].sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
            );

            setLeads(merged);
            setSelectedLead((prev) =>
                prev ? merged.find((l) => l.id === prev.id && l.source === prev.source) || null : null,
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                "Impossible de charger les demandes";
            toast(msg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const sourceLabel = (source: Lead["source"]) => {
        if (source === "contact") return "Contacts";
        if (source === "career") return "Candidatures";
        return "Partenariats";
    };

    const tabLeads = leads.filter((l) => l.source === activeTab);

    const unreadCounts = {
        contact: leads.filter((l) => l.source === "contact" && l.status === "new")
            .length,
        career: leads.filter((l) => l.source === "career" && l.status === "new")
            .length,
        partnership: leads.filter(
            (l) => l.source === "partnership" && l.status === "new",
        ).length,
    };

    const filteredLeads = tabLeads.filter(
        (l) =>
            (l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                l.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterStatus === "all" || l.status === filterStatus),
    );

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'read': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'reviewed': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'invited_interview': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'interviewed': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'replied': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'shortlisted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'hired': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
            case 'rejected_after_interview': return 'bg-red-50 text-red-700 border-red-100';
            case 'archived': return 'bg-gray-50 text-gray-600 border-gray-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "new":
                return "Nouveau";
            case "read":
                return "Lu";
            case "reviewed":
                return "En cours";
            case "invited_interview":
                return "Entretien planifié";
            case "interviewed":
                return "Entretien réalisé";
            case "replied":
                return "Répondu";
            case "accepted":
                return "Accepté";
            case "archived":
                return "Archivé";
            case "rejected":
                return "Rejeté";
            case "rejected_after_interview":
                return "Rejeté après entretien";
            case "hired":
                return "Embauché";
            default:
                return status;
        }
    };

    const updateStatus = async (
        lead: Lead,
        status: string,
        admin_notes?: string | null,
    ) => {
        try {
            await axios.get("/sanctum/csrf-cookie");
            if (lead.source === "contact") {
                await axios.put(`/api/admin/contacts/${lead.id}`, { status });
            } else if (lead.source === "career") {
                await axios.put(`/api/admin/job-applications/${lead.id}`, {
                    status,
                    admin_notes,
                });
            } else {
                await axios.put(`/api/admin/partnerships/${lead.id}`, { status });
            }
            setLeads((prev) =>
                prev.map((l) =>
                    l.id === lead.id && l.source === lead.source
                        ? { ...l, status, admin_notes: admin_notes ?? l.admin_notes ?? null }
                        : l,
                ),
            );
            setSelectedLead((prev) =>
                prev && prev.id === lead.id && prev.source === lead.source
                    ? { ...prev, status, admin_notes: admin_notes ?? prev.admin_notes ?? null }
                    : prev,
            );
            toast("Statut mis à jour");
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la mise à jour";
            toast(msg, "error");
        }
    };

    const careerStatuses = [
        "new",
        "reviewed",
        "invited_interview",
        "interviewed",
        "rejected",
        "rejected_after_interview",
        "hired",
    ] as const;

    const deleteLead = async (lead: Lead) => {
        setPendingDelete(lead);
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            if (pendingDelete.source === "contact") {
                await axios.delete(`/api/admin/contacts/${pendingDelete.id}`);
            } else if (pendingDelete.source === "career") {
                await axios.delete(
                    `/api/admin/job-applications/${pendingDelete.id}`,
                );
            } else {
                await axios.delete(
                    `/api/admin/partnerships/${pendingDelete.id}`,
                );
            }
            setLeads((prev) =>
                prev.filter(
                    (l) =>
                        !(
                            l.id === pendingDelete.id &&
                            l.source === pendingDelete.source
                        ),
                ),
            );
            setSelectedLead((prev) =>
                prev &&
                prev.id === pendingDelete.id &&
                prev.source === pendingDelete.source
                    ? null
                    : prev,
            );
            toast("Supprimé");
            setPendingDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const availableStatuses = Array.from(
        new Set(tabLeads.map((l) => l.status)),
    );

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">Demandes & Leads</h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Inbox className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {unreadCounts.contact + unreadCounts.career + unreadCounts.partnership} nouvelles demandes à traiter
                    </p>
                </div>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-3 flex-wrap">
                        {(
                            [
                                { id: "contact", label: "Contacts", count: unreadCounts.contact },
                                { id: "career", label: "Candidatures", count: unreadCounts.career },
                                { id: "partnership", label: "Partenariats", count: unreadCounts.partnership },
                            ] as const
                        ).map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSearchParams({ tab: tab.id });
                                }}
                                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border smooth-animation flex items-center gap-3 ${
                                    activeTab === tab.id
                                        ? "bg-[#212121] text-white border-[#212121] shadow-lg shadow-[#212121]/10"
                                        : "bg-white text-[#616161] border-[#E2E8F0] hover:border-[#00B8D4] hover:text-[#00B8D4]"
                                }`}
                            >
                                <span>{tab.label}</span>
                                {tab.count > 0 && (
                                    <span className="min-w-6 h-6 px-2 rounded-full bg-[#00B8D4] text-white flex items-center justify-center text-[10px] font-black">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">
                        {filteredLeads.length} éléments
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1 max-w-xl relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                        <input
                            type="text"
                            placeholder={`Rechercher dans ${sourceLabel(activeTab).toLowerCase()}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                        />
                    </div>

                    <div className="flex items-center space-x-4 flex-wrap">
                        {["all", ...availableStatuses].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border smooth-animation ${
                                    filterStatus === status
                                        ? "bg-[#212121] text-white border-[#212121] shadow-lg shadow-[#212121]/10"
                                        : "bg-white text-[#616161] border-[#E2E8F0] hover:border-[#00B8D4] hover:text-[#00B8D4]"
                                }`}
                            >
                                {status === "all" ? "Tous" : getStatusLabel(status)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Leads List */}
                <div className="lg:col-span-1 space-y-4">
                    {isLoading ? (
                        [1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-[2rem] border border-[#F1F5F9] animate-pulse" />)
                    ) : (
                        filteredLeads.map((lead, idx) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedLead(lead)}
                                className={`p-6 rounded-[2rem] border cursor-pointer smooth-animation ${
                                    selectedLead?.id === lead.id
                                    ? "bg-[#00B8D4]/5 border-[#00B8D4] shadow-xl shadow-[#00B8D4]/10"
                                    : "bg-white border-[#F1F5F9] hover:border-[#00B8D4] shadow-sm"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)}`}>
                                        {getStatusLabel(lead.status)}
                                    </div>
                                    <span className="text-[10px] font-bold text-[#9E9E9E] flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-sm font-black text-[#212121] mb-1">{lead.name}</h3>
                                <p className="text-xs text-[#757575] font-bold mb-3 truncate">{lead.subject}</p>
                                <div className="flex items-center text-[10px] font-black text-[#00B8D4] uppercase tracking-widest">
                                    <Tag className="w-3 h-3 mr-2" />
                                    {lead.source === "contact"
                                        ? "Contact"
                                        : lead.source === "career"
                                            ? "Candidature"
                                            : "Partenariat"}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Lead Detail */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {selectedLead ? (
                            <motion.div
                                key={selectedLead.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-xl p-10 h-full sticky top-32"
                            >
                                <div className="flex items-center justify-between mb-10 pb-10 border-b border-[#F1F5F9]">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 rounded-2xl bg-[#00B8D4] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#00B8D4]/20">
                                            {selectedLead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-[#212121]">{selectedLead.name}</h2>
                                            <p className="text-xs text-[#9E9E9E] font-black uppercase tracking-widest mt-1">
                                                {selectedLead.source === "contact"
                                                    ? "Contact"
                                                    : selectedLead.source === "career"
                                                        ? "Candidature"
                                                        : "Partenariat"}{" "}
                                                • Reçu le{" "}
                                                {new Date(selectedLead.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {selectedLead.source === "career" ? (
                                            <select
                                                value={selectedLead.status}
                                                onChange={(e) =>
                                                    updateStatus(
                                                        selectedLead,
                                                        e.target.value,
                                                        selectedLead.admin_notes ??
                                                            null,
                                                    )
                                                }
                                                className="px-4 py-4 bg-[#F8FAFC] text-[#212121] rounded-2xl smooth-animation font-black text-[10px] uppercase tracking-widest border border-[#E2E8F0] outline-none"
                                            >
                                                {careerStatuses.map((s) => (
                                                    <option key={s} value={s}>
                                                        {getStatusLabel(s)}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        selectedLead,
                                                        selectedLead.source ===
                                                            "contact"
                                                            ? "archived"
                                                            : "reviewed",
                                                    )
                                                }
                                                className="p-4 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-2xl smooth-animation"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteLead(selectedLead)}
                                            className="p-4 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                                    <div className="space-y-6">
                                        <div className="flex items-center text-[#212121]">
                                            <Mail className="w-5 h-5 mr-4 text-[#00B8D4]" />
                                            <div>
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-0.5">E-mail</p>
                                                <p className="text-sm font-bold">{selectedLead.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-[#212121]">
                                            <Phone className="w-5 h-5 mr-4 text-[#00B8D4]" />
                                            <div>
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-0.5">Téléphone</p>
                                                <p className="text-sm font-bold">{selectedLead.phone || "Non renseigné"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center text-[#212121]">
                                            <Tag className="w-5 h-5 mr-4 text-[#00B8D4]" />
                                            <div>
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-0.5">Sujet</p>
                                                <p className="text-sm font-bold">{selectedLead.subject}</p>
                                            </div>
                                        </div>
                                        {selectedLead.source === "career" &&
                                            selectedLead.resume_url && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        downloadResume(
                                                            selectedLead,
                                                        )
                                                    }
                                                    className="inline-flex items-center px-6 py-4 bg-[#F8FAFC] text-[#212121] hover:text-[#00B8D4] rounded-2xl smooth-animation font-black text-[10px] uppercase tracking-widest border border-[#E2E8F0] hover:border-[#00B8D4]"
                                                >
                                                    Télécharger le CV
                                                    <ArrowRight className="w-4 h-4 ml-3" />
                                                </button>
                                            )}
                                    </div>
                                </div>

                                <div className="bg-[#F8FAFC] rounded-3xl p-8 mb-10">
                                    <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4 flex items-center">
                                        <MessageSquare className="w-3.5 h-3.5 mr-2" /> Message du client
                                    </p>
                                    <p className="text-sm font-medium text-[#212121] leading-relaxed italic">
                                        "{selectedLead.message}"
                                    </p>
                                </div>

                                {selectedLead.source === "career" && (
                                    <div className="bg-white border border-[#F1F5F9] rounded-3xl p-8 mb-10">
                                        <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4 flex items-center">
                                            <MessageSquare className="w-3.5 h-3.5 mr-2" /> Notes internes
                                        </p>
                                        <textarea
                                            value={selectedLead.admin_notes || ""}
                                            onChange={(e) =>
                                                setSelectedLead((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              admin_notes:
                                                                  e.target
                                                                      .value,
                                                          }
                                                        : prev,
                                                )
                                            }
                                            placeholder="Ex: date/heure de l’entretien, commentaires, etc."
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation min-h-[120px]"
                                        />
                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        selectedLead,
                                                        selectedLead.status,
                                                        selectedLead.admin_notes ??
                                                            null,
                                                    )
                                                }
                                                className="px-8 py-4 bg-[#212121] text-white font-black rounded-2xl hover:bg-[#00B8D4] smooth-animation uppercase tracking-widest text-xs flex items-center gap-3"
                                            >
                                                Enregistrer les notes{" "}
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            draftEmailForLead(selectedLead)
                                        }
                                        className="flex-1 flex items-center justify-center py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                                    >
                                        <Mail className="w-5 h-5 mr-3" />
                                        Répondre par Email
                                    </button>
                                    {selectedLead.source !== "career" && (
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    selectedLead,
                                                    selectedLead.source ===
                                                        "contact"
                                                        ? "archived"
                                                        : "reviewed",
                                                )
                                            }
                                            className="flex-1 flex items-center justify-center py-5 px-6 bg-white border border-[#E2E8F0] text-[#616161] rounded-[1.5rem] hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation font-black text-xs uppercase tracking-widest"
                                        >
                                            Marquer comme traité
                                            <ArrowRight className="w-5 h-5 ml-3" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-[2.5rem] flex flex-col items-center justify-center text-[#9E9E9E] p-20 text-center">
                                <Inbox className="w-20 h-20 mb-6 opacity-20" />
                                <h2 className="text-2xl font-black text-[#212121] opacity-40">Sélectionnez une demande</h2>
                                <p className="text-sm font-medium mt-2 max-w-xs">Cliquez sur un message dans la liste pour voir les détails et répondre au client.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ModalPortal>
                <AnimatePresence>
                    {isEmailModalOpen && selectedLead && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black/50 z-[80]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => {
                                    if (!isEmailSending)
                                        setIsEmailModalOpen(false);
                                }}
                            />
                            <motion.div
                                className="fixed inset-0 z-[90] flex items-center justify-center p-4"
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            >
                                <div
                                    className="w-full max-w-2xl bg-white rounded-[2rem] border border-[#F1F5F9] shadow-2xl overflow-hidden"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between px-8 py-6 border-b border-[#F1F5F9]">
                                        <div>
                                            <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest">
                                                Email
                                            </p>
                                            <h3 className="text-lg font-black text-[#212121]">
                                                Rédiger un message
                                            </h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsEmailModalOpen(false)
                                            }
                                            disabled={isEmailSending}
                                            className="p-3 rounded-2xl bg-[#F8FAFC] text-[#616161] hover:text-[#00B8D4] smooth-animation disabled:opacity-60"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="p-8 space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Destinataire
                                            </label>
                                            <input
                                                type="email"
                                                value={emailForm.to}
                                                onChange={(e) =>
                                                    setEmailForm((p) => ({
                                                        ...p,
                                                        to: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Objet
                                            </label>
                                            <input
                                                type="text"
                                                value={emailForm.subject}
                                                onChange={(e) =>
                                                    setEmailForm((p) => ({
                                                        ...p,
                                                        subject: e.target
                                                            .value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Message
                                            </label>
                                            <textarea
                                                value={emailForm.body}
                                                onChange={(e) =>
                                                    setEmailForm((p) => ({
                                                        ...p,
                                                        body: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium text-[#212121] smooth-animation min-h-[200px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="px-8 py-6 border-t border-[#F1F5F9] flex items-center justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsEmailModalOpen(false)
                                            }
                                            disabled={isEmailSending}
                                            className="px-6 py-4 bg-white border border-[#E2E8F0] text-[#616161] rounded-2xl hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-60"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="button"
                                            onClick={sendEmail}
                                            disabled={isEmailSending}
                                            className="px-8 py-4 bg-[#212121] text-white font-black rounded-2xl hover:bg-[#00B8D4] smooth-animation uppercase tracking-widest text-xs disabled:opacity-60"
                                        >
                                            {isEmailSending
                                                ? "Envoi..."
                                                : "Envoyer"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </ModalPortal>

            <ConfirmDialog
                open={!!pendingDelete}
                title="Supprimer ?"
                message={
                    pendingDelete
                        ? `Cette action supprimera "${pendingDelete.subject}".`
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
