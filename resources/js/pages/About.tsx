import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Globe, TrendingUp } from "lucide-react";

export default function About() {
    const values = [
        {
            icon: <Award className="w-8 h-8" />,
            title: "Excellence",
            description:
                "Nous livrons des projets de qualité supérieure qui dépassent les attentes",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Partenariat",
            description:
                "Nos relations avec les clients sont basées sur la confiance et la transparence",
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Durabilité",
            description:
                "Nous construisons des solutions respectueuses de l'environnement",
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Innovation",
            description:
                "Nous adoptons les technologies et techniques les plus modernes",
        },
    ];

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
                        À Propos de MAC
                    </h1>
                    <p className="text-lg text-white/90">
                        Construire la confiance, bâtir l'avenir
                    </p>
                </motion.div>
            </section>

            {/* Story */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <h2 className="text-3xl font-bold text-[#212121] mb-6">
                            Notre Histoire
                        </h2>
                        <p className="text-[#616161] leading-relaxed mb-4">
                            Merveille d'Afrique Construction a été fondée il y a
                            plus de 20 ans avec une vision claire : devenir le
                            partenaire de référence en matière de construction
                            et de forage en Afrique.
                        </p>
                        <p className="text-[#616161] leading-relaxed mb-4">
                            Depuis nos humbles débuts, nous avons réalisé des
                            centaines de projets d'envergure, contribuant au
                            développement infrastructurel de la région.
                        </p>
                        <p className="text-[#616161] leading-relaxed">
                            Aujourd'hui, MAC emploie plus de 500 professionnels
                            qualifiés et dispose des équipements les plus
                            modernes du secteur.
                        </p>
                    </div>
                    <motion.div
                        className="aspect-square rounded-lg bg-gradient-to-br from-[#00B8D4]/20 to-[#0097A7]/20 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src="https://via.placeholder.com/500x500?text=Company+Story"
                            alt="Company"
                            className="rounded-lg w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {[
                        { number: "500+", label: "Employés qualifiés" },
                        { number: "200+", label: "Projets réalisés" },
                        { number: "20+", label: "Ans d'expertise" },
                        { number: "98%", label: "Satisfaction client" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="text-center p-6 bg-white rounded-lg shadow-md"
                            whileHover={{ translateY: -5 }}
                        >
                            <p className="text-3xl font-bold text-[#00B8D4] mb-2">
                                {stat.number}
                            </p>
                            <p className="text-[#616161]">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Values */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-[#212121] mb-4">
                            Nos Valeurs
                        </h2>
                        <p className="text-lg text-[#616161]">
                            Les principes qui guident nos actions quotidiennes
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                className="text-center p-6 bg-[#F5F5F5] rounded-lg hover:bg-[#00B8D4]/5 smooth-animation"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-[#00B8D4]/10 text-[#00B8D4] mb-4 mx-auto">
                                    {value.icon}
                                </div>
                                <h3 className="font-bold text-[#212121] mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-[#616161]">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[#212121] mb-4">
                        Notre Équipe Dirigeante
                    </h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {[
                        {
                            name: "Jean Kouadio",
                            role: "Directeur Général",
                            image: "https://via.placeholder.com/300x300?text=Jean",
                        },
                        {
                            name: "Marie Diallo",
                            role: "Directrice Opérationnelle",
                            image: "https://via.placeholder.com/300x300?text=Marie",
                        },
                        {
                            name: "Ahmed Kone",
                            role: "Ingénieur en Chef",
                            image: "https://via.placeholder.com/300x300?text=Ahmed",
                        },
                    ].map((member, idx) => (
                        <motion.div
                            key={idx}
                            className="text-center"
                            whileHover={{ translateY: -5 }}
                        >
                            <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-[#F5F5F5]">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-[#212121]">
                                {member.name}
                            </h3>
                            <p className="text-sm text-[#616161]">
                                {member.role}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Certifications */}
            <section className="bg-[#F5F5F5] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#212121] mb-12">
                        Certifications et Accréditations
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            "ISO 9001",
                            "ISO 14001",
                            "OHSAS 18001",
                            "Certifié BTP",
                        ].map((cert, idx) => (
                            <motion.div
                                key={idx}
                                className="p-6 bg-white rounded-lg"
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="font-semibold text-[#212121]">
                                    {cert}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
