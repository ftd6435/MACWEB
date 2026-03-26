import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
    Calendar, 
    User, 
    Share2, 
    Clock, 
    ChevronRight, 
    Facebook, 
    Twitter, 
    Linkedin, 
    Link as LinkIcon,
    ArrowLeft,
    Bookmark,
    ThumbsUp,
    MessageCircle,
    Tag
} from "lucide-react";

export default function ArticleDetail() {
    const { slug } = useParams();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Mock detailed article data
    const article = {
        id: 1,
        slug: "avenir-construction-durable",
        title: "L'Avenir de la Construction Durable en Afrique : Technologies et Innovations",
        excerpt: "Découvrez comment les nouvelles technologies transforment l'industrie du BTP en Afrique. De l'utilisation de matériaux locaux innovants aux techniques de construction écologiques...",
        content: `
            <p class="lead text-xl text-[#424242] leading-relaxed mb-8 font-medium">
                L'industrie de la construction en Afrique connaît une transformation sans précédent. Face aux défis climatiques et à l'urbanisation rapide, les professionnels du BTP se tournent vers des solutions durables et innovantes.
            </p>

            <h2 class="text-2xl font-black text-[#212121] mt-12 mb-6">1. Le Retour aux Matériaux Locaux</h2>
            <p class="text-[#616161] leading-relaxed mb-6">
                L'un des piliers de la construction durable en Afrique est la redécouverte et l'amélioration des matériaux locaux. La terre stabilisée, le bambou et les briques de latérite compressée offrent des performances thermiques exceptionnelles tout en réduisant considérablement l'empreinte carbone du transport.
            </p>
            <div class="my-10 p-8 bg-[#F0F9FF] rounded-3xl border-l-4 border-[#00B8D4]">
                <p class="italic text-[#0288D1] font-medium">"L'utilisation de matériaux locaux n'est pas un retour en arrière, mais une avancée vers une architecture qui respecte son environnement et son identité."</p>
            </div>

            <h2 class="text-2xl font-black text-[#212121] mt-12 mb-6">2. L'Efficacité Énergétique Passive</h2>
            <p class="text-[#616161] leading-relaxed mb-6">
                Dans nos climats tropicaux, la gestion de la chaleur est cruciale. L'architecture bioclimatique utilise l'orientation du bâtiment, la ventilation naturelle transversale et les protections solaires pour minimiser le besoin en climatisation artificielle.
            </p>

            <h2 class="text-2xl font-black text-[#212121] mt-12 mb-6">3. Les Innovations Technologiques</h2>
            <p class="text-[#616161] leading-relaxed mb-6">
                De l'impression 3D de maisons en béton bas carbone à l'utilisation de drones pour le suivi de chantier, la technologie permet aujourd'hui de construire plus vite, de manière plus sûre et avec moins de déchets.
            </p>

            <h2 class="text-2xl font-black text-[#212121] mt-12 mb-6">Conclusion</h2>
            <p class="text-[#616161] leading-relaxed mb-6">
                Le chemin vers une construction 100% durable est encore long, mais les initiatives actuelles montrent que l'Afrique est à la pointe de l'innovation pragmatique et écologique.
            </p>
        `,
        author: {
            name: "Amadou Diallo",
            role: "Ingénieur Principal BTP",
            bio: "Expert en construction durable avec plus de 15 ans d'expérience dans les projets d'infrastructure en Afrique de l'Ouest.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
        },
        date: "20 Décembre 2024",
        category: "Innovations BTP",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=1200",
        tags: ["Durable", "Innovation", "Afrique", "BTP", "Écologie"],
        toc: [
            { id: "materiaux", title: "Le Retour aux Matériaux Locaux" },
            { id: "energie", title: "L'Efficacité Énergétique Passive" },
            { id: "tech", title: "Les Innovations Technologiques" },
            { id: "conclusion", title: "Conclusion" }
        ],
        relatedArticles: [
            {
                title: "Gestion de Projet Digital en BTP",
                slug: "gestion-projet-digital",
                image: "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=400",
                category: "Technologie"
            },
            {
                title: "Les Matériaux Innovants en Construction",
                slug: "materiaux-innovants",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=400",
                category: "Innovation"
            }
        ]
    };

    const [commentForm, setCommentForm] = useState({ name: "", email: "", text: "" });

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#00B8D4] origin-left z-50"
                style={{ scaleX }}
            />

            {/* Breadcrumbs & Actions */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <Link to="/blog" className="inline-flex items-center text-xs font-black text-[#212121] uppercase tracking-widest group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 smooth-animation" />
                        Retour au Blog
                    </Link>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-[#F1F5F9] rounded-xl smooth-animation group">
                            <Bookmark className="w-5 h-5 text-[#616161] group-hover:text-[#00B8D4]" />
                        </button>
                        <button className="p-2 hover:bg-[#F1F5F9] rounded-xl smooth-animation group">
                            <Share2 className="w-5 h-5 text-[#616161] group-hover:text-[#00B8D4]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Article Header */}
            <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <span className="inline-block px-4 py-1.5 bg-[#E0F7FA] text-[#00B8D4] text-[10px] font-black uppercase tracking-widest rounded-full">
                        {article.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-[#212121] leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#757575]">
                        <span className="flex items-center"><User className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {article.author.name}</span>
                        <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {article.date}</span>
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {article.readTime} de lecture</span>
                    </div>
                </motion.div>
            </header>

            {/* Featured Image */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sticky Social Share (Left) */}
                    <aside className="hidden lg:block w-16">
                        <div className="sticky top-32 flex flex-col items-center space-y-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] [writing-mode:vertical-lr] rotate-180">Partager</span>
                            <div className="w-px h-12 bg-[#E2E8F0]"></div>
                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#616161] hover:bg-[#3b5998] hover:text-white smooth-animation"><Facebook className="w-5 h-5" /></button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#616161] hover:bg-[#1DA1F2] hover:text-white smooth-animation"><Twitter className="w-5 h-5" /></button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#616161] hover:bg-[#0A66C2] hover:text-white smooth-animation"><Linkedin className="w-5 h-5" /></button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4] hover:text-white smooth-animation"><LinkIcon className="w-5 h-5" /></button>
                        </div>
                    </aside>

                    {/* Article Content */}
                    <div className="flex-1 max-w-3xl">
                        <div 
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Tags */}
                        <div className="mt-16 pt-8 border-t border-[#F1F5F9] flex flex-wrap gap-3">
                            {article.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-[#F8FAFC] text-[#616161] text-xs font-bold rounded-xl border border-[#E2E8F0] hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Author Bio */}
                        <div className="mt-16 p-10 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9] flex flex-col md:flex-row items-center md:items-start gap-8">
                            <img src={article.author.avatar} alt={article.author.name} className="w-24 h-24 rounded-3xl object-cover shadow-lg" />
                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div>
                                    <h4 className="text-xl font-black text-[#212121]">{article.author.name}</h4>
                                    <p className="text-[#00B8D4] text-xs font-black uppercase tracking-widest">{article.author.role}</p>
                                </div>
                                <p className="text-[#616161] text-sm leading-relaxed">{article.author.bio}</p>
                                <div className="flex justify-center md:justify-start space-x-4">
                                    <Link to="#" className="text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation font-bold text-xs">Voir tous les articles</Link>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-20 space-y-12">
                            <h3 className="text-2xl font-black text-[#212121]">Commentaires (3)</h3>
                            
                            <div className="space-y-8">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] shrink-0"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h5 className="font-black text-[#212121] text-sm">Jean Dupont</h5>
                                                <span className="text-[10px] font-bold text-[#9E9E9E]">Il y a 2 jours</span>
                                            </div>
                                            <p className="text-sm text-[#616161] leading-relaxed">Excellent article ! Très instructif sur les enjeux de la construction durable en Afrique.</p>
                                            <button className="text-[10px] font-black text-[#00B8D4] uppercase tracking-widest hover:underline">Répondre</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Comment Form */}
                            <form className="bg-white rounded-[2rem] border border-[#F1F5F9] p-8 shadow-sm space-y-6">
                                <h4 className="text-lg font-black text-[#212121]">Laisser un commentaire</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input 
                                        type="text" 
                                        placeholder="Votre Nom"
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none"
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Votre Email"
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none"
                                    />
                                </div>
                                <textarea 
                                    rows={5}
                                    placeholder="Votre message..."
                                    className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none"
                                ></textarea>
                                <button className="w-full py-4 bg-[#00B8D4] text-white font-black rounded-2xl shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] smooth-animation uppercase tracking-widest text-xs">
                                    Poster le commentaire
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar (Right) */}
                    <aside className="lg:w-80 space-y-12">
                        {/* Table of Contents */}
                        <div className="bg-[#F8FAFC] rounded-[2rem] p-8 border border-[#F1F5F9]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-[#212121] mb-6 pb-4 border-b border-[#E2E8F0]">Sommaire</h3>
                            <nav className="space-y-4">
                                {article.toc.map((item, i) => (
                                    <Link 
                                        key={item.id} 
                                        to={`#${item.id}`} 
                                        className="flex items-center text-sm font-bold text-[#616161] hover:text-[#00B8D4] smooth-animation group"
                                    >
                                        <span className="text-[10px] text-[#9E9E9E] mr-3 group-hover:text-[#00B8D4]">0{i+1}</span>
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Related Articles */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-[#212121] mb-8 pb-4 border-b-2 border-[#00B8D4] inline-block">Articles Connexes</h3>
                            <div className="space-y-8">
                                {article.relatedArticles.map((rel, i) => (
                                    <Link key={i} to={`/blog/${rel.slug}`} className="group block space-y-4">
                                        <div className="aspect-video rounded-2xl overflow-hidden">
                                            <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 smooth-animation" />
                                        </div>
                                        <div>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-[#00B8D4] mb-2 block">{rel.category}</span>
                                            <h4 className="text-sm font-black text-[#212121] group-hover:text-[#00B8D4] smooth-animation leading-tight">{rel.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-[#00B8D4] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 smooth-animation"></div>
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-xl font-black leading-tight">Restez informé de nos actualités</h3>
                                <p className="text-white/80 text-xs leading-relaxed font-medium">Recevez nos derniers articles et innovations directement dans votre boîte mail.</p>
                                <div className="space-y-3">
                                    <input 
                                        type="email" 
                                        placeholder="Votre Email"
                                        className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl focus:bg-white focus:text-[#212121] outline-none smooth-animation text-xs placeholder:text-white/60"
                                    />
                                    <button className="w-full py-3 bg-white text-[#00B8D4] font-black rounded-xl hover:bg-[#F8FAFC] smooth-animation uppercase tracking-widest text-[10px]">
                                        S'abonner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
