import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Share2 } from "lucide-react";

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const projects = [
        {
            id: 1,
            title: "Immeuble Résidentiel de Luxe",
            category: "Résidentiel",
            location: "Abidjan",
            date: "2024",
            image: "https://via.placeholder.com/400x300?text=Project+1",
            description:
                "Un immeuble moderne de 12 étages avec 48 appartements haut de gamme",
        },
        {
            id: 2,
            title: "Centre Commercial Premium",
            category: "Commercial",
            location: "Abidjan",
            date: "2024",
            image: "https://via.placeholder.com/400x300?text=Project+2",
            description:
                "Complexe commercial de 50,000 m² avec boutiques et restaurants",
        },
        {
            id: 3,
            title: "Usine Agroalimentaire",
            category: "Industriel",
            location: "Yamoussoukro",
            date: "2023",
            image: "https://via.placeholder.com/400x300?text=Project+3",
            description:
                "Installation industrielle avec capacité de production de 1000 T/jour",
        },
        {
            id: 4,
            title: "Forage d'Eau Profond",
            category: "Forage",
            location: "Korhogo",
            date: "2023",
            image: "https://via.placeholder.com/400x300?text=Project+4",
            description:
                "Puits artésien de 500 mètres de profondeur avec système de pompage",
        },
    ];

    const categories = ["Résidentiel", "Commercial", "Industriel", "Forage"];
    const filteredProjects = selectedCategory
        ? projects.filter((p) => p.category === selectedCategory)
        : projects;

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
                        Nos Projets
                    </h1>
                    <p className="text-lg text-white/90">
                        Découvrez nos réalisations qui témoignent de notre
                        expertise
                    </p>
                </motion.div>
            </section>

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-6 py-2 rounded-full font-medium smooth-animation ${
                            selectedCategory === null
                                ? "bg-[#00B8D4] text-white"
                                : "bg-[#F5F5F5] text-[#616161] hover:bg-[#E0E0E0]"
                        }`}
                    >
                        Tous
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium smooth-animation ${
                                selectedCategory === cat
                                    ? "bg-[#00B8D4] text-white"
                                    : "bg-[#F5F5F5] text-[#616161] hover:bg-[#E0E0E0]"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                    layout
                >
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layoutId={`project-${project.id}`}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg smooth-animation"
                        >
                            <div className="relative aspect-video overflow-hidden bg-[#F5F5F5]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover hover:scale-105 smooth-animation"
                                />
                                <div className="absolute top-4 right-4 bg-[#00B8D4] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    {project.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#212121] mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-[#616161] text-sm mb-4">
                                    {project.description}
                                </p>
                                <div className="flex gap-4 text-xs text-[#9E9E9E] mb-4">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {project.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {project.date}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="flex-1 text-center px-4 py-2 bg-[#00B8D4] text-white font-medium rounded-lg hover:bg-[#0097A7] smooth-animation"
                                    >
                                        Voir Détails
                                    </Link>
                                    <button className="px-4 py-2 border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] smooth-animation">
                                        <Share2 className="w-4 h-4 text-[#616161]" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}
