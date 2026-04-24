import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Briefcase,
    MapPin,
    Clock,
    Search,
    Send,
    FileText,
    User,
    Mail,
    Phone,
    GraduationCap,
    CheckCircle2,
    ArrowRight,
    TrendingUp,
    Users,
    X
} from "lucide-react";
import axios from "axios";
import ModalPortal from "../components/ModalPortal";

export default function Careers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tous");

    type JobListing = {
        id: number;
        title: string;
        department: string | null;
        location: string | null;
        contract_type: string | null;
        description: string;
        requirements?: string[] | null;
        responsibilities?: string[] | null;
        published_at: string | null;
        created_at?: string;
    };

    const benefitIconMap = {
        GraduationCap,
        CheckCircle2,
        TrendingUp,
        Users,
    };

    type BenefitItem = {
        icon: keyof typeof benefitIconMap;
        title: string;
        desc: string;
    };

    const defaultBenefits: BenefitItem[] = [
        {
            icon: "GraduationCap",
            title: "Formation Continue",
            desc: "Programmes de développement professionnel et certifications.",
        },
        {
            icon: "CheckCircle2",
            title: "Assurance Santé",
            desc: "Couverture santé complète pour vous et votre famille.",
        },
        {
            icon: "TrendingUp",
            title: "Évolution Rapide",
            desc: "Des opportunités de carrière basées sur le mérite et la performance.",
        },
        {
            icon: "Users",
            title: "Esprit d'Équipe",
            desc: "Un environnement collaboratif et bienveillant.",
        },
    ];

    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [benefits, setBenefits] = useState<BenefitItem[]>(defaultBenefits);
    const [heroTitle, setHeroTitle] = useState("Rejoignez l'Équipe MAC");
    const [heroSubtitle, setHeroSubtitle] = useState(
        "Construisez votre carrière au sein d'une entreprise innovante qui transforme le paysage architectural africain.",
    );
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [heroOverlayOpacity, setHeroOverlayOpacity] = useState(60);
    const [whyJoinTitle, setWhyJoinTitle] = useState("Pourquoi nous rejoindre ?");
    const [whyJoinSubtitle, setWhyJoinSubtitle] = useState(
        "Nous offrons bien plus qu'un simple emploi.",
    );

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/careers");
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

                const apiJobs = Array.isArray(res.data?.job_listings)
                    ? (res.data.job_listings as JobListing[])
                    : [];
                setJobs(apiJobs);

                const apiBenefits = Array.isArray(res.data?.benefits)
                    ? res.data.benefits
                    : null;
                if (apiBenefits) {
                    const mapped: BenefitItem[] = apiBenefits
                        .slice()
                        .sort(
                            (a: any, b: any) =>
                                (a?.order ?? 0) - (b?.order ?? 0),
                        )
                        .map((b: any) => {
                            const iconName = String(b?.icon || "GraduationCap");
                            const safeIcon =
                                iconName in benefitIconMap
                                    ? (iconName as BenefitItem["icon"])
                                    : "GraduationCap";
                            return {
                                icon: safeIcon,
                                title: String(b?.label || ""),
                                desc: String(b?.value || ""),
                            };
                        })
                        .filter((b: BenefitItem) => b.title.trim().length > 0);
                    if (mapped.length > 0) setBenefits(mapped);
                }

                const sections = res.data?.sections || {};
                if (sections?.why_join?.title) {
                    setWhyJoinTitle(String(sections.why_join.title));
                }
                if (sections?.why_join?.subtitle) {
                    setWhyJoinSubtitle(String(sections.why_join.subtitle));
                }
            } catch {
                return;
            }
        };
        load();
    }, []);

    const categories = useMemo(() => {
        const depts = Array.from(
            new Set(
                jobs
                    .map((j) => String(j.department || "").trim())
                    .filter((d) => d.length > 0),
            ),
        );
        return ["Tous", ...depts];
    }, [jobs]);

    useEffect(() => {
        if (!categories.includes(activeCategory)) setActiveCategory("Tous");
    }, [activeCategory, categories]);

    const filteredJobs = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        return jobs.filter((job) => {
            const matchesSearch = q
                ? `${job.title} ${job.description} ${job.department || ""} ${job.location || ""}`
                      .toLowerCase()
                      .includes(q)
                : true;
            const matchesCategory =
                activeCategory === "Tous"
                    ? true
                    : String(job.department || "").toLowerCase() ===
                      activeCategory.toLowerCase();
            return matchesSearch && matchesCategory;
        });
    }, [jobs, searchTerm, activeCategory]);

    const getPostedLabel = (job: JobListing) => {
        const d = job.published_at || job.created_at;
        if (!d) return "";
        try {
            return new Date(d).toLocaleDateString();
        } catch {
            return "";
        }
    };

    const formRef = useRef<HTMLDivElement | null>(null);
    const resumeInputRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [jobListingId, setJobListingId] = useState<number | null>(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const pickJob = (job: JobListing) => {
        setJobListingId(job.id);
        setPosition(job.title);
        setSubmitMessage(null);
        setSubmitError(null);
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

    const openJobDetails = (job: JobListing) => {
        setSelectedJob(job);
        setSubmitMessage(null);
        setSubmitError(null);
    };

    const closeJobDetails = () => {
        setSelectedJob(null);
    };

    const submitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null);
        setSubmitError(null);
        setIsSubmitting(true);
        try {
            const fd = new FormData();
            if (jobListingId) fd.append("job_listing_id", String(jobListingId));
            fd.append("name", fullName);
            fd.append("email", email);
            if (phone.trim()) fd.append("phone", phone.trim());
            if (position.trim()) fd.append("position", position.trim());
            if (resumeFile) fd.append("resume", resumeFile);
            if (coverLetter.trim())
                fd.append("cover_letter", coverLetter.trim());

            const res = await axios.post("/api/job-applications", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSubmitMessage(
                res.data?.message ||
                    "Votre candidature a été envoyée avec succès.",
            );
            setFullName("");
            setEmail("");
            setPhone("");
            setPosition("");
            setCoverLetter("");
            setResumeFile(null);
            setJobListingId(null);
            if (resumeInputRef.current) resumeInputRef.current.value = "";
        } catch (err: any) {
            const raw =
                err.response?.data?.message ||
                err.response?.data?.errors?.name?.[0] ||
                err.response?.data?.errors?.email?.[0] ||
                err.response?.data?.errors?.resume?.[0] ||
                err.message ||
                "";

            const msg =
                typeof raw === "string" &&
                raw.toLowerCase().includes("post data is too large")
                    ? "Les données envoyées sont trop volumineuses. Réduisez la taille du fichier et réessayez."
                    : typeof raw === "string" && raw.trim()
                      ? raw
                      : "Échec de l'envoi de la candidature";
            setSubmitError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 border-b border-[#E2E8F0] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {heroImage ? (
                        <img
                            src={heroImage}
                            alt="Careers Hero"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#F8FAFC]" />
                    )}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#00B8D4]/60 via-[#00B8D4]/30 to-[#212121]/90 backdrop-blur-[2px]"
                        style={{ opacity: heroOverlayOpacity / 100 }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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

            {/* Benefits Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-black text-[#212121] mb-4">
                        {whyJoinTitle}
                    </h2>
                    <p className="text-[#616161]">{whyJoinSubtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-[#F1F5F9] shadow-sm hover:shadow-md smooth-animation">
                            <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center mb-6">
                                {(() => {
                                    const Icon = benefitIconMap[benefit.icon];
                                    return <Icon className="w-6 h-6" />;
                                })()}
                            </div>
                            <h3 className="text-lg font-black text-[#212121] mb-3">{benefit.title}</h3>
                            <p className="text-[#616161] text-sm leading-relaxed">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Jobs Listings */}
            <section className="py-20 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                        <h2 className="text-3xl font-black text-[#212121]">Offres Disponibles</h2>
                        <div className="flex flex-col md:flex-row gap-4 min-w-0 w-full lg:w-auto">
                            <div className="relative shrink-0">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un poste..."
                                    className="pl-12 pr-6 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm w-full md:w-64 smooth-animation"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap md:flex-nowrap md:overflow-x-auto pb-2 md:pb-0 gap-2 min-w-0">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap smooth-animation ${activeCategory === cat ? 'bg-[#00B8D4] text-white shadow-lg shadow-[#00B8D4]/20' : 'bg-white text-[#616161] border border-[#E2E8F0] hover:border-[#00B8D4] hover:text-[#00B8D4]'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filteredJobs.map(job => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation group flex flex-col md:flex-row md:items-center justify-between gap-8"
                            >
                                <div className="space-y-4 flex-1">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <h3 className="text-xl font-black text-[#212121] group-hover:text-[#00B8D4] smooth-animation">{job.title}</h3>
                                        <span className="px-3 py-1 bg-[#F1F5F9] text-[#9E9E9E] text-[10px] font-black uppercase tracking-widest rounded-full">{job.contract_type || "—"}</span>
                                    </div>
                                    <p className="text-[#616161] text-sm line-clamp-2 max-w-2xl">{job.description}</p>
                                    <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                        <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {job.department || "—"}</span>
                                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {job.location || "—"}</span>
                                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {getPostedLabel(job)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                    <button
                                        onClick={() => openJobDetails(job)}
                                        className="px-8 py-4 bg-white text-[#616161] border border-[#E2E8F0] font-black rounded-2xl hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                    >
                                        Voir détails{" "}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => pickJob(job)}
                                        className="px-8 py-4 bg-[#00B8D4] text-white font-black rounded-2xl hover:bg-[#0097A7] smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                    >
                                        Postuler{" "}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 bg-[#00B8D4] rounded-[3rem] p-12 text-center text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                        <h3 className="text-2xl font-black mb-4 relative z-10">Candidature Spontanée</h3>
                        <p className="text-white/80 mb-8 max-w-2xl mx-auto relative z-10 font-medium">Vous ne trouvez pas de poste correspondant à votre profil ? Envoyez-nous votre CV, nous sommes toujours à la recherche de nouveaux talents.</p>
                        <a href="mailto:rh@mac-construction.com" className="inline-flex items-center px-10 py-5 bg-white text-[#00B8D4] font-black rounded-2xl hover:bg-[#F8FAFC] smooth-animation uppercase tracking-widest text-xs relative z-10">
                            Envoyer mon CV
                        </a>
                    </div>
                </div>
            </section>

            {/* Application Form (Optional/Hidden in detailed modal) */}
            <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={formRef} />
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-[#212121] mb-4">Postuler en ligne</h2>
                    <p className="text-[#616161]">Remplissez le formulaire ci-dessous pour nous transmettre votre candidature.</p>
                </div>
                <form
                    onSubmit={submitApplication}
                    className="bg-white rounded-[3rem] border border-[#F1F5F9] p-10 md:p-16 shadow-sm space-y-8"
                >
                    {(submitMessage || submitError) && (
                        <div
                            className={`p-6 rounded-3xl border font-bold text-sm ${
                                submitError
                                    ? "bg-red-50 border-red-200 text-red-700"
                                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
                            }`}
                        >
                            {submitError || submitMessage}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">
                            Offre (optionnel)
                        </label>
                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                            <select
                                value={
                                    jobListingId ? String(jobListingId) : ""
                                }
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (!v) {
                                        setJobListingId(null);
                                        return;
                                    }
                                    const id = Number(v);
                                    const job = jobs.find((j) => j.id === id);
                                    setJobListingId(id);
                                    if (job) setPosition(job.title);
                                }}
                                className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation appearance-none"
                            >
                                <option value="">
                                    Candidature spontanée (aucune offre)
                                </option>
                                {jobs.map((j) => (
                                    <option key={j.id} value={j.id}>
                                        {j.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Nom complet *</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Votre nom"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Email *</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="email"
                                    required
                                    placeholder="votre@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Téléphone *</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="tel"
                                    placeholder="+224 XX XXX XX XX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Poste souhaité *</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Intitulé du poste"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">CV (PDF/DOC/DOCX)</label>
                        <input
                            ref={resumeInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                    ? e.target.files[0]
                                    : null;
                                if (!file) {
                                    setResumeFile(null);
                                    return;
                                }

                                const maxBytes = 5 * 1024 * 1024;
                                if (file.size > maxBytes) {
                                    setResumeFile(null);
                                    setSubmitMessage(null);
                                    setSubmitError(
                                        "Le CV ne doit pas dépasser 5 Mo.",
                                    );
                                    if (resumeInputRef.current)
                                        resumeInputRef.current.value = "";
                                    return;
                                }

                                setSubmitError(null);
                                setResumeFile(file);
                            }}
                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Lettre de motivation (optionnel)</label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-6 text-[#9E9E9E] w-4 h-4" />
                            <textarea
                                rows={4}
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                placeholder="Votre message..."
                                className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        disabled={isSubmitting}
                        className="w-full py-5 bg-[#00B8D4] text-white font-black rounded-[1.5rem] shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Envoyer ma candidature <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </section>

            <ModalPortal>
                <AnimatePresence>
                    {selectedJob && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeJobDetails}
                                className="fixed inset-0 bg-[#212121]/60 backdrop-blur-md z-[60]"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                                className="fixed inset-0 m-auto w-full max-w-3xl h-fit max-h-[90vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
                            >
                                <div className="p-10 flex items-start justify-between border-b border-[#F1F5F9] shrink-0 gap-6">
                                    <div className="min-w-0">
                                        <h2 className="text-2xl md:text-3xl font-black text-[#212121] leading-tight">
                                            {selectedJob.title}
                                        </h2>
                                        <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                            <span className="px-3 py-1 bg-[#F1F5F9] rounded-full">
                                                {selectedJob.contract_type || "—"}
                                            </span>
                                            <span className="flex items-center">
                                                <Briefcase className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                {selectedJob.department || "—"}
                                            </span>
                                            <span className="flex items-center">
                                                <MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                {selectedJob.location || "—"}
                                            </span>
                                            <span className="flex items-center">
                                                <Clock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" />
                                                {getPostedLabel(selectedJob)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeJobDetails}
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation shrink-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-10 space-y-10 overflow-y-auto custom-scrollbar">
                                    <div className="space-y-3">
                                        <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">
                                            Description
                                        </p>
                                        <p className="text-sm font-medium text-[#212121] leading-relaxed">
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    {Array.isArray(selectedJob.responsibilities) &&
                                        selectedJob.responsibilities.length > 0 && (
                                            <div className="space-y-4">
                                                <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">
                                                    Responsabilités
                                                </p>
                                                <ul className="space-y-2">
                                                    {selectedJob.responsibilities.map(
                                                        (r, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start text-sm font-medium text-[#212121]"
                                                            >
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00B8D4] mr-3 shrink-0" />
                                                                <span>{r}</span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                    {Array.isArray(selectedJob.requirements) &&
                                        selectedJob.requirements.length > 0 && (
                                            <div className="space-y-4">
                                                <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">
                                                    Exigences
                                                </p>
                                                <ul className="space-y-2">
                                                    {selectedJob.requirements.map(
                                                        (r, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start text-sm font-medium text-[#212121]"
                                                            >
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00B8D4] mr-3 shrink-0" />
                                                                <span>{r}</span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                </div>

                                <div className="p-10 border-t border-[#F1F5F9] shrink-0 flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => {
                                            pickJob(selectedJob);
                                            closeJobDetails();
                                        }}
                                        className="flex-1 py-5 px-6 bg-[#00B8D4] text-white font-black rounded-[1.5rem] shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                    >
                                        Postuler maintenant{" "}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={closeJobDetails}
                                        className="flex-1 py-5 px-6 bg-white border border-[#E2E8F0] text-[#616161] font-black rounded-[1.5rem] hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation uppercase tracking-widest text-xs"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </ModalPortal>
        </div>
    );
}
