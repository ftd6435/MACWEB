import React from "react";
import { motion } from "framer-motion";
import {
    Home,
    Building2,
    Factory,
    Droplets,
    ChevronRight,
    CheckCircle2,
    Settings,
    ShieldCheck,
    Users,
    Phone,
    Mail,
    MapPin,
    Send,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

type ServiceItem = {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string | null;
    image: string | null;
    features: string[] | null;
    is_active: boolean;
    order: number;
};

export default function Services() {
    const [heroTitle, setHeroTitle] = React.useState("Nos Services");
    const [heroDescription, setHeroDescription] = React.useState(
        "Découvrez l'ensemble de nos compétences en construction et forage, conçues pour répondre à tous vos besoins avec une excellence métier.",
    );
    const [heroImage, setHeroImage] = React.useState<string | null>(
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop",
    );
    const [overlayOpacity, setOverlayOpacity] = React.useState(60);
    const [services, setServices] = React.useState<ServiceItem[]>([]);

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/services");
                const hero = Array.isArray(res.data?.hero_slides)
                    ? res.data.hero_slides[0]
                    : null;
                if (hero?.title) setHeroTitle(String(hero.title));
                if (hero?.description)
                    setHeroDescription(String(hero.description));
                if (hero?.image) setHeroImage(String(hero.image));
                if (Array.isArray(res.data?.services)) {
                    setServices(
                        (res.data.services as ServiceItem[]).filter(
                            (s) => s && s.is_active !== false,
                        ),
                    );
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

    const renderServiceIcon = (iconName?: string | null) => {
        const icons: Record<string, JSX.Element> = {
            Home: <Home className="w-10 h-10 text-[#00B8D4]" />,
            Building2: <Building2 className="w-10 h-10 text-[#00B8D4]" />,
            Factory: <Factory className="w-10 h-10 text-[#00B8D4]" />,
            Droplets: <Droplets className="w-10 h-10 text-[#00B8D4]" />,
            ShieldCheck: <ShieldCheck className="w-10 h-10 text-[#00B8D4]" />,
            Users: <Users className="w-10 h-10 text-[#00B8D4]" />,
            Settings: <Settings className="w-10 h-10 text-[#00B8D4]" />,
            Zap: <Zap className="w-10 h-10 text-[#00B8D4]" />,
        };
        return icons[String(iconName || "")] || (
            <Settings className="w-10 h-10 text-[#00B8D4]" />
        );
    };

    const mainServices = [
        {
            icon: <Home className="w-10 h-10 text-[#00B8D4]" />,
            title: "Construction Résidentielle",
            desc: "Villas, immeubles d'habitations modernes.",
        },
        {
            icon: <Building2 className="w-10 h-10 text-[#00B8D4]" />,
            title: "Construction Commerciale",
            desc: "Bureaux, centres commerciaux et hôtellerie.",
        },
        {
            icon: <Factory className="w-10 h-10 text-[#00B8D4]" />,
            title: "Construction Industrielle",
            desc: "Usines, entrepôts et infrastructures.",
        },
        {
            icon: <Droplets className="w-10 h-10 text-[#00B8D4]" />,
            title: "Services de Forage",
            desc: "Forage d'eau, performances et exploration.",
        },
    ];

    const servicesForGrid =
        services.length > 0
            ? services.map((s) => ({
                  key: s.slug || String(s.id),
                  icon: renderServiceIcon(s.icon),
                  title: s.title,
                  desc: s.description,
              }))
            : mainServices.map((s) => ({ ...s, key: s.title }));

    const serviceDetails =
        services.length > 0
            ? services.map((s, idx) => ({
                  key: s.slug || String(s.id),
                  title: s.title,
                  desc: s.description,
                  features: Array.isArray(s.features)
                      ? s.features.filter((f) => typeof f === "string" && f.trim() !== "")
                      : [],
                  image:
                      s.image ||
                      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop",
                  link: "/projects",
                  reverse: idx % 2 === 1,
              }))
            : [
                  {
                      key: "residential",
                      title: "Construction Résidentielle",
                      desc: "Nous créons des espaces de vie exceptionnels, du logement individuel aux complexes résidentiels de grande envergure. Notre approche intègre l'architecture moderne et le respect des standards internationaux de qualité et de confort.",
                      features: [
                          "Villas et Maisons Individuelles",
                          "Complexes Résidentiels",
                          "Aménagement de Lotissements",
                      ],
                      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
                      link: "/projects?category=Residential",
                      reverse: false,
                  },
                  {
                      key: "commercial",
                      title: "Construction Commerciale",
                      desc: "Nous concevons et réalisons des espaces commerciaux qui allient fonctionnalité, esthétique et performance énergétique. Chaque projet est pensé pour optimiser l'expérience utilisateur et la rentabilité.",
                      features: [
                          "Bureaux et Tours d'Affaires",
                          "Centres Commerciaux",
                          "Hôtels et Hospitalité",
                      ],
                      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
                      link: "/projects?category=Commercial",
                      reverse: true,
                  },
                  {
                      key: "industrial",
                      title: "Construction Industrielle",
                      desc: "Nos installations industrielles sont conçues pour répondre aux exigences les plus strictes en termes de sécurité, efficacité et durabilité. Nous maîtrisons les normes internationales et les spécificités techniques.",
                      features: [
                          "Usines et Unités de Production",
                          "Entrepôts et Centres Logistiques",
                          "Infrastructures Spécialisées",
                      ],
                      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
                      link: "/projects?category=Industrial",
                      reverse: false,
                  },
              ];

    const workSteps = [
        { num: "1", title: "Consultation Initiale", desc: "Analyse de vos besoins et définition des objectifs du projet." },
        { num: "2", title: "Étude et Devis", desc: "Conception technique détaillée avec devis transparent et planifié." },
        { num: "3", title: "Planification", desc: "Organisation des ressources, obtention des autorisations et calendrier." },
        { num: "4", title: "Exécution", desc: "Réalisation avec contrôle qualité continu et communication régulière." },
        { num: "5", title: "Livraison et Suivi", desc: "Réception finale avec garanties et suivi de maintenance." }
    ];

    return (
        <div className="bg-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage || ""}
                        alt="Services Hero"
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

            {/* Excellence Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#212121] mb-6">Excellence dans Tous nos Domaines</h2>
                    <p className="text-[#616161] max-w-3xl mx-auto mb-16 leading-relaxed">
                        De la construction résidentielle au forage spécialisé, MAC vous accompagne dans tous vos projets avec des solutions sur-mesure et une expertise reconnue à travers l'Afrique.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {servicesForGrid.map((service, idx) => (
                            <motion.div
                                key={service.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 bg-[#E0F7FA] rounded-3xl border border-[#F1F5F9] hover:shadow-xl smooth-animation text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 mx-auto group-hover:bg-[#00B8D4]/10 smooth-animation shadow-sm">
                                    {service.icon}
                                </div>
                                <h4 className="text-lg font-bold text-[#212121] mb-3 leading-tight">{service.title}</h4>
                                <p className="text-[#616161] text-xs leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Construction Details */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-[#212121] mb-4">Services de Construction</h2>
                        <p className="text-[#616161] max-w-2xl mx-auto">
                            Bâtir des structures innovantes tout en respectant les normes de construction les plus élevées adaptées à chaque type de projet.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {serviceDetails.map((item, idx) => (
                            <div key={item.key} className={`flex flex-col lg:flex-row items-center gap-16 ${item.reverse ? 'lg:flex-row-reverse' : ''}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: item.reverse ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex-1 space-y-8"
                                >
                                    <h3 className="text-3xl font-black text-[#212121]">{item.title}</h3>
                                    <p className="text-[#616161] leading-relaxed text-lg">{item.desc}</p>
                                    {item.features.length > 0 && (
                                        <ul className="space-y-4">
                                            {item.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-center space-x-3">
                                                    <div className="w-6 h-6 rounded-full bg-[#00B8D4]/10 flex items-center justify-center">
                                                        <CheckCircle2 className="w-4 h-4 text-[#00B8D4]" />
                                                    </div>
                                                    <span className="font-bold text-[#212121]">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <Link to={item.link} className="inline-flex items-center text-[#00B8D4] font-black group">
                                        Voir nos projets <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 smooth-animation" />
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="flex-1"
                                >
                                    <img src={item.image} alt={item.title} className="rounded-[3rem] shadow-2xl w-full h-[400px] object-cover" />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Forage Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-[#212121] mb-4">Services de Forage</h2>
                        <p className="text-[#616161] max-w-2xl mx-auto">
                            Expertise technique avancée en forage avec des équipements de pointe pour tous types d'interventions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black text-[#212121]">Forage Professionnel Multi-Secteurs</h3>
                            <div className="space-y-6">
                                {[
                                    { icon: <Droplets className="w-6 h-6" />, title: "Forage d'Eau", desc: "Puits pour particuliers, irrigation et usage industriel avec analyse géophysique complète." },
                                    { icon: <Settings className="w-6 h-6" />, title: "Forage Géotechnique", desc: "Solutions d'exploration du sol pour vos projets d'infrastructure et d'ingénierie." },
                                    { icon: <Zap className="w-6 h-6" />, title: "Forage d'Exploration", desc: "Études géologiques et minérales pour des solutions de projets de grande envergure." }
                                ].map((forage, i) => (
                                    <div key={i} className="flex items-start space-x-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9]">
                                        <div className="w-12 h-12 rounded-xl bg-[#00B8D4] text-white flex items-center justify-center shrink-0">
                                            {forage.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#212121] mb-2">{forage.title}</h4>
                                            <p className="text-sm text-[#616161] leading-relaxed">{forage.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <img src="https://images.unsplash.com/photo-1533241242276-888998064956?q=80&w=1000&auto=format&fit=crop" alt="Forage Rig" className="rounded-[2.5rem] shadow-xl w-full h-[300px] object-cover" />
                            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop" alt="Mining" className="rounded-[2.5rem] shadow-xl w-full h-[300px] object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Method */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-[#212121] mb-4">Notre Méthode de Travail</h2>
                        <p className="text-[#616161] max-w-2xl mx-auto">
                            Un processus structuré et transparent qui garantit la réussite de votre projet du premier contact à la livraison finale.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {workSteps.map((step, i) => (
                            <div key={i} className="relative group text-center">
                                <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mx-auto mb-8 border-2 border-[#00B8D4] text-[#00B8D4] font-black text-2xl group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation relative z-10">
                                    {step.num}
                                </div>
                                {i < 4 && (
                                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-[#E0E0E0] z-0"></div>
                                )}
                                <h4 className="font-bold text-[#212121] mb-3 text-sm">{step.title}</h4>
                                <p className="text-[10px] text-[#757575] leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-12 bg-[#E0F7FA] rounded-[3rem]">
                        <div className="text-center border-b md:border-b-0 md:border-r border-[#B2EBF2] pb-8 md:pb-0">
                            <p className="text-4xl font-black text-[#00B8D4] mb-2">98%</p>
                            <p className="text-sm font-bold text-[#212121]">Projets à Temps</p>
                            <p className="text-[10px] text-[#757575] uppercase tracking-widest font-bold">Respect des délais</p>
                        </div>
                        <div className="text-center border-b md:border-b-0 md:border-r border-[#B2EBF2] py-8 md:py-0">
                            <p className="text-4xl font-black text-[#00B8D4] mb-2">15+</p>
                            <p className="text-sm font-bold text-[#212121]">Années d'Expérience</p>
                            <p className="text-[10px] text-[#757575] uppercase tracking-widest font-bold">Expertise reconnue</p>
                        </div>
                        <div className="text-center pt-8 md:pt-0">
                            <p className="text-4xl font-black text-[#00B8D4] mb-2">100%</p>
                            <p className="text-sm font-bold text-[#212121]">Satisfaction Client</p>
                            <p className="text-[10px] text-[#757575] uppercase tracking-widest font-bold">Objectif prioritaire</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#00B8D4] rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row shadow-[#00B8D4]/30">
                        <div className="lg:w-3/5 p-12 lg:p-20 text-white space-y-12">
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-black mb-6">Besoin d'un Devis Personnalisé?</h2>
                                <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                                    Contactez-nous pour discuter de votre projet. Nous vous fournirons une estimation détaillée et personnalisée dans les plus brefs délais.
                                </p>
                            </div>

                            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <input type="text" placeholder="Votre nom complet" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none smooth-animation" />
                                <input type="email" placeholder="Email professionnel" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none smooth-animation" />
                                <input type="tel" placeholder="Téléphone" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none smooth-animation" />
                                <select className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white focus:bg-white/20 focus:outline-none smooth-animation appearance-none cursor-pointer">
                                    <option className="text-[#212121]">Type de projet</option>
                                    <option className="text-[#212121]">Construction</option>
                                    <option className="text-[#212121]">Forage</option>
                                </select>
                                <textarea placeholder="Décrivez votre projet..." className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none smooth-animation sm:col-span-2 h-32 resize-none"></textarea>
                                <button className="sm:col-span-2 bg-white text-[#00B8D4] font-black py-5 rounded-2xl shadow-xl hover:bg-[#F8FAFC] hover:-translate-y-1 smooth-animation flex items-center justify-center uppercase tracking-widest text-sm">
                                    Envoyer la demande <Send className="ml-3 w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        <div className="lg:w-2/5 bg-white/10 p-12 lg:p-20 text-white border-l border-white/10 backdrop-blur-md flex flex-col justify-between">
                            <div className="space-y-12">
                                <h3 className="text-2xl font-black">Ou contactez-nous directement</h3>
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 smooth-animation shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Téléphone</p>
                                            <p className="text-lg font-bold">+221 77 518 45 67</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 smooth-animation shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Email</p>
                                            <p className="text-lg font-bold">contact@mac-construction.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 smooth-animation shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Adresse</p>
                                            <p className="text-lg font-bold">12 Avenue Cheikh Anta Diop, Dakar, Sénégal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-12 mt-12 border-t border-white/10">
                                <p className="text-xs font-medium text-white/60 italic">Nous nous engageons à vous répondre dans les 24h ouvrées.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
