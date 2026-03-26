import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MapPin,
    Calendar,
    Users,
    Maximize2,
    Clock,
    Target,
    ShieldCheck,
    Star,
    Quote,
    ChevronRight,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Ruler,
    Layers,
    CheckSquare,
    Droplets
} from "lucide-react";

export default function ProjectDetail() {
    const { id } = useParams();

    // Mock project data based on the template
    const project = {
        id,
        title: "Résidence Les Palmiers",
        category: "Résidentiel",
        location: "Dakar, Sénégal",
        year: "2024",
        mainImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
        description: "La Résidence Les Palmiers représente l'excellence de l'architecture résidentielle moderne en Afrique de l'Ouest. Ce complexe de standing exceptionnel de 120 appartements combine harmonieusement design contemporain et éléments culturels sénégalais, créant un cadre de vie unique au cœur de Dakar.",
        subDescription: "Conçu selon les plus hauts standards internationaux, cette résidence offre à ses habitants des espaces de vie généreux, des équipements premium et un environnement verdoyant exceptionnel dans la capitale sénégalaise.",
        metrics: [
            { label: "Client", value: "Groupe Immobilier Dakar", icon: <Users className="w-5 h-5" /> },
            { label: "Superficie", value: "25 000 m²", icon: <Maximize2 className="w-5 h-5" /> },
            { label: "Durée des Travaux", value: "18 mois", icon: <Clock className="w-5 h-5" /> },
            { label: "Services Fournis", value: "Construction clé en main", icon: <Target className="w-5 h-5" /> },
            { label: "Équipe Mobilisée", value: "85 professionnels", icon: <ShieldCheck className="w-5 h-5" /> },
            { label: "Appartements", value: "120 unités", icon: <Layers className="w-5 h-5" /> },
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800", title: "Vue d'ensemble", span: "col-span-2 row-span-2" },
            { url: "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=800", title: "Phase de construction" },
            { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800", title: "Espaces verts" },
            { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800", title: "Intérieur luxe" },
            { url: "https://images.unsplash.com/photo-1600566753190-17f0bab2a674?q=80&w=800", title: "Chantier en cours" },
            { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800", title: "Hall d'accueil" },
        ],
        challenges: [
            {
                title: "Terrain en zone meuble",
                desc: "Sol sablonneux nécessitant une adaptation structurelle spécifique.",
                solution: "Conception de fondations profondes par pieux afin d'assurer une stabilité structurelle pérenne."
            },
            {
                title: "Délais serrés de livraison",
                desc: "Planning de 18 mois imposé par le client.",
                solution: "Planification détaillée avec phases simultanées et équipes spécialisées en rotation."
            },
            {
                title: "Climat tropical intense",
                desc: "Températures élevées et humidité importante à gérer.",
                solution: "Orientation optimisée des bâtiments, ventilation naturelle croisée et matériaux isolants."
            },
            {
                title: "Gestion des eaux pluviales",
                desc: "Fortes pluies d'hivernage nécessitant une gestion efficace.",
                solution: "Système de récupération et infiltration intégré par bassins versants avec bassins de rétention."
            }
        ],
        technicalDetails: {
            specifications: ["Structure béton armé haute résistance", "Fondations adaptées au sol sismique", "Isolation thermique par l'extérieur", "Étanchéité multicouche des toitures"],
            materials: ["Béton haute performance C30/37", "Acier galvanisé à chaud", "Menuiseries aluminium à rupture thermique", "Revêtements pierre naturelle premium"],
            standards: ["Normes parasismiques en vigueur", "Réglementation thermique RT2020", "Certification environnementale", "Standards d'accessibilité PMR"],
            innovations: [
                { title: "Éclairage LED Intelligent", desc: "Système d'éclairage automatique des parties communes avec détection de présence.", icon: <Lightbulb className="w-6 h-6 text-[#00B8D4]" /> },
                { title: "Récupération d'eau de pluie", desc: "Système de collecte et traitement pour l'arrosage des espaces verts.", icon: <Droplets className="w-6 h-6 text-[#00B8D4]" /> }
            ]
        },
        testimonial: {
            author: "Amadou Diallo",
            role: "PDG, Groupe Immobilier Dakar",
            text: "MAC a dépassé toutes nos attentes sur ce projet. Leur professionnalisme, leur respect des délais et la qualité exceptionnelle de leur travail font d'eux votre partenaire de référence pour tous vos futurs projets immobiliers.",
            image: "https://i.pravatar.cc/150?u=amadou",
            stats: [
                { label: "Respect des délais", value: "100%" },
                { label: "Qualité du Travail", value: "Excellent" },
                { label: "Communication", value: "5/5" }
            ]
        },
        similarProjects: [
            { id: 8, title: "Villa Moderne Plateau", category: "Résidentiel", location: "Plateau, Abidjan", year: "2022", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800" },
            { id: 11, title: "Cité des Jardins", category: "Résidentiel", location: "Conakry, Guinée", year: "2020", image: "https://images.unsplash.com/photo-1590608897129-79da98d15969?q=80&w=800" },
            { id: 4, title: "Hôtel Prestige Sahel", category: "Commercial", location: "Ouagadougou", year: "2023", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800" },
        ]
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.mainImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <nav className="flex justify-center items-center space-x-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-8">
                            <Link to="/" className="hover:text-white smooth-animation">Accueil</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link to="/projects" className="hover:text-white smooth-animation">Projets</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white">{project.title}</span>
                        </nav>
                        <span className="px-4 py-1.5 bg-[#00B8D4] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            {project.title}
                        </h1>
                        <div className="flex justify-center items-center space-x-6 text-white/80 text-sm font-bold">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                {project.location}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                {project.year}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-3xl font-black text-[#212121]">Aperçu du Projet</h2>
                            <div className="space-y-6">
                                <p className="text-[#616161] text-lg leading-relaxed">{project.description}</p>
                                <p className="text-[#616161] text-lg leading-relaxed">{project.subDescription}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {project.metrics.map((metric, i) => (
                                <div key={i} className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#F1F5F9] space-y-3">
                                    <div className="text-[#00B8D4]">{metric.icon}</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">{metric.label}</p>
                                        <p className="text-sm font-bold text-[#212121]">{metric.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-3xl font-black text-[#212121]">Galerie du Projet</h2>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.gallery.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={`group relative rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl smooth-animation ${img.span || ""}`}
                            >
                                <img src={img.url} alt={img.title} className="w-full h-full object-cover min-h-[300px] group-hover:scale-110 smooth-animation" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 smooth-animation flex flex-col justify-end p-8 text-left text-white">
                                    <p className="text-xs font-black uppercase tracking-widest mb-1">{img.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Challenges Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-[#212121]">Défis et Solutions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.challenges.map((item, i) => (
                            <div key={i} className="space-y-4">
                                <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9] relative group hover:border-[#00B8D4]/30 smooth-animation">
                                    <div className="flex items-start space-x-6">
                                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                            <AlertCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-[#212121] mb-2">{item.title}</h4>
                                            <p className="text-sm text-[#616161] leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-[#E2E8F0] flex items-start space-x-6">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#00B8D4] mb-1">Solution MAC</p>
                                            <p className="text-sm text-[#212121] font-bold leading-relaxed">{item.solution}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Details */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-[#212121]">Détails Techniques</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-[#F1F5F9] space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] border-b border-[#F1F5F9] pb-4 flex items-center">
                                <Ruler className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                Spécifications Techniques
                            </h4>
                            <ul className="space-y-4">
                                {project.technicalDetails.specifications.map((s, i) => (
                                    <li key={i} className="text-xs text-[#616161] font-bold flex items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] mr-3" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-[#F1F5F9] space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] border-b border-[#F1F5F9] pb-4 flex items-center">
                                <Layers className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                Matériaux Utilisés
                            </h4>
                            <ul className="space-y-4">
                                {project.technicalDetails.materials.map((m, i) => (
                                    <li key={i} className="text-xs text-[#616161] font-bold flex items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] mr-3" />
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-[#F1F5F9] space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] border-b border-[#F1F5F9] pb-4 flex items-center">
                                <CheckSquare className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                Normes & Certifications
                            </h4>
                            <ul className="space-y-4">
                                {project.technicalDetails.standards.map((st, i) => (
                                    <li key={i} className="text-xs text-[#616161] font-bold flex items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] mr-3" />
                                        {st}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.technicalDetails.innovations.map((inn, i) => (
                            <div key={i} className="flex items-center space-x-6 p-8 bg-white rounded-[2rem] border border-[#F1F5F9]">
                                <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] flex items-center justify-center shrink-0">
                                    {inn.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] mb-1">{inn.title}</h4>
                                    <p className="text-xs text-[#616161] leading-relaxed">{inn.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#212121]">Témoignage Client</h2>
                    </div>
                    <div className="max-w-4xl mx-auto bg-[#F8FAFC] p-12 lg:p-20 rounded-[4rem] border border-[#F1F5F9] text-center relative overflow-hidden">
                        <Quote className="absolute top-10 right-10 w-24 h-24 text-[#00B8D4]/5" />
                        <div className="relative z-10 space-y-10">
                            <img src={project.testimonial.image} alt="Client" className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-xl" />
                            <p className="text-xl md:text-2xl text-[#212121] leading-relaxed italic font-medium">
                                "{project.testimonial.text}"
                            </p>
                            <div>
                                <h4 className="text-lg font-black text-[#212121]">{project.testimonial.author}</h4>
                                <p className="text-xs font-bold text-[#00B8D4] uppercase tracking-widest mt-1">{project.testimonial.role}</p>
                            </div>
                            <div className="flex justify-center space-x-1 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-[#E2E8F0]">
                                {project.testimonial.stats.map((s, i) => (
                                    <div key={i}>
                                        <p className="text-2xl font-black text-[#00B8D4]">{s.value}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mt-1">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Projects */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-3xl font-black text-[#212121]">Projets Similaires</h2>
                    </div>
                    <Link to="/projects" className="text-[#00B8D4] font-black text-xs uppercase tracking-widest flex items-center group">
                        Voir tout le portfolio <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 smooth-animation" />
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {project.similarProjects.map((p) => (
                            <Link
                                key={p.id}
                                to={`/projects/${p.id}`}
                                className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 smooth-animation" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-[#00B8D4] text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                            {p.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-lg font-black text-[#212121] mb-2 group-hover:text-[#00B8D4] smooth-animation">{p.title}</h3>
                                    <div className="flex items-center text-[10px] font-bold text-[#757575] uppercase tracking-widest">
                                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#00B8D4]" />
                                        {p.location}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#00B8D4] rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-[#00B8D4]/30">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        </div>
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-4xl md:text-6xl font-black leading-tight">Vous avez un Projet Similaire?</h2>
                            <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
                                Faites confiance à l'expertise MAC pour concrétiser votre vision résidentielle. Notre équipe vous accompagne de la conception à la livraison.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                                <Link to="/contact" className="px-10 py-5 bg-white text-[#00B8D4] font-black rounded-2xl shadow-xl hover:bg-[#F8FAFC] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs">
                                    Demander un Devis
                                </Link>
                                <Link to="/projects" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs">
                                    Voir tous nos Projets
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
