import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Award,
    Home as HomeIcon,
    Building,
    Factory,
    Droplets,
    CheckCircle2,
    Shield,
    Clock,
    Zap,
    Users,
    Briefcase,
    LayoutGrid,
    ChevronRight,
    Star,
    Quote,
    Phone,
    Mail,
    Facebook,
    Linkedin,
    Twitter,
    Instagram
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsSlider = () => {
    const testimonials = [
        {
            name: "Amadou Diallo",
            role: "PDG, Groupe Atlantique",
            text: "MAC a dépassé nos attentes sur notre projet de siège social. Professionnalisme remarquable et respect des délais.",
            image: "https://i.pravatar.cc/150?u=amadou"
        },
        {
            name: "Fatou Kone",
            role: "Directrice, Hôtel Prestige",
            text: "La qualité de construction et l'attention aux détails de MAC ont fait de notre hôtel une référence dans la région.",
            image: "https://i.pravatar.cc/150?u=fatou"
        },
        {
            name: "Moussa Traoré",
            role: "Investisseur Immobilier",
            text: "Une équipe d'experts à l'écoute. Le suivi de chantier est transparent et rassurant.",
            image: "https://i.pravatar.cc/150?u=moussa"
        },
        {
            name: "Sarah Mendy",
            role: "Propriétaire Résidentielle",
            text: "Leur approche innovante et le respect des normes environnementales m'ont convaincue. Une expérience sans faille.",
            image: "https://i.pravatar.cc/150?u=sarah"
        }
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            setCurrentIndex(0); // Reset to first slide on resize to prevent layout issues
        };
        window.addEventListener("scroll", () => {}); // Just to trigger re-renders if needed
        window.addEventListener("resize", handleResize);

        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                const max = isMobile ? testimonials.length - 1 : Math.ceil(testimonials.length / 2) - 1;
                return prev >= max ? 0 : prev + 1;
            });
        }, 5000);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(timer);
        };
    }, [isMobile, testimonials.length]);

    return (
        <div className="relative overflow-hidden py-10 w-full">
            <div
                className="flex transition-transform duration-1000 ease-in-out w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {isMobile ? (
                    // Mobile: 1 card per slide
                    testimonials.map((t, i) => (
                        <div key={i} className="w-full flex-shrink-0 px-4">
                            <div className="bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-[#F1F5F9] relative text-center flex flex-col items-center mx-auto max-w-lg">
                                <Quote className="absolute top-8 right-8 w-12 h-12 text-[#00B8D4]/5" />
                                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow-md" />
                                <p className="text-sm text-[#616161] leading-relaxed italic mb-6">
                                    "{t.text}"
                                </p>
                                <h4 className="font-bold text-[#212121] text-base">{t.name}</h4>
                                <p className="text-[10px] text-[#00B8D4] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    // Desktop: 2 cards per slide
                    Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, slideIdx) => (
                        <div key={slideIdx} className="w-full flex-shrink-0 px-4">
                            <div className="grid grid-cols-2 gap-8 w-full">
                                {testimonials.slice(slideIdx * 2, slideIdx * 2 + 2).map((t, i) => (
                                    <div key={i} className="bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-[#F1F5F9] relative text-center flex flex-col items-center h-full">
                                        <Quote className="absolute top-8 right-8 w-12 h-12 text-[#00B8D4]/5" />
                                        <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow-md" />
                                        <p className="text-sm text-[#616161] leading-relaxed italic mb-6 flex-1">
                                            "{t.text}"
                                        </p>
                                        <h4 className="font-bold text-[#212121] text-base">{t.name}</h4>
                                        <p className="text-[10px] text-[#00B8D4] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: isMobile ? testimonials.length : Math.ceil(testimonials.length / 2) }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full smooth-animation ${currentIndex === i ? "bg-[#00B8D4] w-6" : "bg-[#E0E0E0]"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default function Home() {
    const services = [
        {
            icon: <HomeIcon className="w-10 h-10 text-[#00B8D4]" />,
            title: "Construction Résidentielle",
            desc: "Maisons individuelles, résidences et complexes d'habitation modernes.",
        },
        {
            icon: <Building className="w-10 h-10 text-[#00B8D4]" />,
            title: "Construction Commerciale",
            desc: "Bureaux, centres commerciaux et espaces d'affaires contemporains.",
        },
        {
            icon: <Factory className="w-10 h-10 text-[#00B8D4]" />,
            title: "Construction Industrielle",
            desc: "Usines, entrepôts et installations industrielles adaptées.",
        },
        {
            icon: <Droplets className="w-10 h-10 text-[#00B8D4]" />,
            title: "Forage",
            desc: "Services de forage professionnel pour tous types de terrains.",
        },
    ];

    const projects = [
        {
            id: 1,
            title: "Résidence Les Palmiers",
            category: "Complexe Résidentiel",
            location: "Dakar",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Centre d'Affaires Atlantique",
            category: "Bureau Commercial",
            location: "Abidjan",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Usine Textile Moderne",
            category: "Installation Industrielle",
            location: "Lomé",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Hôtel Prestige Sahel",
            category: "Hôtellerie",
            location: "Ouagadougou",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "Centre Commercial Baobab",
            category: "Commerce",
            location: "Bamako",
            image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "Campus Universitaire Innovation",
            category: "Éducation",
            location: "Cotonou",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
        },
    ];

    const features = [
        {
            icon: <Award className="w-8 h-8" />,
            title: "Expertise Reconnue",
            desc: "Plus de 15 ans d'expérience dans la construction en Afrique.",
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Délais Respectés",
            desc: "98% de nos projets livrés dans les temps convenus.",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Qualité Garantie",
            desc: "Matériaux premium et normes de construction internationales.",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Accompagnement Personnalisé",
            desc: "Équipe dédiée pour chaque projet du début à la fin.",
        },
    ];

    const stats = [
        { value: "15+", label: "Années d'Expérience", sub: "Au service de l'excellence" },
        { value: "200+", label: "Projets Livrés", sub: "Réalisations de qualité" },
        { value: "98%", label: "Clients Satisfaits", sub: "Taux de satisfaction" },
    ];

    const blogPosts = [
        {
            id: 1,
            title: "Les Tendances de Construction Durable en Afrique",
            date: "12 Septembre 2024",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
            excerpt: "Comment l'innovation durable transforme les pratiques de construction locales pour un avenir plus vert."
        },
        {
            id: 2,
            title: "Optimiser la Planification de Votre Projet",
            date: "08 Septembre 2024",
            image: "https://images.unsplash.com/photo-1503387762-592dee58c160?auto=format&fit=crop&q=80&w=800",
            excerpt: "Les étapes clés pour assurer la réussite de votre projet de construction, de la conception à la livraison."
        },
        {
            id: 3,
            title: "Innovations Technologiques en Construction",
            date: "05 Septembre 2024",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
            excerpt: "L'impact des nouvelles technologies sur l'efficacité, la sécurité et la qualité des chantiers modernes."
        },
    ];

    const heroImages = [
         "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000",
         "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000",
         "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000",
     ];

    const [currentHeroIndex, setCurrentHeroIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    return (
        <div className="bg-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <AnimatePresence>
                        <motion.div
                            key={currentHeroIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                 src={heroImages[currentHeroIndex]}
                                 alt="Construction Background"
                                 className="w-full h-full object-cover"
                             />
                         </motion.div>
                     </AnimatePresence>
                  </div>

                  {/* Static Overlay - Outside the animation container to ensure no interference */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#00B8D4]/60 via-[#00B8D4]/30 to-[#212121]/90 backdrop-blur-[2px]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] max-w-4xl mx-auto">
                            Excellence en Construction, Innovation Architecturale
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                            MAC transforme vos projets en réalités durables grâce à notre expertise reconnue en construction moderne, résidentielle et industrielle à travers l'Afrique.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center px-8 py-4 bg-[#00B8D4] text-white font-bold rounded-xl shadow-lg shadow-[#00B8D4]/30 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation"
                            >
                                Découvrir nos Services
                            </Link>
                            <Link
                                to="/projects"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 hover:-translate-y-1 smooth-animation"
                            >
                                Voir nos Projets
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Nos Domaines d'Expertise */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#212121] mb-4">Nos Domaines d'Expertise</h2>
                        <p className="text-[#616161] max-w-2xl mx-auto">
                            Des solutions complètes pour tous vos projets de construction, de la conception à la réalisation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 bg-[#E0F7FA] rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation text-center"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 mx-auto group-hover:bg-[#00B8D4]/10 smooth-animation">
                                    {service.icon}
                                </div>
                                <h4 className="text-lg font-bold text-[#212121] mb-3 leading-tight">{service.title}</h4>
                                <p className="text-[#616161] text-xs leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/services" className="inline-flex items-center text-[#00B8D4] text-sm font-bold hover:translate-x-1 smooth-animation">
                            Voir tous nos Services <ChevronRight className="ml-1 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Nos Réalisations Phares */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#212121] mb-4">Nos Réalisations Phares</h2>
                        <p className="text-[#616161] max-w-2xl mx-auto">
                            Découvrez quelques-uns de nos projets les plus emblématiques réalisés avec excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-2xl smooth-animation"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#212121] mb-1">{project.title}</h3>
                                    <p className="text-xs text-[#757575] font-medium">{project.category} • {project.location}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/projects" className="inline-flex items-center text-[#00B8D4] text-sm font-bold hover:translate-x-1 smooth-animation">
                            Voir tous nos Projets <ChevronRight className="ml-1 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Pourquoi Choisir MAC */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#212121] mb-4">Pourquoi Choisir MAC</h2>
                        <p className="text-[#616161] max-w-2xl mx-auto">
                            Notre engagement envers l'excellence se reflète dans chaque projet que nous réalisons.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#00B8D4]/10 text-[#00B8D4] flex items-center justify-center mx-auto mb-6">
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-bold text-[#212121] mb-3">{feature.title}</h4>
                                <p className="text-xs text-[#616161] leading-relaxed max-w-[200px] mx-auto">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-8 bg-[#E0F7FA] rounded-[3rem]">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <p className="text-5xl font-black text-[#00B8D4] mb-2">{stat.value}</p>
                                <p className="text-lg font-bold text-[#212121] mb-1">{stat.label}</p>
                                <p className="text-[10px] text-[#757575] font-bold uppercase tracking-widest">{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TestimonialsSlider />
                </div>
            </section>

            {/* Actualités & Conseils */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#212121] mb-4">Actualités & Conseils</h2>
                        <p className="text-[#616161] max-w-2xl mx-auto">
                            Restez informés des dernières tendances en construction et de nos réalisations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {blogPosts.map((post, idx) => (
                            <motion.article
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 smooth-animation" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <p className="text-[10px] font-bold text-[#757575] mb-3 uppercase tracking-widest">{post.date}</p>
                                    <h3 className="text-lg font-bold text-[#212121] mb-4 leading-tight group-hover:text-[#00B8D4] smooth-animation">{post.title}</h3>
                                    <p className="text-xs text-[#616161] mb-6 line-clamp-2">{post.excerpt}</p>
                                    <Link to={`/blog/${post.id}`} className="mt-auto inline-flex items-center text-xs font-bold text-[#00B8D4] group/btn">
                                        Lire la suite <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 smooth-animation" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/blog" className="inline-flex items-center text-[#00B8D4] text-sm font-bold hover:translate-x-1 smooth-animation">
                            Voir tous les articles <ChevronRight className="ml-1 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#00B8D4] rounded-[3.5rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-[#00B8D4]/20">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                                Prêt à Lancer Votre Projet?
                            </h2>
                            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                                Contactez-nous dès aujourd'hui pour discuter de votre vision et découvrir comment nous pouvons la concrétiser.
                            </p>

                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#00B8D4] font-black rounded-xl shadow-xl hover:bg-[#F8FAFC] hover:-translate-y-1 smooth-animation mb-12 uppercase tracking-wider text-sm"
                            >
                                Contactez-nous Maintenant
                            </Link>

                            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                <a href="tel:+221775184567" className="flex items-center space-x-3 font-bold group text-sm">
                                    <Phone className="w-5 h-5" />
                                    <span>+224 622 14 67 14</span>
                                </a>
                                <a href="mailto:contact@mac-construction.com" className="flex items-center space-x-3 font-bold group text-sm">
                                    <Mail className="w-5 h-5" />
                                    <span>contact@mac-construction.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
