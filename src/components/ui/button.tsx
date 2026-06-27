import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-40 disabled:pointer-events-none tracking-wide",
          {
            "bg-accent text-foreground hover:bg-accent-hover": variant === "primary",
            "bg-surface-light text-foreground border border-border hover:border-border-light hover:bg-surface-elevated": variant === "secondary",
            "text-muted hover:text-foreground hover:bg-surface-light": variant === "ghost",
            "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20": variant === "danger",
          },
          {
            "px-3 py-1.5 text-[11px]": size === "sm",
            "px-4 py-2 text-xs": size === "md",
            "px-6 py-3 text-sm": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button };
