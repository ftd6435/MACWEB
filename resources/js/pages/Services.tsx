import React from "react";
import { motion } from "framer-motion";
import { Hammer, Wrench, Briefcase, Zap } from "lucide-react";

export default function Services() {
    const services = [
        {
            icon: <Hammer className="w-8 h-8" />,
            title: "Construction Résidentielle",
            description:
                "Maisons, villas et résidences de luxe construites avec précision et attention aux détails",
            features: [
                "Conception personnalisée",
                "Matériaux premium",
                "Finitions haut de gamme",
            ],
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Construction Commerciale",
            description:
                "Immeubles de bureaux, centres commerciaux et espaces commerciaux de qualité professionnelle",
            features: [
                "Respect des délais",
                "Solutions modulables",
                "Normes de sécurité",
            ],
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Construction Industrielle",
            description:
                "Usines, entrepôts et infrastructures industrielles complexes et robustes",
            features: [
                "Ingénierie avancée",
                "Capacités importantes",
                "Solutions durables",
            ],
        },
        {
            icon: <Wrench className="w-8 h-8" />,
            title: "Services de Forage",
            description:
                "Forage d'eau, puits artésiens et services géotechniques spécialisés",
            features: [
                "Technologie moderne",
                "Expertise technique",
                "Conformité légale",
            ],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="smooth-gradient-bg">
            {/* Header */}
            <section className="bg-gradient-to-r from-[#00B8D4] to-[#0097A7] text-white py-16">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                        Nos Services
                    </h1>
                    <p className="text-lg text-white/90">
                        Une expertise complète pour tous vos besoins en
                        construction et forage
                    </p>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="p-8 bg-white rounded-lg border border-[#E0E0E0] hover:shadow-lg smooth-animation"
                        >
                            <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-[#00B8D4]/10 text-[#00B8D4] mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-[#212121] mb-4">
                                {service.title}
                            </h3>
                            <p className="text-[#616161] mb-6">
                                {service.description}
                            </p>
                            <ul className="space-y-2">
                                {service.features.map((feature, fidx) => (
                                    <li
                                        key={fidx}
                                        className="flex items-center text-[#616161] text-sm"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-[#00B8D4] mr-3" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Process Section */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="text-3xl lg:text-4xl font-bold text-[#212121] mb-16 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Notre Processus
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            "Consultation",
                            "Étude",
                            "Planification",
                            "Exécution",
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#00B8D4] text-white font-bold">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-lg font-semibold text-[#212121]">
                                        {step}
                                    </p>
                                </div>
                                {idx < 3 && (
                                    <div className="ml-4 text-2xl text-[#00B8D4]">
                                        →
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
