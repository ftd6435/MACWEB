import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import ModalPortal from "./ModalPortal";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
    onCancel: () => void;
    onConfirm: () => void | Promise<void>;
};

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Supprimer",
    cancelText = "Annuler",
    danger = true,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) {
    const [isBusy, setIsBusy] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onCancel]);

    useEffect(() => {
        if (!open) setIsBusy(false);
    }, [open]);

    const handleConfirm = async () => {
        if (isBusy) return;
        setIsBusy(true);
        try {
            await onConfirm();
        } finally {
            setIsBusy(false);
        }
    };

    return (
        <ModalPortal>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                if (!isBusy) onCancel();
                            }}
                            className="fixed inset-0 bg-[#212121]/60 backdrop-blur-md z-[90]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-white rounded-[2.75rem] shadow-2xl z-[100] overflow-hidden"
                        >
                            <div className="p-10 flex items-start justify-between border-b border-[#F1F5F9]">
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                            danger
                                                ? "bg-red-50 text-red-500"
                                                : "bg-[#00B8D4]/10 text-[#00B8D4]"
                                        }`}
                                    >
                                        <AlertCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-[#212121]">
                                            {title}
                                        </h3>
                                        <p className="text-sm font-medium text-[#616161] mt-2">
                                            {message}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!isBusy) onCancel();
                                    }}
                                    className="p-4 bg-[#F8FAFC] text-[#212121] hover:bg-red-50 hover:text-red-500 rounded-2xl smooth-animation disabled:opacity-50"
                                    disabled={isBusy}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-10 pt-8 flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleConfirm}
                                    disabled={isBusy}
                                    className={`flex-1 flex items-center justify-center py-5 px-6 rounded-[1.5rem] shadow-xl smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50 ${
                                        danger
                                            ? "bg-red-500 text-white shadow-red-500/15 hover:bg-red-600 hover:-translate-y-1"
                                            : "bg-[#212121] text-white shadow-[#212121]/10 hover:bg-[#00B8D4] hover:-translate-y-1"
                                    }`}
                                >
                                    {isBusy ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        confirmText
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    disabled={isBusy}
                                    className="flex-1 flex items-center justify-center py-5 px-6 bg-white border border-[#E2E8F0] text-[#616161] rounded-[1.5rem] hover:bg-[#F8FAFC] hover:text-[#212121] smooth-animation font-black text-xs uppercase tracking-widest disabled:opacity-50"
                                >
                                    {cancelText}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </ModalPortal>
    );
}

