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
import axios from "axios";

type Testimonial = {
    id?: number;
    name: string;
    role: string;
    company?: string;
    content?: string;
    text?: string;
    image: string | null;
};

const TestimonialsSlider = ({ testimonials = [] }: { testimonials?: Testimonial[] }) => {
    // Use fallback if no testimonials provided
    const defaultTestimonials: Testimonial[] = [
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

    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

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
                const max = isMobile ? displayTestimonials.length - 1 : Math.ceil(displayTestimonials.length / 2) - 1;
                return prev >= max ? 0 : prev + 1;
            });
        }, 5000);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(timer);
        };
    }, [isMobile, displayTestimonials.length]);

    return (
        <div className="relative overflow-hidden py-10 w-full">
            <div
                className="flex transition-transform duration-1000 ease-in-out w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {isMobile ? (
                    // Mobile: 1 card per slide
                    displayTestimonials.map((t, i) => (
                        <div key={i} className="w-full flex-shrink-0 px-4">
                            <div className="bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-[#F1F5F9] relative text-center flex flex-col items-center mx-auto max-w-lg">
                                <Quote className="absolute top-8 right-8 w-12 h-12 text-[#00B8D4]/5" />
                                <img src={t.image || 'https://i.pravatar.cc/150'} alt={t.name} className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow-md" />
                                <p className="text-sm text-[#616161] leading-relaxed italic mb-6">
                                    "{t.content || t.text}"
                                </p>
                                <h4 className="font-bold text-[#212121] text-base">{t.name}</h4>
                                <p className="text-[10px] text-[#00B8D4] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    // Desktop: 2 cards per slide
                    Array.from({ length: Math.ceil(displayTestimonials.length / 2) }).map((_, slideIdx) => (
                        <div key={slideIdx} className="w-full flex-shrink-0 px-4">
                            <div className="grid grid-cols-2 gap-8 w-full">
                                {displayTestimonials.slice(slideIdx * 2, slideIdx * 2 + 2).map((t, i) => (
                                    <div key={i} className="bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-[#F1F5F9] relative text-center flex flex-col items-center h-full">
                                        <Quote className="absolute top-8 right-8 w-12 h-12 text-[#00B8D4]/5" />
                                        <img src={t.image || 'https://i.pravatar.cc/150'} alt={t.name} className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow-md" />
                                        <p className="text-sm text-[#616161] leading-relaxed italic mb-6 flex-1">
                                            "{t.content || t.text}"
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
                {Array.from({ length: isMobile ? displayTestimonials.length : Math.ceil(displayTestimonials.length / 2) }).map((_, i) => (
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

type ServiceItem = {
    id?: number;
    title: string;
    slug?: string;
    description: string;
    icon: string | null;
    image?: string | null;
};

type ProjectItem = {
    id: number;
    slug: string;
    title: string;
    description?: string;
    image: string | null;
    location: string | null;
    year?: string | null;
    category?: { id: number; name: string } | null;
};

type StatItem = {
    id?: number;
    label: string;
    value: string;
    sub?: string;
    icon?: string;
};

type ArticleItem = {
    id: number;
    slug: string;
    title: string;
    excerpt?: string;
    image: string | null;
    published_at: string;
    author?: { name: string };
    category?: { name: string };
};

export default function Home() {
    // State for all dynamic data
    const [services, setServices] = React.useState<ServiceItem[]>([]);
    const [projects, setProjects] = React.useState<ProjectItem[]>([]);
    const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
    const [stats, setStats] = React.useState<StatItem[]>([]);
    const [blogPosts, setBlogPosts] = React.useState<ArticleItem[]>([]);

    const featureIconMap = {
        Award,
        Clock,
        Shield,
        Users,
    };

    type FeatureItem = {
        title: string;
        desc: string;
        icon: keyof typeof featureIconMap;
    };

    const defaultFeatures: FeatureItem[] = [
        {
            icon: "Award",
            title: "Expertise Reconnue",
            desc: "Plus de 15 ans d'expérience dans la construction en Afrique.",
        },
        {
            icon: "Clock",
            title: "Délais Respectés",
            desc: "98% de nos projets livrés dans les temps convenus.",
        },
        {
            icon: "Shield",
            title: "Qualité Garantie",
            desc: "Matériaux premium et normes de construction internationales.",
        },
        {
            icon: "Users",
            title: "Accompagnement Personnalisé",
            desc: "Équipe dédiée pour chaque projet du début à la fin.",
        },
    ];

    const [features, setFeatures] =
        React.useState<FeatureItem[]>(defaultFeatures);
    type HeroSlide = {
        id: number;
        title: string | null;
        subtitle: string | null;
        description: string | null;
        cta_text: string | null;
        cta_link: string | null;
        cta_secondary_text: string | null;
        cta_secondary_link: string | null;
        image: string | null;
        overlay_opacity: number | null;
        order: number;
    };
    const [heroSlides, setHeroSlides] = React.useState<HeroSlide[]>([]);
    const [contactPhone, setContactPhone] = React.useState("+224 622 14 67 14");
    const [contactEmail, setContactEmail] = React.useState("contact@mac-construction.com");

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/home");

                // Hero Slides
                const slides = Array.isArray(res.data?.hero_slides)
                    ? (res.data.hero_slides as HeroSlide[])
                    : [];
                if (slides.length > 0) setHeroSlides(slides);

                // Home Features (existing code)
                const list = Array.isArray(res.data?.home_features)
                    ? res.data.home_features
                    : null;
                if (list) {
                    const mapped: FeatureItem[] = list
                        .slice()
                        .sort(
                            (a: any, b: any) =>
                                (a?.order ?? 0) - (b?.order ?? 0),
                        )
                        .map((item: any) => {
                            const iconName = String(item?.icon || "Award");
                            const safeIcon =
                                iconName in featureIconMap
                                    ? (iconName as FeatureItem["icon"])
                                    : "Award";

                            return {
                                title: String(item?.label || ""),
                                desc: String(item?.value || ""),
                                icon: safeIcon,
                            };
                        })
                        .filter((f: FeatureItem) => f.title.trim().length > 0);

                    if (mapped.length > 0) setFeatures(mapped);
                }

                // Services
                if (Array.isArray(res.data?.services)) {
                    setServices(res.data.services);
                }

                // Featured Projects
                if (Array.isArray(res.data?.featured_projects)) {
                    setProjects(res.data.featured_projects);
                }

                // Testimonials
                if (Array.isArray(res.data?.testimonials)) {
                    setTestimonials(res.data.testimonials);
                }

                // Stats
                if (Array.isArray(res.data?.stats)) {
                    setStats(res.data.stats);
                }

                // Recent Articles (Blog Posts)
                if (Array.isArray(res.data?.recent_articles)) {
                    setBlogPosts(res.data.recent_articles);
                }

                // Load contact info from global settings
                const globalRes = await axios.get("/api/cms/global");
                const settings = globalRes.data?.settings;
                if (settings) {
                    const contactGroup = settings.contact || [];
                    const phone = contactGroup.find((s: any) => s.key === 'main_phone')?.value;
                    const email = contactGroup.find((s: any) => s.key === 'main_email')?.value;

                    if (phone) setContactPhone(String(phone));
                    if (email) setContactEmail(String(email));
                }
            } catch {
                return;
            }
        };
        load();
    }, []);

    // Icon mapping for services
    const serviceIconMap: Record<string, JSX.Element> = {
        Home: <HomeIcon className="w-10 h-10 text-[#00B8D4]" />,
        Building2: <Building className="w-10 h-10 text-[#00B8D4]" />,
        Building: <Building className="w-10 h-10 text-[#00B8D4]" />,
        Factory: <Factory className="w-10 h-10 text-[#00B8D4]" />,
        Droplets: <Droplets className="w-10 h-10 text-[#00B8D4]" />,
    };

    const getServiceIcon = (iconName: string | null | undefined) => {
        if (!iconName) return <Building className="w-10 h-10 text-[#00B8D4]" />;
        return serviceIconMap[iconName] || <Building className="w-10 h-10 text-[#00B8D4]" />;
    };

    // Format date helper
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    const [currentHeroIndex, setCurrentHeroIndex] = React.useState(0);
    const fallbackHeroSlides: HeroSlide[] = [
        {
            id: -1,
            title: "Excellence en Construction, Innovation Architecturale",
            subtitle: null,
            description:
                "MAC transforme vos projets en réalités durables grâce à notre expertise reconnue en construction moderne, résidentielle et industrielle à travers l'Afrique.",
            cta_text: "Découvrir nos Services",
            cta_link: "/services",
            cta_secondary_text: "Voir nos Projets",
            cta_secondary_link: "/projects",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000",
            overlay_opacity: 60,
            order: 0,
        },
        {
            id: -2,
            title: "Excellence en Construction, Innovation Architecturale",
            subtitle: null,
            description:
                "MAC transforme vos projets en réalités durables grâce à notre expertise reconnue en construction moderne, résidentielle et industrielle à travers l'Afrique.",
            cta_text: "Découvrir nos Services",
            cta_link: "/services",
            cta_secondary_text: "Voir nos Projets",
            cta_secondary_link: "/projects",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000",
            overlay_opacity: 60,
            order: 1,
        },
        {
            id: -3,
            title: "Excellence en Construction, Innovation Architecturale",
            subtitle: null,
            description:
                "MAC transforme vos projets en réalités durables grâce à notre expertise reconnue en construction moderne, résidentielle et industrielle à travers l'Afrique.",
            cta_text: "Découvrir nos Services",
            cta_link: "/services",
            cta_secondary_text: "Voir nos Projets",
            cta_secondary_link: "/projects",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000",
            overlay_opacity: 60,
            order: 2,
        },
    ];
    const slidesForHero =
        heroSlides.length >= 2 ? heroSlides : fallbackHeroSlides;
    const currentSlide = slidesForHero[currentHeroIndex] || slidesForHero[0];
    const heroOverlayOpacity =
        typeof currentSlide?.overlay_opacity === "number" &&
        Number.isFinite(currentSlide.overlay_opacity)
            ? Math.max(0, Math.min(100, currentSlide.overlay_opacity))
            : 60;

    React.useEffect(() => {
        if (slidesForHero.length < 2) return;
        const timer = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % slidesForHero.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slidesForHero.length]);

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
                                 src={currentSlide?.image || ""}
                                 alt="Construction Background"
                                 className="w-full h-full object-cover"
                             />
                         </motion.div>
                     </AnimatePresence>
                  </div>

                  {/* Static Overlay - Outside the animation container to ensure no interference */}
                  <div
                      className="absolute inset-0 z-10 bg-gradient-to-b from-[#00B8D4]/60 via-[#00B8D4]/30 to-[#212121]/90 backdrop-blur-[2px]"
                      style={{ opacity: heroOverlayOpacity / 100 }}
                  />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] max-w-4xl mx-auto">
                            {currentSlide?.title ||
                                "Excellence en Construction, Innovation Architecturale"}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                            {currentSlide?.description ||
                                "MAC transforme vos projets en réalités durables grâce à notre expertise reconnue en construction moderne, résidentielle et industrielle à travers l'Afrique."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link
                                to={currentSlide?.cta_link || "/services"}
                                className="inline-flex items-center justify-center px-8 py-4 bg-[#00B8D4] text-white font-bold rounded-xl shadow-lg shadow-[#00B8D4]/30 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation"
                            >
                                {currentSlide?.cta_text || "Découvrir nos Services"}
                            </Link>
                            <Link
                                to={currentSlide?.cta_secondary_link || "/projects"}
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 hover:-translate-y-1 smooth-animation"
                            >
                                {currentSlide?.cta_secondary_text || "Voir nos Projets"}
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
                        {services.length > 0 ? services.map((service, idx) => (
                            <motion.div
                                key={service.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 bg-[#E0F7FA] rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation text-center"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 mx-auto group-hover:bg-[#00B8D4]/10 smooth-animation">
                                    {getServiceIcon(service.icon)}
                                </div>
                                <h4 className="text-lg font-bold text-[#212121] mb-3 leading-tight">{service.title}</h4>
                                <p className="text-[#616161] text-xs leading-relaxed">{service.description}</p>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center py-8 text-[#9E9E9E]">
                                <p>Chargement des services...</p>
                            </div>
                        )}
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
                        {projects.length > 0 ? projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-2xl smooth-animation"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={project.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop'}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#212121] mb-1">{project.title}</h3>
                                    <p className="text-xs text-[#757575] font-medium">
                                        {project.category?.name || 'Projet'} • {project.location || 'Location'}
                                    </p>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center py-8 text-[#9E9E9E]">
                                <p>Chargement des projets...</p>
                            </div>
                        )}
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
                        {features.map((feature, idx) => {
                            const Icon = featureIconMap[feature.icon];
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-[#00B8D4]/10 text-[#00B8D4] flex items-center justify-center mx-auto mb-6">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-lg font-bold text-[#212121] mb-3">
                                        {feature.title}
                                    </h4>
                                    <p className="text-xs text-[#616161] leading-relaxed max-w-[200px] mx-auto">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-8 bg-[#E0F7FA] rounded-[3rem]">
                        {stats.length > 0 ? stats.map((stat, idx) => (
                            <div key={stat.id || idx} className="text-center">
                                <p className="text-5xl font-black text-[#00B8D4] mb-2">{stat.value}</p>
                                <p className="text-lg font-bold text-[#212121] mb-1">{stat.label}</p>
                                {stat.sub && <p className="text-[10px] text-[#757575] font-bold uppercase tracking-widest">{stat.sub}</p>}
                            </div>
                        )) : (
                            <div className="col-span-full text-center py-8 text-[#9E9E9E]">
                                <p>Chargement des statistiques...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TestimonialsSlider testimonials={testimonials} />
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
                        {blogPosts.length > 0 ? blogPosts.map((post, idx) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <p className="text-[10px] font-bold text-[#757575] mb-3 uppercase tracking-widest">
                                        {formatDate(post.published_at)}
                                    </p>
                                    <h3 className="text-lg font-bold text-[#212121] mb-4 leading-tight group-hover:text-[#00B8D4] smooth-animation">{post.title}</h3>
                                    <p className="text-xs text-[#616161] mb-6 line-clamp-2">{post.excerpt}</p>
                                    <Link to={`/blog/${post.slug}`} className="mt-auto inline-flex items-center text-xs font-bold text-[#00B8D4] group/btn">
                                        Lire la suite <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 smooth-animation" />
                                    </Link>
                                </div>
                            </motion.article>
                        )) : (
                            <div className="col-span-full text-center py-8 text-[#9E9E9E]">
                                <p>Chargement des articles...</p>
                            </div>
                        )}
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
                                <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center space-x-3 font-bold group text-sm">
                                    <Phone className="w-5 h-5" />
                                    <span>{contactPhone}</span>
                                </a>
                                <a href={`mailto:${contactEmail}`} className="flex items-center space-x-3 font-bold group text-sm">
                                    <Mail className="w-5 h-5" />
                                    <span>{contactEmail}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
