import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "accent-2" | "accent-3" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase",
        {
          "bg-surface-light text-muted border border-border": variant === "default",
          "bg-accent/10 text-accent border border-accent/20": variant === "accent",
          "bg-accent-2/10 text-accent-2 border border-accent-2/20": variant === "accent-2",
          "bg-accent-3/10 text-accent-3 border border-accent-3/20": variant === "accent-3",
          "border border-border text-muted": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
