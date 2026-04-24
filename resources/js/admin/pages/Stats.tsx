import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalPortal from "../../components/ModalPortal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToast } from "../../services/ToastContext";
import {
    Plus,
    Edit2,
    Trash2,
    BarChart3,
    Save,
    X,
    Type,
    Hash,
    Layers,
    ChevronUp,
    ChevronDown,
    Activity,
    Award,
    CheckCircle2,
    GraduationCap,
    TrendingUp,
    Users,
    Briefcase,
    Building2,
    Clock,
    Shield,
    Target,
    Zap,
} from "lucide-react";
import axios from "axios";
import ImageUploader from "../../components/ImageUploader";

interface Stat {
    id: number;
    label: string;
    value: string;
    sub_label: string | null;
    icon: string | null;
    group: string;
    order: number;
}

export default function AdminStats() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState<Stat | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Stat | null>(null);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
    const [editingFeature, setEditingFeature] = useState<Stat | null>(null);
    const [pendingFeatureDelete, setPendingFeatureDelete] =
        useState<Stat | null>(null);
    const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);
    const [editingBenefit, setEditingBenefit] = useState<Stat | null>(null);
    const [pendingBenefitDelete, setPendingBenefitDelete] =
        useState<Stat | null>(null);
    const [isPartnerWhyModalOpen, setIsPartnerWhyModalOpen] = useState(false);
    const [editingPartnerWhy, setEditingPartnerWhy] = useState<Stat | null>(
        null,
    );
    const [pendingPartnerWhyDelete, setPendingPartnerWhyDelete] =
        useState<Stat | null>(null);
    const [isPartnersModalOpen, setIsPartnersModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<Stat | null>(null);
    const [pendingPartnerDelete, setPendingPartnerDelete] =
        useState<Stat | null>(null);
    const [formData, setFormData] = useState<Partial<Stat>>({
        label: "",
        value: "",
        sub_label: "",
        icon: "Activity",
        group: "home",
    });
    const [featureFormData, setFeatureFormData] = useState<Partial<Stat>>({
        label: "",
        value: "",
        icon: "Award",
        group: "home_features",
        order: 0,
    });
    const [benefitFormData, setBenefitFormData] = useState<Partial<Stat>>({
        label: "",
        value: "",
        icon: "GraduationCap",
        group: "careers_benefits",
        order: 0,
    });
    const [partnerWhyFormData, setPartnerWhyFormData] = useState<Partial<Stat>>({
        label: "",
        value: "",
        icon: "TrendingUp",
        group: "partnership_advantages",
        order: 0,
    });
    const [partnerFormData, setPartnerFormData] = useState<Partial<Stat>>({
        label: "",
        value: "",
        sub_label: null,
        icon: null,
        group: "partners",
        order: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/admin/stats");
            setStats(response.data || []);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (stat: Stat | null = null) => {
        if (stat) {
            setEditingStat(stat);
            setFormData(stat);
        } else {
            setEditingStat(null);
            setFormData({
                label: "",
                value: "",
                sub_label: "",
                icon: "Activity",
                group: "home",
            });
        }
        setIsModalOpen(true);
    };

    const handleOpenFeatureModal = (feature: Stat | null = null) => {
        if (feature) {
            setEditingFeature(feature);
            setFeatureFormData(feature);
        } else {
            const nextOrder =
                stats.filter((s) => s.group === "home_features").length ?? 0;
            setEditingFeature(null);
            setFeatureFormData({
                label: "",
                value: "",
                icon: "Award",
                group: "home_features",
                order: nextOrder,
            });
        }
        setIsFeatureModalOpen(true);
    };

    const handleOpenBenefitsModal = (benefit: Stat | null = null) => {
        if (benefit) {
            setEditingBenefit(benefit);
            setBenefitFormData(benefit);
        } else {
            const nextOrder =
                stats.filter((s) => s.group === "careers_benefits").length ?? 0;
            setEditingBenefit(null);
            setBenefitFormData({
                label: "",
                value: "",
                icon: "GraduationCap",
                group: "careers_benefits",
                order: nextOrder,
            });
        }
        setIsBenefitsModalOpen(true);
    };

    const handleOpenPartnerWhyModal = (item: Stat | null = null) => {
        if (item) {
            setEditingPartnerWhy(item);
            setPartnerWhyFormData(item);
        } else {
            const nextOrder =
                stats.filter((s) => s.group === "partnership_advantages")
                    .length ?? 0;
            setEditingPartnerWhy(null);
            setPartnerWhyFormData({
                label: "",
                value: "",
                icon: "TrendingUp",
                group: "partnership_advantages",
                order: nextOrder,
            });
        }
        setIsPartnerWhyModalOpen(true);
    };

    const handleOpenPartnersModal = (partner: Stat | null = null) => {
        if (partner) {
            setEditingPartner(partner);
            setPartnerFormData(partner);
        } else {
            const nextOrder =
                stats.filter((s) => s.group === "partners").length ?? 0;
            setEditingPartner(null);
            setPartnerFormData({
                label: "",
                value: "",
                sub_label: null,
                icon: null,
                group: "partners",
                order: nextOrder,
            });
        }
        setIsPartnersModalOpen(true);
    };

    const { toast } = useToast();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");

            const payload = {
                label: formData.label,
                value: formData.value,
                sub_label: formData.sub_label,
                icon: formData.icon,
                group: formData.group,
                order: formData.order ?? 0,
            };

            if (editingStat) {
                await axios.put(`/api/admin/stats/${editingStat.id}`, payload);
            } else {
                await axios.post("/api/admin/stats", payload);
            }

            await fetchStats();
            setIsModalOpen(false);
            toast(
                editingStat
                    ? "Statistique mise à jour avec succès"
                    : "Statistique créée avec succès",
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.label?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const handleDelete = async (stat: Stat) => {
        setPendingDelete(stat);
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/stats/${pendingDelete.id}`);
            await fetchStats();
            toast("Statistique supprimée");
            setPendingDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const handleDeleteFeature = async (feature: Stat) => {
        setPendingFeatureDelete(feature);
    };

    const confirmDeleteFeature = async () => {
        if (!pendingFeatureDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/stats/${pendingFeatureDelete.id}`);
            await fetchStats();
            toast("Feature supprimée");
            setPendingFeatureDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const handleSaveFeature = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");

            const payload = {
                label: featureFormData.label,
                value: featureFormData.value,
                sub_label: null,
                icon: featureFormData.icon,
                group: "home_features",
                order: featureFormData.order ?? 0,
            };

            if (editingFeature) {
                await axios.put(`/api/admin/stats/${editingFeature.id}`, payload);
            } else {
                await axios.post("/api/admin/stats", payload);
            }

            await fetchStats();
            setIsFeatureModalOpen(false);
            toast(
                editingFeature
                    ? "Feature mise à jour avec succès"
                    : "Feature créée avec succès",
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.label?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const handleDeleteBenefit = async (benefit: Stat) => {
        setPendingBenefitDelete(benefit);
    };

    const confirmDeleteBenefit = async () => {
        if (!pendingBenefitDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/stats/${pendingBenefitDelete.id}`);
            await fetchStats();
            toast("Avantage supprimé");
            setPendingBenefitDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const handleSaveBenefit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");

            const payload = {
                label: benefitFormData.label,
                value: benefitFormData.value,
                sub_label: null,
                icon: benefitFormData.icon,
                group: "careers_benefits",
                order: benefitFormData.order ?? 0,
            };

            if (editingBenefit) {
                await axios.put(
                    `/api/admin/stats/${editingBenefit.id}`,
                    payload,
                );
            } else {
                await axios.post("/api/admin/stats", payload);
            }

            await fetchStats();
            setIsBenefitsModalOpen(false);
            toast(
                editingBenefit
                    ? "Avantage mis à jour avec succès"
                    : "Avantage créé avec succès",
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.label?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const handleDeletePartnerWhy = async (item: Stat) => {
        setPendingPartnerWhyDelete(item);
    };

    const confirmDeletePartnerWhy = async () => {
        if (!pendingPartnerWhyDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/stats/${pendingPartnerWhyDelete.id}`);
            await fetchStats();
            toast("Avantage supprimé");
            setPendingPartnerWhyDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const handleSavePartnerWhy = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");

            const payload = {
                label: partnerWhyFormData.label,
                value: partnerWhyFormData.value,
                sub_label: null,
                icon: partnerWhyFormData.icon,
                group: "partnership_advantages",
                order: partnerWhyFormData.order ?? 0,
            };

            if (editingPartnerWhy) {
                await axios.put(
                    `/api/admin/stats/${editingPartnerWhy.id}`,
                    payload,
                );
            } else {
                await axios.post("/api/admin/stats", payload);
            }

            await fetchStats();
            setIsPartnerWhyModalOpen(false);
            toast(
                editingPartnerWhy
                    ? "Avantage mis à jour avec succès"
                    : "Avantage créé avec succès",
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.label?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const handleDeletePartner = async (partner: Stat) => {
        setPendingPartnerDelete(partner);
    };

    const confirmDeletePartner = async () => {
        if (!pendingPartnerDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/stats/${pendingPartnerDelete.id}`);
            await fetchStats();
            toast("Partenaire supprimé");
            setPendingPartnerDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const handleSavePartner = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");

            const payload = {
                label: partnerFormData.label,
                value: partnerFormData.value,
                sub_label: null,
                icon: null,
                group: "partners",
                order: partnerFormData.order ?? 0,
            };

            if (editingPartner) {
                await axios.put(
                    `/api/admin/stats/${editingPartner.id}`,
                    payload,
                );
            } else {
                await axios.post("/api/admin/stats", payload);
            }

            await fetchStats();
            setIsPartnersModalOpen(false);
            toast(
                editingPartner
                    ? "Partenaire mis à jour avec succès"
                    : "Partenaire créé avec succès",
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.label?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const groups = ["home", "about"];
    const featureIcons = { Award, Clock, Shield, Users } as const;
    const homeFeatures = stats
        .filter((s) => s.group === "home_features")
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const benefitIcons = { GraduationCap, CheckCircle2, TrendingUp, Users } as const;
    const careersBenefits = stats
        .filter((s) => s.group === "careers_benefits")
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const partnerWhyIcons = { TrendingUp, Shield, Target, Zap } as const;
    const partnershipAdvantages = stats
        .filter((s) => s.group === "partnership_advantages")
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const partners = stats
        .filter((s) => s.group === "partners")
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const visibleStatsCount = stats.filter(
        (s) =>
            s.group !== "home_features" &&
            s.group !== "careers_benefits" &&
            s.group !== "partnership_advantages" &&
            s.group !== "partners",
    ).length;

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Statistiques & Chiffres
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {visibleStatsCount} indicateurs de performance affichés
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouvelle Statistique
                </button>
            </header>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-4 ml-4">
                        <div className="w-1.5 h-8 bg-[#00B8D4] rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-black text-[#212121] uppercase tracking-widest">
                                Features Accueil
                            </h2>
                            <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                {homeFeatures.length} items
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleOpenFeatureModal()}
                        className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-3" />
                        Nouvelle Feature
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {homeFeatures.map((feature, idx) => {
                        const Icon =
                            feature.icon &&
                            feature.icon in featureIcons
                                ? featureIcons[
                                      feature.icon as keyof typeof featureIcons
                                  ]
                                : Award;
                        return (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 smooth-animation group"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="p-3 rounded-2xl bg-[#00B8D4]/5 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() =>
                                                handleOpenFeatureModal(feature)
                                            }
                                            className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteFeature(feature)
                                            }
                                            className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-lg font-black text-[#212121] leading-snug">
                                        {feature.label}
                                    </p>
                                    <p className="text-xs text-[#616161] leading-relaxed">
                                        {feature.value}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-4 ml-4">
                        <div className="w-1.5 h-8 bg-[#00B8D4] rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-black text-[#212121] uppercase tracking-widest">
                                Avantages Carrières
                            </h2>
                            <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                {careersBenefits.length} items
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleOpenBenefitsModal()}
                        className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-3" />
                        Nouvel Avantage
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {careersBenefits.map((benefit, idx) => {
                        const Icon =
                            benefit.icon &&
                            benefit.icon in benefitIcons
                                ? benefitIcons[
                                      benefit.icon as keyof typeof benefitIcons
                                  ]
                                : GraduationCap;
                        return (
                            <motion.div
                                key={benefit.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 smooth-animation group"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="p-3 rounded-2xl bg-[#00B8D4]/5 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() =>
                                                handleOpenBenefitsModal(
                                                    benefit,
                                                )
                                            }
                                            className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteBenefit(benefit)
                                            }
                                            className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-lg font-black text-[#212121] leading-snug">
                                        {benefit.label}
                                    </p>
                                    <p className="text-xs text-[#616161] leading-relaxed">
                                        {benefit.value}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-4 ml-4">
                        <div className="w-1.5 h-8 bg-[#00B8D4] rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-black text-[#212121] uppercase tracking-widest">
                                Avantages Partenariat
                            </h2>
                            <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                {partnershipAdvantages.length} items
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleOpenPartnerWhyModal()}
                        className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-3" />
                        Nouvel Avantage
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {partnershipAdvantages.map((item, idx) => {
                        const Icon =
                            item.icon && item.icon in partnerWhyIcons
                                ? partnerWhyIcons[
                                      item.icon as keyof typeof partnerWhyIcons
                                  ]
                                : TrendingUp;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 smooth-animation group"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="p-3 rounded-2xl bg-[#00B8D4]/5 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() =>
                                                handleOpenPartnerWhyModal(item)
                                            }
                                            className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeletePartnerWhy(item)
                                            }
                                            className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-black text-[#212121] leading-snug">
                                        {item.label}
                                    </p>
                                    {item.value &&
                                        item.value !== item.label && (
                                            <p className="text-xs text-[#616161] leading-relaxed">
                                                {item.value}
                                            </p>
                                        )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-4 ml-4">
                        <div className="w-1.5 h-8 bg-[#00B8D4] rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-black text-[#212121] uppercase tracking-widest">
                                Partenaires
                            </h2>
                            <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                {partners.length} items
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => handleOpenPartnersModal()}
                        className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-3" />
                        Nouveau Partenaire
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {partners.map((partner, idx) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 smooth-animation group"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 rounded-2xl bg-[#00B8D4]/5 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={() =>
                                            handleOpenPartnersModal(partner)
                                        }
                                        className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeletePartner(partner)
                                        }
                                        className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="w-full h-16 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] overflow-hidden flex items-center justify-center">
                                    {partner.value ? (
                                        <img
                                            src={partner.value}
                                            alt={partner.label}
                                            className="max-h-12 max-w-[85%] object-contain"
                                        />
                                    ) : (
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                            Logo manquant
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm font-black text-[#212121] leading-snug">
                                    {partner.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {groups.map((group) => (
                <div key={group} className="space-y-6">
                    <div className="flex items-center space-x-4 ml-4">
                        <div className="w-1.5 h-8 bg-[#00B8D4] rounded-full"></div>
                        <h2 className="text-xl font-black text-[#212121] uppercase tracking-widest">
                            Groupe: {group === "home" ? "Accueil" : "À Propos"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats
                            .filter((s) => s.group === group)
                            .map((stat, idx) => (
                                <motion.div
                                    key={stat.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 smooth-animation group"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="p-3 rounded-2xl bg-[#00B8D4]/5 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={() =>
                                                    handleOpenModal(stat)
                                                }
                                                className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(stat)
                                                }
                                                className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-3xl font-black text-[#212121] tracking-tight">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs font-black text-[#757575] uppercase tracking-widest">
                                            {stat.label}
                                        </p>
                                        {stat.sub_label && (
                                            <p className="text-[10px] font-medium text-[#9E9E9E] mt-2 italic">
                                                {stat.sub_label}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            ))}

            {/* Stat Modal */}
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
                                            {editingStat
                                                ? "Modifier la Stat"
                                                : "Nouvelle Statistique"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Données chiffrées de l'entreprise
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
                                                <Hash className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Valeur (Chiffre)
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.value}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        value: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: 150+"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Libellé
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.label}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        label: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                placeholder="Ex: Projets Terminés"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Layers className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Groupe d'affichage
                                        </label>
                                        <select
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                            value={formData.group}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    group: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="home">
                                                Page d'Accueil
                                            </option>
                                            <option value="about">
                                                Page À Propos
                                            </option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Sous-titre (Optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.sub_label || ""}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    sub_label: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="Ex: À travers toute l'Afrique"
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

            <ModalPortal>
                <AnimatePresence>
                    {isFeatureModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsFeatureModalOpen(false)}
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
                                            {editingFeature
                                                ? "Modifier la Feature"
                                                : "Nouvelle Feature"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Section "Pourquoi Choisir MAC"
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setIsFeatureModalOpen(false)
                                        }
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSaveFeature}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Titre
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={featureFormData.label || ""}
                                            onChange={(e) =>
                                                setFeatureFormData({
                                                    ...featureFormData,
                                                    label: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            placeholder="Ex: Expertise Reconnue"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Description
                                        </label>
                                        <textarea
                                            required
                                            value={featureFormData.value || ""}
                                            onChange={(e) =>
                                                setFeatureFormData({
                                                    ...featureFormData,
                                                    value: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[120px]"
                                            placeholder="Ex: Plus de 15 ans d'expérience..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Layers className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Icône
                                            </label>
                                            <select
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                                value={
                                                    featureFormData.icon ||
                                                    "Award"
                                                }
                                                onChange={(e) =>
                                                    setFeatureFormData({
                                                        ...featureFormData,
                                                        icon: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="Award">
                                                    Award
                                                </option>
                                                <option value="Clock">
                                                    Clock
                                                </option>
                                                <option value="Shield">
                                                    Shield
                                                </option>
                                                <option value="Users">
                                                    Users
                                                </option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Hash className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Ordre
                                            </label>
                                            <input
                                                type="number"
                                                value={featureFormData.order ?? 0}
                                                onChange={(e) =>
                                                    setFeatureFormData({
                                                        ...featureFormData,
                                                        order: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
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
                                                setIsFeatureModalOpen(false)
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

            <ModalPortal>
                <AnimatePresence>
                    {isBenefitsModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsBenefitsModalOpen(false)}
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
                                            {editingBenefit
                                                ? "Modifier l’avantage"
                                                : "Nouvel avantage"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Page Carrières — “Pourquoi nous rejoindre ?”
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setIsBenefitsModalOpen(false)
                                        }
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSaveBenefit}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Titre
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={benefitFormData.label || ""}
                                            onChange={(e) =>
                                                setBenefitFormData({
                                                    ...benefitFormData,
                                                    label: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Description
                                        </label>
                                        <textarea
                                            required
                                            value={benefitFormData.value || ""}
                                            onChange={(e) =>
                                                setBenefitFormData({
                                                    ...benefitFormData,
                                                    value: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[120px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Layers className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Icône
                                            </label>
                                            <select
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                                value={
                                                    benefitFormData.icon ||
                                                    "GraduationCap"
                                                }
                                                onChange={(e) =>
                                                    setBenefitFormData({
                                                        ...benefitFormData,
                                                        icon: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="GraduationCap">
                                                    GraduationCap
                                                </option>
                                                <option value="CheckCircle2">
                                                    CheckCircle2
                                                </option>
                                                <option value="TrendingUp">
                                                    TrendingUp
                                                </option>
                                                <option value="Users">
                                                    Users
                                                </option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Hash className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Ordre
                                            </label>
                                            <input
                                                type="number"
                                                value={benefitFormData.order ?? 0}
                                                onChange={(e) =>
                                                    setBenefitFormData({
                                                        ...benefitFormData,
                                                        order: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
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
                                                setIsBenefitsModalOpen(false)
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

            <ModalPortal>
                <AnimatePresence>
                    {isPartnerWhyModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsPartnerWhyModalOpen(false)}
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
                                            {editingPartnerWhy
                                                ? "Modifier l’avantage"
                                                : "Nouvel avantage"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Page Partenariat — “Pourquoi collaborer ?”
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setIsPartnerWhyModalOpen(false)
                                        }
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSavePartnerWhy}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Titre
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={partnerWhyFormData.label || ""}
                                            onChange={(e) => {
                                                const label = e.target.value;
                                                setPartnerWhyFormData((prev) => ({
                                                    ...prev,
                                                    label,
                                                    value:
                                                        (prev.value || "").trim()
                                                            .length === 0
                                                            ? label
                                                            : prev.value,
                                                }));
                                            }}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Texte
                                        </label>
                                        <textarea
                                            required
                                            value={partnerWhyFormData.value || ""}
                                            onChange={(e) =>
                                                setPartnerWhyFormData({
                                                    ...partnerWhyFormData,
                                                    value: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[120px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Layers className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Icône
                                            </label>
                                            <select
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                                value={
                                                    partnerWhyFormData.icon ||
                                                    "TrendingUp"
                                                }
                                                onChange={(e) =>
                                                    setPartnerWhyFormData({
                                                        ...partnerWhyFormData,
                                                        icon: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="TrendingUp">
                                                    TrendingUp
                                                </option>
                                                <option value="Shield">
                                                    Shield
                                                </option>
                                                <option value="Target">
                                                    Target
                                                </option>
                                                <option value="Zap">Zap</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Hash className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Ordre
                                            </label>
                                            <input
                                                type="number"
                                                value={
                                                    partnerWhyFormData.order ?? 0
                                                }
                                                onChange={(e) =>
                                                    setPartnerWhyFormData({
                                                        ...partnerWhyFormData,
                                                        order: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
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
                                                setIsPartnerWhyModalOpen(false)
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

            <ModalPortal>
                <AnimatePresence>
                    {isPartnersModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsPartnersModalOpen(false)}
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
                                            {editingPartner
                                                ? "Modifier le partenaire"
                                                : "Nouveau partenaire"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Page Partenariat — Logos partenaires
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsPartnersModalOpen(false)}
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSavePartner}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Type className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Nom du partenaire
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={partnerFormData.label || ""}
                                            onChange={(e) =>
                                                setPartnerFormData({
                                                    ...partnerFormData,
                                                    label: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Building2 className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Logo
                                        </label>
                                        <ImageUploader
                                            value={
                                                partnerFormData.value
                                                    ? String(partnerFormData.value)
                                                    : null
                                            }
                                            onChange={(url) =>
                                                setPartnerFormData({
                                                    ...partnerFormData,
                                                    value: url || "",
                                                })
                                            }
                                            label="Ajouter un logo"
                                        />
                                        <input
                                            type="text"
                                            required
                                            value={partnerFormData.value || ""}
                                            onChange={(e) =>
                                                setPartnerFormData({
                                                    ...partnerFormData,
                                                    value: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation mt-4"
                                            placeholder="URL du logo (rempli automatiquement après upload)"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Hash className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Ordre
                                        </label>
                                        <input
                                            type="number"
                                            value={partnerFormData.order ?? 0}
                                            onChange={(e) =>
                                                setPartnerFormData({
                                                    ...partnerFormData,
                                                    order: Number(e.target.value),
                                                })
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
                                            onClick={() => setIsPartnersModalOpen(false)}
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
                title="Supprimer la statistique ?"
                message={
                    pendingDelete
                        ? `Cette action supprimera "${pendingDelete.label}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingDelete(null)}
                onConfirm={confirmDelete}
            />

            <ConfirmDialog
                open={!!pendingFeatureDelete}
                title="Supprimer la feature ?"
                message={
                    pendingFeatureDelete
                        ? `Cette action supprimera "${pendingFeatureDelete.label}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingFeatureDelete(null)}
                onConfirm={confirmDeleteFeature}
            />

            <ConfirmDialog
                open={!!pendingBenefitDelete}
                title="Supprimer l’avantage ?"
                message={
                    pendingBenefitDelete
                        ? `Cette action supprimera "${pendingBenefitDelete.label}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingBenefitDelete(null)}
                onConfirm={confirmDeleteBenefit}
            />

            <ConfirmDialog
                open={!!pendingPartnerWhyDelete}
                title="Supprimer l’avantage ?"
                message={
                    pendingPartnerWhyDelete
                        ? `Cette action supprimera "${pendingPartnerWhyDelete.label}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingPartnerWhyDelete(null)}
                onConfirm={confirmDeletePartnerWhy}
            />

            <ConfirmDialog
                open={!!pendingPartnerDelete}
                title="Supprimer le partenaire ?"
                message={
                    pendingPartnerDelete
                        ? `Cette action supprimera "${pendingPartnerDelete.label}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingPartnerDelete(null)}
                onConfirm={confirmDeletePartner}
            />
        </div>
    );
}
