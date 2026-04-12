import React, { useRef, useState } from "react";
import { Plus, X, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

interface ImageUploaderProps {
    value: string | null;
    onChange: (url: string | null) => void;
    label?: string;
    className?: string;
}

const MAX_SIZE_MB = 5;
const ACCEPTED = "image/jpeg,image/png,image/webp,image/gif,image/svg+xml";

export default function ImageUploader({
    value,
    onChange,
    label = "Ajouter une photo",
    className = "",
}: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = () => {
        if (!uploading) inputRef.current?.click();
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side validation
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`Fichier trop volumineux (max ${MAX_SIZE_MB} Mo)`);
            return;
        }

        setError(null);
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.post("/api/media", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            onChange(data.url);
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.file?.[0] ||
                "Échec de l'envoi";
            setError(msg);
        } finally {
            setUploading(false);
            // Reset input so re-selecting the same file triggers onChange
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        setError(null);
    };

    return (
        <div className={className}>
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED}
                onChange={handleFile}
                className="hidden"
            />

            {value ? (
                <div
                    className="relative w-full h-40 rounded-[2rem] overflow-hidden border border-[#F1F5F9] group cursor-pointer"
                    onClick={handleClick}
                >
                    <img
                        src={value}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 smooth-animation flex items-center justify-center">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">
                            Changer l'image
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-3 right-3 p-2 bg-white/90 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 smooth-animation hover:bg-red-50"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={handleClick}
                    className={`w-full h-40 bg-[#F8FAFC] border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center smooth-animation cursor-pointer group ${
                        error
                            ? "border-red-300 hover:border-red-400"
                            : "border-[#E2E8F0] hover:border-[#00B8D4] hover:bg-[#00B8D4]/5"
                    }`}
                >
                    {uploading ? (
                        <Loader2 className="w-8 h-8 text-[#00B8D4] animate-spin" />
                    ) : (
                        <>
                            <Plus className="w-8 h-8 mb-2 text-[#9E9E9E] group-hover:scale-110 smooth-animation" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                {label}
                            </span>
                        </>
                    )}
                </div>
            )}

            {error && (
                <div className="flex items-center mt-2 text-xs text-red-500 font-bold">
                    <AlertCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    {error}
                </div>
            )}
        </div>
    );
}
