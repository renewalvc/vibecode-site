import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wide mb-2">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg text-muted max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
