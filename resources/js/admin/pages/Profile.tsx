import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Lock, Save, User, Mail } from "lucide-react";
import { useToast } from "../../services/ToastContext";
import { useAuth } from "../../services/AuthContext";
import ImageUploader from "../../components/ImageUploader";

type ProfileForm = {
    name: string;
    email: string;
    avatar: string;
    bio: string;
};

type PasswordForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export default function AdminProfile() {
    const { toast } = useToast();
    const { refreshUser } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    const [profile, setProfile] = useState<ProfileForm>({
        name: "",
        email: "",
        avatar: "",
        bio: "",
    });

    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("/api/admin/profile");
                if (!isMounted) return;
                setProfile({
                    name: String(res.data?.name || ""),
                    email: String(res.data?.email || ""),
                    avatar: String(res.data?.avatar || ""),
                    bio: String(res.data?.bio || ""),
                });
            } catch (err: any) {
                const msg =
                    err.response?.data?.message || "Impossible de charger le profil";
                toast(msg, "error");
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        load();
        return () => {
            isMounted = false;
        };
    }, [toast]);

    const saveProfile = async () => {
        setIsSaving(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.put("/api/admin/profile", {
                name: profile.name,
                email: profile.email,
                avatar: profile.avatar || null,
                bio: profile.bio || null,
            });
            await refreshUser();
            toast("Profil mis à jour");
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Impossible de mettre à jour le profil";
            toast(msg, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const savePassword = async () => {
        setIsSavingPassword(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.put("/api/admin/profile/password", passwordForm);
            setPasswordForm({
                current_password: "",
                password: "",
                password_confirmation: "",
            });
            toast("Mot de passe mis à jour");
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Impossible de mettre à jour le mot de passe";
            toast(msg, "error");
        } finally {
            setIsSavingPassword(false);
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <header>
                <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                    Mon profil
                </h1>
                <p className="text-[#757575] font-medium mt-2">
                    Mettre à jour vos informations et votre mot de passe
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-sm p-10"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-[#00B8D4]/10 text-[#00B8D4] flex items-center justify-center">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-[#212121]">
                                Informations
                            </h2>
                            <p className="text-sm font-medium text-[#616161] mt-1">
                                Nom, email, avatar et bio
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                Nom
                            </label>
                            <input
                                type="text"
                                value={profile.name}
                                disabled={isLoading}
                                onChange={(e) =>
                                    setProfile((p) => ({ ...p, name: e.target.value }))
                                }
                                className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121] disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled={isLoading}
                                    onChange={(e) =>
                                        setProfile((p) => ({
                                            ...p,
                                            email: e.target.value,
                                        }))
                                    }
                                    className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121] disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                Avatar
                            </label>
                            <ImageUploader
                                value={profile.avatar ? profile.avatar : null}
                                onChange={(url) =>
                                    setProfile((p) => ({
                                        ...p,
                                        avatar: url || "",
                                    }))
                                }
                                label="Téléverser un avatar"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                Bio
                            </label>
                            <textarea
                                value={profile.bio}
                                disabled={isLoading}
                                onChange={(e) =>
                                    setProfile((p) => ({ ...p, bio: e.target.value }))
                                }
                                className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121] disabled:opacity-50 min-h-32"
                            />
                        </div>

                        <button
                            onClick={saveProfile}
                            disabled={isSaving || isLoading}
                            className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Enregistrement..." : "Enregistrer"}
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-sm p-10"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-[#212121]">
                                Sécurité
                            </h2>
                            <p className="text-sm font-medium text-[#616161] mt-1">
                                Modifier votre mot de passe
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                Mot de passe actuel
                            </label>
                            <input
                                type="password"
                                value={passwordForm.current_password}
                                onChange={(e) =>
                                    setPasswordForm((p) => ({
                                        ...p,
                                        current_password: e.target.value,
                                    }))
                                }
                                className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                value={passwordForm.password}
                                onChange={(e) =>
                                    setPasswordForm((p) => ({
                                        ...p,
                                        password: e.target.value,
                                    }))
                                }
                                className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                Confirmation
                            </label>
                            <input
                                type="password"
                                value={passwordForm.password_confirmation}
                                onChange={(e) =>
                                    setPasswordForm((p) => ({
                                        ...p,
                                        password_confirmation: e.target.value,
                                    }))
                                }
                                className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121]"
                            />
                        </div>

                        <button
                            onClick={savePassword}
                            disabled={isSavingPassword}
                            className="w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                        >
                            <Lock className="w-4 h-4" />
                            {isSavingPassword ? "Enregistrement..." : "Mettre à jour"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
