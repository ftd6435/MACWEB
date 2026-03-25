import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    };

    const contacts = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Téléphone",
            info: "+225 (0) 000 000 000",
            link: "tel:+225000000000",
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            info: "contact@mac.ci",
            link: "mailto:contact@mac.ci",
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Adresse",
            info: "Abidjan, Côte d'Ivoire",
            link: "#",
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
                        Nous Contacter
                    </h1>
                    <p className="text-lg text-white/90">
                        Nous serions ravis d'entendre parler de vos projets
                    </p>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {contacts.map((contact, idx) => (
                        <motion.a
                            key={idx}
                            href={contact.link}
                            className="p-8 bg-white rounded-lg border border-[#E0E0E0] hover:shadow-lg smooth-animation text-center"
                            whileHover={{ translateY: -5 }}
                        >
                            <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-[#00B8D4]/10 text-[#00B8D4] mb-4 mx-auto">
                                {contact.icon}
                            </div>
                            <h3 className="text-lg font-bold text-[#212121] mb-2">
                                {contact.title}
                            </h3>
                            <p className="text-[#616161]">{contact.info}</p>
                        </motion.a>
                    ))}
                </div>

                {/* Form and Map */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-lg shadow-md"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold text-[#212121] mb-6">
                            Envoyez-nous un Message
                        </h2>

                        {submitted && (
                            <div className="mb-4 p-4 bg-[#E8F5E9] border border-[#4CAF50] rounded-lg text-[#2E7D32]">
                                Merci ! Votre message a été envoyé avec succès.
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#212121] mb-2">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none smooth-animation"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#212121] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none smooth-animation"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#212121] mb-2">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none smooth-animation"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#212121] mb-2">
                                    Sujet
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none smooth-animation"
                                    value={formData.subject}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            subject: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#212121] mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={6}
                                    required
                                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:border-[#00B8D4] outline-none smooth-animation resize-none"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            message: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-[#00B8D4] text-white font-semibold rounded-lg hover:bg-[#0097A7] smooth-animation flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Envoyer
                            </button>
                        </div>
                    </motion.form>

                    {/* Map */}
                    <motion.div
                        className="bg-white rounded-lg shadow-md overflow-hidden h-full min-h-96"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.8449553156323!2d-4.0318!3d5.3364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjAxNDUuOSJOIDTCsDAx!5e0!3m2!1sfr!2sci!4v1234567890123"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-[#212121] mb-4">
                            Questions Fréquentes
                        </h2>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                q: "Quel est le délai de réponse?",
                                a: "Nous répondons généralement dans les 24 heures",
                            },
                            {
                                q: "Proposez-vous un devis gratuit?",
                                a: "Oui, notre consultation initiale et devis sont gratuits",
                            },
                            {
                                q: "Travaillez-vous en dehors d'Abidjan?",
                                a: "Oui, nous intervenons dans toute la Côte d'Ivoire et l'Afrique de l'Ouest",
                            },
                            {
                                q: "Quels modes de paiement acceptez-vous?",
                                a: "Nous acceptons les virements bancaires, chèques et paiements échelonnés",
                            },
                        ].map((faq, idx) => (
                            <motion.div
                                key={idx}
                                className="p-6 bg-[#F5F5F5] rounded-lg"
                                whileHover={{ backgroundColor: "#E8F4F9" }}
                            >
                                <h3 className="font-bold text-[#212121] mb-2">
                                    {faq.q}
                                </h3>
                                <p className="text-[#616161]">{faq.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
