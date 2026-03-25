import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#212121] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">
                            MAC Construction
                        </h3>
                        <p className="text-white/75 text-sm leading-relaxed mb-4">
                            Votre partenaire de confiance pour tous vos projets
                            de construction et forage en Afrique.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="hover:bg-[#00B8D4] hover:text-white p-2 rounded-full smooth-animation bg-white/10"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="hover:bg-[#00B8D4] hover:text-white p-2 rounded-full smooth-animation bg-white/10"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="hover:bg-[#00B8D4] hover:text-white p-2 rounded-full smooth-animation bg-white/10"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Navigation</h4>
                        <ul className="space-y-2">
                            {[
                                { path: "/", label: "Accueil" },
                                { path: "/services", label: "Services" },
                                { path: "/projects", label: "Projets" },
                                { path: "/blog", label: "Blog" },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-white/75 hover:text-[#00B8D4] text-sm smooth-animation"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Ressources</h4>
                        <ul className="space-y-2">
                            {[
                                { path: "/about", label: "À Propos" },
                                { path: "/contact", label: "Contact" },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-white/75 hover:text-[#00B8D4] text-sm smooth-animation"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Nous Contacter</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-2">
                                <Phone className="w-4 h-4 mt-0.5 text-[#00B8D4] flex-shrink-0" />
                                <a
                                    href="tel:+225000000000"
                                    className="text-white/75 hover:text-[#00B8D4] smooth-animation"
                                >
                                    +225 (0) 000 000 000
                                </a>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Mail className="w-4 h-4 mt-0.5 text-[#00B8D4] flex-shrink-0" />
                                <a
                                    href="mailto:contact@mac.ci"
                                    className="text-white/75 hover:text-[#00B8D4] smooth-animation"
                                >
                                    contact@mac.ci
                                </a>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-[#00B8D4] flex-shrink-0" />
                                <span className="text-white/75">
                                    Abidjan, Côte d'Ivoire
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-white/75 text-sm">
                        © {currentYear} Merveille d'Afrique Construction. Tous
                        droits réservés.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
                        <Link
                            to="#"
                            className="text-white/75 hover:text-[#00B8D4] smooth-animation"
                        >
                            Politique de confidentialité
                        </Link>
                        <Link
                            to="#"
                            className="text-white/75 hover:text-[#00B8D4] smooth-animation"
                        >
                            Conditions d'utilisation
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
