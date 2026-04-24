import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Globe,
    Zap,
    Send,
    Building2,
    Mail,
    Phone,
    User,
    TrendingUp,
    Shield,
    Target
} from "lucide-react";
import axios from "axios";

export default function Partnership() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const [companyName, setCompanyName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [partnershipType, setPartnershipType] = useState("");
    const [message, setMessage] = useState("");

    const [heroTitle, setHeroTitle] = useState("Devenez Partenaire de MAC");
    const [heroSubtitle, setHeroSubtitle] = useState(
        "Unissons nos forces pour bâtir l'avenir de l'Afrique. Nous recherchons des partenaires d'excellence partageant notre vision.",
    );
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [heroOverlayOpacity, setHeroOverlayOpacity] = useState(60);
    const [whyTitle, setWhyTitle] = useState("Pourquoi collaborer avec nous ?");
    const [whySubtitle, setWhySubtitle] = useState(
        "Chez MAC, nous croyons que les plus grandes réalisations naissent de collaborations solides. Nous offrons à nos partenaires un environnement de travail basé sur la confiance mutuelle, le respect des standards de qualité et une ambition commune d'excellence.",
    );
    const [whyImage, setWhyImage] = useState(
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
    );

    const advantageIconMap = useMemo(
        () => ({ TrendingUp, Shield, Target, Zap }),
        [],
    );
    type AdvantageIcon = keyof typeof advantageIconMap;
    type AdvantageItem = { icon: AdvantageIcon; text: string };

    const defaultAdvantages: AdvantageItem[] = [
        {
            icon: "TrendingUp",
            text: "Accès à des projets d'envergure internationale.",
        },
        {
            icon: "Shield",
            text: "Sécurité de paiement et transparence contractuelle.",
        },
        {
            icon: "Target",
            text: "Vision partagée de l'excellence architecturale.",
        },
        {
            icon: "Zap",
            text: "Processus de collaboration agiles et efficaces.",
        },
    ];

    const [advantages, setAdvantages] =
        useState<AdvantageItem[]>(defaultAdvantages);

    type PartnerItem = { id: number; name: string; logo: string };
    const [partners, setPartners] = useState<PartnerItem[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/partnership");
                const hero = Array.isArray(res.data?.hero_slides)
                    ? res.data.hero_slides[0]
                    : null;

                if (hero?.title) setHeroTitle(String(hero.title));
                if (hero?.description) setHeroSubtitle(String(hero.description));
                if (hero?.image) setHeroImage(String(hero.image));
                if (
                    typeof hero?.overlay_opacity === "number" &&
                    Number.isFinite(hero.overlay_opacity)
                ) {
                    setHeroOverlayOpacity(
                        Math.max(0, Math.min(100, hero.overlay_opacity)),
                    );
                }

                const sections = res.data?.sections || {};

                if (sections?.advantages?.title)
                    setWhyTitle(String(sections.advantages.title));
                if (sections?.advantages?.subtitle)
                    setWhySubtitle(String(sections.advantages.subtitle));
                if (sections?.advantages?.image)
                    setWhyImage(String(sections.advantages.image));

                const apiWhy = Array.isArray(res.data?.why_partner_items)
                    ? res.data.why_partner_items
                    : null;
                if (apiWhy) {
                    const mapped: AdvantageItem[] = apiWhy
                        .slice()
                        .sort(
                            (a: any, b: any) =>
                                (a?.order ?? 0) - (b?.order ?? 0),
                        )
                        .map((it: any) => {
                            const iconName = String(it?.icon || "TrendingUp");
                            const safeIcon =
                                iconName in advantageIconMap
                                    ? (iconName as AdvantageIcon)
                                    : "TrendingUp";
                            const text = String(it?.value || it?.label || "");
                            return { icon: safeIcon, text };
                        })
                        .filter((it: AdvantageItem) => it.text.trim().length > 0);

                    if (mapped.length > 0) setAdvantages(mapped);
                }

                const apiPartners = Array.isArray(res.data?.partners)
                    ? res.data.partners
                    : null;
                if (apiPartners) {
                    const mappedPartners: PartnerItem[] = apiPartners
                        .slice()
                        .sort(
                            (a: any, b: any) =>
                                (a?.order ?? 0) - (b?.order ?? 0),
                        )
                        .map((p: any) => ({
                            id: Number(p?.id),
                            name: String(p?.label || ""),
                            logo: String(p?.value || ""),
                        }))
                        .filter(
                            (p: PartnerItem) =>
                                p.name.trim().length > 0 &&
                                p.logo.trim().length > 0,
                        );
                    setPartners(mappedPartners);
                }
            } catch (error) {
                console.error("Failed to load partnership CMS", error);
            }
        };

        load();
    }, [advantageIconMap]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        setFormError(null);
        setFormErrors({});

        try {
            await axios.post("/api/partnership", {
                company_name: companyName,
                contact_person: contactPerson,
                email,
                phone,
                partnership_type:
                    partnershipType.trim().length > 0 ? partnershipType : null,
                message,
            });

            setSubmitted(true);
            setCompanyName("");
            setContactPerson("");
            setEmail("");
            setPhone("");
            setPartnershipType("");
            setMessage("");
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err: any) {
            const apiErrors = err.response?.data?.errors;
            if (apiErrors && typeof apiErrors === "object") {
                const mapped: Record<string, string> = {};
                Object.keys(apiErrors).forEach((k) => {
                    const v = apiErrors[k];
                    if (Array.isArray(v) && v[0]) mapped[k] = String(v[0]);
                });
                setFormErrors(mapped);
            }
            setFormError(
                err.response?.data?.message ||
                    "Une erreur est survenue. Veuillez réessayer.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    const collaborationModels = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Co-traitance",
            desc: "Partenariats sur des projets d'envergure pour unir nos expertises techniques et logistiques."
        },
        {
            icon: <Building2 className="w-6 h-6" />,
            title: "Fournisseur Agréé",
            desc: "Devenez un fournisseur privilégié de matériaux et équipements de haute qualité."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Développement Régional",
            desc: "Collaboration pour l'expansion de nos activités dans de nouvelles zones géographiques."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 border-b border-[#E2E8F0] overflow-hidden">
                <div className="absolute inset-0">
                    {heroImage ? (
                        <div
                            className="w-full h-full bg-center bg-cover"
                            style={{ backgroundImage: `url(${heroImage})` }}
                        />
                    ) : (
                        <div className="w-full h-full bg-[#F8FAFC]" />
                    )}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundColor: "#0B1220",
                            opacity: heroOverlayOpacity / 100,
                        }}
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        {heroTitle}
                    </motion.h1>
                    <p className="text-white/85 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                        {heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Why Partner with Us? */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={whyImage}
                            alt="Partnership"
                            className="rounded-[3rem] shadow-2xl"
                        />
                    </motion.div>
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-[#212121]">
                                {whyTitle}
                            </h2>
                            <p className="text-[#616161] leading-relaxed">
                                {whySubtitle}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {advantages.map((adv, idx) => {
                                const Icon = advantageIconMap[adv.icon];
                                return (
                                    <div
                                        key={`${adv.icon}-${idx}`}
                                        className="flex items-start gap-4 p-6 bg-[#F8FAFC] rounded-[1.5rem] border border-[#F1F5F9]"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <p className="text-sm font-bold text-[#616161] leading-relaxed">
                                            {adv.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {partners.length > 0 && (
                <section className="py-24 bg-white border-y border-[#F1F5F9]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-[#212121] mb-4">
                                Nos Partenaires
                            </h2>
                            <p className="text-[#616161]">
                                Quelques entreprises qui nous font confiance.
                            </p>
                        </div>

                        <div className="relative overflow-hidden rounded-[3rem] border border-[#F1F5F9] bg-[#F8FAFC]">
                            <div className="marquee-track py-10">
                                {[...partners, ...partners].map((p, idx) => (
                                    <div
                                        key={`${p.id}-${idx}`}
                                        className="shrink-0 px-6"
                                    >
                                        <div className="w-[220px] bg-white border border-[#F1F5F9] rounded-[2rem] p-6 flex flex-col items-center justify-center shadow-sm">
                                            <div className="w-full h-16 flex items-center justify-center">
                                                <img
                                                    src={p.logo}
                                                    alt={p.name}
                                                    className="max-h-12 max-w-[85%] object-contain"
                                                />
                                            </div>
                                            <p className="mt-4 text-xs font-black text-[#212121] uppercase tracking-widest text-center">
                                                {p.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F8FAFC] to-transparent" />
                        </div>
                    </div>
                </section>
            )}

            {/* Collaboration Models */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#212121] mb-4">Modèles de Collaboration</h2>
                        <p className="text-[#616161]">Nous proposons plusieurs modèles de collaboration pour vous aider à trouver la meilleure solution pour votre projet.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {collaborationModels.map((model, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation group text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center mb-6 mx-auto group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                    {model.icon}
                                </div>
                                <h3 className="text-xl font-black text-[#212121] mb-4">{model.title}</h3>
                                <p className="text-[#616161] text-sm leading-relaxed mb-8">{model.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership Form */}
            <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-[#212121] mb-4">Proposer un Partenariat</h2>
                    <p className="text-[#616161]">Parlons de la façon dont nous pouvons travailler ensemble.</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] border border-[#F1F5F9] p-10 md:p-16 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Nom de l'entreprise *</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Nom complet de l'entreprise"
                                    required
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                                />
                            </div>
                            {formErrors.company_name && (
                                <p className="text-xs font-bold text-red-500">
                                    {formErrors.company_name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Personne de contact *</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Votre nom complet"
                                    required
                                    value={contactPerson}
                                    onChange={(e) => setContactPerson(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                                />
                            </div>
                            {formErrors.contact_person && (
                                <p className="text-xs font-bold text-red-500">
                                    {formErrors.contact_person}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Email professionnel *</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="email"
                                    placeholder="votre@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                                />
                            </div>
                            {formErrors.email && (
                                <p className="text-xs font-bold text-red-500">
                                    {formErrors.email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Téléphone *</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="tel"
                                    placeholder="+224 XXX XXX XXX"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                                />
                            </div>
                            {formErrors.phone && (
                                <p className="text-xs font-bold text-red-500">
                                    {formErrors.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Type de partenariat souhaité</label>
                        <select
                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation appearance-none"
                            value={partnershipType}
                            onChange={(e) => setPartnershipType(e.target.value)}
                        >
                            <option value="">Sélectionner une option</option>
                            <option value="cotraitance">Co-traitance</option>
                            <option value="fournisseur">Fournisseur</option>
                            <option value="regional">Développement Régional</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Message ou proposition *</label>
                        <textarea
                            rows={6}
                            placeholder="Présentez brièvement votre entreprise et votre proposition de partenariat..."
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation resize-none"
                        />
                        {formErrors.message && (
                            <p className="text-xs font-bold text-red-500">
                                {formErrors.message}
                            </p>
                        )}
                    </div>

                    {formError && (
                        <p className="text-center text-sm font-bold text-red-500">
                            {formError}
                        </p>
                    )}

                    <button
                        disabled={submitting}
                        className={`w-full py-5 bg-[#00B8D4] text-white font-black rounded-[1.5rem] shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${
                            submitting
                                ? "opacity-70 cursor-not-allowed hover:translate-y-0"
                                : ""
                        }`}
                    >
                        Envoyer ma proposition <Send className="w-4 h-4" />
                    </button>

                    {submitted && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-sm font-bold text-[#00C853]"
                        >
                            Merci ! Votre proposition a été envoyée avec succès.
                        </motion.p>
                    )}
                </form>
            </section>
        </div>
    );
}
