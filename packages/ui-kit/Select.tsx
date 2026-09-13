import {
    Children,
    ChangeEvent,
    forwardRef,
    isValidElement,
    ReactElement,
    ReactNode,
    SelectHTMLAttributes,
    useEffect,
    useId,
    useMemo,
    useState,
} from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    children: ReactNode;
    placeholder?: string;
}

type SelectOption = {
    value: string;
    label: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, className = '', children, value, defaultValue, name, id, onChange, placeholder = 'Selecione uma opção', ...props }, ref) => {
        const generatedId = useId();
        const resolvedId = id ?? generatedId;
        const [open, setOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState<string>(
            typeof value === 'string'
                ? value
                : typeof defaultValue === 'string'
                    ? defaultValue
                    : ''
        );

        const options = useMemo<SelectOption[]>(() => {
            return Children.toArray(children)
                .filter(isValidElement)
                .map((child) => {
                    const option = child as ReactElement<{ value?: string; children?: ReactNode }>;
                    return {
                        value: String(option.props.value ?? ''),
                        label: String(option.props.children ?? option.props.value ?? ''),
                    };
                });
        }, [children]);

        const selectedOption = options.find((option) => option.value === selectedValue);

        useEffect(() => {
            if (typeof value === 'string') {
                setSelectedValue(value);
            }
        }, [value]);

        const handleSelect = (nextValue: string) => {
            setSelectedValue(nextValue);
            setOpen(false);

            if (typeof onChange === 'function') {
                const synthetic = {
                    target: {
                        value: nextValue,
                        name,
                    },
                } as ChangeEvent<HTMLSelectElement>;

                onChange(synthetic);
            }
        };

        return (
            <div className={`flex flex-col gap-1 ${className}`}>
                {label && (
                    <label htmlFor={resolvedId} className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}

                <div className="relative">
                    <button
                        id={resolvedId}
                        type="button"
                        name={name}
                        onClick={() => setOpen((current) => !current)}
                        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${error ? 'border-red-500' : 'border-emerald-700'} bg-white text-[#444444] hover:border-emerald-600`}
                        aria-haspopup="listbox"
                        aria-expanded={open}
                    >
                        <span className="block w-full truncate">
                            {selectedOption?.label ?? placeholder}
                        </span>
                        <span className="ml-2 text-emerald-700">
                            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                    </button>

                    {open && (
                        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-emerald-700 bg-white shadow-lg">
                            {options.map((option) => (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        className={`flex w-full items-center justify-center px-3 py-2 text-center text-[#444444] transition ${
                                            selectedValue === option.value
                                                ? 'bg-[#E4EDE3] font-semibold'
                                                : 'hover:bg-[#E4EDE3] hover:text-[#444444]'
                                        }`}
                                        onClick={() => handleSelect(option.value)}
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <select
                        ref={ref}
                        name={name}
                        id={resolvedId}
                        value={selectedValue}
                        className="sr-only"
                        aria-hidden="true"
                        onChange={(event) => handleSelect(event.target.value)}
                        {...props}
                    >
                        {children}
                    </select>
                </div>

                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);

Select.displayName = 'Select';
