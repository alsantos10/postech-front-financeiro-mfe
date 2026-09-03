import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({label, error, className = "", ...props}, ref) => {
        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input 
                    ref={ref}
                    className={`mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className} ${error && 'border-red-600'}`}
                    {...props}
                />
                {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
            </div>
        )
    }
)
Input.displayName = "input";