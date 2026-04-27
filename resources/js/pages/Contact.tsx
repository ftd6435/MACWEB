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
import axios from "axios";

export default function Contact() {
    const [heroTitle, setHeroTitle] = useState("Contactez-nous");
    const [heroDescription, setHeroDescription] = useState(
        "Nous sommes là pour vous accompagner dans tous vos projets de construction.\nNotre équipe vous répondra sous 24 heures.",
    );
    const [heroImage, setHeroImage] = useState<string | null>(
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
    );
    const [overlayOpacity, setOverlayOpacity] = useState(60);
    type Office = {
        id: number;
        name: string;
        city: string;
        country: string;
        address: string;
        phone: string | null;
        email: string | null;
        image: string | null;
        is_headquarters: boolean;
        map_lat: string | number | null;
        map_lng: string | number | null;
        is_active: boolean;
        order: number;
    };
    type SocialLink = {
        id: number;
        platform: string;
        url: string;
        icon?: string;
    };
    const [offices, setOffices] = useState<Office[]>([]);
    const [contactPhone, setContactPhone] = useState("+224 620 00 00 00");
    const [contactEmail, setContactEmail] = useState("contact@mac-construction.com");
    const [contactAddress, setContactAddress] = useState("Avenue Cheikh Anta Diop\nDakar, Sénégal");
    const [openingHours, setOpeningHours] = useState("Lundi - Vendredi : 8h00 - 17h00\nSamedi : 8h00 - 12h00\nDimanche : Fermé");
    const [mapEmbed, setMapEmbed] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15437.13521665427!2d-17.4727!3d14.6937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQxJzM3LjMiTiAxN8KwMjgnMjEuNyJX!5e0!3m2!1sfr!2ssn!4v1234567890123");
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/contact");
                const hero = Array.isArray(res.data?.hero_slides)
                    ? res.data.hero_slides[0]
                    : null;
                if (hero?.title) setHeroTitle(String(hero.title));
                if (hero?.description)
                    setHeroDescription(String(hero.description));
                if (hero?.image) setHeroImage(String(hero.image));
                if (
                    typeof hero?.overlay_opacity === "number" &&
                    Number.isFinite(hero.overlay_opacity)
                ) {
                    setOverlayOpacity(
                        Math.max(0, Math.min(100, hero.overlay_opacity)),
                    );
                }

                const apiOffices = Array.isArray(res.data?.offices)
                    ? (res.data.offices as Office[])
                    : [];
                setOffices(apiOffices);

                // Load contact info and settings
                const settingsRes = await axios.get("/api/cms/global");
                const settings = settingsRes.data?.settings;
                if (settings) {
                    const contactGroup = settings.contact || [];
                    const generalGroup = settings.general || [];

                    const phone = contactGroup.find((s: any) => s.key === 'main_phone')?.value;
                    const email = contactGroup.find((s: any) => s.key === 'main_email')?.value;
                    const address = contactGroup.find((s: any) => s.key === 'main_address')?.value;
                    const hours = contactGroup.find((s: any) => s.key === 'opening_hours')?.value;
                    const mapUrl = contactGroup.find((s: any) => s.key === 'map_embed_url')?.value;

                    if (phone) setContactPhone(String(phone));
                    if (email) setContactEmail(String(email));
                    if (address) setContactAddress(String(address));
                    if (hours) {
                        // Try to parse as JSON, if it fails, use as plain text
                        try {
                            const parsed = JSON.parse(String(hours));
                            const formatted = Object.entries(parsed)
                                .map(([day, time]) => `${day} : ${time}`)
                                .join('\n');
                            setOpeningHours(formatted);
                        } catch {
                            setOpeningHours(String(hours));
                        }
                    }
                    if (mapUrl) setMapEmbed(String(mapUrl));
                }

                // Load social links from same response
                if (Array.isArray(settingsRes.data?.social_links)) {
                    setSocialLinks(settingsRes.data.social_links);
                }
            } catch {
                return;
            }
        };
        load();
    }, []);

    const getSocialIcon = (platform: string) => {
        const platformLower = platform?.toLowerCase() || '';
        const icons: Record<string, JSX.Element> = {
            facebook: <Facebook className="w-5 h-5" />,
            linkedin: <Linkedin className="w-5 h-5" />,
            twitter: <Twitter className="w-5 h-5" />,
            instagram: <Instagram className="w-5 h-5" />,
        };
        return icons[platformLower] || <Facebook className="w-5 h-5" />;
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone || null,
                project_type: formData.projectType || null,
                project_location: formData.location || null,
                message: formData.message,
            };
            await axios.post("/api/contact", payload);

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
            setFormData({
                name: "",
                email: "",
                phone: "",
                projectType: "",
                location: "",
                message: "",
                privacy: false,
            });
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.name?.[0] ||
                err.response?.data?.errors?.email?.[0] ||
                err.response?.data?.errors?.message?.[0] ||
                "Impossible d'envoyer votre message. Veuillez réessayer.";
            setSubmitError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 border-b border-[#E2E8F0] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage || ""}
                        alt="Contact Hero"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#00B8D4]/60 via-[#00B8D4]/30 to-[#212121]/90 backdrop-blur-[2px]"
                        style={{ opacity: overlayOpacity / 100 }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6"
                    >
                        {heroTitle}
                    </motion.h1>
                    <p className="text-white/85 max-w-2xl mx-auto text-lg md:text-xl font-medium whitespace-pre-line">
                        {heroDescription}
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
                                        <p className="text-[#616161] text-sm leading-relaxed font-medium whitespace-pre-line">{contactAddress}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest mb-1">Téléphone</h4>
                                        <p className="text-[#616161] text-sm leading-relaxed font-medium">{contactPhone}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest mb-1">Email</h4>
                                        <p className="text-[#616161] text-sm leading-relaxed font-medium">{contactEmail}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B8D4] flex items-center justify-center shrink-0 group-hover:bg-[#00B8D4] group-hover:text-white smooth-animation">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest mb-1">Horaires d'Ouverture</h4>
                                        <p className="text-[#616161] text-sm leading-relaxed font-medium whitespace-pre-line">{openingHours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-[#212121] uppercase tracking-widest mb-6">Suivez-nous</h4>
                            <div className="flex gap-4">
                                {socialLinks.length > 0 ? socialLinks.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"
                                    >
                                        {getSocialIcon(social.platform)}
                                    </a>
                                )) : (
                                    <>
                                        <a href="#" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"><Facebook className="w-5 h-5" /></a>
                                        <a href="#" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"><Linkedin className="w-5 h-5" /></a>
                                        <a href="#" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"><Twitter className="w-5 h-5" /></a>
                                        <a href="#" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#616161] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation"><Instagram className="w-5 h-5" /></a>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mini Map */}
                        <div className="space-y-6 pt-8 border-t border-[#F1F5F9]">
                            <h4 className="text-sm font-black text-[#212121] uppercase tracking-widest">Notre Localisation</h4>
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm">
                                <iframe
                                    src={mapEmbed}
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
                                            placeholder="+224 XXX XXX XXX"
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
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-[#00B8D4] text-white font-black rounded-[1.5rem] shadow-lg shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-1 smooth-animation uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            Envoi en cours{" "}
                                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            Envoyer le message{" "}
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
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
                                {submitError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center text-sm font-bold text-red-500"
                                    >
                                        {submitError}
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

                    <div
                        className={[
                            "grid gap-10",
                            offices.length === 1
                                ? "grid-cols-1 max-w-2xl mx-auto"
                                : offices.length === 2
                                    ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
                                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                        ].join(" ")}
                    >
                        {offices.map((office, idx) => (
                            <motion.div
                                key={office.id ?? idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2.5rem] overflow-hidden border border-[#F1F5F9] shadow-sm hover:shadow-xl smooth-animation group"
                            >
                                <div className="aspect-video overflow-hidden">
                                    {office.image ? (
                                        <img
                                            src={office.image}
                                            alt={office.city}
                                            className="w-full h-full object-cover group-hover:scale-110 smooth-animation"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#F8FAFC]" />
                                    )}
                                </div>
                                <div className="p-8 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-black text-[#212121]">
                                            {office.city}
                                            {office.country ? `, ${office.country}` : ""}
                                        </h3>
                                        <p className="text-[#00B8D4] text-[10px] font-black uppercase tracking-widest">
                                            {office.is_headquarters
                                                ? "Siège Social"
                                                : office.name}
                                        </p>
                                    </div>
                                    <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                                        <p className="flex items-center text-xs font-bold text-[#616161]">
                                            <MapPin className="w-4 h-4 mr-3 text-[#9E9E9E]" /> {office.address}
                                        </p>
                                        {office.phone && (
                                            <p className="flex items-center text-xs font-bold text-[#616161]">
                                                <Phone className="w-4 h-4 mr-3 text-[#9E9E9E]" />{" "}
                                                {office.phone}
                                            </p>
                                        )}
                                        {office.email && (
                                            <p className="flex items-center text-xs font-bold text-[#616161]">
                                                <Mail className="w-4 h-4 mr-3 text-[#9E9E9E]" />{" "}
                                                {office.email}
                                            </p>
                                        )}
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
