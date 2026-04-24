import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import {
    Plus,
    Search,
    Edit2,
    Shield,
    ShieldOff,
    Users as UsersIcon,
    X,
    Save,
    User,
    Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../../components/ModalPortal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useToast } from "../../services/ToastContext";
import { useAuth } from "../../services/AuthContext";

type Role = "super_admin" | "admin" | "editor";

type UserItem = {
    id: number;
    name: string;
    email: string;
    role: Role;
    is_active: boolean;
    created_at: string;
};

type UserForm = {
    name: string;
    email: string;
    role: Role;
    password: string;
    password_confirmation: string;
};

export default function AdminUsers() {
    const { user: authUser } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [users, setUsers] = useState<UserItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserItem | null>(null);
    const [pendingToggle, setPendingToggle] = useState<UserItem | null>(null);

    const [form, setForm] = useState<UserForm>({
        name: "",
        email: "",
        role: "editor",
        password: "",
        password_confirmation: "",
    });

    const actorRole = authUser?.role as Role | undefined;

    useEffect(() => {
        if (!authUser) return;
        if (authUser.role === "editor") {
            navigate("/admin", { replace: true });
        }
    }, [authUser, navigate]);

    const canView = actorRole === "super_admin" || actorRole === "admin";
    const canCreate = actorRole === "super_admin" || actorRole === "admin";

    const allowedRolesForCreate: Role[] = useMemo(() => {
        if (actorRole === "super_admin") return ["super_admin", "admin", "editor"];
        if (actorRole === "admin") return ["editor"];
        return [];
    }, [actorRole]);

    const rolesForSelect: Role[] =
        editingUser && actorRole === "admin"
            ? ["editor"]
            : allowedRolesForCreate;

    const fetchUsers = useCallback(async () => {
        if (!canView) return;
        setIsLoading(true);
        try {
            const res = await axios.get("/api/admin/users", {
                params: search.trim() ? { q: search.trim() } : undefined,
            });
            setUsers(res.data?.data || []);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Impossible de charger les utilisateurs";
            toast(msg, "error");
        } finally {
            setIsLoading(false);
        }
    }, [canView, search, toast]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const roleLabel = (role: Role) => {
        if (role === "super_admin") return "Super admin";
        if (role === "admin") return "Admin";
        return "Éditeur";
    };

    const canEditUser = (target: UserItem) => {
        if (!actorRole) return false;
        if (actorRole === "super_admin") return true;
        if (actorRole === "admin") return target.role === "editor";
        return false;
    };

    const canToggleActive = (target: UserItem) => {
        if (!actorRole) return false;
        if (authUser?.id === target.id) return false;
        if (actorRole === "super_admin") return true;
        if (actorRole === "admin") return target.role === "editor";
        return false;
    };

    const openCreate = () => {
        setEditingUser(null);
        setForm({
            name: "",
            email: "",
            role: allowedRolesForCreate[0] || "editor",
            password: "",
            password_confirmation: "",
        });
        setIsModalOpen(true);
    };

    const openEdit = (u: UserItem) => {
        setEditingUser(u);
        setForm({
            name: u.name,
            email: u.email,
            role: u.role,
            password: "",
            password_confirmation: "",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const submit = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie");
            if (editingUser) {
                await axios.put(`/api/admin/users/${editingUser.id}`, {
                    name: form.name,
                    email: form.email,
                    role: form.role,
                });
                toast("Utilisateur mis à jour");
            } else {
                await axios.post("/api/admin/users", form);
                toast("Utilisateur créé");
            }
            closeModal();
            await fetchUsers();
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                "Impossible d'enregistrer l'utilisateur";
            toast(msg, "error");
        }
    };

    const toggleActive = async (u: UserItem) => {
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.patch(`/api/admin/users/${u.id}/toggle-active`);
            toast(u.is_active ? "Utilisateur désactivé" : "Utilisateur réactivé");
            setPendingToggle(null);
            await fetchUsers();
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Impossible de changer le statut";
            toast(msg, "error");
        }
    };

    if (!canView) {
        return (
            <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] p-10">
                <div className="flex items-center gap-4">
                    <ShieldOff className="w-6 h-6 text-red-500" />
                    <div>
                        <h1 className="text-xl font-black text-[#212121]">Accès refusé</h1>
                        <p className="text-sm font-medium text-[#616161] mt-1">
                            Vous n’avez pas l’autorisation d’accéder à la liste des utilisateurs.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight flex items-center gap-3">
                        <UsersIcon className="w-7 h-7 text-[#00B8D4]" />
                        Utilisateurs
                    </h1>
                    <p className="text-[#757575] font-medium mt-2">
                        Gestion des comptes et des rôles
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9E9E9E] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") fetchUsers();
                            }}
                            className="w-72 pl-14 pr-6 py-4 bg-white border border-[#E2E8F0] rounded-2xl focus:ring-4 focus:ring-[#00B8D4]/10 outline-none text-sm font-bold text-[#212121] placeholder:text-[#9E9E9E] placeholder:font-medium smooth-animation"
                        />
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="px-6 py-4 bg-[#212121] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00B8D4] smooth-animation"
                    >
                        Recharger
                    </button>
                    {canCreate && (
                        <button
                            onClick={openCreate}
                            className="px-6 py-4 bg-[#00B8D4] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#00B8D4]/20 hover:-translate-y-1 smooth-animation flex items-center gap-3"
                        >
                            <Plus className="w-4 h-4" />
                            Créer
                        </button>
                    )}
                </div>
            </header>

            <div className="bg-white rounded-[2.5rem] border border-[#F1F5F9] shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-8 py-5 border-b border-[#F1F5F9] text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                    <div className="col-span-4">Utilisateur</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-2">Rôle</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {isLoading ? (
                    <div className="p-8 space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-16 bg-[#F8FAFC] rounded-2xl animate-pulse"
                            />
                        ))}
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center text-sm font-bold text-[#757575]">
                        Aucun utilisateur trouvé
                    </div>
                ) : (
                    <div className="divide-y divide-[#F1F5F9]">
                        {users.map((u) => (
                            <div
                                key={u.id}
                                className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-[#F8FAFC] smooth-animation"
                            >
                                <div className="col-span-4 flex items-center gap-4 min-w-0">
                                    <div className="w-10 h-10 rounded-2xl bg-[#00B8D4]/10 text-[#00B8D4] flex items-center justify-center font-black shrink-0">
                                        {(u.name || "U").charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-black text-[#212121] truncate">
                                            {u.name}
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mt-1 flex items-center gap-2">
                                            {u.is_active ? (
                                                <>
                                                    <Shield className="w-3 h-3 text-emerald-500" />
                                                    Actif
                                                </>
                                            ) : (
                                                <>
                                                    <ShieldOff className="w-3 h-3 text-red-500" />
                                                    Désactivé
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 text-sm font-bold text-[#616161] truncate flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[#9E9E9E]" />
                                    {u.email}
                                </div>
                                <div className="col-span-2">
                                    <span className="inline-flex items-center px-3 py-2 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-black uppercase tracking-widest text-[#616161]">
                                        {roleLabel(u.role)}
                                    </span>
                                </div>
                                <div className="col-span-2 flex justify-end gap-3">
                                    {canEditUser(u) && (
                                        <button
                                            onClick={() => openEdit(u)}
                                            className="p-3 bg-white border border-[#E2E8F0] rounded-2xl text-[#616161] hover:text-[#00B8D4] hover:border-[#00B8D4] smooth-animation"
                                            title="Modifier"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                    )}
                                    {canToggleActive(u) && (
                                        <button
                                            onClick={() => setPendingToggle(u)}
                                            className={`p-3 rounded-2xl border smooth-animation ${
                                                u.is_active
                                                    ? "bg-white border-red-200 text-red-500 hover:bg-red-50"
                                                    : "bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                            }`}
                                            title={u.is_active ? "Désactiver" : "Réactiver"}
                                        >
                                            {u.is_active ? (
                                                <ShieldOff className="w-4 h-4" />
                                            ) : (
                                                <Shield className="w-4 h-4" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={!!pendingToggle}
                title={pendingToggle?.is_active ? "Désactiver l’utilisateur ?" : "Réactiver l’utilisateur ?"}
                message={
                    pendingToggle
                        ? `${pendingToggle.name} (${pendingToggle.email})`
                        : ""
                }
                confirmText={pendingToggle?.is_active ? "Désactiver" : "Réactiver"}
                danger={!!pendingToggle?.is_active}
                onCancel={() => setPendingToggle(null)}
                onConfirm={async () => {
                    if (!pendingToggle) return;
                    await toggleActive(pendingToggle);
                }}
            />

            <ModalPortal>
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                                className="fixed inset-0 bg-[#212121]/60 backdrop-blur-md z-[80]"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed inset-0 m-auto w-full max-w-2xl h-fit bg-white rounded-[2.75rem] shadow-2xl z-[90] overflow-hidden"
                            >
                                <div className="p-10 flex items-start justify-between border-b border-[#F1F5F9]">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#00B8D4]/10 text-[#00B8D4] flex items-center justify-center shrink-0">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-[#212121]">
                                                {editingUser ? "Modifier l’utilisateur" : "Créer un utilisateur"}
                                            </h3>
                                            <p className="text-sm font-medium text-[#616161] mt-2">
                                                {editingUser
                                                    ? "Mettre à jour les informations du compte"
                                                    : "Créer un nouveau compte pour l’administration"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-10 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) =>
                                                    setForm((p) => ({
                                                        ...p,
                                                        name: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm((p) => ({
                                                        ...p,
                                                        email: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121]"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                            Rôle
                                        </label>
                                        <select
                                            value={form.role}
                                            disabled={allowedRolesForCreate.length === 1 && !editingUser && actorRole === "admin"}
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    role: e.target.value as Role,
                                                }))
                                            }
                                            className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-black text-[#212121]"
                                        >
                                            {rolesForSelect.map((r) => (
                                                <option key={r} value={r}>
                                                    {roleLabel(r)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {!editingUser && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">
                                                    Mot de passe
                                                </label>
                                                <input
                                                    type="password"
                                                    value={form.password}
                                                    onChange={(e) =>
                                                        setForm((p) => ({
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
                                                    value={form.password_confirmation}
                                                    onChange={(e) =>
                                                        setForm((p) => ({
                                                            ...p,
                                                            password_confirmation:
                                                                e.target.value,
                                                        }))
                                                    }
                                                    className="w-full px-6 py-4 bg-[#F8FAFC] rounded-2xl outline-none focus:ring-4 focus:ring-[#00B8D4]/10 text-sm font-bold text-[#212121]"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-10 pt-0 flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={submit}
                                        className="flex-1 flex items-center justify-center gap-3 py-5 px-6 bg-[#212121] text-white rounded-[1.5rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest"
                                    >
                                        <Save className="w-4 h-4" />
                                        Enregistrer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 flex items-center justify-center py-5 px-6 bg-white border border-[#E2E8F0] text-[#616161] rounded-[1.5rem] hover:bg-[#F8FAFC] hover:text-[#212121] smooth-animation font-black text-xs uppercase tracking-widest"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </ModalPortal>
        </div>
    );
}
