import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../services/ToastContext";
import ModalPortal from "../../components/ModalPortal";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
    Settings,
    Save,
    Edit2,
    Trash2,
    Globe,
    Shield,
    Bell,
    Database,
    User,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Image as ImageIcon,
    Plus,
    CheckCircle,
    X,
    Layout,
    Award,
    ShieldCheck,
    Lightbulb,
    Heart,
    Users,
    Calendar,
    Clock,
    Navigation,
    FileText,
    Briefcase,
    ChevronDown,
} from "lucide-react";
import axios from "axios";
import ImageUploader from "../../components/ImageUploader";

type HeroSlide = {
    id: number;
    page: string;
    title: string | null;
    subtitle: string | null;
    description: string | null;
    cta_text: string | null;
    cta_link: string | null;
    cta_secondary_text: string | null;
    cta_secondary_link: string | null;
    image: string | null;
    overlay_opacity: number | null;
    is_active: boolean;
    order: number;
};

type PageSection = {
    id: number;
    page: string;
    section_key: string;
    title: string | null;
    subtitle: string | null;
    content: string | null;
    image: string | null;
    extra: any;
    is_active: boolean;
    order: number;
};

type AboutValue = {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    is_active: boolean;
    order: number;
};

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("general");
    const [openAccordions, setOpenAccordions] = useState<string[]>([
        "general_info",
        "contact_info",
        "gps_coords",
        "content_texts",
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isAboutSaving, setIsAboutSaving] = useState(false);
    const [isPartnershipSaving, setIsPartnershipSaving] = useState(false);
    const [isHeroSaving, setIsHeroSaving] = useState(false);
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
    const [heroPage, setHeroPage] = useState("home");
    const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
    const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(
        null,
    );
    const [pendingHeroDelete, setPendingHeroDelete] =
        useState<HeroSlide | null>(null);
    const [heroFormData, setHeroFormData] = useState<Partial<HeroSlide>>({
        page: "home",
        title: "",
        subtitle: null,
        description: "",
        cta_text: null,
        cta_link: null,
        cta_secondary_text: null,
        cta_secondary_link: null,
        image: null,
        overlay_opacity: 60,
        is_active: true,
        order: 0,
    });
    const [socialLinkIds, setSocialLinkIds] = useState<Record<string, number>>(
        {},
    );
    const [aboutHero, setAboutHero] = useState<Partial<HeroSlide>>({
        page: "about",
        title: "À Propos de MAC",
        description:
            "Découvrez l'histoire, les valeurs et l'équipe qui font de MAC le leader de la construction moderne en Afrique.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop",
        overlay_opacity: 60,
        is_active: true,
        order: 0,
    });
    const [aboutStory, setAboutStory] = useState<Partial<PageSection>>({
        page: "about",
        section_key: "story",
        title: "Notre Histoire",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200",
        content:
            "Fondée en 2009 par une équipe d'ingénieurs et d'architectes passionnés, MAC est née d'une conviction claire : l'Afrique mérite une approche moderne et durable de la construction.\n\nNotre parcours a été jalonné de défis relevés et d'innovations introduites. Chaque projet nous a permis d'affiner notre expertise et de développer des solutions adaptées aux spécificités du continent africain.\n\nAujourd'hui, MAC est bien plus qu'une entreprise de construction ; nous sommes un acteur incontournable de la construction moderne en Afrique, tout en gardant nos valeurs fondamentales d'excellence et d'intégrité.",
        is_active: true,
        order: 1,
    });
    const [aboutMission, setAboutMission] = useState<Partial<PageSection>>({
        page: "about",
        section_key: "mission",
        title: "Notre Mission",
        content:
            "Transformer l'Afrique par des constructions d'excellence qui allient innovation architecturale, durabilité environnementale et développement humain tout en créant des espaces qui inspirent et perdurent.",
        is_active: true,
        order: 0,
    });
    const [aboutValuesIntro, setAboutValuesIntro] = useState<
        Partial<PageSection>
    >({
        page: "about",
        section_key: "values_intro",
        title: "Notre Mission et Nos Valeurs",
        subtitle:
            "Les principes qui guident chacune de nos actions et définissent notre approche de la construction.",
        is_active: true,
        order: 2,
    });

    const [partnershipHero, setPartnershipHero] = useState<Partial<HeroSlide>>({
        page: "partnership",
        title: "Devenez Partenaire",
        description:
            "Rejoignez notre réseau de partenaires et participez à la transformation de l'Afrique.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
        overlay_opacity: 60,
        is_active: true,
        order: 0,
    });
    const [partnershipAdvantages, setPartnershipAdvantages] = useState<
        Partial<PageSection>
    >({
        page: "partnership",
        section_key: "advantages",
        title: "Avantages du Partenariat",
        subtitle: "Découvrez les bénéfices d'une collaboration avec MAC.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
        is_active: true,
        order: 1,
    });

    const [values, setValues] = useState<AboutValue[]>([]);
    const [isValueModalOpen, setIsValueModalOpen] = useState(false);
    const [editingValue, setEditingValue] = useState<AboutValue | null>(null);
    const [pendingValueDelete, setPendingValueDelete] =
        useState<AboutValue | null>(null);
    const [valueFormData, setValueFormData] = useState<Partial<AboutValue>>({
        title: "",
        description: "",
        icon: "Award",
        is_active: true,
        order: 0,
    });
    const [settings, setSettings] = useState<any>({
        general: {
            site_name: "MAC - Merveille d'Afrique Construction",
            site_description:
                "Leader de la construction et du forage en Afrique.",
            contact_email: "contact@mac-construction.com",
            contact_phone: "+221 33 800 00 00",
            address: "Dakar, Sénégal",
            company_short_name: "MAC",
            founded_year: "2009",
            hr_email: "rh@mac-construction.com",
            opening_hours: {
                "Lun - Ven": "8:00 - 17:00",
                "Samedi": "8:00 - 12:00",
                "Dimanche": "Fermé"
            },
            response_time: "24 heures",
            map_lat: "",
            map_lng: "",
            footer_description: "Leader de la construction moderne en Afrique",
            copyright_text: "© {year} MAC Construction. Tous droits réservés.",
            work_process: [
                {number: "1", title: "Consultation Initiale", description: "Analyse de vos besoins et définition des objectifs du projet."},
                {number: "2", title: "Étude et Devis", description: "Conception technique détaillée avec devis transparent et planifié."},
                {number: "3", title: "Planification", description: "Organisation des ressources, obtention des autorisations et calendrier."},
                {number: "4", title: "Exécution", description: "Réalisation avec contrôle qualité continu et communication régulière."},
                {number: "5", title: "Livraison et Suivi", description: "Réception finale avec garanties et suivi de maintenance."}
            ],
            team_size_note: "Plus de 500 professionnels qualifiés",
        },
        social: {
            facebook: "https://facebook.com/mac",
            instagram: "https://instagram.com/mac",
            linkedin: "https://linkedin.com/company/mac",
            twitter: "https://twitter.com/mac",
        },
        appearance: {
            primary_color: "#00B8D4",
            logo_dark: "/img/header_logo.png",
            logo_light: "/img/header_logo.png",
        },
    });

    const { toast } = useToast();

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const [
                    settingsRes,
                    socialRes,
                    aboutHeroRes,
                    aboutSectionsRes,
                    aboutValuesRes,
                    partnershipHeroRes,
                    partnershipSectionsRes,
                    heroSlidesRes,
                ] = await Promise.all([
                    axios.get("/api/admin/settings"),
                    axios.get("/api/admin/social-links"),
                    axios.get("/api/admin/hero-slides?page=about"),
                    axios.get("/api/admin/page-sections?page=about"),
                    axios.get("/api/admin/values"),
                    axios.get("/api/admin/hero-slides?page=partnership"),
                    axios.get("/api/admin/page-sections?page=partnership"),
                    axios.get("/api/admin/hero-slides"),
                ]);

                const grouped = settingsRes.data || {};
                const keyMap: Record<string, string | null> = {};
                Object.values(grouped).forEach((items: any) => {
                    (items || []).forEach((row: any) => {
                        keyMap[row.key] = row.value;
                    });
                });

                const socialLinks = (socialRes.data || []) as Array<{
                    id: number;
                    platform: string;
                    url: string;
                }>;

                const ids: Record<string, number> = {};
                const social: Record<string, string> = {
                    facebook: "",
                    instagram: "",
                    linkedin: "",
                    twitter: "",
                };

                socialLinks.forEach((l) => {
                    const k = String(l.platform || "").toLowerCase();
                    ids[k] = l.id;
                    if (k in social) social[k] = l.url;
                });

                setSocialLinkIds(ids);
                setSettings((prev: any) => ({
                    ...prev,
                    general: {
                        ...prev.general,
                        site_name:
                            keyMap.company_name ??
                            prev.general.site_name,
                        site_description:
                            keyMap.company_tagline ??
                            prev.general.site_description,
                        contact_email:
                            keyMap.main_email ??
                            prev.general.contact_email,
                        contact_phone:
                            keyMap.main_phone ??
                            prev.general.contact_phone,
                        address:
                            keyMap.main_address ??
                            prev.general.address,
                        company_short_name:
                            keyMap.company_short_name ??
                            prev.general.company_short_name,
                        founded_year:
                            keyMap.founded_year ??
                            prev.general.founded_year,
                        hr_email:
                            keyMap.hr_email ??
                            prev.general.hr_email,
                        opening_hours:
                            keyMap.opening_hours ? (typeof keyMap.opening_hours === 'string' ? JSON.parse(keyMap.opening_hours) : keyMap.opening_hours) : prev.general.opening_hours,
                        response_time:
                            keyMap.response_time ??
                            prev.general.response_time,
                        map_lat:
                            keyMap.map_lat ??
                            prev.general.map_lat,
                        map_lng:
                            keyMap.map_lng ??
                            prev.general.map_lng,
                        footer_description:
                            keyMap.footer_description ??
                            prev.general.footer_description,
                        copyright_text:
                            keyMap.copyright_text ??
                            prev.general.copyright_text,
                        work_process:
                            keyMap.work_process ? (typeof keyMap.work_process === 'string' ? JSON.parse(keyMap.work_process) : keyMap.work_process) : prev.general.work_process,
                        team_size_note:
                            keyMap.team_size_note ??
                            prev.general.team_size_note,
                    },
                    social: {
                        ...prev.social,
                        ...social,
                    },
                    appearance: {
                        ...prev.appearance,
                        logo_dark:
                            keyMap.header_logo ??
                            prev.appearance.logo_dark,
                        logo_light:
                            keyMap.footer_logo ??
                            prev.appearance.logo_light,
                    },
                }));

                const heroSlides = (aboutHeroRes.data || []) as HeroSlide[];
                const heroSlide = heroSlides?.[0];
                if (heroSlide) setAboutHero(heroSlide);

                const sections = (aboutSectionsRes.data || []) as PageSection[];
                const story = sections.find((s) => s.section_key === "story");
                const mission = sections.find(
                    (s) => s.section_key === "mission",
                );
                const valuesIntro = sections.find(
                    (s) => s.section_key === "values_intro",
                );
                if (story) setAboutStory(story);
                if (mission) setAboutMission(mission);
                if (valuesIntro) setAboutValuesIntro(valuesIntro);

                setValues((aboutValuesRes.data || []) as AboutValue[]);

                const pHeroSlides = (partnershipHeroRes.data || []) as HeroSlide[];
                const pHeroSlide = pHeroSlides?.[0];
                if (pHeroSlide) setPartnershipHero(pHeroSlide);

                const pSections = (partnershipSectionsRes.data || []) as PageSection[];
                const pAdvantages = pSections.find(
                    (s) => s.section_key === "advantages",
                );
                if (pAdvantages) setPartnershipAdvantages(pAdvantages);

                setHeroSlides((heroSlidesRes.data || []) as HeroSlide[]);
            } catch (err: any) {
                const msg =
                    err.response?.data?.message ||
                    "Impossible de charger les paramètres";
                toast(msg, "error");
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, [toast]);

    const saveHeroSlide = async () => {
        const payload = {
            page: "about",
            title: aboutHero.title,
            subtitle: aboutHero.subtitle ?? null,
            description: aboutHero.description,
            cta_text: null,
            cta_link: null,
            cta_secondary_text: null,
            cta_secondary_link: null,
            image: aboutHero.image,
            overlay_opacity: aboutHero.overlay_opacity ?? 60,
            is_active: true,
            order: 0,
        };

        if (aboutHero.id) {
            const updated = await axios.put(
                `/api/admin/hero-slides/${aboutHero.id}`,
                payload,
            );
            setAboutHero(updated.data);
        } else {
            const created = await axios.post("/api/admin/hero-slides", payload);
            setAboutHero(created.data);
        }
    };

    const savePartnershipHeroSlide = async () => {
        const payload = {
            page: "partnership",
            title: partnershipHero.title ?? null,
            subtitle: partnershipHero.subtitle ?? null,
            description: partnershipHero.description ?? null,
            cta_text: null,
            cta_link: null,
            cta_secondary_text: null,
            cta_secondary_link: null,
            image: partnershipHero.image ?? null,
            overlay_opacity: partnershipHero.overlay_opacity ?? 60,
            is_active: true,
            order: 0,
        };

        if (partnershipHero.id) {
            const updated = await axios.put(
                `/api/admin/hero-slides/${partnershipHero.id}`,
                payload,
            );
            setPartnershipHero(updated.data);
        } else {
            const created = await axios.post("/api/admin/hero-slides", payload);
            setPartnershipHero(created.data);
        }
    };

    const savePageSection = async (section: Partial<PageSection>) => {
        const payload = {
            page: "about",
            section_key: section.section_key,
            title: section.title ?? null,
            subtitle: section.subtitle ?? null,
            content: section.content ?? null,
            image: section.image ?? null,
            extra: section.extra ?? null,
            is_active: section.is_active ?? true,
            order: section.order ?? 0,
        };

        if (section.id) {
            return axios.put(`/api/admin/page-sections/${section.id}`, payload);
        }
        return axios.post("/api/admin/page-sections", payload);
    };

    const savePartnershipPageSection = async (section: Partial<PageSection>) => {
        const payload = {
            page: "partnership",
            section_key: section.section_key,
            title: section.title ?? null,
            subtitle: section.subtitle ?? null,
            content: section.content ?? null,
            image: section.image ?? null,
            extra: section.extra ?? null,
            is_active: section.is_active ?? true,
            order: section.order ?? 0,
        };

        if (section.id) {
            return axios.put(`/api/admin/page-sections/${section.id}`, payload);
        }
        return axios.post("/api/admin/page-sections", payload);
    };

    const handleSaveAbout = async () => {
        setIsAboutSaving(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            await Promise.all([
                saveHeroSlide(),
                savePageSection(aboutStory).then((res) =>
                    setAboutStory(res.data),
                ),
                savePageSection(aboutMission).then((res) =>
                    setAboutMission(res.data),
                ),
                savePageSection(aboutValuesIntro).then((res) =>
                    setAboutValuesIntro(res.data),
                ),
            ]);
            toast("Page À Propos enregistrée");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                "Échec de l'enregistrement de la page";
            toast(msg, "error");
        } finally {
            setIsAboutSaving(false);
        }
    };

    const handleSavePartnership = async () => {
        setIsPartnershipSaving(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            await Promise.all([
                savePartnershipHeroSlide(),
                savePartnershipPageSection(partnershipAdvantages).then((res) =>
                    setPartnershipAdvantages(res.data),
                ),
            ]);
            toast("Page Partenariat enregistrée");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                "Échec de l'enregistrement de la page";
            toast(msg, "error");
        } finally {
            setIsPartnershipSaving(false);
        }
    };

    const refreshHeroSlides = async () => {
        const res = await axios.get("/api/admin/hero-slides");
        setHeroSlides(res.data || []);
    };

    const openHeroModal = (slide: HeroSlide | null = null) => {
        if (slide) {
            setEditingHeroSlide(slide);
            setHeroFormData(slide);
        } else {
            const nextOrder =
                heroSlides.filter((s) => s.page === heroPage).length ?? 0;
            setEditingHeroSlide(null);
            setHeroFormData({
                page: heroPage,
                title: "",
                subtitle: null,
                description: "",
                cta_text: null,
                cta_link: null,
                cta_secondary_text: null,
                cta_secondary_link: null,
                image: null,
                overlay_opacity: 60,
                is_active: true,
                order: nextOrder,
            });
        }
        setIsHeroModalOpen(true);
    };

    const saveHeroSlideForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsHeroSaving(true);
        try {
            await axios.get("/sanctum/csrf-cookie");

            const payload = {
                page: heroFormData.page,
                title: heroFormData.title ?? null,
                subtitle: heroFormData.subtitle ?? null,
                description: heroFormData.description ?? null,
                cta_text: heroFormData.cta_text ?? null,
                cta_link: heroFormData.cta_link ?? null,
                cta_secondary_text: heroFormData.cta_secondary_text ?? null,
                cta_secondary_link: heroFormData.cta_secondary_link ?? null,
                image: heroFormData.image ?? null,
                overlay_opacity: heroFormData.overlay_opacity ?? 60,
                is_active: heroFormData.is_active ?? true,
                order: heroFormData.order ?? 0,
            };

            if (editingHeroSlide) {
                await axios.put(
                    `/api/admin/hero-slides/${editingHeroSlide.id}`,
                    payload,
                );
            } else {
                await axios.post("/api/admin/hero-slides", payload);
            }

            await refreshHeroSlides();
            setIsHeroModalOpen(false);
            toast(
                editingHeroSlide
                    ? "Slide mis à jour avec succès"
                    : "Slide créé avec succès",
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.page?.[0] ||
                err.response?.data?.errors?.title?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        } finally {
            setIsHeroSaving(false);
        }
    };

    const confirmDeleteHeroSlide = async () => {
        if (!pendingHeroDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/hero-slides/${pendingHeroDelete.id}`);
            await refreshHeroSlides();
            setPendingHeroDelete(null);
            toast("Slide supprimé");
        } catch (err: any) {
            const msg = err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const openValueModal = (value: AboutValue | null = null) => {
        if (value) {
            setEditingValue(value);
            setValueFormData(value);
        } else {
            const nextOrder = values.length ?? 0;
            setEditingValue(null);
            setValueFormData({
                title: "",
                description: "",
                icon: "Award",
                is_active: true,
                order: nextOrder,
            });
        }
        setIsValueModalOpen(true);
    };

    const saveValue = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");
            const payload = {
                title: valueFormData.title,
                description: valueFormData.description,
                icon: valueFormData.icon,
                is_active: valueFormData.is_active ?? true,
                order: valueFormData.order ?? 0,
            };

            if (editingValue) {
                await axios.put(`/api/admin/values/${editingValue.id}`, payload);
            } else {
                await axios.post("/api/admin/values", payload);
            }

            const res = await axios.get("/api/admin/values");
            setValues(res.data || []);
            setIsValueModalOpen(false);
            toast(
                editingValue
                    ? "Valeur mise à jour avec succès"
                    : "Valeur créée avec succès",
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.title?.[0] ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        }
    };

    const confirmDeleteValue = async () => {
        if (!pendingValueDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/admin/values/${pendingValueDelete.id}`);
            const res = await axios.get("/api/admin/values");
            setValues(res.data || []);
            setPendingValueDelete(null);
            toast("Valeur supprimée");
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axios.get("/sanctum/csrf-cookie");

            await axios.put("/api/admin/settings", {
                company_name: settings.general.site_name,
                company_tagline: settings.general.site_description,
                main_email: settings.general.contact_email,
                main_phone: settings.general.contact_phone,
                main_address: settings.general.address,
                company_short_name: settings.general.company_short_name,
                founded_year: settings.general.founded_year,
                hr_email: settings.general.hr_email,
                opening_hours: typeof settings.general.opening_hours === 'object' ? JSON.stringify(settings.general.opening_hours) : settings.general.opening_hours,
                response_time: settings.general.response_time,
                map_lat: settings.general.map_lat,
                map_lng: settings.general.map_lng,
                footer_description: settings.general.footer_description,
                copyright_text: settings.general.copyright_text,
                work_process: typeof settings.general.work_process === 'object' ? JSON.stringify(settings.general.work_process) : settings.general.work_process,
                team_size_note: settings.general.team_size_note,
                header_logo: settings.appearance.logo_dark,
                footer_logo: settings.appearance.logo_light,
            });

            const platforms = ["facebook", "instagram", "linkedin", "twitter"];
            for (const platform of platforms) {
                const url = String(settings.social[platform] || "").trim();
                const existingId = socialLinkIds[platform];

                if (!url) {
                    if (existingId) {
                        await axios.delete(
                            `/api/admin/social-links/${existingId}`,
                        );
                    }
                    continue;
                }

                if (existingId) {
                    await axios.put(`/api/admin/social-links/${existingId}`, {
                        platform,
                        url,
                        is_active: true,
                        order: 0,
                    });
                } else {
                    const created = await axios.post("/api/admin/social-links", {
                        platform,
                        url,
                        is_active: true,
                        order: 0,
                    });
                    setSocialLinkIds((prev) => ({
                        ...prev,
                        [platform]: created.data.id,
                    }));
                }
            }

            toast("Paramètres enregistrés avec succès");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                "Échec de l'enregistrement";
            toast(msg, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        {
            id: "general",
            label: "Général",
            icon: <Globe className="w-5 h-5" />,
        },
        {
            id: "social",
            label: "Réseaux Sociaux",
            icon: <Facebook className="w-5 h-5" />,
        },
        {
            id: "appearance",
            label: "Apparence",
            icon: <Layout className="w-5 h-5" />,
        },
        {
            id: "heroes",
            label: "Héros",
            icon: <ImageIcon className="w-5 h-5" />,
        },
        {
            id: "about",
            label: "À Propos",
            icon: <User className="w-5 h-5" />,
        },
        {
            id: "partnership",
            label: "Partenariat",
            icon: <Users className="w-5 h-5" />,
        },
    ];

    const toggleAccordion = (id: string) => {
        setOpenAccordions((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Configuration Système
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Settings className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        Gérez les paramètres globaux de votre plateforme
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving || isLoading}
                    className="flex items-center px-8 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                >
                    {isSaving || isLoading ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Save className="w-5 h-5 mr-3" />
                            Enregistrer tout
                        </>
                    )}
                </button>
            </header>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Navigation */}
                <aside className="lg:w-80 shrink-0 space-y-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center p-5 rounded-[1.5rem] smooth-animation border ${
                                activeTab === tab.id
                                    ? "bg-white border-[#00B8D4] text-[#00B8D4] shadow-xl shadow-[#00B8D4]/5"
                                    : "bg-[#F8FAFC] border-[#F1F5F9] text-[#616161] hover:border-[#00B8D4] hover:text-[#00B8D4]"
                            }`}
                        >
                            <div
                                className={`p-2 rounded-xl shrink-0 mr-4 ${activeTab === tab.id ? "bg-[#00B8D4]/10" : "bg-white shadow-sm"}`}
                            >
                                {tab.icon}
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </aside>

                {/* Settings Form */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] border border-[#F1F5F9] shadow-sm p-12"
                    >
                        {activeTab === "general" && (
                            <div className="space-y-6">
                                {/* Informations Générales Accordion */}
                                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => toggleAccordion("general_info")}
                                        className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 smooth-animation"
                                    >
                                        <h3 className="text-lg font-black text-[#212121] flex items-center">
                                            <Globe className="w-5 h-5 mr-3 text-[#00B8D4]" />
                                            Informations Générales
                                        </h3>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[#00B8D4] smooth-animation ${
                                                openAccordions.includes("general_info") ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openAccordions.includes("general_info") && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 pt-0 space-y-10 bg-white">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Globe className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Nom du Site
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.site_name}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            site_name:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <FileText className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Nom Court
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.company_short_name}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            company_short_name: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="MAC"
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-10">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Layout className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Tagline / Slogan
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={
                                                settings.general.site_description
                                            }
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    general: {
                                                        ...settings.general,
                                                        site_description:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Année de Fondation
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.founded_year}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            founded_year: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="2009"
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Users className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Taille de l'Équipe
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.team_size_note}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            team_size_note: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="Plus de 500 professionnels qualifiés"
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Coordonnées de Contact Accordion */}
                                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => toggleAccordion("contact_info")}
                                        className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 smooth-animation"
                                    >
                                        <h3 className="text-lg font-black text-[#212121] flex items-center">
                                            <Mail className="w-5 h-5 mr-3 text-[#00B8D4]" />
                                            Coordonnées de Contact
                                        </h3>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[#00B8D4] smooth-animation ${
                                                openAccordions.includes("contact_info") ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openAccordions.includes("contact_info") && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 pt-0 space-y-10 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Mail className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Email Principal
                                            </label>
                                            <input
                                                type="email"
                                                value={settings.general.contact_email}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            contact_email: e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Mail className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Email RH
                                            </label>
                                            <input
                                                type="email"
                                                value={settings.general.hr_email}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            hr_email: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="rh@mac-construction.com"
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Phone className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Téléphone
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.contact_phone}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            contact_phone: e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Adresse Physique
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.address}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            address: e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-10">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Clock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                            Horaires d'Ouverture
                                        </label>
                                        <div className="space-y-4 p-6 bg-[#F8FAFC] rounded-2xl">
                                            {Object.entries(settings.general.opening_hours).map(([day, hours]) => (
                                                <div key={day} className="grid grid-cols-2 gap-4 items-center">
                                                    <input
                                                        type="text"
                                                        value={day}
                                                        onChange={(e) => {
                                                            const newHours = {...settings.general.opening_hours};
                                                            const oldValue = newHours[day];
                                                            delete newHours[day];
                                                            newHours[e.target.value] = oldValue;
                                                            setSettings({
                                                                ...settings,
                                                                general: {
                                                                    ...settings.general,
                                                                    opening_hours: newHours,
                                                                },
                                                            });
                                                        }}
                                                        placeholder="Lun - Ven"
                                                        className="px-4 py-2 bg-white border-none rounded-xl focus:ring-2 focus:ring-[#00B8D4]/20 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                    />
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={hours as string}
                                                            onChange={(e) =>
                                                                setSettings({
                                                                    ...settings,
                                                                    general: {
                                                                        ...settings.general,
                                                                        opening_hours: {
                                                                            ...settings.general.opening_hours,
                                                                            [day]: e.target.value,
                                                                        },
                                                                    },
                                                                })
                                                            }
                                                            placeholder="8:00 - 17:00"
                                                            className="flex-1 px-4 py-2 bg-white border-none rounded-xl focus:ring-2 focus:ring-[#00B8D4]/20 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newHours = {...settings.general.opening_hours};
                                                                delete newHours[day];
                                                                setSettings({
                                                                    ...settings,
                                                                    general: {
                                                                        ...settings.general,
                                                                        opening_hours: newHours,
                                                                    },
                                                                });
                                                            }}
                                                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl smooth-animation"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            opening_hours: {
                                                                ...settings.general.opening_hours,
                                                                "Nouveau": "8:00 - 17:00",
                                                            },
                                                        },
                                                    });
                                                }}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-[#00B8D4]/5 text-[#00B8D4] rounded-xl smooth-animation font-bold text-sm"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Ajouter une plage horaire
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Clock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Temps de Réponse
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.response_time}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            response_time: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="24 heures"
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Coordonnées GPS Accordion */}
                                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => toggleAccordion("gps_coords")}
                                        className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 smooth-animation"
                                    >
                                        <h3 className="text-lg font-black text-[#212121] flex items-center">
                                            <Navigation className="w-5 h-5 mr-3 text-[#00B8D4]" />
                                            Coordonnées GPS
                                        </h3>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[#00B8D4] smooth-animation ${
                                                openAccordions.includes("gps_coords") ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openAccordions.includes("gps_coords") && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 pt-0 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Latitude
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.map_lat}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            map_lat: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="14.6937"
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Longitude
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.map_lng}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            map_lng: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="-17.4727"
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (navigator.geolocation) {
                                                navigator.geolocation.getCurrentPosition(
                                                    (position) => {
                                                        setSettings({
                                                            ...settings,
                                                            general: {
                                                                ...settings.general,
                                                                map_lat: position.coords.latitude.toString(),
                                                                map_lng: position.coords.longitude.toString(),
                                                            },
                                                        });
                                                        toast("Coordonnées GPS obtenues avec succès");
                                                    },
                                                    (error) => {
                                                        toast("Impossible d'obtenir la position GPS", "error");
                                                    }
                                                );
                                            } else {
                                                toast("Géolocalisation non supportée par ce navigateur", "error");
                                            }
                                        }}
                                        className="mt-4 flex items-center px-6 py-3 bg-[#00B8D4] text-white rounded-xl hover:bg-[#0097A7] smooth-animation font-bold text-xs uppercase tracking-widest"
                                    >
                                        <Navigation className="w-4 h-4 mr-2" />
                                        Obtenir Ma Position Actuelle
                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Contenu et Textes Accordion */}
                                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => toggleAccordion("content_texts")}
                                        className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 smooth-animation"
                                    >
                                        <h3 className="text-lg font-black text-[#212121] flex items-center">
                                            <FileText className="w-5 h-5 mr-3 text-[#00B8D4]" />
                                            Contenu et Textes
                                        </h3>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[#00B8D4] smooth-animation ${
                                                openAccordions.includes("content_texts") ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openAccordions.includes("content_texts") && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 pt-0 bg-white">
                                    <div className="space-y-10">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <FileText className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Description Footer
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={settings.general.footer_description}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            footer_description: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="Leader de la construction moderne en Afrique"
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <FileText className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Texte Copyright
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.general.copyright_text}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        general: {
                                                            ...settings.general,
                                                            copyright_text: e.target.value,
                                                        },
                                                    })
                                                }
                                                placeholder="© {year} MAC Construction. Tous droits réservés."
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                            <p className="text-xs text-gray-500 ml-1 flex items-center gap-1.5">
                                                <span className="inline-flex items-center px-2 py-0.5 bg-[#00B8D4]/10 text-[#00B8D4] rounded font-mono text-xs">
                                                    {"{year}"}
                                                </span>
                                                sera automatiquement remplacé par l'année en cours
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                                <Briefcase className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                                Processus de Travail
                                            </label>
                                            <div className="space-y-4">
                                                {settings.general.work_process.map((step: any, index: number) => (
                                                    <div key={index} className="p-6 bg-[#F8FAFC] rounded-2xl space-y-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex-shrink-0">
                                                                <input
                                                                    type="text"
                                                                    value={step.number}
                                                                    onChange={(e) => {
                                                                        const newProcess = [...settings.general.work_process];
                                                                        newProcess[index].number = e.target.value;
                                                                        setSettings({
                                                                            ...settings,
                                                                            general: {
                                                                                ...settings.general,
                                                                                work_process: newProcess,
                                                                            },
                                                                        });
                                                                    }}
                                                                    placeholder="1"
                                                                    className="w-16 px-3 py-2 bg-white border-none rounded-xl text-center focus:ring-2 focus:ring-[#00B8D4]/20 outline-none text-sm font-black text-[#00B8D4]"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <input
                                                                    type="text"
                                                                    value={step.title}
                                                                    onChange={(e) => {
                                                                        const newProcess = [...settings.general.work_process];
                                                                        newProcess[index].title = e.target.value;
                                                                        setSettings({
                                                                            ...settings,
                                                                            general: {
                                                                                ...settings.general,
                                                                                work_process: newProcess,
                                                                            },
                                                                        });
                                                                    }}
                                                                    placeholder="Titre de l'étape"
                                                                    className="w-full px-4 py-2 bg-white border-none rounded-xl focus:ring-2 focus:ring-[#00B8D4]/20 outline-none text-sm font-bold text-[#212121]"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newProcess = settings.general.work_process.filter((_: any, i: number) => i !== index);
                                                                    setSettings({
                                                                        ...settings,
                                                                        general: {
                                                                            ...settings.general,
                                                                            work_process: newProcess,
                                                                        },
                                                                    });
                                                                }}
                                                                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl smooth-animation"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <textarea
                                                            rows={2}
                                                            value={step.description}
                                                            onChange={(e) => {
                                                                const newProcess = [...settings.general.work_process];
                                                                newProcess[index].description = e.target.value;
                                                                setSettings({
                                                                    ...settings,
                                                                    general: {
                                                                        ...settings.general,
                                                                        work_process: newProcess,
                                                                    },
                                                                });
                                                            }}
                                                            placeholder="Description de cette étape..."
                                                            className="w-full px-4 py-2 bg-white border-none rounded-xl focus:ring-2 focus:ring-[#00B8D4]/20 outline-none text-sm text-[#212121] resize-none"
                                                        />
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSettings({
                                                            ...settings,
                                                            general: {
                                                                ...settings.general,
                                                                work_process: [
                                                                    ...settings.general.work_process,
                                                                    {
                                                                        number: (settings.general.work_process.length + 1).toString(),
                                                                        title: "Nouvelle Étape",
                                                                        description: "Description de la nouvelle étape"
                                                                    }
                                                                ],
                                                            },
                                                        });
                                                    }}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F8FAFC] hover:bg-[#00B8D4]/5 text-[#00B8D4] rounded-2xl smooth-animation font-bold text-sm"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Ajouter une étape
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}

                        {activeTab === "social" && (
                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Facebook className="w-3.5 h-3.5 mr-2 text-blue-600" />{" "}
                                            Facebook
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.social.facebook}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    social: {
                                                        ...settings.social,
                                                        facebook:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Instagram className="w-3.5 h-3.5 mr-2 text-pink-600" />{" "}
                                            Instagram
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.social.instagram}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    social: {
                                                        ...settings.social,
                                                        instagram:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Linkedin className="w-3.5 h-3.5 mr-2 text-blue-700" />{" "}
                                            LinkedIn
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.social.linkedin}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    social: {
                                                        ...settings.social,
                                                        linkedin:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Twitter className="w-3.5 h-3.5 mr-2 text-sky-500" />{" "}
                                            Twitter (X)
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.social.twitter}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    social: {
                                                        ...settings.social,
                                                        twitter: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "appearance" && (
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                        <ImageIcon className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />{" "}
                                        Logos du site
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9]">
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4">
                                                    Logo Clair (sur fond sombre)
                                                </p>
                                                <ImageUploader
                                                    value={
                                                        settings.appearance
                                                            .logo_light
                                                    }
                                                    onChange={(url) =>
                                                        setSettings({
                                                            ...settings,
                                                            appearance: {
                                                                ...settings.appearance,
                                                                logo_light: url,
                                                            },
                                                        })
                                                    }
                                                    label="Changer le logo"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9]">
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4">
                                                    Logo Sombre (sur fond clair)
                                                </p>
                                                <ImageUploader
                                                    value={
                                                        settings.appearance
                                                            .logo_dark
                                                    }
                                                    onChange={(url) =>
                                                        setSettings({
                                                            ...settings,
                                                            appearance: {
                                                                ...settings.appearance,
                                                                logo_dark: url,
                                                            },
                                                        })
                                                    }
                                                    label="Changer le logo"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "heroes" && (
                            <div className="space-y-12">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h2 className="text-2xl font-black text-[#212121]">
                                            Héros des pages
                                        </h2>
                                        <p className="text-[#757575] font-medium mt-2">
                                            Gérer les images et textes des en-têtes
                                            (Home accepte plusieurs slides).
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => openHeroModal()}
                                        className="flex items-center px-8 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                                    >
                                        <Plus className="w-5 h-5 mr-3" />
                                        Nouveau Slide
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Page
                                        </label>
                                        <select
                                            value={heroPage}
                                            onChange={(e) =>
                                                setHeroPage(e.target.value)
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                        >
                                            <option value="home">Home</option>
                                            <option value="services">
                                                Services
                                            </option>
                                            <option value="projects">
                                                Projets
                                            </option>
                                            <option value="blog">Blog</option>
                                            <option value="contact">
                                                Contact
                                            </option>
                                            <option value="careers">
                                                Carrières
                                            </option>
                                            <option value="about">À Propos</option>
                                            <option value="partnership">
                                                Partenariat
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Slides
                                        </label>
                                        <div className="text-sm font-bold text-[#616161] bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl px-6 py-4">
                                            {
                                                heroSlides.filter(
                                                    (s) => s.page === heroPage,
                                                ).length
                                            }{" "}
                                            éléments
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {heroSlides
                                        .filter((s) => s.page === heroPage)
                                        .slice()
                                        .sort(
                                            (a, b) =>
                                                (a.order ?? 0) -
                                                (b.order ?? 0),
                                        )
                                        .map((s) => (
                                            <div
                                                key={s.id}
                                                className="bg-white border border-[#F1F5F9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-animation"
                                            >
                                                <div className="h-40 bg-[#F8FAFC] border-b border-[#F1F5F9] relative overflow-hidden">
                                                    {s.image ? (
                                                        <img
                                                            src={s.image}
                                                            alt={s.title || ""}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                                            Image manquante
                                                        </div>
                                                    )}
                                                    {!s.is_active && (
                                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#212121] text-[10px] font-black uppercase tracking-widest">
                                                            Désactivé
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-8 space-y-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-black text-[#212121] leading-snug truncate">
                                                                {s.title ||
                                                                    "(Sans titre)"}
                                                            </p>
                                                            {s.description && (
                                                                <p className="text-xs text-[#616161] leading-relaxed mt-2">
                                                                    {s.description}
                                                                </p>
                                                            )}
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mt-3">
                                                                Ordre:{" "}
                                                                {s.order ?? 0} •
                                                                Opacité:{" "}
                                                                {s.overlay_opacity ??
                                                                    60}
                                                                %
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-1 shrink-0">
                                                            <button
                                                                onClick={() =>
                                                                    openHeroModal(
                                                                        s,
                                                                    )
                                                                }
                                                                className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    setPendingHeroDelete(
                                                                        s,
                                                                    )
                                                                }
                                                                className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "about" && (
                            <div className="space-y-12">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h2 className="text-2xl font-black text-[#212121]">
                                            Page À Propos
                                        </h2>
                                        <p className="text-[#757575] font-medium mt-2">
                                            Hero, image principale, description
                                            et section Mission/Valeurs
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleSaveAbout}
                                        disabled={isAboutSaving || isLoading}
                                        className="flex items-center px-8 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                                    >
                                        {isAboutSaving ? (
                                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5 mr-3" />
                                                Enregistrer la page
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-black text-[#212121]">
                                        Hero
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9]">
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4">
                                                    Image Hero
                                                </p>
                                                <ImageUploader
                                                    value={aboutHero.image || ""}
                                                    onChange={(url) =>
                                                        setAboutHero({
                                                            ...aboutHero,
                                                            image: url,
                                                        })
                                                    }
                                                    label="Changer l'image"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Titre
                                                </label>
                                                <input
                                                    type="text"
                                                    value={aboutHero.title || ""}
                                                    onChange={(e) =>
                                                        setAboutHero({
                                                            ...aboutHero,
                                                            title: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={
                                                        aboutHero.description ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setAboutHero({
                                                            ...aboutHero,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[140px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-black text-[#212121]">
                                        Image principale & Description
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9]">
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4">
                                                    Image
                                                </p>
                                                <ImageUploader
                                                    value={
                                                        aboutStory.image || ""
                                                    }
                                                    onChange={(url) =>
                                                        setAboutStory({
                                                            ...aboutStory,
                                                            image: url,
                                                        })
                                                    }
                                                    label="Changer l'image"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Description (paragraphes)
                                                </label>
                                                <textarea
                                                    value={
                                                        aboutStory.content || ""
                                                    }
                                                    onChange={(e) =>
                                                        setAboutStory({
                                                            ...aboutStory,
                                                            content:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[240px]"
                                                />
                                                <p className="text-[10px] text-[#9E9E9E] font-bold uppercase tracking-widest ml-1">
                                                    Utilisez une ligne vide pour
                                                    séparer les paragraphes
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-black text-[#212121]">
                                        Notre Mission et Nos Valeurs
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Titre section
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        aboutValuesIntro.title ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setAboutValuesIntro({
                                                            ...aboutValuesIntro,
                                                            title: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Sous-titre
                                                </label>
                                                <textarea
                                                    value={
                                                        aboutValuesIntro.subtitle ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setAboutValuesIntro({
                                                            ...aboutValuesIntro,
                                                            subtitle:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[120px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Texte mission
                                                </label>
                                                <textarea
                                                    value={
                                                        aboutMission.content || ""
                                                    }
                                                    onChange={(e) =>
                                                        setAboutMission({
                                                            ...aboutMission,
                                                            content:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[220px]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <h4 className="text-base font-black text-[#212121]">
                                            Valeurs
                                        </h4>
                                        <button
                                            onClick={() => openValueModal()}
                                            className="flex items-center px-6 py-3 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                                        >
                                            <Plus className="w-4 h-4 mr-3" />
                                            Nouvelle Valeur
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {values
                                            .slice()
                                            .sort(
                                                (a, b) =>
                                                    (a.order ?? 0) -
                                                    (b.order ?? 0),
                                            )
                                            .map((v) => (
                                                <div
                                                    key={v.id}
                                                    className="bg-white border border-[#F1F5F9] rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-animation group"
                                                >
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="p-3 rounded-2xl bg-[#00B8D4]/5 text-[#00B8D4] group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                                            {v.icon ===
                                                                "ShieldCheck" && (
                                                                <ShieldCheck className="w-6 h-6" />
                                                            )}
                                                            {v.icon ===
                                                                "Lightbulb" && (
                                                                <Lightbulb className="w-6 h-6" />
                                                            )}
                                                            {v.icon ===
                                                                "Users" && (
                                                                <Users className="w-6 h-6" />
                                                            )}
                                                            {v.icon ===
                                                                "Globe" && (
                                                                <Globe className="w-6 h-6" />
                                                            )}
                                                            {v.icon ===
                                                                "Heart" && (
                                                                <Heart className="w-6 h-6" />
                                                            )}
                                                            {(!v.icon ||
                                                                v.icon ===
                                                                    "Award") && (
                                                                <Award className="w-6 h-6" />
                                                            )}
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <button
                                                                onClick={() =>
                                                                    openValueModal(
                                                                        v,
                                                                    )
                                                                }
                                                                className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    setPendingValueDelete(
                                                                        v,
                                                                    )
                                                                }
                                                                className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#9E9E9E] hover:text-red-500 smooth-animation"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-lg font-black text-[#212121] leading-snug">
                                                            {v.title}
                                                        </p>
                                                        <p className="text-xs text-[#616161] leading-relaxed">
                                                            {v.description}
                                                        </p>
                                                        {!v.is_active && (
                                                            <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest">
                                                                Désactivée
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "partnership" && (
                            <div className="space-y-12">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h2 className="text-2xl font-black text-[#212121]">
                                            Page Partenariat
                                        </h2>
                                        <p className="text-[#757575] font-medium mt-2">
                                            Hero + section “Pourquoi collaborer ?”
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleSavePartnership}
                                        disabled={isPartnershipSaving || isLoading}
                                        className="flex items-center px-8 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                                    >
                                        {isPartnershipSaving ? (
                                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5 mr-3" />
                                                Enregistrer la page
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-black text-[#212121]">
                                        Hero
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9]">
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4">
                                                    Image Hero
                                                </p>
                                                <ImageUploader
                                                    value={
                                                        partnershipHero.image ||
                                                        ""
                                                    }
                                                    onChange={(url) =>
                                                        setPartnershipHero({
                                                            ...partnershipHero,
                                                            image: url,
                                                        })
                                                    }
                                                    label="Changer l'image"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Titre
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        partnershipHero.title ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setPartnershipHero({
                                                            ...partnershipHero,
                                                            title: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={
                                                        partnershipHero.description ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setPartnershipHero({
                                                            ...partnershipHero,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[140px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-black text-[#212121]">
                                        Section “Pourquoi collaborer ?”
                                    </h3>
                                    <p className="text-sm text-[#757575] font-medium">
                                        La liste des avantages (cartes) se gère
                                        dans “Stats & Features” → “Avantages
                                        Partenariat”.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9]">
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4">
                                                    Image
                                                </p>
                                                <ImageUploader
                                                    value={
                                                        partnershipAdvantages.image ||
                                                        ""
                                                    }
                                                    onChange={(url) =>
                                                        setPartnershipAdvantages(
                                                            {
                                                                ...partnershipAdvantages,
                                                                image: url,
                                                            },
                                                        )
                                                    }
                                                    label="Changer l'image"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Titre
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        partnershipAdvantages.title ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setPartnershipAdvantages(
                                                            {
                                                                ...partnershipAdvantages,
                                                                title: e.target.value,
                                                            },
                                                        )
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    Texte
                                                </label>
                                                <textarea
                                                    value={
                                                        partnershipAdvantages.subtitle ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setPartnershipAdvantages(
                                                            {
                                                                ...partnershipAdvantages,
                                                                subtitle:
                                                                    e.target.value,
                                                            },
                                                        )
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[180px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === "security" ||
                            activeTab === "notifications" ||
                            activeTab === "backup") && (
                            <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
                                <Settings className="w-16 h-16 mb-6 animate-pulse" />
                                <h2 className="text-xl font-black text-[#212121]">
                                    Section en cours de développement
                                </h2>
                                <p className="text-sm font-medium mt-2">
                                    Ces paramètres avancés seront bientôt
                                    disponibles.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <ModalPortal>
                <AnimatePresence>
                    {isHeroModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsHeroModalOpen(false)}
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
                                            {editingHeroSlide
                                                ? "Modifier le slide"
                                                : "Nouveau slide"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Héros — {heroFormData.page || heroPage}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsHeroModalOpen(false)}
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={saveHeroSlideForm}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Page
                                            </label>
                                            <select
                                                value={String(
                                                    heroFormData.page || heroPage,
                                                )}
                                                onChange={(e) =>
                                                    setHeroFormData({
                                                        ...heroFormData,
                                                        page: e.target.value,
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                            >
                                                <option value="home">Home</option>
                                                <option value="services">
                                                    Services
                                                </option>
                                                <option value="projects">
                                                    Projets
                                                </option>
                                                <option value="blog">Blog</option>
                                                <option value="contact">
                                                    Contact
                                                </option>
                                                <option value="careers">
                                                    Carrières
                                                </option>
                                                <option value="about">À Propos</option>
                                                <option value="partnership">
                                                    Partenariat
                                                </option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Ordre
                                            </label>
                                            <input
                                                type="number"
                                                value={heroFormData.order ?? 0}
                                                onChange={(e) =>
                                                    setHeroFormData({
                                                        ...heroFormData,
                                                        order: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Image
                                        </label>
                                        <ImageUploader
                                            value={
                                                heroFormData.image
                                                    ? String(heroFormData.image)
                                                    : null
                                            }
                                            onChange={(url) =>
                                                setHeroFormData({
                                                    ...heroFormData,
                                                    image: url,
                                                })
                                            }
                                            label="Changer l'image"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Titre
                                        </label>
                                        <input
                                            type="text"
                                            value={heroFormData.title || ""}
                                            onChange={(e) =>
                                                setHeroFormData({
                                                    ...heroFormData,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={heroFormData.description || ""}
                                            onChange={(e) =>
                                                setHeroFormData({
                                                    ...heroFormData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[140px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Opacité overlay (0-100)
                                            </label>
                                            <input
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={
                                                    heroFormData.overlay_opacity ??
                                                    60
                                                }
                                                onChange={(e) =>
                                                    setHeroFormData({
                                                        ...heroFormData,
                                                        overlay_opacity: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>

                                        <div className="flex items-center">
                                            <label className="inline-flex items-center space-x-3 px-6 py-4 bg-[#F8FAFC] rounded-2xl w-full justify-between">
                                                <span className="text-xs font-black uppercase tracking-widest text-[#212121]">
                                                    Actif
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        heroFormData.is_active ??
                                                        true
                                                    }
                                                    onChange={(e) =>
                                                        setHeroFormData({
                                                            ...heroFormData,
                                                            is_active:
                                                                e.target.checked,
                                                        })
                                                    }
                                                    className="h-4 w-4"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    CTA (texte)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        heroFormData.cta_text ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setHeroFormData({
                                                            ...heroFormData,
                                                            cta_text:
                                                                e.target.value ||
                                                                null,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    CTA (lien)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        heroFormData.cta_link ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setHeroFormData({
                                                            ...heroFormData,
                                                            cta_link:
                                                                e.target.value ||
                                                                null,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    CTA secondaire (texte)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        heroFormData.cta_secondary_text ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setHeroFormData({
                                                            ...heroFormData,
                                                            cta_secondary_text:
                                                                e.target.value ||
                                                                null,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                    CTA secondaire (lien)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        heroFormData.cta_secondary_link ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setHeroFormData({
                                                            ...heroFormData,
                                                            cta_secondary_link:
                                                                e.target.value ||
                                                                null,
                                                        })
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 pt-2 shrink-0">
                                        <button
                                            type="submit"
                                            disabled={isHeroSaving}
                                            className="flex-1 flex items-center justify-center py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                                        >
                                            {isHeroSaving ? (
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
                                            onClick={() =>
                                                setIsHeroModalOpen(false)
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
                    {isValueModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsValueModalOpen(false)}
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
                                            {editingValue
                                                ? "Modifier la Valeur"
                                                : "Nouvelle Valeur"}
                                        </h2>
                                        <p className="text-xs text-[#9E9E9E] font-bold uppercase tracking-widest mt-1">
                                            Section "Notre Mission et Nos Valeurs"
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsValueModalOpen(false)}
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={saveValue}
                                    className="p-10 space-y-8 overflow-y-auto custom-scrollbar"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Titre
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={valueFormData.title || ""}
                                            onChange={(e) =>
                                                setValueFormData({
                                                    ...valueFormData,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                            Description
                                        </label>
                                        <textarea
                                            required
                                            value={
                                                valueFormData.description || ""
                                            }
                                            onChange={(e) =>
                                                setValueFormData({
                                                    ...valueFormData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation min-h-[140px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Icône
                                            </label>
                                            <select
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation appearance-none"
                                                value={valueFormData.icon || "Award"}
                                                onChange={(e) =>
                                                    setValueFormData({
                                                        ...valueFormData,
                                                        icon: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="Award">
                                                    Award
                                                </option>
                                                <option value="ShieldCheck">
                                                    ShieldCheck
                                                </option>
                                                <option value="Lightbulb">
                                                    Lightbulb
                                                </option>
                                                <option value="Users">
                                                    Users
                                                </option>
                                                <option value="Globe">
                                                    Globe
                                                </option>
                                                <option value="Heart">
                                                    Heart
                                                </option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                                                Ordre
                                            </label>
                                            <input
                                                type="number"
                                                value={valueFormData.order ?? 0}
                                                onChange={(e) =>
                                                    setValueFormData({
                                                        ...valueFormData,
                                                        order: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <label className="inline-flex items-center space-x-3 px-6 py-4 bg-[#F8FAFC] rounded-2xl">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    valueFormData.is_active ??
                                                    true
                                                }
                                                onChange={(e) =>
                                                    setValueFormData({
                                                        ...valueFormData,
                                                        is_active:
                                                            e.target.checked,
                                                    })
                                                }
                                                className="h-4 w-4"
                                            />
                                            <span className="text-xs font-black uppercase tracking-widest text-[#212121]">
                                                Active
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
                                            onClick={() =>
                                                setIsValueModalOpen(false)
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

            <ConfirmDialog
                open={!!pendingHeroDelete}
                title="Supprimer le slide ?"
                message={
                    pendingHeroDelete
                        ? `Cette action supprimera "${pendingHeroDelete.title ?? "Slide"}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingHeroDelete(null)}
                onConfirm={confirmDeleteHeroSlide}
            />

            <ConfirmDialog
                open={!!pendingValueDelete}
                title="Supprimer la valeur ?"
                message={
                    pendingValueDelete
                        ? `Cette action supprimera "${pendingValueDelete.title}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingValueDelete(null)}
                onConfirm={confirmDeleteValue}
            />
        </div>
    );
}
