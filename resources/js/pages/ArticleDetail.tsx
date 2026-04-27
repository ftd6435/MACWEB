import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import axios from "axios";
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

type Article = {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    image: string | null;
    published_at: string;
    read_time?: number;
    is_featured?: boolean;
    author?: { id: number; name: string; email: string };
    category?: { id: number; name: string; slug: string };
    tags?: Array<{ id: number; name: string; slug: string }>;
};

export default function ArticleDetail() {
    const { slug } = useParams();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [article, setArticle] = useState<Article | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState<any[]>([]);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [commentSuccess, setCommentSuccess] = useState(false);

    useEffect(() => {
        const loadArticle = async () => {
            if (!slug) return;
            setIsLoading(true);
            try {
                const res = await axios.get(`/api/articles/${slug}`);
                setArticle(res.data);

                // Load related articles from same category
                if (res.data?.category?.id) {
                    const relatedRes = await axios.get('/api/articles', {
                        params: { category_id: res.data.category.id, per_page: 3 }
                    });
                    const filtered = (relatedRes.data?.data || []).filter(
                        (a: Article) => a.id !== res.data.id
                    ).slice(0, 3);
                    setRelatedArticles(filtered);
                }

                // Load comments
                const commentsRes = await axios.get('/api/comments', {
                    params: { type: 'Article', id: res.data.id }
                });
                setComments(commentsRes.data?.data || []);
            } catch (error) {
                console.error('Error loading article:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadArticle();
    }, [slug]);

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    const getTimeAgo = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            if (diffDays === 0) return "Aujourd'hui";
            if (diffDays === 1) return "Hier";
            if (diffDays < 7) return `Il y a ${diffDays} jours`;
            if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
            return formatDate(dateString);
        } catch {
            return dateString;
        }
    };

    const [commentForm, setCommentForm] = useState({ name: "", email: "", text: "" });

    // Social media sharing
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = article?.title || '';

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank', 'width=600,height=400');
    };

    const shareOnLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
    };

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Lien copié dans le presse-papiers!');
    };

    // Comment submission
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!article || !commentForm.name || !commentForm.email || !commentForm.text) return;

        setIsSubmittingComment(true);
        try {
            const response = await axios.post('/api/comments', {
                name: commentForm.name,
                email: commentForm.email,
                content: commentForm.text,
                commentable_type: 'Article',
                commentable_id: article.id
            });

            // Add the new comment to the list immediately
            setComments([response.data, ...comments]);
            setCommentForm({ name: '', email: '', text: '' });
            setCommentSuccess(true);
            setTimeout(() => setCommentSuccess(false), 5000);
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Erreur lors de l\'envoi du commentaire. Veuillez réessayer.');
        } finally {
            setIsSubmittingComment(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#9E9E9E]">Chargement de l'article...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#9E9E9E]">Article non trouvé.</p>
            </div>
        );
    }

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
                        <div className="relative group">
                            <button className="p-2 hover:bg-[#F1F5F9] rounded-xl smooth-animation">
                                <Share2 className="w-5 h-5 text-[#616161] group-hover:text-[#00B8D4]" />
                            </button>
                            <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-[#F1F5F9] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible smooth-animation z-50 min-w-[200px]">
                                <button onClick={shareOnFacebook} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#F8FAFC] rounded-xl smooth-animation text-sm font-bold text-[#212121]">
                                    <Facebook className="w-4 h-4 text-[#3b5998]" />
                                    <span>Facebook</span>
                                </button>
                                <button onClick={shareOnTwitter} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#F8FAFC] rounded-xl smooth-animation text-sm font-bold text-[#212121]">
                                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                                    <span>Twitter/X</span>
                                </button>
                                <button onClick={shareOnLinkedIn} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#F8FAFC] rounded-xl smooth-animation text-sm font-bold text-[#212121]">
                                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                                    <span>LinkedIn</span>
                                </button>
                                <button onClick={shareOnWhatsApp} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#F8FAFC] rounded-xl smooth-animation text-sm font-bold text-[#212121]">
                                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                                    <span>WhatsApp</span>
                                </button>
                                <button onClick={copyLink} className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#F8FAFC] rounded-xl smooth-animation text-sm font-bold text-[#212121]">
                                    <LinkIcon className="w-4 h-4 text-[#00B8D4]" />
                                    <span>Copier le lien</span>
                                </button>
                            </div>
                        </div>
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
                        {article.category?.name || 'Article'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-[#212121] leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#757575]">
                        {article.author && <span className="flex items-center"><User className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {article.author.name}</span>}
                        <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {formatDate(article.published_at)}</span>
                        {article.read_time && <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> {article.read_time} min de lecture</span>}
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
                    <img
                        src={article.image || 'https://images.unsplash.com/photo-1518005020250-68594932097c?q=80&w=1200'}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
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
                            <button onClick={shareOnFacebook} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#616161] hover:bg-[#3b5998] hover:text-white smooth-animation"><Facebook className="w-5 h-5" /></button>
                            <button onClick={shareOnTwitter} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#616161] hover:bg-[#1DA1F2] hover:text-white smooth-animation"><Twitter className="w-5 h-5" /></button>
                            <button onClick={shareOnLinkedIn} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#616161] hover:bg-[#0A66C2] hover:text-white smooth-animation"><Linkedin className="w-5 h-5" /></button>
                            <button onClick={copyLink} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4] hover:text-white smooth-animation"><LinkIcon className="w-5 h-5" /></button>
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
                            <h3 className="text-2xl font-black text-[#212121]">Commentaires ({comments.length})</h3>

                            <div className="space-y-8">
                                {comments.length > 0 ? comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] flex items-center justify-center shrink-0">
                                            <User className="w-5 h-5 text-[#9E9E9E]" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h5 className="font-black text-[#212121] text-sm">{comment.name}</h5>
                                                <span className="text-[10px] font-bold text-[#9E9E9E]">{getTimeAgo(comment.created_at)}</span>
                                            </div>
                                            <p className="text-sm text-[#616161] leading-relaxed">{comment.content}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-[#9E9E9E] text-center py-8">Aucun commentaire pour le moment. Soyez le premier à commenter!</p>
                                )}
                            </div>

                            {/* Comment Form */}
                            <form onSubmit={handleCommentSubmit} className="bg-white rounded-[2rem] border border-[#F1F5F9] p-8 shadow-sm space-y-6">
                                <h4 className="text-lg font-black text-[#212121]">Laisser un commentaire</h4>
                                {commentSuccess && (
                                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                                        ✓ Votre commentaire a été publié avec succès!
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Votre Nom"
                                        value={commentForm.name}
                                        onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                                        required
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Votre Email"
                                        value={commentForm.email}
                                        onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                                        required
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none"
                                    />
                                </div>
                                <textarea
                                    rows={5}
                                    placeholder="Votre message..."
                                    value={commentForm.text}
                                    onChange={(e) => setCommentForm({...commentForm, text: e.target.value})}
                                    required
                                    className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none"
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={isSubmittingComment}
                                    className="w-full py-4 bg-[#00B8D4] text-white font-black rounded-2xl shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] smooth-animation uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmittingComment ? 'Envoi...' : 'Poster le commentaire'}
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
