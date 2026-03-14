"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          {
            "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md":
              variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-border":
              variant === "secondary",
            "border border-border bg-transparent text-foreground hover:bg-secondary":
              variant === "outline",
            "bg-transparent text-foreground hover:bg-secondary":
              variant === "ghost",
            "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md":
              variant === "accent",
          },
          {
            "text-sm px-3 py-1.5 gap-1.5": size === "sm",
            "text-sm px-4 py-2.5 gap-2": size === "md",
            "text-base px-6 py-3 gap-2.5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
