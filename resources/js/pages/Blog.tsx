import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, User, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

type CategoryItem = {
    id: number;
    name: string;
    slug: string;
    articles_count?: number;
};

type ArticleItem = {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    image: string | null;
    published_at: string;
    is_featured?: boolean;
    author?: { name: string };
    category?: { id: number; name: string };
    tags?: Array<{ id: number; name: string }>;
};

export default function Blog() {
    const [heroTitle, setHeroTitle] = useState("Blog & Actualités");
    const [heroDescription, setHeroDescription] = useState(
        "Découvrez notre expertise, les dernières innovations BTP et nos conseils pour réussir vos projets de construction.",
    );
    const [heroImage, setHeroImage] = useState<string | null>(
        "https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=2000&auto=format&fit=crop",
    );
    const [overlayOpacity, setOverlayOpacity] = useState(60);

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/blog");
                const hero = Array.isArray(res.data?.hero_slides)
                    ? res.data.hero_slides[0]
                    : null;
                if (hero?.title) setHeroTitle(String(hero.title));
                if (hero?.description)
                    setHeroDescription(String(hero.description));
                if (hero?.image) setHeroImage(String(hero.image));
                if (
                    typeof hero?.overlay_opacity === "number" &&
                    Number.isFinite(hero.overlay_opacity)
                ) {
                    setOverlayOpacity(
                        Math.max(0, Math.min(100, hero.overlay_opacity)),
                    );
                }

                // Load categories
                if (Array.isArray(res.data?.categories)) {
                    setCategories(res.data.categories);
                }

                // Load recent articles
                if (Array.isArray(res.data?.recent_articles)) {
                    setRecentArticles(res.data.recent_articles);
                }
            } catch {
                return;
            }
        };
        load();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [activeCategoryName, setActiveCategoryName] = useState("Tous les articles");

    // State for dynamic data
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [recentArticles, setRecentArticles] = useState<ArticleItem[]>([]);
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);

    // Load articles with filters and pagination
    useEffect(() => {
        const loadArticles = async () => {
            setIsLoadingArticles(true);
            try {
                const params: Record<string, any> = { page: currentPage };
                if (searchTerm.trim()) params.search = searchTerm.trim();
                if (activeCategory) params.category_id = activeCategory;

                const res = await axios.get("/api/articles", { params });
                const articlesData = res.data?.data || [];
                setArticles(articlesData);
                setCurrentPage(res.data?.current_page || 1);
                setLastPage(res.data?.last_page || 1);
                setTotal(res.data?.total || 0);
            } catch {
                setArticles([]);
            } finally {
                setIsLoadingArticles(false);
            }
        };

        // Debounce search
        const timer = setTimeout(() => {
            loadArticles();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, activeCategory, currentPage]);

    // Format date helper
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    // Calculate read time (rough estimate: 200 words per minute)
    const estimateReadTime = (excerpt: string | null) => {
        if (!excerpt) return "5 min";
        const words = excerpt.split(/\s+/).length;
        const minutes = Math.max(1, Math.round(words / 50)); // Assuming excerpt is ~1/4 of article
        return `${minutes} min`;
    };

    // Handle category selection
    const handleCategorySelect = (categoryId: number | null, categoryName: string) => {
        setActiveCategory(categoryId);
        setActiveCategoryName(categoryName);
        setCurrentPage(1); // Reset to first page
    };

    // Handle pagination
    const goToPage = (page: number) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const featuredArticle = articles.find(a => a.is_featured);
    const regularArticles = articles.filter(a => !a.is_featured);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 border-b border-[#E2E8F0] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage || ""}
                        alt="Blog Hero"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#00B8D4]/60 via-[#00B8D4]/30 to-[#212121]/90 backdrop-blur-[2px]"
                        style={{ opacity: overlayOpacity / 100 }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        {heroTitle}
                    </motion.h1>
                    <p className="text-white/85 max-w-2xl mx-auto text-lg">
                        {heroDescription}
                    </p>
                    <div className="mt-10 max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher des articles..."
                            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm text-white placeholder:text-white/60"
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
                                <li>
                                    <button
                                        onClick={() => handleCategorySelect(null, "Tous les articles")}
                                        className={`flex items-center justify-between w-full text-sm font-bold smooth-animation group ${!activeCategory ? "text-[#00B8D4]" : "text-[#616161] hover:text-[#00B8D4]"}`}
                                    >
                                        <span>Tous les articles</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${!activeCategory ? "bg-[#00B8D4] text-white" : "bg-[#F1F5F9] text-[#9E9E9E] group-hover:bg-[#E0F7FA] group-hover:text-[#00B8D4]"}`}>{total}</span>
                                    </button>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => handleCategorySelect(cat.id, cat.name)}
                                            className={`flex items-center justify-between w-full text-sm font-bold smooth-animation group ${activeCategory === cat.id ? "text-[#00B8D4]" : "text-[#616161] hover:text-[#00B8D4]"}`}
                                        >
                                            <span>{cat.name}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-[#00B8D4] text-white" : "bg-[#F1F5F9] text-[#9E9E9E] group-hover:bg-[#E0F7FA] group-hover:text-[#00B8D4]"}`}>{cat.articles_count || 0}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#212121] mb-8 pb-4 border-b-2 border-[#00B8D4] inline-block">Articles Récents</h3>
                            <div className="space-y-6">
                                {recentArticles.length > 0 ? recentArticles.map((article, i) => (
                                    <Link key={article.id} to={`/blog/${article.slug}`} className="flex items-center space-x-4 group">
                                        <img
                                            src={article.image || 'https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=200'}
                                            alt={article.title}
                                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                                        />
                                        <div>
                                            <h4 className="text-xs font-black text-[#212121] group-hover:text-[#00B8D4] smooth-animation line-clamp-2 leading-tight">{article.title}</h4>
                                            <p className="text-[10px] text-[#9E9E9E] mt-1 font-bold">{formatDate(article.published_at)}</p>
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="text-xs text-[#9E9E9E]">Chargement...</p>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:w-3/4 space-y-16">
                        {isLoadingArticles ? (
                            <div className="text-center py-20">
                                <p className="text-[#9E9E9E]">Chargement des articles...</p>
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-[#9E9E9E]">Aucun article trouvé.</p>
                            </div>
                        ) : (
                            <>
                                {/* Featured Article */}
                                {featuredArticle && (
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative bg-white rounded-[3rem] overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation group"
                            >
                                <div className="aspect-[21/9] overflow-hidden relative">
                                    <img
                                        src={featuredArticle.image || 'https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=1200'}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover group-hover:scale-105 smooth-animation"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-[#00B8D4] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">À la Une</span>
                                    </div>
                                </div>
                                <div className="p-10 space-y-6">
                                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#757575]">
                                        <span className="text-[#00B8D4]">{featuredArticle.category?.name || 'Article'}</span>
                                        <span>{formatDate(featuredArticle.published_at)}</span>
                                        {featuredArticle.author && <span>Par {featuredArticle.author.name}</span>}
                                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {estimateReadTime(featuredArticle.excerpt)} de lecture</span>
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
                                        <img
                                            src={article.image || 'https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=800'}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#00B8D4] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{article.category?.name || 'Article'}</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-[#9E9E9E] mb-4 space-x-4">
                                            <span>{formatDate(article.published_at)}</span>
                                            <span>•</span>
                                            <span>{estimateReadTime(article.excerpt)}</span>
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
                        {lastPage > 1 && (
                            <div className="flex justify-center items-center space-x-2 pt-10">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#616161] font-bold hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
                                    let pageNum;
                                    if (lastPage <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= lastPage - 2) {
                                        pageNum = lastPage - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => goToPage(pageNum)}
                                            className={`w-10 h-10 rounded-xl font-bold smooth-animation ${
                                                currentPage === pageNum
                                                    ? 'bg-[#00B8D4] text-white'
                                                    : 'bg-white border border-[#E2E8F0] text-[#616161] hover:border-[#00B8D4] hover:text-[#00B8D4]'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                {lastPage > 5 && currentPage < lastPage - 2 && (
                                    <span className="text-[#9E9E9E]">...</span>
                                )}
                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === lastPage}
                                    className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#616161] font-bold hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    &gt;
                                </button>
                            </div>
                        )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
