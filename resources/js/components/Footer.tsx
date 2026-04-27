import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import axios from "axios";

type SocialLink = {
    id: number;
    platform: string;
    url: string;
    icon?: string;
};

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [contactPhone, setContactPhone] = React.useState("+224 622 14 67 14");
    const [contactEmail, setContactEmail] = React.useState("contact@mac-construction.com");
    const [contactAddress, setContactAddress] = React.useState("Conakry, Guinée");
    const [companyTagline, setCompanyTagline] = React.useState(
        "Votre partenaire de confiance pour tous vos projets de construction et forage en Afrique. Expertise, qualité et engagement."
    );
    const [footerDescription, setFooterDescription] = React.useState(
        "Leader de la construction moderne en Afrique"
    );
    const [copyrightText, setCopyrightText] = React.useState(
        "© {year} MAC Construction. Tous droits réservés."
    );
    const [socialLinks, setSocialLinks] = React.useState<SocialLink[]>([]);

    React.useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/api/cms/global");
                const settings = res.data?.settings;
                const contactGroup = settings?.contact || [];
                const generalGroup = settings?.general || [];

                const phone = contactGroup.find((s: any) => s.key === 'main_phone')?.value;
                const email = contactGroup.find((s: any) => s.key === 'main_email')?.value;
                const address = contactGroup.find((s: any) => s.key === 'main_address')?.value;
                const tagline = generalGroup.find((s: any) => s.key === 'company_tagline')?.value;
                const footerDesc = generalGroup.find((s: any) => s.key === 'footer_description')?.value;
                const copyrightTxt = generalGroup.find((s: any) => s.key === 'copyright_text')?.value;

                if (phone) setContactPhone(String(phone));
                if (email) setContactEmail(String(email));
                if (address) setContactAddress(String(address));
                if (tagline) setCompanyTagline(String(tagline));
                if (footerDesc) setFooterDescription(String(footerDesc));
                if (copyrightTxt) setCopyrightText(String(copyrightTxt));

                if (Array.isArray(res.data?.social_links)) {
                    setSocialLinks(res.data.social_links);
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
            facebook: <Facebook className="w-4 h-4" />,
            linkedin: <Linkedin className="w-4 h-4" />,
            twitter: <Twitter className="w-4 h-4" />,
            instagram: <Instagram className="w-4 h-4" />,
        };
        return icons[platformLower] || <Facebook className="w-4 h-4" />;
    };

    return (
        <footer className="bg-[#212121] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="inline-block mb-8 group shrink-0">
                            <img
                                src="/img/footer_logo.png"
                                alt="MAC Footer Logo"
                                className="h-20 md:h-24 w-auto object-contain smooth-animation group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-white/75 text-sm leading-relaxed mb-8">
                            {footerDescription}
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.length > 0 ? socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:bg-[#00B8D4] hover:text-white p-2 rounded-full smooth-animation bg-white/10"
                                >
                                    {getSocialIcon(social.platform)}
                                </a>
                            )) : (
                                <>
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
                                </>
                            )}
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
                                { path: "/careers", label: "Carrières" },
                                { path: "/partnership", label: "Partenariat" },
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
                                    href={`tel:${contactPhone.replace(/\s/g, '')}`}
                                    className="text-white/75 hover:text-[#00B8D4] smooth-animation"
                                >
                                    {contactPhone}
                                </a>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Mail className="w-4 h-4 mt-0.5 text-[#00B8D4] flex-shrink-0" />
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="text-white/75 hover:text-[#00B8D4] smooth-animation"
                                >
                                    {contactEmail}
                                </a>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-[#00B8D4] flex-shrink-0" />
                                <span className="text-white/75">
                                    {contactAddress}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-white/75 text-sm">
                        {copyrightText.replace('{year}', String(currentYear))}
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
