import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#47A138] text-white hover:bg-[#3d8d30] focus-visible:ring-[#47A138]",
  secondary: "border-2 border-[#47A138] bg-transparent text-[#47A138] hover:bg-[#47A138]/10 focus-visible:ring-[#47A138]",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-600",
  link: "bg-[#47A138] text-white hover:bg-[#3d8d30] focus-visible:ring-[#47A138] font-[Inter] font-semibold not-italic text-[18px] leading-none tracking-[0%] text-center align-middle",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-12 w-[180px] rounded-lg px-3 py-2 text-sm",
  md: "h-12 w-[180px] rounded-lg px-4 py-2.5 text-sm",
  lg: "h-12 w-[180px] rounded-lg px-5 py-3 text-base",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
    type = "button",
    children,
    ...props
  },
  ref,
) {
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
export default Button;
