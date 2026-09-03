import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const InputCheckbox = forwardRef<HTMLInputElement, InputProps>(
    ({label, error, className = "", ...props}, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-900">
                    <input 
                        ref={ref}
                        className={`mt-1 h-5 w-5 shrink-0 accent-green-600 ${className}`}
                        {...props}
                    />
                    <span className="block text-sm font-medium text-gray-700">
                        {label}
                    </span>
                </label>
                {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
            </div>
        )
    }
)
InputCheckbox.displayName = "input";