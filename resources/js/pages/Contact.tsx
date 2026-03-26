import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    Clock,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    ChevronRight,
    Navigation
} from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        location: "",
        message: "",
        privacy: false
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({
            name: "",
            email: "",
            phone: "",
            projectType: "",
            location: "",
            message: "",
            privacy: false
        });
    };

    const offices = [
        {
            city: "Dakar, Sénégal",
            role: "Siège Social",
            address: "Avenue Cheikh Anta Diop, Dakar",
            phone: "+224 622 14 67 14",
            email: "dakar@mac-construction.com",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
        },
        {
            city: "Abidjan, Côte d'Ivoire",
            role: "Bureau Régional",
            address: "Boulevard Latrille, Cocody, Abidjan",
            phone: "+225 27 22 XX XX XX",
            email: "abidjan@mac-construction.com",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800"
        },
        {
            city: "Bamako, Mali",
            role: "Bureau Local",
            address: "ACI 2000, Bamako",
            phone: "+223 XX XX XX XX",
            email: "bamako@mac-construction.com",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <section className="bg-[#F8FAFC] py-24 border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-[#212121] mb-6"
                    >
                        Contactez-nous
                    </motion.h1>
                    <p className="text-[#616161] max-w-2xl mx-auto text-lg md:text-xl font-medium">
                        Nous sommes là pour vous accompagner dans tous vos projets de construction.
                        Notre équipe vous répondra sous 24 heures.
                    </p>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left Column: Coordinates */}
                    <div className="lg:w-1/3 space-y-12">
                        <div>
                            <h2 className="text-2xl font-black text-[#212121] mb-8">Nos Coordonnées</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest mb-1">Siège Social</h4>
                                        <p className="text-[#616161] text-sm leading-relaxed font-medium">Avenue Cheikh Anta Diop<br />Dakar, Sénégal</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest mb-1">Téléphone</h4>
                                        <p className="text-[#616161] text-sm leading-relaxed font-medium">+224 77 123 45 67</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest mb-1">Email</h4>
                                        <p className="text-[#616161] text-sm leading-relaxed font-medium">contact@mac-construction.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest mb-1">Horaires d'Ouverture</h4>
                                        <p className="text-[#616161] text-sm leading-relaxed font-medium">Lundi - Vendredi : 8h00 - 17h00<br />Samedi : 8h00 - 12h00<br />Dimanche : Fermé</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-[#212121] uppercase tracking-widest mb-6">Suivez-nous</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>

                        {/* Mini Map */}
                        <div className="space-y-6 pt-8 border-t border-[#F1F5F9]">
                            <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest">Notre Localisation</h4>
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15437.13521665427!2d-17.4727!3d14.6937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQxJzM3LjMiTiAxN8KwMjgnMjEuNyJX!5e0!3m2!1sfr!2ssn!4v1234567890123"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                ></iframe>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%]">
                                    <button className="w-full bg-white/90 backdrop-blur-sm py-3 rounded-xl shadow-lg text-[10px] font-black uppercase tracking-widest text-[#212121] flex items-center justify-center gap-2 hover:bg-[#00B8D4] hover:text-white smooth-animation">
                                        <Navigation className="w-3 h-3" /> Obtenir l'itinéraire
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-[3rem] border border-[#F1F5F9] p-10 md:p-16 shadow-sm">
                            <h2 className="text-2xl font-black text-[#212121] mb-10">Envoyez-nous un Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Nom complet *</label>
                                        <input
                                            type="text"
                                            placeholder="Votre nom complet"
                                            required
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-medium"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Email *</label>
                                        <input
                                            type="email"
                                            placeholder="votre@email.com"
                                            required
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-medium"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Téléphone *</label>
                                        <input
                                            type="tel"
                                            placeholder="+224 XX XXX XX XX"
                                            required
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-medium"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Type de projet</label>
                                        <select
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-medium appearance-none"
                                            value={formData.projectType}
                                            onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                                        >
                                            <option value="">Sélectionner un type</option>
                                            <option value="residentiel">Construction Résidentielle</option>
                                            <option value="commercial">Construction Commerciale</option>
                                            <option value="industriel">Construction Industrielle</option>
                                            <option value="forage">Forage d'eau</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Localisation du projet</label>
                                    <input
                                        type="text"
                                        placeholder="Ville, pays ou région"
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-medium"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1">Message détaillé *</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Décrivez votre projet, vos besoins et vos attentes..."
                                        required
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:ring-2 focus:ring-[#00B8D4] focus:border-transparent smooth-animation text-sm outline-none font-medium resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    ></textarea>
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="privacy"
                                        required
                                        className="mt-1 w-4 h-4 rounded border-[#E2E8F0] text-[#00B8D4] focus:ring-[#00B8D4]"
                                        checked={formData.privacy}
                                        onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                                    />
                                    <label htmlFor="privacy" className="text-xs text-[#616161] leading-relaxed font-medium">
                                        J'accepte la <a href="#" className="text-[#00B8D4] hover:underline">politique de confidentialité</a> et autorise MAC à traiter mes données personnelles pour répondre à ma demande.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-[#00B8D4] text-white font-black rounded-[1.5rem] shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                >
                                    Envoyer le message <Send className="w-4 h-4" />
                                </button>

                                {submitted && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center text-sm font-bold text-[#00C853]"
                                    >
                                        Merci ! Votre message a été envoyé avec succès.
                                    </motion.p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Offices Section */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#212121] mb-4">Nos Bureaux</h2>
                        <p className="text-[#616161] text-lg font-medium">Présents dans plusieurs pays d'Afrique pour mieux vous servir.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {offices.map((office, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2.5rem] overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation group"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={office.image}
                                        alt={office.city}
                                        className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                    />
                                </div>
                                <div className="p-8 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-black text-[#212121]">{office.city}</h3>
                                        <p className="text-[#00B8D4] text-[10px] font-black uppercase tracking-widest">{office.role}</p>
                                    </div>
                                    <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                                        <p className="flex items-center text-xs font-bold text-[#616161]">
                                            <MapPin className="w-4 h-4 mr-3 text-[#9E9E9E]" /> {office.address}
                                        </p>
                                        <p className="flex items-center text-xs font-bold text-[#616161]">
                                            <Phone className="w-4 h-4 mr-3 text-[#9E9E9E]" /> {office.phone}
                                        </p>
                                        <p className="flex items-center text-xs font-bold text-[#616161]">
                                            <Mail className="w-4 h-4 mr-3 text-[#9E9E9E]" /> {office.email}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
