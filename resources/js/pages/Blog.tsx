import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, User, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tous les articles");

    const categories = [
        { name: "Tous les articles", count: 42 },
        { name: "Conseils Construction", count: 12 },
        { name: "Innovations BTP", count: 8 },
        { name: "Actualités MAC", count: 10 },
        { name: "Réglementations", count: 5 },
        { name: "Études de Cas", count: 4 },
        { name: "Tendances du Secteur", count: 3 },
    ];

    const recentArticles = [
        { title: "Les Matériaux Innovants en Construction", date: "10 Décembre 2024", image: "https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=200" },
        { title: "Gestion de Projet Digital en BTP", date: "10 Décembre 2024", image: "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=200" },
        { title: "Nouvelles Normes de Construction 2024", date: "10 Décembre 2024", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=200" },
    ];

    const articles = [
        {
            id: 1,
            slug: "avenir-construction-durable",
            title: "L'Avenir de la Construction Durable en Afrique : Technologies et Innovations",
            excerpt: "Découvrez comment les nouvelles technologies transforment l'industrie du BTP en Afrique. De l'utilisation de matériaux locaux innovants aux techniques de construction écologiques...",
            author: "Amadou Diallo",
            date: "20 Décembre 2024",
            category: "Innovations BTP",
            readTime: "8 min",
            image: "https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=1200",
            isFeatured: true
        },
        {
            id: 2,
            slug: "optimiser-planification-projet",
            title: "Optimiser la Planification de Votre Projet de Construction",
            excerpt: "Les étapes essentielles pour assurer le succès de votre projet, de la conception initiale à la livraison finale. Découvrez nos méthodes éprouvées.",
            author: "Fatou Kone",
            date: "18 Décembre 2024",
            category: "Conseils Construction",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=800",
        },
        {
            id: 3,
            slug: "intelligence-artificielle-btp",
            title: "L'Intelligence Artificielle au Service du BTP",
            excerpt: "Comment l'IA révolutionne la gestion des chantiers et améliore l'efficacité des projets de construction en Afrique.",
            author: "Ibrahim Traoré",
            date: "16 Décembre 2024",
            category: "Innovations BTP",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800",
        },
        {
            id: 4,
            slug: "nouveau-centre-formation-mac",
            title: "MAC Inaugure son Nouveau Centre de Formation",
            excerpt: "Un investissement majeur dans la formation des jeunes talents du BTP pour répondre aux défis de construction de demain.",
            author: "Équipe MAC",
            date: "14 Décembre 2024",
            category: "Actualités MAC",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800",
        },
        {
            id: 5,
            slug: "reglementations-sismiques-afrique",
            title: "Nouvelles Réglementations Sismiques en Afrique de l'Ouest",
            excerpt: "Comprendre les nouvelles normes parasismiques et leur impact sur vos projets de construction résidentielle et commerciale.",
            author: "Moussa Diop",
            date: "12 Décembre 2024",
            category: "Réglementations",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800",
        }
    ];

    const featuredArticle = articles.find(a => a.isFeatured);
    const regularArticles = articles.filter(a => !a.isFeatured);

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <section className="bg-[#F8FAFC] py-20 border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-[#212121] mb-6"
                    >
                        Blog & Actualités
                    </motion.h1>
                    <p className="text-[#616161] max-w-2xl mx-auto text-lg">
                        Découvrez notre expertise, les dernières innovations BTP et nos conseils pour réussir vos projets de construction.
                    </p>
                    <div className="mt-10 max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher des articles..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-12">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#212121] mb-8 pb-4 border-b-2 border-[#00B8D4] inline-block">Catégories</h3>
                            <ul className="space-y-4">
                                {categories.map((cat) => (
                                    <li key={cat.name}>
                                        <button
                                            onClick={() => setActiveCategory(cat.name)}
                                            className={`flex items-center justify-between w-full text-sm font-bold smooth-animation group ${activeCategory === cat.name ? "text-[#00B8D4]" : "text-[#616161] hover:text-[#00B8D4]"}`}
                                        >
                                            <span>{cat.name}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === cat.name ? "bg-[#00B8D4] text-white" : "bg-[#F1F5F9] text-[#9E9E9E] group-hover:bg-[#E0F7FA] group-hover:text-[#00B8D4]"}`}>{cat.count}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#212121] mb-8 pb-4 border-b-2 border-[#00B8D4] inline-block">Articles Récents</h3>
                            <div className="space-y-6">
                                {recentArticles.map((article, i) => (
                                    <Link key={i} to="#" className="flex items-center space-x-4 group">
                                        <img src={article.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                                        <div>
                                            <h4 className="text-xs font-black text-[#212121] group-hover:text-[#00B8D4] smooth-animation line-clamp-2 leading-tight">{article.title}</h4>
                                            <p className="text-[10px] text-[#9E9E9E] mt-1 font-bold">{article.date}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:w-3/4 space-y-16">
                        {/* Featured Article */}
                        {featuredArticle && (
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative bg-white rounded-[3rem] overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation group"
                            >
                                <div className="aspect-[21/9] overflow-hidden relative">
                                    <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 smooth-animation" />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-[#00B8D4] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">À la Une</span>
                                    </div>
                                </div>
                                <div className="p-10 space-y-6">
                                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#757575]">
                                        <span className="text-[#00B8D4]">{featuredArticle.category}</span>
                                        <span>{featuredArticle.date}</span>
                                        <span>Par {featuredArticle.author}</span>
                                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {featuredArticle.readTime} de lecture</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-[#212121] leading-tight group-hover:text-[#00B8D4] smooth-animation">{featuredArticle.title}</h2>
                                    <p className="text-[#616161] leading-relaxed text-lg line-clamp-3">{featuredArticle.excerpt}</p>
                                    <Link to={`/blog/${featuredArticle.slug}`} className="inline-flex items-center px-8 py-4 bg-[#00B8D4] text-white font-black rounded-xl shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs">
                                        Lire l'article
                                    </Link>
                                </div>
                            </motion.article>
                        )}

                        {/* Regular Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {regularArticles.map((article) => (
                                <motion.article
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation"
                                >
                                    <div className="aspect-video overflow-hidden relative">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 smooth-animation" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#00B8D4] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{article.category}</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-[#9E9E9E] mb-4 space-x-4">
                                            <span>{article.date}</span>
                                            <span>•</span>
                                            <span>{article.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-[#212121] mb-4 group-hover:text-[#00B8D4] smooth-animation leading-tight">{article.title}</h3>
                                        <p className="text-sm text-[#616161] leading-relaxed line-clamp-3 mb-8 flex-1">{article.excerpt}</p>
                                        <Link to={`/blog/${article.slug}`} className="inline-flex items-center text-xs font-black text-[#212121] group/link uppercase tracking-widest">
                                            Lire la suite <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1.5 smooth-animation text-[#00B8D4]" />
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center space-x-2 pt-10">
                            <button className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#616161] font-bold hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation">&lt;</button>
                            <button className="w-10 h-10 rounded-xl bg-[#00B8D4] text-white font-bold">1</button>
                            <button className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#616161] font-bold hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation">2</button>
                            <button className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#616161] font-bold hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation">3</button>
                            <span className="text-[#9E9E9E]">...</span>
                            <button className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#616161] font-bold hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation">8</button>
                            <button className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#616161] font-bold hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation">&gt;</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
