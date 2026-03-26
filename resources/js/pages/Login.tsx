import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { LogIn, Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/admin";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await login({ email, password });
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.response?.data?.message || "Identifiants invalides. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-[#00B8D4]/30">
            {/* Left Side - Visual/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#212121] overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#212121] via-[#212121]/90 to-transparent"></div>
                <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200"
                    alt="MAC Construction"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px] opacity-40"
                />

                <div className="relative z-20 flex flex-col justify-between p-16 w-full">
                    <Link to="/" className="flex items-center group">
                        <img src="/img/logo.png" alt="MAC Logo" className="h-12 w-auto brightness-0 invert mr-4 smooth-animation group-hover:scale-110" />
                        <div>
                            <h1 className="text-3xl font-black text-white italic leading-none">MAC</h1>
                            <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em] mt-1">Merveille d'Afrique Construction</p>
                        </div>
                    </Link>

                    <div className="max-w-md">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-5xl font-black text-white leading-tight mb-8">
                                Gérez votre excellence <span className="text-[#00B8D4]">architecturale</span>.
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed font-medium">
                                Accédez au panneau d'administration pour mettre à jour vos projets, articles de blog et gérer vos demandes de devis.
                            </p>
                        </motion.div>
                    </div>

                    <div className="flex items-center space-x-8 text-white/40 text-xs font-black uppercase tracking-widest">
                        <span>© {new Date().getFullYear()} MAC Construction</span>
                        <div className="flex space-x-4">
                            <Link to="#" className="hover:text-white smooth-animation">Confidentialité</Link>
                            <Link to="#" className="hover:text-white smooth-animation">Support</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#F8FAFC]">
                <div className="max-w-md w-full">
                    <div className="mb-12">
                        <Link to="/" className="lg:hidden inline-flex items-center text-xs font-black text-[#212121] uppercase tracking-widest mb-10 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 smooth-animation" />
                            Retour au site
                        </Link>
                        <h2 className="text-4xl font-black text-[#212121] mb-4">Connexion Admin</h2>
                        <p className="text-[#757575] font-medium">Entrez vos identifiants pour accéder au tableau de bord.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-2xl flex items-start text-red-700 text-sm"
                                >
                                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                                    <p className="font-bold leading-relaxed">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-[#212121] uppercase tracking-widest ml-1 flex items-center">
                                    <Mail className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Adresse Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-6 py-4 bg-white border border-[#E2E8F0] rounded-[1.25rem] focus:ring-4 focus:ring-[#00B8D4]/10 focus:border-[#00B8D4] outline-none smooth-animation text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium"
                                    placeholder="nom@mac-construction.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-xs font-black text-[#212121] uppercase tracking-widest flex items-center">
                                        <Lock className="w-3.5 h-3.5 mr-2 text-[#00B8D4]" /> Mot de passe
                                    </label>
                                    <Link to="#" className="text-[10px] font-black text-[#00B8D4] uppercase tracking-widest hover:underline">Oublié ?</Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full px-6 py-4 bg-white border border-[#E2E8F0] rounded-[1.25rem] focus:ring-4 focus:ring-[#00B8D4]/10 focus:border-[#00B8D4] outline-none smooth-animation text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium"
                                        placeholder="••••••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-[#9E9E9E] hover:text-[#00B8D4] smooth-animation"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 ml-1">
                            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-[#E2E8F0] text-[#00B8D4] focus:ring-[#00B8D4]" />
                            <label htmlFor="remember" className="text-xs font-black text-[#616161] uppercase tracking-widest cursor-pointer">Se souvenir de moi</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group w-full flex items-center justify-center py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation disabled:opacity-50 disabled:translate-y-0"
                        >
                            {isLoading ? (
                                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="text-xs font-black uppercase tracking-widest mr-3">Accéder au Dashboard</span>
                                    <LogIn className="w-5 h-5 group-hover:translate-x-1 smooth-animation" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-16 pt-8 border-t border-[#E2E8F0] text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-[#F1F5F9] rounded-full">
                            <ShieldCheck className="w-4 h-4 text-[#00B8D4] mr-2" />
                            <span className="text-[10px] font-black text-[#616161] uppercase tracking-widest">Connexion sécurisée SSL 256-bit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
