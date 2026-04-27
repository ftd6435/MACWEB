import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
    MapPin,
    Calendar,
    Users,
    Maximize2,
    Clock,
    Target,
    ShieldCheck,
    Star,
    Quote,
    ChevronRight,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Ruler,
    Layers,
    CheckSquare,
    Droplets,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    MessageCircle,
    Link as LinkIcon,
    User
} from "lucide-react";

type Project = {
    id: number;
    slug: string;
    title: string;
    description: string;
    details?: string;
    image: string | null;
    location: string;
    year: string;
    client_name?: string;
    metrics?: any;
    challenges?: any;
    technical_details?: any;
    gallery?: any;
    is_featured?: boolean;
    category?: { id: number; name: string; slug: string };
    service?: { id: number; title: string; slug: string };
};

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState<any[]>([]);
    const [commentForm, setCommentForm] = useState({ name: "", email: "", text: "" });
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [commentSuccess, setCommentSuccess] = useState(false);

    useEffect(() => {
        const loadProject = async () => {
            if (!slug) return;
            setIsLoading(true);
            try {
                const res = await axios.get(`/api/projects/${slug}`);
                setProject(res.data.project);
                setRelatedProjects(res.data.related || []);

                // Load comments
                const commentsRes = await axios.get('/api/comments', {
                    params: { type: 'Project', id: res.data.project.id }
                });
                setComments(commentsRes.data?.data || []);
            } catch (error) {
                console.error('Error loading project:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProject();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#9E9E9E]">Chargement du projet...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#9E9E9E]">Projet non trouvé.</p>
            </div>
        );
    }

    // Parse JSON fields safely
    const metrics = Array.isArray(project.metrics) ? project.metrics : [];
    const challenges = Array.isArray(project.challenges) ? project.challenges : [];
    const technicalDetails = project.technical_details || {};
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];

    // Helper functions
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
            const date2 = new Date(dateString);
            return date2.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    // Social media sharing
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = project?.title || '';

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
        if (!project || !commentForm.name || !commentForm.email || !commentForm.text) return;

        setIsSubmittingComment(true);
        try {
            const response = await axios.post('/api/comments', {
                name: commentForm.name,
                email: commentForm.email,
                content: commentForm.text,
                commentable_type: 'Project',
                commentable_id: project.id
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

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000'}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <nav className="flex justify-center items-center space-x-2 text-white/60 text-xs font-bold uppercase tracking-widest mb-8">
                            <Link to="/" className="hover:text-white smooth-animation">Accueil</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link to="/projects" className="hover:text-white smooth-animation">Projets</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white">{project.title}</span>
                        </nav>
                        <span className="px-4 py-1.5 bg-[#00B8D4] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                            {project.category?.name || 'Projet'}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            {project.title}
                        </h1>
                        <div className="flex justify-center items-center space-x-6 text-white/80 text-sm font-bold">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                {project.location}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                {project.year}
                            </div>
                            <div className="relative group">
                                <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl smooth-animation">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Partager
                                </button>
                                <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-white rounded-2xl shadow-xl border border-[#F1F5F9] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible smooth-animation z-50 min-w-[200px]">
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
                    </motion.div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-3xl font-black text-[#212121]">Aperçu du Projet</h2>
                            <div className="space-y-6">
                                <p className="text-[#616161] text-lg leading-relaxed">{project.description}</p>
                                <p className="text-[#616161] text-lg leading-relaxed">{project.subDescription}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {project.metrics.map((metric, i) => (
                                <div key={i} className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#F1F5F9] space-y-3">
                                    <div className="text-[#00B8D4]">{metric.icon}</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">{metric.label}</p>
                                        <p className="text-sm font-bold text-[#212121]">{metric.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-3xl font-black text-[#212121]">Galerie du Projet</h2>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.gallery.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={`group relative rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl smooth-animation ${img.span || ""}`}
                            >
                                <img src={img.url} alt={img.title} className="w-full h-full object-cover min-h-[300px] group-hover:scale-110 smooth-animation" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 smooth-animation flex flex-col justify-end p-8 text-left text-white">
                                    <p className="text-xs font-black uppercase tracking-widest mb-1">{img.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Challenges Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-[#212121]">Défis et Solutions</h2>
                    </div>
                    {challenges.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {challenges.map((item: any, i: number) => (
                            <div key={i} className="space-y-4">
                                <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-[#F1F5F9] relative group hover:border-[#00B8D4]/30 smooth-animation">
                                    <div className="flex items-start space-x-6">
                                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                            <AlertCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-[#212121] mb-2">{item.title}</h4>
                                            <p className="text-sm text-[#616161] leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-[#E2E8F0] flex items-start space-x-6">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#00B8D4] mb-1">Solution MAC</p>
                                            <p className="text-sm text-[#212121] font-bold leading-relaxed">{item.solution}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p className="text-center text-[#9E9E9E]">Aucun défi documenté.</p>
                    )}
                </div>
            </section>

            {/* Technical Details */}
            <section className="py-24 bg-[#F8FAFC]">\n                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-[#212121]">Détails Techniques</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-[#F1F5F9] space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] border-b border-[#F1F5F9] pb-4 flex items-center">
                                <Ruler className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                Spécifications Techniques
                            </h4>
                            <ul className="space-y-4">
                                {project.technicalDetails.specifications.map((s, i) => (
                                    <li key={i} className="text-xs text-[#616161] font-bold flex items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] mr-3" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-[#F1F5F9] space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] border-b border-[#F1F5F9] pb-4 flex items-center">
                                <Layers className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                Matériaux Utilisés
                            </h4>
                            <ul className="space-y-4">
                                {project.technicalDetails.materials.map((m, i) => (
                                    <li key={i} className="text-xs text-[#616161] font-bold flex items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] mr-3" />
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-[#F1F5F9] space-y-6">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] border-b border-[#F1F5F9] pb-4 flex items-center">
                                <CheckSquare className="w-4 h-4 mr-2 text-[#00B8D4]" />
                                Normes & Certifications
                            </h4>
                            <ul className="space-y-4">
                                {project.technicalDetails.standards.map((st, i) => (
                                    <li key={i} className="text-xs text-[#616161] font-bold flex items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D4] mr-3" />
                                        {st}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.technicalDetails.innovations.map((inn, i) => (
                            <div key={i} className="flex items-center space-x-6 p-8 bg-white rounded-[2rem] border border-[#F1F5F9]">
                                <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] flex items-center justify-center shrink-0">
                                    {inn.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-[#212121] mb-1">{inn.title}</h4>
                                    <p className="text-xs text-[#616161] leading-relaxed">{inn.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#212121]">Témoignage Client</h2>
                    </div>
                    <div className="max-w-4xl mx-auto bg-[#F8FAFC] p-12 lg:p-20 rounded-[4rem] border border-[#F1F5F9] text-center relative overflow-hidden">
                        <Quote className="absolute top-10 right-10 w-24 h-24 text-[#00B8D4]/5" />
                        <div className="relative z-10 space-y-10">
                            <img src={project.testimonial.image} alt="Client" className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-xl" />
                            <p className="text-xl md:text-2xl text-[#212121] leading-relaxed italic font-medium">
                                "{project.testimonial.text}"
                            </p>
                            <div>
                                <h4 className="text-lg font-black text-[#212121]">{project.testimonial.author}</h4>
                                <p className="text-xs font-bold text-[#00B8D4] uppercase tracking-widest mt-1">{project.testimonial.role}</p>
                            </div>
                            <div className="flex justify-center space-x-1 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-[#E2E8F0]">
                                {project.testimonial.stats.map((s, i) => (
                                    <div key={i}>
                                        <p className="text-2xl font-black text-[#00B8D4]">{s.value}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mt-1">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comments Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
            </section>

            {/* Similar Projects */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-3xl font-black text-[#212121]">Projets Similaires</h2>
                    </div>
                    <Link to="/projects" className="text-[#00B8D4] font-black text-xs uppercase tracking-widest flex items-center group">
                        Voir tout le portfolio <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 smooth-animation" />
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedProjects.length > 0 ? relatedProjects.map((p) => (
                            <Link
                                key={p.id}
                                to={`/projects/${p.slug}`}
                                className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img
                                        src={p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800'}
                                        alt={p.title}
                                        className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-[#00B8D4] text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                            {p.category?.name || 'Projet'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-lg font-black text-[#212121] mb-2 group-hover:text-[#00B8D4] smooth-animation">{p.title}</h3>
                                    <div className="flex items-center text-[10px] font-bold text-[#757575] uppercase tracking-widest">
                                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#00B8D4]" />
                                        {p.location}
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <p className="col-span-3 text-center text-[#9E9E9E]">Aucun projet similaire.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#00B8D4] rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-[#00B8D4]/30">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        </div>
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-4xl md:text-6xl font-black leading-tight">Vous avez un Projet Similaire?</h2>
                            <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
                                Faites confiance à l'expertise MAC pour concrétiser votre vision résidentielle. Notre équipe vous accompagne de la conception à la livraison.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                                <Link to="/contact" className="px-10 py-5 bg-white text-[#00B8D4] font-black rounded-2xl shadow-xl hover:bg-[#F8FAFC] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs">
                                    Demander un Devis
                                </Link>
                                <Link to="/projects" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs">
                                    Voir tous nos Projets
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
