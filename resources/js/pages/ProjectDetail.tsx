import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, MapPin, Calendar, Users } from "lucide-react";

export default function ProjectDetail() {
    const { id } = useParams();
    const [comments, setComments] = useState<
        Array<{ name: string; text: string }>
    >([]);
    const [commentForm, setCommentForm] = useState({
        name: "",
        email: "",
        text: "",
    });

    // Mock project data
    const project = {
        id,
        title: "Immeuble Résidentiel de Luxe",
        category: "Résidentiel",
        location: "Abidjan, Côte d'Ivoire",
        date: "2024",
        duration: "18 mois",
        budget: "2.5M USD",
        image: "https://via.placeholder.com/800x400?text=Project+Detail",
        description:
            "Un immeuble moderne de 12 étages avec 48 appartements haut de gamme, toutes les installations modernes et services de luxe.",
        details: [
            "Conception architecturale innovante",
            "Système de climatisation central",
            "Piscine et salle de sport",
            "Parking souterrain (200 places)",
            "Sécurité 24/7 avec surveillance",
        ],
        testimonial: {
            author: "Jean Kouadio",
            title: "Promoteur Immobilier",
            text: "MAC a dépassé nos attentes. Qualité exceptionnelle, respect des délais et des budgets.",
        },
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
            {/* Hero */}
            <motion.section
                className="relative h-96 bg-cover bg-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <span className="inline-block px-3 py-1 bg-[#00B8D4]/10 text-[#00B8D4] rounded-full text-sm font-semibold mb-4">
                                {project.category}
                            </span>
                            <h1 className="text-4xl font-bold text-[#212121] mb-2">
                                {project.title}
                            </h1>
                        </div>
                        <button className="p-3 hover:bg-[#F5F5F5] rounded-lg smooth-animation">
                            <Share2 className="w-6 h-6 text-[#616161]" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8 bg-[#F5F5F5] p-6 rounded-lg">
                        <div>
                            <MapPin className="w-5 h-5 text-[#00B8D4] mb-2" />
                            <p className="text-sm text-[#616161]">
                                {project.location}
                            </p>
                        </div>
                        <div>
                            <Calendar className="w-5 h-5 text-[#00B8D4] mb-2" />
                            <p className="text-sm text-[#616161]">
                                {project.date}
                            </p>
                        </div>
                        <div>
                            <Users className="w-5 h-5 text-[#00B8D4] mb-2" />
                            <p className="text-sm text-[#616161]">
                                {project.duration}
                            </p>
                        </div>
                    </div>

                    <p className="text-lg text-[#616161] mb-8">
                        {project.description}
                    </p>

                    <h2 className="text-2xl font-bold text-[#212121] mb-4">
                        Caractéristiques
                    </h2>
                    <ul className="space-y-3 mb-12">
                        {project.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                                <div className="w-2 h-2 rounded-full bg-[#00B8D4] mt-2 mr-3 flex-shrink-0" />
                                <span className="text-[#616161]">{detail}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Testimonial */}
                    <div className="bg-[#00B8D4]/5 border-l-4 border-[#00B8D4] p-6 mb-12 rounded">
                        <p className="text-[#616161] italic mb-4">
                            "{project.testimonial.text}"
                        </p>
                        <div>
                            <p className="font-semibold text-[#212121]">
                                {project.testimonial.author}
                            </p>
                            <p className="text-sm text-[#9E9E9E]">
                                {project.testimonial.title}
                            </p>
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
                        to="/projects"
                        className="text-[#00B8D4] font-semibold hover:underline"
                    >
                        ← Retour aux projets
                    </Link>
                </div>
            </section>
        </div>
    );
}
