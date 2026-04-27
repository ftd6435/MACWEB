import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

type CategoryItem = {
    id: number;
    name: string;
    slug: string;
    projects_count?: number;
};

type ProjectItem = {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string | null;
    location: string | null;
    year: string | null;
    category?: { id: number; name: string } | null;
};

export default function Projects() {
    const [heroTitle, setHeroTitle] = useState("Nos Réalisations");
    const [heroDescription, setHeroDescription] = useState(
        "Découvrez notre portfolio d'excellence architecturale et d'innovation technique à travers l'Afrique.",
    );
    const [heroImage, setHeroImage] = useState<string | null>(
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    );
    const [overlayOpacity, setOverlayOpacity] = useState(60);
    const [cmsCategories, setCmsCategories] = useState<CategoryItem[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [years, setYears] = useState<string[]>([]);

    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [pagination, setPagination] = useState<{
        currentPage: number;
        lastPage: number;
        total: number;
    }>({ currentPage: 1, lastPage: 1, total: 0 });

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/projects");
                const hero = Array.isArray(res.data?.hero_slides)
                    ? res.data.hero_slides[0]
                    : null;
                if (hero?.title) setHeroTitle(String(hero.title));
                if (hero?.description)
                    setHeroDescription(String(hero.description));
                if (hero?.image) setHeroImage(String(hero.image));
                if (Array.isArray(res.data?.categories)) {
                    setCmsCategories(res.data.categories as CategoryItem[]);
                }
                if (Array.isArray(res.data?.regions)) {
                    setRegions(res.data.regions);
                }
                if (Array.isArray(res.data?.years)) {
                    setYears(res.data.years.map(String));
                }
                if (
                    typeof hero?.overlay_opacity === "number" &&
                    Number.isFinite(hero.overlay_opacity)
                ) {
                    setOverlayOpacity(
                        Math.max(0, Math.min(100, hero.overlay_opacity)),
                    );
                }
            } catch {
                return;
            }
        };
        load();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
        null,
    );
    const [activeRegion, setActiveRegion] = useState("Toutes les régions");
    const [activeYear, setActiveYear] = useState("Toutes les années");

    const regionOptions = ["Toutes les régions", ...regions];
    const yearOptions = ["Toutes les années", ...years];

    const categoryButtons = useMemo(
        () => [{ id: null as number | null, name: "Tous", slug: "all" }, ...cmsCategories],
        [cmsCategories],
    );

    const badgeClassForCategory = (name: string) => {
        const normalized = name.toLowerCase();
        if (normalized.includes("résident")) return "bg-emerald-500";
        if (normalized.includes("commercial")) return "bg-blue-600";
        if (normalized.includes("industri")) return "bg-amber-600";
        if (normalized.includes("forage")) return "bg-cyan-500";
        return "bg-[#00B8D4]";
    };

    const fetchProjectsPage = useCallback(
        async (page: number, append: boolean) => {
            if (append) {
                setIsLoadingMore(true);
            } else {
                setIsLoadingProjects(true);
            }

            try {
                const params: Record<string, any> = { page };
                if (searchTerm.trim()) params.search = searchTerm.trim();
                if (activeCategoryId) params.category_id = activeCategoryId;
                if (activeYear !== "Toutes les années") params.year = activeYear;
                if (activeRegion !== "Toutes les régions") params.location = activeRegion;

                const res = await axios.get("/api/projects", { params });
                const nextProjects = (res.data?.data || []) as ProjectItem[];

                setProjects((prev) =>
                    append ? [...prev, ...nextProjects] : nextProjects,
                );
                setPagination({
                    currentPage: Number(res.data?.current_page || page),
                    lastPage: Number(res.data?.last_page || page),
                    total: Number(res.data?.total || nextProjects.length),
                });
            } catch {
                if (!append) {
                    setProjects([]);
                    setPagination({ currentPage: 1, lastPage: 1, total: 0 });
                }
            } finally {
                if (append) {
                    setIsLoadingMore(false);
                } else {
                    setIsLoadingProjects(false);
                }
            }
        },
        [activeCategoryId, activeRegion, activeYear, searchTerm],
    );

    useEffect(() => {
        const t = window.setTimeout(() => {
            fetchProjectsPage(1, false);
        }, 250);
        return () => window.clearTimeout(t);
    }, [activeCategoryId, activeRegion, activeYear, fetchProjectsPage, searchTerm]);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage || ""}
                        alt="Projects Hero"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay with Sky Blue Linear Gradient and Blur */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#00B8D4]/60 via-[#00B8D4]/30 to-[#212121]/90 backdrop-blur-[2px]"
                        style={{ opacity: overlayOpacity / 100 }}
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-white mb-6"
                    >
                        {heroTitle}
                    </motion.h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        {heroDescription}
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-white border-b border-[#F1F5F9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {/* Search Bar */}
                        <div className="max-w-md">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un projet..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            {/* Category Filter */}
                            <div className="flex flex-col space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#757575]">Type de Projet</span>
                                <div className="flex flex-wrap gap-2">
                                    {categoryButtons.map((cat) => {
                                        const isActive =
                                            cat.id === null
                                                ? activeCategoryId === null
                                                : activeCategoryId === cat.id;
                                        return (
                                        <button
                                            key={cat.slug}
                                            onClick={() => setActiveCategoryId(cat.id)}
                                            className={`px-6 py-2 rounded-lg text-xs font-bold smooth-animation ${
                                                isActive
                                                    ? "bg-[#00B8D4] text-white shadow-lg shadow-[#00B8D4]/20"
                                                    : "bg-[#F8FAFC] text-[#616161] hover:bg-[#E0F7FA] hover:text-[#00B8D4]"
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                {/* Region Filter */}
                                <div className="flex flex-col space-y-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#757575]">Localisation</span>
                                    <div className="relative min-w-[200px]">
                                        <select
                                            value={activeRegion}
                                            onChange={(e) => setActiveRegion(e.target.value)}
                                            className="w-full pl-4 pr-10 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#212121] appearance-none focus:ring-2 focus:ring-[#00B8D4] outline-none cursor-pointer"
                                        >
                                            {regionOptions.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E] pointer-events-none" />
                                    </div>
                                </div>

                                {/* Year Filter */}
                                <div className="flex flex-col space-y-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#757575]">Année</span>
                                    <div className="relative min-w-[150px]">
                                        <select
                                            value={activeYear}
                                            onChange={(e) => setActiveYear(e.target.value)}
                                            className="w-full pl-4 pr-10 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#212121] appearance-none focus:ring-2 focus:ring-[#00B8D4] outline-none cursor-pointer"
                                        >
                                            {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E] pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p className="text-xs font-bold text-[#757575] uppercase tracking-widest">
                    {isLoadingProjects ? "Chargement..." : `${pagination.total} projets trouvés`}
                </p>
            </div>

            {/* Projects Grid */}
            <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {projects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="group bg-white rounded-3xl overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-2xl smooth-animation flex flex-col h-full"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img
                                        src={
                                            project.image ||
                                            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
                                        }
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${badgeClassForCategory(
                                                project.category?.name || "Projet",
                                            )}`}
                                        >
                                            {project.category?.name || "Projet"}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-black text-[#212121] mb-3 group-hover:text-[#00B8D4] smooth-animation">{project.title}</h3>

                                    <div className="flex items-center space-x-4 mb-6 text-[10px] font-bold text-[#757575] uppercase tracking-widest">
                                        <div className="flex items-center">
                                            <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#00B8D4]" />
                                            {project.location || "—"}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#00B8D4]" />
                                            {project.year || "—"}
                                        </div>
                                    </div>

                                    <p className="text-sm text-[#616161] leading-relaxed mb-8 flex-1">
                                        {project.description}
                                    </p>

                                    <Link
                                        to={`/projects/${project.slug}`}
                                        className="inline-flex items-center text-xs font-black text-[#00B8D4] uppercase tracking-widest group/link"
                                    >
                                        Voir les détails
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1.5 smooth-animation" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {projects.length > 0 && (
                    <div className="mt-20 text-center space-y-6">
                        {pagination.currentPage < pagination.lastPage && (
                            <button
                                onClick={() =>
                                    fetchProjectsPage(
                                        pagination.currentPage + 1,
                                        true,
                                    )
                                }
                                disabled={isLoadingMore}
                                className="px-10 py-4 bg-[#00B8D4] text-white font-black rounded-xl shadow-xl shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs disabled:opacity-50"
                            >
                                {isLoadingMore
                                    ? "Chargement..."
                                    : "Charger plus de projets"}
                            </button>
                        )}
                        <p className="text-[10px] font-bold text-[#9E9E9E] uppercase tracking-widest">
                            Affichage de {projects.length} sur {pagination.total} projets au total
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
