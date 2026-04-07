import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
};

const colors: Record<ToastType, string> = {
    success: "bg-[#212121] text-white",
    error: "bg-red-600 text-white",
    warning: "bg-amber-500 text-white",
    info: "bg-[#00B8D4] text-white",
};

const iconColors: Record<ToastType, string> = {
    success: "text-emerald-400",
    error: "text-red-200",
    warning: "text-amber-200",
    info: "text-cyan-200",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback(
        (message: string, type: ToastType = "success") => {
            const id = ++toastId;
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3500);
        },
        [],
    );

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {createPortal(
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3 pointer-events-none">
                    <AnimatePresence mode="popLayout">
                        {toasts.map((t) => (
                            <motion.div
                                key={t.id}
                                layout
                                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                }}
                                className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md ${colors[t.type]}`}
                                style={{ minWidth: 280, maxWidth: 480 }}
                            >
                                <span
                                    className={`shrink-0 ${iconColors[t.type]}`}
                                >
                                    {icons[t.type]}
                                </span>
                                <span className="text-sm font-bold tracking-wide flex-1">
                                    {t.message}
                                </span>
                                <button
                                    onClick={() => dismiss(t.id)}
                                    className="shrink-0 ml-2 p-1 rounded-lg hover:bg-white/10 smooth-animation opacity-60 hover:opacity-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>,
                document.body,
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}
