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
import axios from "axios";

export default function About() {
    const valueIconMap = {
        Award,
        ShieldCheck,
        Lightbulb,
        Users,
        Globe,
        Heart,
    };

    type ValueItem = {
        icon: keyof typeof valueIconMap;
        title: string;
        description: string;
    };

    type TimelineItem = {
        id?: number;
        year: string;
        title: string;
        description: string;
        icon?: string;
        order?: number;
    };

    type TeamMemberItem = {
        id?: number;
        name: string;
        role: string;
        bio: string;
        image: string | null;
        linkedin?: string | null;
        email?: string | null;
        is_active?: boolean;
        order?: number;
    };

    type StatItem = {
        id?: number;
        label: string;
        value: string;
        sub?: string;
        icon?: string;
        order?: number;
    };

    const defaultHero = {
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000",
        title: "À Propos de MAC",
        description:
            "Découvrez l'histoire, les valeurs et l'équipe qui font de MAC le leader de la construction moderne en Afrique.",
    };

    const defaultStory = {
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200",
        paragraphs: [
            "Fonder en 2009 par une équipe d'ingénieurs et d'architectes passionnés, MAC est né d'une conviction claire : l'Afrique mérite une approche moderne et durable de la construction.",
            "Notre parcours a été jalonné de défis relevés et d'innovations introduites. Chaque projet nous a permis d'affiner notre expertise et de développer des solutions adaptées aux spécificités du continent africain.",
            "Aujourd'hui, MAC est bien plus qu'une entreprise de construction ; nous sommes un acteur incontournable de la construction moderne en Afrique, tout en gardant nos valeurs fondamentales d'excellence et d'intégrité.",
        ],
    };

    const defaultMission =
        "Transformer l'Afrique par des constructions d'excellence qui allient innovation architecturale, durabilité environnementale et développement humain tout en créant des espaces qui inspirent et perdurent.";

    const defaultValuesIntro = {
        title: "Notre Mission et Nos Valeurs",
        subtitle:
            "Les principes qui guident chacune de nos actions et définissent notre approche de la construction.",
    };

    const defaultValues: ValueItem[] = [
        {
            icon: "Award",
            title: "Excellence",
            description:
                "Nous nous engageons à dépasser les attentes à chaque projet, en visant la perfection dans chaque détail.",
        },
        {
            icon: "ShieldCheck",
            title: "Intégrité",
            description:
                "Honnêteté, transparence et respect des engagements sont au cœur de toutes nos relations.",
        },
        {
            icon: "Lightbulb",
            title: "Innovation",
            description:
                "Nous adoptons les dernières technologies et méthodes pour créer des solutions avant-gardistes.",
        },
        {
            icon: "Users",
            title: "Engagement Client",
            description:
                "Chaque client est unique et mérite une attention personnalisée pour concrétiser sa vision.",
        },
        {
            icon: "Globe",
            title: "Durabilité",
            description:
                "Nous construisons pour les générations futures en respectant l'environnement et les communautés.",
        },
        {
            icon: "Heart",
            title: "Esprit d'Équipe",
            description:
                "La collaboration et le partage d'expertise sont les piliers de notre succès collectif.",
        },
    ];

    const [hero, setHero] = React.useState(defaultHero);
    const [story, setStory] = React.useState(defaultStory);
    const [mission, setMission] = React.useState(defaultMission);
    const [valuesIntro, setValuesIntro] = React.useState(defaultValuesIntro);
    const [values, setValues] = React.useState<ValueItem[]>(defaultValues);
    const [timeline, setTimeline] = React.useState<TimelineItem[]>([]);
    const [team, setTeam] = React.useState<TeamMemberItem[]>([]);
    const [stats, setStats] = React.useState<StatItem[]>([]);
    const [teamSizeNote, setTeamSizeNote] = React.useState("Notre équipe compte 150+ professionnels répartis dans nos différents départements : ingénierie, architecture, gestion de projets, qualité et développement durable.");

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/about");
                const heroSlide = Array.isArray(res.data?.hero_slides)
                    ? res.data.hero_slides?.[0]
                    : null;
                if (heroSlide) {
                    setHero({
                        image: String(heroSlide?.image || defaultHero.image),
                        title: String(heroSlide?.title || defaultHero.title),
                        description: String(
                            heroSlide?.description || defaultHero.description,
                        ),
                    });
                }

                const sections = res.data?.sections || {};
                const storySection = sections?.story;
                if (storySection) {
                    const content = String(storySection?.content || "");
                    const paragraphs = content
                        .split(/\n\s*\n/g)
                        .map((p: string) => p.trim())
                        .filter((p: string) => p.length > 0);
                    setStory({
                        image: String(storySection?.image || defaultStory.image),
                        paragraphs:
                            paragraphs.length > 0
                                ? paragraphs
                                : defaultStory.paragraphs,
                    });
                }

                const missionSection = sections?.mission;
                if (missionSection?.content) {
                    setMission(String(missionSection.content));
                }

                const valuesIntroSection = sections?.values_intro;
                if (valuesIntroSection) {
                    setValuesIntro({
                        title: String(
                            valuesIntroSection?.title ||
                                defaultValuesIntro.title,
                        ),
                        subtitle: String(
                            valuesIntroSection?.subtitle ||
                                defaultValuesIntro.subtitle,
                        ),
                    });
                }

                const apiValues = Array.isArray(res.data?.values)
                    ? res.data.values
                    : null;
                if (apiValues) {
                    const mapped: ValueItem[] = apiValues
                        .slice()
                        .sort(
                            (a: any, b: any) =>
                                (a?.order ?? 0) - (b?.order ?? 0),
                        )
                        .map((v: any) => {
                            const iconName = String(v?.icon || "Award");
                            const safeIcon =
                                iconName in valueIconMap
                                    ? (iconName as ValueItem["icon"])
                                    : "Award";
                            return {
                                icon: safeIcon,
                                title: String(v?.title || ""),
                                description: String(v?.description || ""),
                            };
                        })
                        .filter(
                            (v: ValueItem) => v.title.trim().length > 0,
                        );
                    if (mapped.length > 0) setValues(mapped);
                }

                // Timeline
                if (Array.isArray(res.data?.timeline)) {
                    setTimeline(res.data.timeline);
                }

                // Team Members
                if (Array.isArray(res.data?.team)) {
                    setTeam(res.data.team);
                }

                // Statistics
                if (Array.isArray(res.data?.stats)) {
                    setStats(res.data.stats);
                }

                // Load team size note from global settings
                const globalRes = await axios.get("/api/cms/global");
                const settings = globalRes.data?.settings;
                const generalGroup = settings?.general || [];
                const teamNote = generalGroup.find((s: any) => s.key === 'team_size_note')?.value;
                if (teamNote) setTeamSizeNote(String(teamNote));
            } catch {
                return;
            }
        };
        load();
    }, []);

    // Icon mapping for timeline
    const timelineIconMap: Record<string, JSX.Element> = {
        Building2: <Building2 className="w-5 h-5" />,
        TrendingUp: <TrendingUp className="w-5 h-5" />,
        Award: <Award className="w-5 h-5" />,
        Users: <Users className="w-5 h-5" />,
        Globe: <Globe className="w-5 h-5" />,
        Briefcase: <Briefcase className="w-5 h-5" />,
    };

    const getTimelineIcon = (iconName: string | null | undefined) => {
        if (!iconName) return <Building2 className="w-5 h-5" />;
        return timelineIconMap[iconName] || <Building2 className="w-5 h-5" />;
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={hero.image}
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
                        {hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-white/90 leading-relaxed font-medium"
                    >
                        {hero.description}
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
                    {timeline.length > 0 ? timeline.map((item, idx) => (
                        <motion.div
                            key={item.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#00B8D4]/10 text-[#00B8D4] flex items-center justify-center mb-6 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                    {getTimelineIcon(item.icon)}
                                </div>
                                <span className="text-2xl font-black text-[#00B8D4] mb-2">{item.year}</span>
                                <h3 className="text-xl font-black text-[#212121] mb-3">{item.title}</h3>
                                <p className="text-[#616161] text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="col-span-full text-center py-8 text-[#9E9E9E]">
                            <p>Chargement de l'historique...</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={story.image}
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
                        {story.paragraphs.map((p, idx) => (
                            <p key={idx}>{p}</p>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-[#212121] mb-4">
                            {valuesIntro.title}
                        </h2>
                        <p className="text-[#616161] text-lg">
                            {valuesIntro.subtitle}
                        </p>
                    </div>

                    <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-[#F1F5F9] mb-20 text-center max-w-4xl mx-auto">
                        <h3 className="text-xl font-black text-[#212121] mb-6">Notre Mission</h3>
                        <p className="text-2xl font-black text-[#212121] leading-relaxed italic">
                            “{mission}”
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, idx) => {
                            const Icon = valueIconMap[value.icon];
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-10 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-animation group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center mb-6 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-lg font-black text-[#212121] mb-3">
                                        {value.title}
                                    </h4>
                                    <p className="text-[#616161] text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
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
                    {team.length > 0 ? team.map((member, idx) => (
                        <motion.div
                            key={member.id || idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center group"
                        >
                            <div className="relative mb-6 mx-auto w-48 h-48">
                                <img
                                    src={member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300'}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-[2.5rem] shadow-lg group-hover:scale-105 smooth-animation"
                                />
                                <div className="absolute inset-0 rounded-[2.5rem] ring-4 ring-[#00B8D4]/10 group-hover:ring-[#00B8D4]/30 smooth-animation"></div>
                            </div>
                            <h4 className="text-xl font-black text-[#212121]">{member.name}</h4>
                            <p className="text-[#00B8D4] text-xs font-black uppercase tracking-widest mb-3">{member.role}</p>
                            <p className="text-[#616161] text-xs leading-relaxed px-4">{member.bio}</p>
                        </motion.div>
                    )) : (
                        <div className="col-span-full text-center py-8 text-[#9E9E9E]">
                            <p>Chargement de l'équipe...</p>
                        </div>
                    )}
                </div>

                <div className="bg-[#00B8D4] rounded-[2.5rem] p-8 text-center text-white">
                    <p className="text-lg font-black">{teamSizeNote}</p>
                </div>
            </section>

            {/* MAC en Chiffres */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-black text-[#212121] mb-4">MAC en Chiffres</h2>
                    <p className="text-[#616161] text-lg">Les chiffres qui témoignent de notre expertise et de notre impact sur le développement africain.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
                    {stats.length > 0 ? stats.map((stat, idx) => (
                        <motion.div
                            key={stat.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <span className="text-4xl md:text-5xl font-black text-[#00B8D4] block mb-2">{stat.value}</span>
                            <h4 className="text-lg font-black text-[#212121] mb-1">{stat.label}</h4>
                            {stat.sub && <p className="text-[#9E9E9E] text-xs font-bold">{stat.sub}</p>}
                        </motion.div>
                    )) : (
                        <div className="col-span-full text-center py-8 text-[#9E9E9E]">
                            <p>Chargement des statistiques...</p>
                        </div>
                    )}
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
