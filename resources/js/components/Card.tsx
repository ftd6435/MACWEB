import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "outline";
}

export default function Card({
    variant = "default",
    className = "",
    children,
    ...props
}: CardProps) {
    const baseClasses = "rounded-lg";

    const variantClasses: Record<string, string> = {
        default: "bg-white",
        elevated: "bg-white shadow-lg hover:shadow-xl smooth-animation",
        outline: "bg-white border border-[#E0E0E0]",
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
