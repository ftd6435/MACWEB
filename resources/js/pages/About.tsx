import React from "react";
import { motion } from "framer-motion";
import {
    Award,
    Users,
    Globe,
    TrendingUp,
    ShieldCheck,
    Zap,
    Heart,
    Clock,
    CheckCircle2,
    Calendar,
    Briefcase,
    BarChart3,
    MapPin,
    Mail,
    Phone,
    Building2,
    HardHat,
    GraduationCap,
    Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
    const values = [
        {
            icon: <Award className="w-6 h-6" />,
            title: "Excellence",
            description: "Nous nous engageons à dépasser les attentes à chaque projet, en visant la perfection dans chaque détail.",
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Intégrité",
            description: "Honnêteté, transparence et respect des engagements sont au cœur de toutes nos relations.",
        },
        {
            icon: <Lightbulb className="w-6 h-6" />,
            title: "Innovation",
            description: "Nous adoptons les dernières technologies et méthodes pour créer des solutions avant-gardistes.",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Engagement Client",
            description: "Chaque client est unique et mérite une attention personnalisée pour concrétiser sa vision.",
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Durabilité",
            description: "Nous construisons pour les générations futures en respectant l'environnement et les communautés.",
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Esprit d'Équipe",
            description: "La collaboration et le partage d'expertise sont les piliers de notre succès collectif.",
        },
    ];

    const timeline = [
        {
            year: "2009",
            title: "Création de MAC",
            description: "Fondation de l'entreprise avec une vision forte : révolutionner la construction en Afrique.",
            icon: <Building2 className="w-5 h-5" />,
        },
        {
            year: "2013",
            title: "Expansion Régionale",
            description: "Extension de nos activités dans 5 pays d'Afrique de l'Ouest avec plus de 50 projets réalisés.",
            icon: <TrendingUp className="w-5 h-5" />,
        },
        {
            year: "2024",
            title: "Leader Reconnu",
            description: "Plus de 200 projets livrés avec une reconnaissance internationale de l'innovation et de la qualité.",
            icon: <Award className="w-5 h-5" />,
        },
    ];

    const team = [
        {
            name: "Mamadou Diop",
            role: "Directeur Général",
            bio: "Ingénieur civil avec 20 ans d'expérience dans la construction en Afrique.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
        },
        {
            name: "Aminata Kone",
            role: "Directrice Architecture",
            bio: "Architecte diplômée spécialisée en architecture contemporaine africaine.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
        },
        {
            name: "Ibrahim Traoré",
            role: "Chef de Projets",
            bio: "Expert en gestion de projets complexes et coordination d'équipes.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
        },
        {
            name: "Fatoumata Sy",
            role: "Directrice Qualité",
            bio: "Ingénieure qualité garante des normes et standards d'excellence.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300",
        },
    ];

    const stats = [
        { value: "15+", label: "Années d'Expérience", sub: "Au service de l'excellence" },
        { value: "200+", label: "Projets Livrés", sub: "Réalisations de qualité" },
        { value: "98%", label: "Clients Satisfaits", sub: "Taux de satisfaction" },
        { value: "150+", label: "Employés", sub: "Experts qualifiés" },
        { value: "8", label: "Pays d'Intervention", sub: "Présence régionale" },
        { value: "95%", label: "Respect des Délais", sub: "Livraison à temps" },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000"
                        alt="MAC Team"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay with Sky Blue Linear Gradient and Blur */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00B8D4]/60 via-[#00B8D4]/30 to-[#212121]/90 backdrop-blur-[2px]"></div>
                </div>
                <div className="relative z-10 text-center max-w-4xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        À Propos de MAC
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-white/90 leading-relaxed font-medium"
                    >
                        Découvrez l'histoire, les valeurs et l'équipe qui font de MAC le leader de la construction moderne en Afrique.
                    </motion.p>
                </div>
            </section>

            {/* Our History */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-black text-[#212121] mb-4">Notre Histoire</h2>
                    <p className="text-[#616161] text-lg">De nos débuts modestes à notre position de leader, découvrez l'évolution de MAC à travers les années.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    {timeline.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#00B8D4]/10 text-[#00B8D4] flex items-center justify-center mb-6 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                    {item.icon}
                                </div>
                                <span className="text-2xl font-black text-[#00B8D4] mb-2">{item.year}</span>
                                <h3 className="text-xl font-black text-[#212121] mb-3">{item.title}</h3>
                                <p className="text-[#616161] text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200"
                            alt="MAC Team Working"
                            className="rounded-[3rem] shadow-2xl"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-[#616161] leading-relaxed"
                    >
                        <p>Fonder en 2009 par une équipe d'ingénieurs et d'architectes passionnés, MAC est né d'une conviction claire : l'Afrique mérite une approche moderne et durable de la construction.</p>
                        <p>Notre parcours a été jalonné de défis relevés et d'innovations introduites. Chaque projet nous a permis d'affiner notre expertise et de développer des solutions adaptées aux spécificités du continent africain.</p>
                        <p>Aujourd'hui, MAC est bien plus qu'une entreprise de construction ; nous sommes un acteur incontournable de la construction moderne en Afrique, tout en gardant nos valeurs fondamentales d'excellence et d'intégrité.</p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-[#212121] mb-4">Notre Mission et Nos Valeurs</h2>
                        <p className="text-[#616161] text-lg">Les principes qui guident chacune de nos actions et définissent notre approche de la construction.</p>
                    </div>

                    <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-[#F1F5F9] mb-20 text-center max-w-4xl mx-auto">
                        <h3 className="text-xl font-black text-[#212121] mb-6">Notre Mission</h3>
                        <p className="text-2xl font-black text-[#212121] leading-relaxed italic">
                            "Transformer l'Afrique par des constructions d'excellence qui allient innovation architecturale, durabilité environnementale et développement humain tout en créant des espaces qui inspirent et perdurent."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-animation group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center mb-6 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                    {value.icon}
                                </div>
                                <h4 className="text-lg font-black text-[#212121] mb-3">{value.title}</h4>
                                <p className="text-[#616161] text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-black text-[#212121] mb-4">Notre Équipe</h2>
                    <p className="text-[#616161] text-lg">Rencontrez les experts qui donnent vie à vos projets avec passion et professionnalisme.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center group"
                        >
                            <div className="relative mb-6 mx-auto w-48 h-48">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-[2.5rem] shadow-lg group-hover:scale-105 smooth-animation"
                                />
                                <div className="absolute inset-0 rounded-[2.5rem] ring-4 ring-[#00B8D4]/10 group-hover:ring-[#00B8D4]/30 smooth-animation"></div>
                            </div>
                            <h4 className="text-xl font-black text-[#212121]">{member.name}</h4>
                            <p className="text-[#00B8D4] text-xs font-black uppercase tracking-widest mb-3">{member.role}</p>
                            <p className="text-[#616161] text-xs leading-relaxed px-4">{member.bio}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-[#00B8D4] rounded-[2.5rem] p-8 text-center text-white">
                    <p className="text-lg font-black">Notre équipe compte <span className="text-2xl">150+ professionnels</span> répartis dans nos différents départements : ingénierie, architecture, gestion de projets, qualité et développement durable.</p>
                </div>
            </section>

            {/* Certifications & Accreditations */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-[#212121] mb-4">Certifications et Agréments</h2>
                        <p className="text-[#616161] text-lg">Nos certifications témoignent de notre engagement envers la qualité et les normes internationales.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                        {[
                            { title: "ISO 9001:2015", desc: "Système de management de la qualité pour l'excellence de nos processus." },
                            { title: "ISO 14001:2015", desc: "Management environnemental pour une construction durable et responsable." },
                            { title: "OHSAS 18001", desc: "Gestion de la santé et sécurité au travail sur tous nos chantiers." },
                        ].map((cert, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#00B8D4] text-white flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-black text-[#212121] mb-2">{cert.title}</h4>
                                <p className="text-[#616161] text-sm leading-relaxed">{cert.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-3xl mx-auto text-center">
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] mb-8">Affiliations Professionnelles :</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="flex items-center space-x-3 text-[#616161] text-sm font-bold">
                                <CheckCircle2 className="w-5 h-5 text-[#00B8D4]" />
                                <span>Ordre des Architectes et Urbanistes d'Afrique de l'Ouest</span>
                            </div>
                            <div className="flex items-center space-x-3 text-[#616161] text-sm font-bold">
                                <CheckCircle2 className="w-5 h-5 text-[#00B8D4]" />
                                <span>Fédération Africaine des Entrepreneurs du BTP</span>
                            </div>
                            <div className="flex items-center space-x-3 text-[#616161] text-sm font-bold">
                                <CheckCircle2 className="w-5 h-5 text-[#00B8D4]" />
                                <span>Green Building Council d'Afrique</span>
                            </div>
                            <div className="flex items-center space-x-3 text-[#616161] text-sm font-bold">
                                <CheckCircle2 className="w-5 h-5 text-[#00B8D4]" />
                                <span>Ordre des Ingénieurs du Sénégal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAC en Chiffres */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-black text-[#212121] mb-4">MAC en Chiffres</h2>
                    <p className="text-[#616161] text-lg">Les chiffres qui témoignent de notre expertise et de notre impact sur le développement africain.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <span className="text-4xl md:text-5xl font-black text-[#00B8D4] block mb-2">{stat.value}</span>
                            <h4 className="text-lg font-black text-[#212121] mb-1">{stat.label}</h4>
                            <p className="text-[#9E9E9E] text-xs font-bold">{stat.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Join Us CTA */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#00B8D4] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 smooth-animation"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-8">Rejoignez l'Aventure MAC</h2>
                        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">Vous partagez notre passion pour l'excellence ? Découvrez nos opportunités de carrière et de partenariat.</p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                            <Link to="/careers" className="px-8 py-4 bg-white text-[#00B8D4] font-black rounded-2xl hover:bg-[#F8FAFC] smooth-animation uppercase tracking-widest text-xs">
                                Voir les Offres d'Emploi
                            </Link>
                            <Link to="/partnership" className="px-8 py-4 border-2 border-white text-white font-black rounded-2xl hover:bg-white hover:text-[#00B8D4] smooth-animation uppercase tracking-widest text-xs">
                                Devenir Partenaire
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-black uppercase tracking-widest">
                            <a href="mailto:rh@mac-construction.com" className="flex items-center hover:underline"><Mail className="w-5 h-5 mr-3" /> rh@mac-construction.com</a>
                            <a href="tel:+221771234567" className="flex items-center hover:underline"><Phone className="w-5 h-5 mr-3" /> +224 622 14 67 14</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
