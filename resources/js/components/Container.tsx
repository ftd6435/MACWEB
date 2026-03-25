import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg";
}

export default function Container({
    size = "lg",
    className = "",
    children,
    ...props
}: ContainerProps) {
    const sizeClasses: Record<string, string> = {
        sm: "max-w-4xl",
        md: "max-w-6xl",
        lg: "max-w-7xl",
    };

    return (
        <div
            className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
