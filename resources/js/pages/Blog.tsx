import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Tag, Search } from "lucide-react";

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState("");

    const articles = [
        {
            id: 1,
            slug: "fondations-solides",
            title: "10 Étapes pour des Fondations Solides",
            excerpt:
                "Découvrez les principes essentiels pour assurer la solidité de votre construction...",
            author: "Ingénieur Michel Diallo",
            date: "2024-03-15",
            category: "Construction",
            tags: ["Construction", "Fondations", "Guide"],
            image: "https://via.placeholder.com/400x250?text=Article+1",
        },
        {
            id: 2,
            slug: "innovations-btp",
            title: "Les Innovations du BTP en 2024",
            excerpt:
                "Explorez les dernières technologies et techniques de construction durables...",
            author: "Architecte Claire Kouadio",
            date: "2024-03-10",
            category: "Innovation",
            tags: ["Innovation", "Technologie", "Durabilité"],
            image: "https://via.placeholder.com/400x250?text=Article+2",
        },
        {
            id: 3,
            slug: "forage-eau",
            title: "Guide Complet du Forage d'Eau",
            excerpt:
                "Tout ce que vous devez savoir sur le forage d'eau artésienne en Afrique...",
            author: "Technicien Amoussa Kone",
            date: "2024-03-05",
            category: "Forage",
            tags: ["Forage", "Eau", "Technique"],
            image: "https://via.placeholder.com/400x250?text=Article+3",
        },
    ];

    const filteredArticles = articles.filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="smooth-gradient-bg">
            {/* Header */}
            <section className="bg-gradient-to-r from-[#00B8D4] to-[#0097A7] text-white py-16">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                        Blog MAC
                    </h1>
                    <p className="text-lg text-white/90">
                        Articles, conseils et actualités du secteur du BTP en
                        Afrique
                    </p>
                </motion.div>
            </section>

            {/* Search */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div className="relative max-w-md mx-auto mb-12">
                    <Search className="absolute left-4 top-3 w-5 h-5 text-[#9E9E9E]" />
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
                        className="w-full pl-12 pr-4 py-2 border-2 border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none smooth-animation"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </motion.div>

                {/* Articles Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {filteredArticles.map((article) => (
                        <Link
                            key={article.id}
                            to={`/blog/${article.slug}`}
                            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg smooth-animation"
                        >
                            <div className="aspect-video overflow-hidden bg-[#F5F5F5]">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 smooth-animation"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-block px-2 py-1 bg-[#00B8D4]/10 text-[#00B8D4] rounded text-xs font-semibold">
                                        {article.category}
                                    </span>
                                    <span className="text-xs text-[#9E9E9E] flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(
                                            article.date,
                                        ).toLocaleDateString("fr-FR")}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#212121] mb-2 group-hover:text-[#00B8D4] smooth-animation">
                                    {article.title}
                                </h3>
                                <p className="text-[#616161] text-sm mb-4">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#9E9E9E] flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {article.author}
                                    </span>
                                </div>
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    {article.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs text-[#00B8D4]"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-[#616161]">Aucun article trouvé</p>
                    </div>
                )}
            </section>
        </div>
    );
}
