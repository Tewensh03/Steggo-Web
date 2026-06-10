import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className = '', ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full px-3.5 py-2 
                    bg-gray-300 text-zinc-900 placeholder-zinc-400
                    rounded-md border border-transparent
                    transition-colors duration-200
                    focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                    ${error ? 'border-red-500 focus:border-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 font-medium">
                {error}
                </span>
            )}
        </div>
    );
};

export default Input;