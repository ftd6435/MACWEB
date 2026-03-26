import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Inbox, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Trash2, 
    Mail, 
    Phone, 
    User, 
    Calendar, 
    MessageSquare,
    CheckCircle,
    X,
    Eye,
    Clock,
    Tag,
    ArrowRight,
    MapPin,
    Building2,
    Briefcase
} from "lucide-react";
import axios from "axios";

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'contacted' | 'archived';
    created_at: string;
    type: string; // 'contact' | 'quote' | 'career'
}

export default function AdminLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>("all");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setIsLoading(true);
        // Mock data for now
        setTimeout(() => {
            setLeads([
                { id: 1, name: "Jean Dupont", email: "jean@email.com", phone: "+221 77 123 45 67", subject: "Demande de devis - Villa", message: "Bonjour, je souhaiterais obtenir un devis pour la construction d'une villa R+1 à Dakar. Merci de me recontacter.", status: 'new', created_at: "2026-03-26T10:00:00Z", type: 'quote' },
                { id: 2, name: "Marie Sarr", email: "marie@pro.sn", phone: "+221 70 987 65 43", subject: "Candidature Ingénieur", message: "Veuillez trouver ci-joint mon CV pour le poste d'ingénieur civil.", status: 'read', created_at: "2026-03-25T15:30:00Z", type: 'career' },
                { id: 3, name: "Build Africa", email: "contact@build.com", phone: null, subject: "Partenariat commercial", message: "Nous sommes intéressés par vos services de forage pour nos prochains chantiers.", status: 'contacted', created_at: "2026-03-24T09:15:00Z", type: 'contact' },
            ]);
            setIsLoading(false);
        }, 1000);
    };

    const filteredLeads = leads.filter(l => 
        (l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "all" || l.status === filterStatus)
    );

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'read': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'contacted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">Demandes & Leads</h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <Inbox className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {leads.filter(l => l.status === 'new').length} nouvelles demandes à traiter
                    </p>
                </div>
            </header>

            <div className="bg-white p-6 rounded-[2.5rem] border border-[#F1F5F9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 max-w-xl relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher une demande..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border-none rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                    />
                </div>
                
                <div className="flex items-center space-x-4">
                    {['all', 'new', 'read', 'contacted'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border smooth-animation ${
                                filterStatus === status 
                                ? "bg-[#212121] text-white border-[#212121] shadow-lg shadow-[#212121]/10" 
                                : "bg-white text-[#616161] border-[#E2E8F0] hover:border-[#00B8D4] hover:text-[#00B8D4]"
                            }`}
                        >
                            {status === 'all' ? 'Tous' : status === 'new' ? 'Nouveaux' : status === 'read' ? 'Lus' : 'Traités'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Leads List */}
                <div className="lg:col-span-1 space-y-4">
                    {isLoading ? (
                        [1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-[2rem] border border-[#F1F5F9] animate-pulse" />)
                    ) : (
                        filteredLeads.map((lead, idx) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedLead(lead)}
                                className={`p-6 rounded-[2rem] border cursor-pointer smooth-animation ${
                                    selectedLead?.id === lead.id 
                                    ? "bg-[#00B8D4]/5 border-[#00B8D4] shadow-xl shadow-[#00B8D4]/10" 
                                    : "bg-white border-[#F1F5F9] hover:border-[#00B8D4] shadow-sm"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)}`}>
                                        {lead.status}
                                    </div>
                                    <span className="text-[10px] font-bold text-[#9E9E9E] flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-sm font-black text-[#212121] mb-1">{lead.name}</h3>
                                <p className="text-xs text-[#757575] font-bold mb-3 truncate">{lead.subject}</p>
                                <div className="flex items-center text-[10px] font-black text-[#00B8D4] uppercase tracking-widest">
                                    <Tag className="w-3 h-3 mr-2" />
                                    {lead.type}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Lead Detail */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {selectedLead ? (
                            <motion.div
                                key={selectedLead.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-xl p-10 h-full sticky top-32"
                            >
                                <div className="flex items-center justify-between mb-10 pb-10 border-b border-[#F1F5F9]">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 rounded-2xl bg-[#00B8D4] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#00B8D4]/20">
                                            {selectedLead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-[#212121]">{selectedLead.name}</h2>
                                            <p className="text-xs text-[#9E9E9E] font-black uppercase tracking-widest mt-1">{selectedLead.type} • Reçu le {new Date(selectedLead.created_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button className="p-4 bg-[#F8FAFC] text-[#616161] hover:bg-[#00B8D4]/10 hover:text-[#00B8D4] rounded-2xl smooth-animation">
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button className="p-4 bg-[#F8FAFC] text-[#616161] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                                    <div className="space-y-6">
                                        <div className="flex items-center text-[#212121]">
                                            <Mail className="w-5 h-5 mr-4 text-[#00B8D4]" />
                                            <div>
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-0.5">E-mail</p>
                                                <p className="text-sm font-bold">{selectedLead.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-[#212121]">
                                            <Phone className="w-5 h-5 mr-4 text-[#00B8D4]" />
                                            <div>
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-0.5">Téléphone</p>
                                                <p className="text-sm font-bold">{selectedLead.phone || "Non renseigné"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center text-[#212121]">
                                            <Tag className="w-5 h-5 mr-4 text-[#00B8D4]" />
                                            <div>
                                                <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-0.5">Sujet</p>
                                                <p className="text-sm font-bold">{selectedLead.subject}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#F8FAFC] rounded-3xl p-8 mb-10">
                                    <p className="text-[10px] font-black text-[#9E9E9E] uppercase tracking-widest mb-4 flex items-center">
                                        <MessageSquare className="w-3.5 h-3.5 mr-2" /> Message du client
                                    </p>
                                    <p className="text-sm font-medium text-[#212121] leading-relaxed italic">
                                        "{selectedLead.message}"
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <a 
                                        href={`mailto:${selectedLead.email}`}
                                        className="flex-1 flex items-center justify-center py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                                    >
                                        <Mail className="w-5 h-5 mr-3" />
                                        Répondre par Email
                                    </a>
                                    <button className="flex-1 flex items-center justify-center py-5 px-6 bg-white border border-[#E2E8F0] text-[#616161] rounded-[1.5rem] hover:border-[#00B8D4] hover:text-[#00B8D4] smooth-animation font-black text-xs uppercase tracking-widest">
                                        Marquer comme traité
                                        <ArrowRight className="w-5 h-5 ml-3" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-[2.5rem] flex flex-col items-center justify-center text-[#9E9E9E] p-20 text-center">
                                <Inbox className="w-20 h-20 mb-6 opacity-20" />
                                <h2 className="text-2xl font-black text-[#212121] opacity-40">Sélectionnez une demande</h2>
                                <p className="text-sm font-medium mt-2 max-w-xs">Cliquez sur un message dans la liste pour voir les détails et répondre au client.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
