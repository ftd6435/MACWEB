import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Award, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Innovation",
            desc: "Techniques modernes de construction",
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Excellence",
            desc: "Projets de qualité supérieure",
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Expertise Locale",
            desc: "Connaissance du marché africain",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Partenariat",
            desc: "Relations durables avec clients",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="smooth-gradient-bg">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl lg:text-5xl font-bold text-[#212121] mb-6 leading-tight">
                            Construire l'Avenir de l'Afrique
                        </h1>
                        <p className="text-lg text-[#616161] mb-8 leading-relaxed">
                            Merveille d'Afrique Construction est votre
                            partenaire de confiance pour tous vos projets de
                            construction, forage et Infrastructure. Expertise,
                            fiabilité et excellence au service de vos ambitions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/projects"
                                className="inline-flex items-center justify-center px-6 py-3 bg-[#00B8D4] text-white font-semibold rounded-lg hover:bg-[#0097A7] smooth-animation"
                            >
                                Découvrir nos projets
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#00B8D4] text-[#00B8D4] font-semibold rounded-lg hover:bg-[#00B8D4]/5 smooth-animation"
                            >
                                Nous contacter
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="aspect-video rounded-lg bg-gradient-to-br from-[#00B8D4]/20 to-[#0097A7]/20 flex items-center justify-center"
                    >
                        <div className="text-center">
                            <img
                                src="https://via.placeholder.com/500x300?text=Hero+Image"
                                alt="Hero"
                                className="rounded-lg w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#212121] mb-4">
                            Pourquoi Nous Choisir?
                        </h2>
                        <p className="text-lg text-[#616161]">
                            Des valeurs fortes qui guident notre engagement
                            auprès de vous
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="p-6 bg-[#F5F5F5] rounded-lg hover:bg-[#00B8D4]/5 smooth-animation"
                            >
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#00B8D4]/10 text-[#00B8D4] mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-[#212121] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-[#616161]">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#00B8D4] to-[#0097A7] text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Prêt à démarrer votre projet?
                        </h2>
                        <p className="text-lg mb-8 text-white/90">
                            Contactez-nous dès aujourd'hui pour une consultation
                            gratuite
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center px-8 py-3 bg-white text-[#00B8D4] font-semibold rounded-lg hover:bg-white/90 smooth-animation"
                        >
                            Demander un devis
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
