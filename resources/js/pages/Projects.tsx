import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, ArrowRight, ChevronDown, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [activeRegion, setActiveRegion] = useState("Toutes les régions");
    const [activeYear, setActiveYear] = useState("Toutes les années");

    const categories = ["Tous", "Résidentiel", "Commercial", "Industriel", "Forage"];
    const regions = ["Toutes les régions", "Sénégal", "Côte d'Ivoire", "Mali", "Guinée", "Togo", "Bénin", "Burkina Faso", "Niger"];
    const years = ["Toutes les années", "2024", "2023", "2022", "2021", "2020", "2019"];

    const projects = [
        {
            id: 1,
            title: "Résidence Les Palmiers",
            category: "Résidentiel",
            location: "Dakar, Sénégal",
            year: "2024",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
            desc: "Complexe résidentiel haut de gamme de 120 appartements avec espaces verts et piscine commune."
        },
        {
            id: 2,
            title: "Centre d'Affaires Atlantique",
            category: "Commercial",
            location: "Abidjan, Côte d'Ivoire",
            year: "2023",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
            desc: "Tour de bureaux de 25 étages avec certification HQE-Durable et technologies smart-building."
        },
        {
            id: 3,
            title: "Usine Textile Moderne",
            category: "Industriel",
            location: "Lomé, Togo",
            year: "2022",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
            desc: "Complexe industriel de 15 000 m² avec équipements de pointe et normes environnementales."
        },
        {
            id: 4,
            title: "Hôtel Prestige Sahel",
            category: "Commercial",
            location: "Ouagadougou, Burkina Faso",
            year: "2023",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
            desc: "Hôtel 5 étoiles de 200 chambres avec spa, centre de conférence et restaurants gastronomiques."
        },
        {
            id: 5,
            title: "Centre Commercial Baobab",
            category: "Commercial",
            location: "Bamako, Mali",
            year: "2024",
            image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800&auto=format&fit=crop",
            desc: "Centre commercial de 50 boutiques avec cinéma, food-court et espace de divertissement familial."
        },
        {
            id: 6,
            title: "Campus Universitaire Innovation",
            category: "Commercial",
            location: "Cotonou, Bénin",
            year: "2021",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
            desc: "Campus de 10 hectares accueillant 5 000 étudiants avec laboratoires et bibliothèque numérique."
        },
        {
            id: 7,
            title: "Projet Forage Communautaire",
            category: "Forage",
            location: "Région de Kayes, Mali",
            year: "2023",
            image: "https://images.unsplash.com/photo-1533241242276-888998064956?q=80&w=800&auto=format&fit=crop",
            desc: "Installation de 25 puits d'eau potable desservant 15 villages ruraux avec système solaire."
        },
        {
            id: 8,
            title: "Villa Moderne Plateau",
            category: "Résidentiel",
            location: "Plateau, Abidjan",
            year: "2022",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
            desc: "Villa familiale de 450 m² avec piscine, jardin paysager et domotique intégrée."
        },
        {
            id: 9,
            title: "Centre Médical Excellence",
            category: "Commercial",
            location: "Niamey, Niger",
            year: "2021",
            image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop",
            desc: "Centre hospitalier de 100 lits avec bloc opératoire moderne et unité de soins intensifs."
        },
        {
            id: 10,
            title: "Usine Agroalimentaire Sahel",
            category: "Industriel",
            location: "Bobo-Dioulasso, Burkina Faso",
            year: "2020",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
            desc: "Complexe de transformation de 8 000 m² pour céréales locales avec technologies éco-responsables."
        },
        {
            id: 11,
            title: "Cité des Jardins",
            category: "Résidentiel",
            location: "Conakry, Guinée",
            year: "2020",
            image: "https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=800&auto=format&fit=crop",
            desc: "Programme de logements sociaux de 300 appartements avec équipements communautaires."
        },
        {
            id: 12,
            title: "Réseau Hydraulique Rural",
            category: "Forage",
            location: "Région de Ségou, Mali",
            year: "2019",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
            desc: "Réseau de 18 forages équipés de pompes solaires desservant 12 000 habitants."
        }
    ];

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             p.desc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "Tous" || p.category === activeCategory;
        const matchesRegion = activeRegion === "Toutes les régions" || p.location.includes(activeRegion);
        const matchesYear = activeYear === "Toutes les années" || p.year === activeYear;

        return matchesSearch && matchesCategory && matchesRegion && matchesYear;
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
                        alt="Projects Hero"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay with Sky Blue Linear Gradient and Blur */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00B8D4]/60 via-[#00B8D4]/30 to-[#212121]/90 backdrop-blur-[2px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-white mb-6"
                    >
                        Nos Réalisations
                    </motion.h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Découvrez notre portfolio d'excellence architecturale et d'innovation technique à travers l'Afrique.
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
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-6 py-2 rounded-lg text-xs font-bold smooth-animation ${
                                                activeCategory === cat
                                                    ? "bg-[#00B8D4] text-white shadow-lg shadow-[#00B8D4]/20"
                                                    : "bg-[#F8FAFC] text-[#616161] hover:bg-[#E0F7FA] hover:text-[#00B8D4]"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
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
                                            {regions.map(r => <option key={r} value={r}>{r}</option>)}
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
                                            {years.map(y => <option key={y} value={y}>{y}</option>)}
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
                    {filteredProjects.length} projets trouvés
                </p>
            </div>

            {/* Projects Grid */}
            <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
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
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${
                                            project.category === "Résidentiel" ? "bg-emerald-500" :
                                            project.category === "Commercial" ? "bg-blue-600" :
                                            project.category === "Industriel" ? "bg-amber-600" : "bg-cyan-500"
                                        }`}>
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-black text-[#212121] mb-3 group-hover:text-[#00B8D4] smooth-animation">{project.title}</h3>

                                    <div className="flex items-center space-x-4 mb-6 text-[10px] font-bold text-[#757575] uppercase tracking-widest">
                                        <div className="flex items-center">
                                            <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#00B8D4]" />
                                            {project.location}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#00B8D4]" />
                                            {project.year}
                                        </div>
                                    </div>

                                    <p className="text-sm text-[#616161] leading-relaxed mb-8 flex-1">
                                        {project.desc}
                                    </p>

                                    <Link
                                        to={`/projects/${project.id}`}
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
                {filteredProjects.length > 0 && (
                    <div className="mt-20 text-center space-y-6">
                        <button className="px-10 py-4 bg-[#00B8D4] text-white font-black rounded-xl shadow-xl shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs">
                            Charger plus de projets
                        </button>
                        <p className="text-[10px] font-bold text-[#9E9E9E] uppercase tracking-widest">
                            Affichage de {filteredProjects.length} sur 128 projets au total
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
