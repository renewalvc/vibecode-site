import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-secondary text-muted": variant === "default",
          "bg-primary-light text-primary": variant === "primary",
          "bg-emerald-50 text-emerald-700": variant === "accent",
          "border border-border text-muted": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
