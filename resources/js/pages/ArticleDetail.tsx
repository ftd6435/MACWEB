import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Share2, MessageCircle, Tag } from "lucide-react";

export default function ArticleDetail() {
    const { slug } = useParams();
    const [comments, setComments] = useState<
        Array<{ name: string; text: string }>
    >([]);
    const [commentForm, setCommentForm] = useState({
        name: "",
        email: "",
        text: "",
    });

    // Mock article data
    const article = {
        slug,
        title: "10 Étapes pour des Fondations Solides",
        author: "Ingénieur Michel Diallo",
        date: "2024-03-15",
        category: "Construction",
        tags: ["Construction", "Fondations", "Guide", "Pratique"],
        image: "https://via.placeholder.com/800x400?text=Article+Banner",
        content: `
      <h2>Introduction</h2>
      <p>Les fondations sont l'élément critique de toute construction. Des fondations mal conçues peuvent entraîner des fissures, des infiltrations et d'autres problèmes structurels graves.</p>
      
      <h2>Étape 1: Étude de Sol</h2>
      <p>Avant toute construction, effectuez une étude géotechnique complète pour comprendre la composition du sol, sa capacité portante et les risques potentiels.</p>
      
      <h2>Étape 2: Dimensionnement</h2>
      <p>Basé sur l'étude de sol, dimensionnez les fondations en fonction de la charge de la structure et de la portance du terrain.</p>
      
      <h2>Étape 3: Excavation Appropriée</h2>
      <p>Effectuez l'excavation à la profondeur requise, en veillant à atteindre les couches de sol stabiles.</p>
      
      <h2>Étape 4: Drainage</h2>
      <p>Mettez en place un système de drainage adéquat pour éviter l'accumulation d'eau sous les fondations.</p>
      
      <h2>Étape 5: Couche de Fond</h2>
      <p>Appliquez une couche de sable ou de gravier pour niveler et distribuer uniformément les charges.</p>
      
      <h2>Étape 6: Ferraillage</h2>
      <p>Disposez l'armature selon les plans d'ingénierie pour assurer la résistance à la traction.</p>
      
      <h2>Étape 7: Bétonnage</h2>
      <p>Coulage du béton avec un dosage approprié, en veillant à compacter correctement.</p>
      
      <h2>Étape 8: Cure</h2>
      <p>Laissez le béton durcir pendant la période de cure recommandée (généralement 7-28 jours).</p>
      
      <h2>Étape 9: Contrôle Qualité</h2>
      <p>Effectuez des tests de résistance et des inspections pour vérifier la conformité aux normes.</p>
      
      <h2>Étape 10: Prévention de l'Humidité</h2>
      <p>Appliquez un revêtement d'étanchéité pour empêcher l'humidité de remonter par capillarité.</p>
    `,
        relatedArticles: [
            {
                slug: "innovations-btp",
                title: "Les Innovations du BTP en 2024",
            },
            { slug: "forage-eau", title: "Guide Complet du Forage d'Eau" },
        ],
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentForm.name && commentForm.text) {
            setComments([
                ...comments,
                { name: commentForm.name, text: commentForm.text },
            ]);
            setCommentForm({ name: "", email: "", text: "" });
        }
    };

    return (
        <div className="smooth-gradient-bg">
            {/* Header */}
            <motion.section
                className="bg-gradient-to-r from-[#00B8D4] to-[#0097A7] text-white py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4">
                        {article.category}
                    </span>
                    <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
                    <div className="flex flex-wrap gap-6 text-white/90">
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {article.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString("fr-FR")}
                        </span>
                        <span className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            {comments.length} commentaires
                        </span>
                    </div>
                </div>
            </motion.section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Featured Image */}
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-96 object-cover rounded-lg mb-12"
                    />

                    {/* Share */}
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-[#E0E0E0]">
                        <div className="flex gap-2">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#00B8D4]/10 text-[#00B8D4] rounded-full text-sm"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <button className="p-2 hover:bg-[#F5F5F5] rounded-lg smooth-animation">
                            <Share2 className="w-5 h-5 text-[#616161]" />
                        </button>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none mb-12 text-[#616161]">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: article.content,
                            }}
                        />
                    </div>

                    {/* Related Articles */}
                    <div className="bg-[#F5F5F5] p-8 rounded-lg mb-12">
                        <h3 className="text-xl font-bold text-[#212121] mb-6">
                            Articles Connexes
                        </h3>
                        <div className="space-y-3">
                            {article.relatedArticles.map((relArticle) => (
                                <Link
                                    key={relArticle.slug}
                                    to={`/blog/${relArticle.slug}`}
                                    className="block p-3 bg-white rounded hover:bg-[#E8F4F9] smooth-animation"
                                >
                                    <p className="font-semibold text-[#212121]">
                                        {relArticle.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-[#212121] mb-6">
                            Commentaires ({comments.length})
                        </h2>

                        {/* Comment Form */}
                        <form
                            onSubmit={handleCommentSubmit}
                            className="mb-8 p-6 bg-white rounded-lg border border-[#E0E0E0]"
                        >
                            <input
                                type="text"
                                placeholder="Votre nom"
                                className="w-full mb-3 px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none"
                                value={commentForm.name}
                                onChange={(e) =>
                                    setCommentForm({
                                        ...commentForm,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="email"
                                placeholder="Votre email"
                                className="w-full mb-3 px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none"
                                value={commentForm.email}
                                onChange={(e) =>
                                    setCommentForm({
                                        ...commentForm,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <textarea
                                placeholder="Votre commentaire"
                                rows={4}
                                className="w-full mb-4 px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none"
                                value={commentForm.text}
                                onChange={(e) =>
                                    setCommentForm({
                                        ...commentForm,
                                        text: e.target.value,
                                    })
                                }
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#00B8D4] text-white font-semibold rounded-lg hover:bg-[#0097A7] smooth-animation"
                            >
                                Poster un commentaire
                            </button>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map((comment, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-[#F5F5F5] rounded-lg"
                                >
                                    <p className="font-semibold text-[#212121]">
                                        {comment.name}
                                    </p>
                                    <p className="text-[#616161]">
                                        {comment.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="mt-12 text-center">
                    <Link
                        to="/blog"
                        className="text-[#00B8D4] font-semibold hover:underline"
                    >
                        ← Retour aux articles
                    </Link>
                </div>
            </section>
        </div>
    );
}
