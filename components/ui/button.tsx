import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-[0.98] active:translate-y-[0.5px] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:active:translate-y-0";

    const variantStyles = {
      primary:
        "bg-ocean-deep text-white hover:bg-ocean-deep-hover shadow-subtle hover:shadow-floating",
      secondary:
        "bg-surface-subtle text-text-primary border border-border hover:bg-surface hover:border-border-strong shadow-subtle",
      outline:
        "bg-transparent border border-border text-text-primary hover:bg-surface-subtle hover:border-border-strong hover:text-ocean-deep",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-subtle",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-sm gap-1.5",
      md: "h-10 px-4 text-sm rounded-sm gap-2",
      lg: "h-11 px-5 text-base rounded-md gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
