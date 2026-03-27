import React from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = "md",
    fullPage = false
}) => {
    const sizeClasses = {
        sm: "w-12 h-12",
        md: "w-20 h-20",
        lg: "w-32 h-32"
    };

    const spinnerContent = (
        <div className="relative flex items-center justify-center">
            {/* Rotating Outer Ring */}
            <motion.div
                className={`${sizeClasses[size]} border-4 border-[#00B8D4]/20 border-t-[#00B8D4] rounded-full`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Centered Logo */}
            <div className="absolute inset-0 flex items-center justify-center p-2">
                <img
                    src="/img/logo.png"
                    alt="MAC Logo"
                    className="w-2/3 h-2/3 object-contain animate-pulse"
                />
            </div>
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
                {spinnerContent}
            </div>
        );
    }

    return spinnerContent;
};

export default LoadingSpinner;
