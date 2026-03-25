import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
}

export default function Button({
    variant = "primary",
    size = "md",
    icon,
    children,
    ...props
}: ButtonProps) {
    const baseClasses =
        "font-semibold rounded-lg smooth-animation inline-flex items-center gap-2";

    const variantClasses: Record<string, string> = {
        primary: "bg-[#00B8D4] text-white hover:bg-[#0097A7]",
        secondary:
            "border-2 border-[#00B8D4] text-[#00B8D4] hover:bg-[#00B8D4]/5",
        ghost: "text-[#00B8D4] hover:bg-[#00B8D4]/10",
    };

    const sizeClasses: Record<string, string> = {
        sm: "px-3 py-1 text-sm",
        md: "px-6 py-2 text-base",
        lg: "px-8 py-3 text-lg",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
            {...props}
        >
            {icon}
            {children}
        </button>
    );
}
