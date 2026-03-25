import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "primary" | "success" | "warning" | "error";
}

export default function Badge({
    variant = "primary",
    className = "",
    children,
    ...props
}: BadgeProps) {
    const variantClasses: Record<string, string> = {
        primary: "bg-[#00B8D4]/10 text-[#00B8D4]",
        success: "#E8F5E9 text-[#2E7D32]",
        warning: "#FFF3E0 text-[#E65100]",
        error: "#FFEBEE text-[#C62828]",
    };

    return (
        <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
