import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Building2 } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        return (
            location.pathname === path ||
            location.pathname.startsWith(path + "/")
        );
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
        <header className="nav-primary sticky top-0 z-50 border-b border-[#E0E0E0] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00B8D4]/10 group-hover:bg-[#00B8D4]/20 smooth-animation">
                            <Building2 className="w-6 h-6 text-[#00B8D4]" />
                        </div>
                        <span className="text-xl font-bold text-[#212121] hidden sm:inline">
                            MAC
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium smooth-animation ${
                                    isActive(link.path)
                                        ? "text-[#00B8D4] border-b-2 border-[#00B8D4] pb-2"
                                        : "text-[#616161] hover:text-[#00B8D4]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Admin Link */}
                    <div className="hidden md:block">
                        <Link
                            to="/admin"
                            className="px-4 py-2 rounded-full bg-[#00B8D4]/10 text-[#00B8D4] text-sm font-medium hover:bg-[#00B8D4]/20 smooth-animation"
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-[#F5F5F5] smooth-animation"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-[#212121]" />
                        ) : (
                            <Menu className="w-6 h-6 text-[#212121]" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <nav className="md:hidden pb-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-4 py-2 rounded-lg text-sm font-medium smooth-animation ${
                                    isActive(link.path)
                                        ? "bg-[#00B8D4]/10 text-[#00B8D4]"
                                        : "text-[#616161] hover:bg-[#F5F5F5]"
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to="/admin"
                            className="block px-4 py-2 rounded-lg bg-[#00B8D4]/10 text-[#00B8D4] text-sm font-medium hover:bg-[#00B8D4]/20 smooth-animation"
                            onClick={() => setIsOpen(false)}
                        >
                            Admin
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
