import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Globe,
    Zap,
    ShieldCheck,
    CheckCircle2,
    Send,
    Building2,
    Mail,
    Phone,
    User,
    ArrowRight,
    TrendingUp,
    Shield,
    Target
} from "lucide-react";

export default function Partnership() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const collaborationModels = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Co-traitance",
            desc: "Partenariats sur des projets d'envergure pour unir nos expertises techniques et logistiques."
        },
        {
            icon: <Building2 className="w-6 h-6" />,
            title: "Fournisseur Agréé",
            desc: "Devenez un fournisseur privilégié de matériaux et équipements de haute qualité."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Développement Régional",
            desc: "Collaboration pour l'expansion de nos activités dans de nouvelles zones géographiques."
        }
    ];

    const advantages = [
        { icon: <TrendingUp className="w-5 h-5" />, text: "Accès à des projets d'envergure internationale." },
        { icon: <Shield className="w-5 h-5" />, text: "Sécurité de paiement et transparence contractuelle." },
        { icon: <Target className="w-5 h-5" />, text: "Vision partagée de l'excellence architecturale." },
        { icon: <Zap className="w-5 h-5" />, text: "Processus de collaboration agiles et efficaces." }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-[#F8FAFC] py-24 border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-[#212121] mb-6"
                    >
                        Devenez Partenaire de MAC
                    </motion.h1>
                    <p className="text-[#616161] max-w-2xl mx-auto text-lg md:text-xl font-medium">
                        Unissons nos forces pour bâtir l'avenir de l'Afrique. Nous recherchons des partenaires d'excellence partageant notre vision.
                    </p>
                </div>
            </section>

            {/* Why Partner with Us? */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200"
                            alt="Partnership"
                            className="rounded-[3rem] shadow-2xl"
                        />
                    </motion.div>
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-[#212121]">Pourquoi collaborer avec nous ?</h2>
                            <p className="text-[#616161] leading-relaxed">Chez MAC, nous croyons que les plus grandes réalisations naissent de collaborations solides. Nous offrons à nos partenaires un environnement de travail basé sur la confiance mutuelle, le respect des standards de qualité et une ambition commune d'excellence.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {advantages.map((adv, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-6 bg-[#F8FAFC] rounded-[1.5rem] border border-[#F1F5F9]">
                                    <div className="w-10 h-10 rounded-xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0">
                                        {adv.icon}
                                    </div>
                                    <p className="text-sm font-bold text-[#616161] leading-relaxed">{adv.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Collaboration Models */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#212121] mb-4">Modèles de Collaboration</h2>
                        <p className="text-[#616161]">Choisissez le mode de partenariat qui correspond à votre expertise.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {collaborationModels.map((model, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation group text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center mb-6 mx-auto group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                    {model.icon}
                                </div>
                                <h3 className="text-xl font-black text-[#212121] mb-4">{model.title}</h3>
                                <p className="text-[#616161] text-sm leading-relaxed mb-8">{model.desc}</p>
                                <button className="inline-flex items-center text-xs font-black text-[#00B8D4] uppercase tracking-widest hover:translate-x-1 smooth-animation">
                                    En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership Form */}
            <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-[#212121] mb-4">Proposer un Partenariat</h2>
                    <p className="text-[#616161]">Parlons de la façon dont nous pouvons travailler ensemble.</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] border border-[#F1F5F9] p-10 md:p-16 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Nom de l'entreprise *</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input type="text" placeholder="Nom complet de l'entreprise" required className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Personne de contact *</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input type="text" placeholder="Votre nom complet" required className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Email professionnel *</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input type="email" placeholder="votre@email.com" required className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Téléphone *</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-4 h-4" />
                                <input type="tel" placeholder="+221 XX XXX XX XX" required className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Type de partenariat souhaité</label>
                        <select className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation appearance-none">
                            <option value="">Sélectionner une option</option>
                            <option value="cotraitance">Co-traitance</option>
                            <option value="fournisseur">Fournisseur</option>
                            <option value="regional">Développement Régional</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Message ou proposition *</label>
                        <textarea rows={6} placeholder="Présentez brièvement votre entreprise et votre proposition de partenariat..." required className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] outline-none text-sm font-medium smooth-animation resize-none"></textarea>
                    </div>

                    <button className="w-full py-5 bg-[#00B8D4] text-white font-black rounded-[1.5rem] shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                        Envoyer ma proposition <Send className="w-4 h-4" />
                    </button>

                    {submitted && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-sm font-bold text-[#00C853]"
                        >
                            Merci ! Votre proposition a été envoyée avec succès.
                        </motion.p>
                    )}
                </form>
            </section>
        </div>
    );
}
