import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings,
    Save,
    Globe,
    Shield,
    Bell,
    Database,
    User,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Image as ImageIcon,
    Plus,
    CheckCircle,
    X,
    Layout
} from "lucide-react";
import axios from "axios";

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("general");
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState<any>({
        general: {
            site_name: "MAC - Merveille d'Afrique Construction",
            site_description: "Leader de la construction et du forage en Afrique.",
            contact_email: "contact@mac-construction.com",
            contact_phone: "+221 33 800 00 00",
            address: "Dakar, Sénégal",
        },
        social: {
            facebook: "https://facebook.com/mac",
            instagram: "https://instagram.com/mac",
            linkedin: "https://linkedin.com/company/mac",
            twitter: "https://twitter.com/mac",
        },
        appearance: {
            primary_color: "#00B8D4",
            logo_dark: "/img/header_logo.png",
            logo_light: "/img/header_logo.png",
        }
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Mock save
        setTimeout(() => {
            setIsSaving(false);
            alert("Paramètres enregistrés avec succès !");
        }, 1500);
    };

    const tabs = [
        { id: "general", label: "Général", icon: <Globe className="w-5 h-5" /> },
        { id: "social", label: "Réseaux Sociaux", icon: <Facebook className="w-5 h-5" /> },
        { id: "appearance", label: "Apparence", icon: <Layout className="w-5 h-5" /> },
        { id: "security", label: "Sécurité", icon: <Shield className="w-5 h-5" /> },
        { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
        { id: "backup", label: "Sauvegarde", icon: <Database className="w-5 h-5" /> },
    ];

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">Configuration Système</h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Settings className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        Gérez les paramètres globaux de votre plateforme
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-8 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                >
                    {isSaving ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Save className="w-5 h-5 mr-3" />
                            Enregistrer tout
                        </>
                    )}
                </button>
            </header>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Navigation */}
                <aside className="lg:w-80 shrink-0 space-y-3">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center p-5 rounded-[1.5rem] smooth-animation border ${
                                activeTab === tab.id
                                ? "bg-white border-[#00B8D4] text-[#00B8D4] shadow-xl shadow-[#00B8D4]/5"
                                : "bg-[#F8FAFC] border-[#F1F5F9] text-[#616161] hover:border-[#00B8D4] hover:text-[#00B8D4]"
                            }`}
                        >
                            <div className={`p-2 rounded-xl shrink-0 mr-4 ${activeTab === tab.id ? "bg-[#00B8D4]/10" : "bg-white shadow-sm"}`}>
                                {tab.icon}
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Settings Form */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] border border-[#F1F5F9] shadow-sm p-12"
                    >
                        {activeTab === "general" && (
                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Globe className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Nom du Site
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.general.site_name}
                                            onChange={(e) => setSettings({...settings, general: {...settings.general, site_name: e.target.value}})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Mail className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Email de Contact
                                        </label>
                                        <input
                                            type="email"
                                            value={settings.general.contact_email}
                                            onChange={(e) => setSettings({...settings, general: {...settings.general, contact_email: e.target.value}})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                        <Layout className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Description du Site (SEO)
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={settings.general.site_description}
                                        onChange={(e) => setSettings({...settings, general: {...settings.general, site_description: e.target.value}})}
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Phone className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Téléphone
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.general.contact_phone}
                                            onChange={(e) => setSettings({...settings, general: {...settings.general, contact_phone: e.target.value}})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <MapPin className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Adresse Physique
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.general.address}
                                            onChange={(e) => setSettings({...settings, general: {...settings.general, address: e.target.value}})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "social" && (
                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Facebook className="w-3.5 h-3.5 mr-2 text-blue-600" /> Facebook
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.social.facebook}
                                            onChange={(e) => setSettings({...settings, social: {...settings.social, facebook: e.target.value}})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Instagram className="w-3.5 h-3.5 mr-2 text-pink-600" /> Instagram
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.social.instagram}
                                            onChange={(e) => setSettings({...settings, social: {...settings.social, instagram: e.target.value}})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Linkedin className="w-3.5 h-3.5 mr-2 text-blue-700" /> LinkedIn
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.social.linkedin}
                                            onChange={(e) => setSettings({...settings, social: {...settings.social, linkedin: e.target.value}})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                            <Twitter className="w-3.5 h-3.5 mr-2 text-sky-500" /> Twitter (X)
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.social.twitter}
                                            onChange={(e) => setSettings({...settings, social: {...settings.social, twitter: e.target.value}})}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] smooth-animation"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "appearance" && (
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                        <ImageIcon className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Logos du site
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] flex flex-col items-center border border-[#F1F5F9] group">
                                            <div className="w-full h-32 bg-[#212121] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 smooth-animation">
                                                <img src={settings.appearance.logo_light} alt="Light Logo" className="h-12 w-auto brightness-0 invert" />
                                            </div>
                                            <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4">Logo Clair (sur fond sombre)</p>
                                            <button className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#212121] rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation shadow-sm">Changer</button>
                                        </div>
                                        <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] flex flex-col items-center border border-[#F1F5F9] group">
                                            <div className="w-full h-32 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 smooth-animation">
                                                <img src={settings.appearance.logo_dark} alt="Dark Logo" className="h-12 w-auto" />
                                            </div>
                                            <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4">Logo Sombre (sur fond clair)</p>
                                            <button className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#212121] rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation shadow-sm">Changer</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === "security" || activeTab === "notifications" || activeTab === "backup") && (
                            <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
                                <Settings className="w-16 h-16 mb-6 animate-pulse" />
                                <h2 className="text-xl font-black text-[#212121]">Section en cours de développement</h2>
                                <p className="text-sm font-medium mt-2">Ces paramètres avancés seront bientôt disponibles.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
