"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Dialog components must be used within Dialog");
  return context;
}

export function Dialog({ children, open, onOpenChange }: { children: ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild }: { children: ReactNode; asChild?: boolean }) {
  const { setOpen } = useDialog();
  if (asChild) {
    return <div onClick={() => setOpen(true)}>{children}</div>;
  }
  return (
    <button onClick={() => setOpen(true)} className="inline-flex">
      {children}
    </button>
  );
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  const { open, setOpen } = useDialog();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl border border-border bg-surface p-6 shadow-2xl",
          className
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-md p-1 text-muted hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-base font-light tracking-tight text-foreground", className)}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs text-muted mt-1 font-light", className)}>{children}</p>;
}
