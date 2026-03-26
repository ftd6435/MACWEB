import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const isActive = (path: string) => {
        if (path === "/" && location.pathname !== "/") return false;
        return location.pathname.startsWith(path);
    };

    const navLinks = [
        { path: "/", label: "Accueil" },
        { path: "/services", label: "Services" },
        { path: "/projects", label: "Projets" },
        { path: "/blog", label: "Blog" },
        { path: "/about", label: "À Propos" },
        { path: "/contact", label: "Contact" },
    ];

    return (
        <>
            <header
                className={`sticky top-0 z-[100] smooth-animation ${
                    isOpen
                    ? "bg-white h-20"
                    : scrolled
                    ? "bg-white/90 backdrop-blur-md h-20 shadow-lg border-b border-[#F1F5F9]"
                    : "bg-white h-24 border-b border-[#E2E8F0]"
                }`}
            >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group shrink-0">
                        <img
                            src="/img/header_logo.png"
                            alt="MAC Logo"
                            className="h-12 md:h-14 w-auto object-contain smooth-animation group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-5 py-2 text-[13px] font-black uppercase tracking-widest smooth-animation rounded-xl relative group ${
                                    isActive(link.path)
                                        ? "text-[#00B8D4]"
                                        : "text-[#212121] hover:text-[#00B8D4]"
                                }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute bottom-0 left-5 right-5 h-0.5 bg-[#00B8D4] rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center space-x-2 cursor-pointer group px-3 py-2 rounded-xl hover:bg-[#F8FAFC] smooth-animation">
                            <Globe className="w-4 h-4 text-[#9E9E9E] group-hover:text-[#00B8D4] smooth-animation" />
                            <span className="text-xs font-black text-[#212121] uppercase tracking-widest">FR</span>
                            <ChevronDown className="w-3 h-3 text-[#9E9E9E] group-hover:text-[#00B8D4] smooth-animation" />
                        </div>
                        <Link
                            to="/contact"
                            className="px-8 py-3.5 bg-[#00B8D4] text-white text-[10px] font-black rounded-xl shadow-xl shadow-[#00B8D4]/20 hover:bg-[#0097A7] hover:-translate-y-0.5 smooth-animation uppercase tracking-[0.15em] flex items-center gap-2"
                        >
                            Demander un Devis <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#00B8D4] hover:text-white hover:border-[#00B8D4] smooth-animation group"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>
        </header>

        {/* Mobile Navigation Overlay - Moved outside header for global stacking */}
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-[#212121]/60 backdrop-blur-sm lg:hidden z-[110]"
                    />
                    <motion.nav
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl lg:hidden z-[120] p-10 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <img src="/img/header_logo.png" alt="Logo" className="h-12 md:h-14 w-auto object-contain" />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-[#F8FAFC] rounded-xl smooth-animation"
                            >
                                <X className="w-6 h-6 text-[#212121]" />
                            </button>
                        </div>

                        <div className="flex-1 space-y-4">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`block py-4 text-lg font-black uppercase tracking-[0.1em] border-b border-[#F1F5F9] smooth-animation ${
                                            isActive(link.path)
                                                ? "text-[#00B8D4]"
                                                : "text-[#212121] hover:text-[#00B8D4]"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto space-y-6 pt-10 border-t border-[#F1F5F9]">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-[#9E9E9E] uppercase tracking-widest">Langue</span>
                                <div className="flex items-center gap-2 font-black text-[#212121] text-xs">
                                    <span className="text-[#00B8D4]">FR</span>
                                    <span className="text-[#E2E8F0]">|</span>
                                    <span className="opacity-40">EN</span>
                                </div>
                            </div>
                            <Link
                                to="/contact"
                                className="w-full py-5 bg-[#00B8D4] text-white text-xs font-black rounded-2xl shadow-xl shadow-[#00B8D4]/20 hover:bg-[#0097A7] smooth-animation uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                Demander un Devis <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    </>
);
}
