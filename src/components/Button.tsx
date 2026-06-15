import React from "react";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
}

export const Button: React.FC<Button> = ({
    isLoading = false,
    loadingText = "Processing...",
    disabled,
    className = "",
    children,
    type = "submit",
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={`
                w-full py-2.5 px-4 
                bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-md 
                transition-colors duration-200 cursor-pointer 
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `.trim()}
            {...props}
        >
            {isLoading ? loadingText : children}
        </button>
    );
};