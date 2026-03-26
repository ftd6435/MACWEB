import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Briefcase,
    MapPin,
    Clock,
    ChevronRight,
    Search,
    Filter,
    Send,
    FileText,
    User,
    Mail,
    Phone,
    GraduationCap,
    CheckCircle2,
    ArrowRight,
    TrendingUp,
    Users
} from "lucide-react";

export default function Careers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tous");

    const categories = ["Tous", "Ingénierie", "Architecture", "Gestion de Projet", "Terrain", "Administration"];

    const jobs = [
        {
            id: 1,
            title: "Ingénieur Civil Sénior",
            category: "Ingénierie",
            location: "Dakar, Sénégal",
            type: "CDI",
            posted: "Il y a 2 jours",
            description: "Nous recherchons un ingénieur civil expérimenté pour superviser nos projets d'infrastructure d'envergure."
        },
        {
            id: 2,
            title: "Architecte de Conception",
            category: "Architecture",
            location: "Abidjan, Côte d'Ivoire",
            type: "CDI",
            posted: "Il y a 5 jours",
            description: "Rejoignez notre équipe créative pour concevoir les bâtiments emblématiques de demain en Afrique."
        },
        {
            id: 3,
            title: "Conducteur de Travaux Forage",
            category: "Terrain",
            location: "Bamako, Mali",
            type: "CDI",
            posted: "Il y a 1 semaine",
            description: "Expert en forage d'eau pour coordonner nos équipes techniques sur le terrain."
        },
        {
            id: 4,
            title: "Chef de Projet BTP",
            category: "Gestion de Projet",
            location: "Conakry, Guinée",
            type: "CDI",
            posted: "Il y a 3 jours",
            description: "Garant de la tenue des délais et de la qualité sur nos chantiers complexes."
        }
    ];

    const benefits = [
        { icon: <GraduationCap className="w-6 h-6" />, title: "Formation Continue", desc: "Programmes de développement professionnel et certifications." },
        { icon: <CheckCircle2 className="w-6 h-6" />, title: "Assurance Santé", desc: "Couverture santé complète pour vous et votre famille." },
        { icon: <TrendingUp className="w-6 h-6" />, title: "Évolution Rapide", desc: "Des opportunités de carrière basées sur le mérite et la performance." },
        { icon: <Users className="w-6 h-6" />, title: "Esprit d'Équipe", desc: "Un environnement collaboratif et bienveillant." }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-[#F8FAFC] py-24 border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-[#212121] mb-6"
                    >
                        Rejoignez l'Équipe MAC
                    </motion.h1>
                    <p className="text-[#616161] max-w-2xl mx-auto text-lg md:text-xl font-medium">
                        Construisez votre carrière au sein d'une entreprise innovante qui transforme le paysage architectural africain.
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-black text-[#212121] mb-4">Pourquoi nous rejoindre ?</h2>
                    <p className="text-[#616161]">Nous offrons bien plus qu'un simple emploi.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-[#F1F5F9] shadow-sm hover:shadow-md smooth-animation">
                            <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center mb-6">
                                {benefit.icon}
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
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un poste..."
                                    className="pl-12 pr-6 py-3 bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm w-full md:w-64 smooth-animation"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide">
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
                        {jobs.map(job => (
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
                                        <span className="px-3 py-1 bg-[#F1F5F9] text-[#9E9E9E] text-[10px] font-black uppercase tracking-widest rounded-full">{job.type}</span>
                                    </div>
                                    <p className="text-[#616161] text-sm line-clamp-2 max-w-2xl">{job.description}</p>
                                    <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                        <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {job.category}</span>
                                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {job.location}</span>
                                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {job.posted}</span>
                                    </div>
                                </div>
                                <button className="px-8 py-4 bg-[#00B8D4] text-white font-black rounded-2xl hover:bg-[#0097A7] smooth-animation uppercase tracking-widest text-xs flex items-center gap-3 shrink-0">
                                    Postuler <ArrowRight className="w-4 h-4" />
                                </button>
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
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-[#212121] mb-4">Postuler en ligne</h2>
                    <p className="text-[#616161]">Remplissez le formulaire ci-dessous pour nous transmettre votre candidature.</p>
                </div>
                <form className="bg-white rounded-[3rem] border border-[#F1F5F9] p-10 md:p-16 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Nom complet *</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input type="text" placeholder="Votre nom" className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Email *</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input type="email" placeholder="votre@email.com" className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Téléphone *</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input type="tel" placeholder="+221 XX XXX XX XX" className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Poste souhaité *</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input type="text" placeholder="Intitulé du poste" className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">CV / Portfolio (Lien ou Message)</label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-6 text-[#9E9E9E] w-4 h-4" />
                            <textarea rows={4} placeholder="Lien vers votre CV en ligne ou message de motivation..." className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation resize-none"></textarea>
                        </div>
                    </div>

                    <button className="w-full py-5 bg-[#00B8D4] text-white font-black rounded-[1.5rem] shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                        Envoyer ma candidature <Send className="w-4 h-4" />
                    </button>
                </form>
            </section>
        </div>
    );
}
