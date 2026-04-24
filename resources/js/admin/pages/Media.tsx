import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { useToast } from "../../services/ToastContext";
import ConfirmDialog from "../../components/ConfirmDialog";

type MediaItem = {
    id: number;
    name: string;
    mime_type: string;
    size: number;
    url: string;
    thumbnail_url: string | null;
    created_at: string;
};

export default function AdminMedia() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [pendingDelete, setPendingDelete] = useState<MediaItem | null>(null);
    const { toast } = useToast();

    const fetchMedia = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/media");
            setItems(response.data.data || []);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Impossible de charger les médias";
            toast(msg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handlePick = () => {
        if (uploading) return;
        inputRef.current?.click();
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            const form = new FormData();
            form.append("file", file);
            const { data } = await axios.post("/api/media", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setItems((prev) => [data, ...prev]);
            toast("Média importé");
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.file?.[0] ||
                "Échec de l'import";
            toast(msg, "error");
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleDelete = async (item: MediaItem) => {
        setPendingDelete(item);
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/media/${pendingDelete.id}`);
            setItems((prev) => prev.filter((x) => x.id !== pendingDelete.id));
            toast("Média supprimé");
            setPendingDelete(null);
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Échec de la suppression";
            toast(msg, "error");
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#212121] tracking-tight">
                        Médiathèque
                    </h1>
                    <p className="text-[#757575] font-medium mt-2 flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2 text-[#00B8D4]" />
                        {items.length} fichiers
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                    <button
                        onClick={handlePick}
                        disabled={uploading}
                        className="flex items-center px-6 py-4 bg-[#212121] text-white rounded-[1.25rem] shadow-xl shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1 smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                    >
                        <Upload className="w-4 h-4 mr-3" />
                        Importer
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div
                                key={i}
                                className="bg-white h-48 rounded-[2rem] border border-[#F1F5F9] animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.02 }}
                                className="bg-white border border-[#F1F5F9] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-animation group"
                            >
                                <div className="relative h-40 bg-[#F8FAFC] overflow-hidden">
                                    <img
                                        src={item.thumbnail_url || item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="absolute top-3 right-3 p-2 bg-white/90 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 smooth-animation hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs font-black text-[#212121] truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-[10px] font-bold text-[#9E9E9E] uppercase tracking-widest mt-1 truncate">
                                        {item.mime_type}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <ConfirmDialog
                open={!!pendingDelete}
                title="Supprimer le média ?"
                message={
                    pendingDelete
                        ? `Cette action supprimera "${pendingDelete.name}".`
                        : ""
                }
                confirmText="Supprimer"
                cancelText="Annuler"
                onCancel={() => setPendingDelete(null)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
