import { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, className = "", children, ...props }, ref) => {
        return (
            <div className={`flex flex-col gap-1 ${className}`}>
                {label && (
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                )}
                <select
                    ref={ref}
                    className={`border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                    {...props}
                >
                    {children}
                </select>
                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);