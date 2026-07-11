"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Galeria",   href: "/#momento-3" },
  { label: "Manifesto", href: "/#momento-2" },
  { label: "Processo",  href: "/#momento-4" },
  { label: "Sobre",     href: "/sobre" },
];

export default function NavMomento() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: solid || open ? "rgba(10,9,8,0.96)" : "transparent",
          backdropFilter: solid || open ? "blur(16px)" : "none",
          borderBottom: solid || open ? "0.5px solid rgba(30,27,23,1)" : "0.5px solid transparent",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group" onClick={() => setOpen(false)}>
            <span className="font-display text-lg tracking-tight text-fg group-hover:text-accent transition-colors duration-500">
              DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Navegação principal">
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href}
                className="relative font-mono text-[10px] tracking-[0.3em] uppercase text-fg-muted hover:text-fg transition-colors duration-300 group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link href="/#momento-5"
            className="hidden md:inline-flex group items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-fg-muted hover:text-accent transition-colors duration-300">
            <span>Contato</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block w-5 h-px bg-fg origin-center" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-5 h-px bg-fg" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block w-5 h-px bg-fg origin-center" />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-border/40"
            >
              <nav className="px-6 py-6 flex flex-col gap-5" aria-label="Navegação mobile">
                {LINKS.map(l => (
                  <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
                    className="font-mono text-[11px] tracking-[0.4em] uppercase text-fg-muted hover:text-fg transition-colors">
                    {l.label}
                  </Link>
                ))}
                <Link href="/#momento-5" onClick={() => setOpen(false)}
                  className="font-mono text-[11px] tracking-[0.4em] uppercase text-accent mt-2">
                  Iniciar Projeto →
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
