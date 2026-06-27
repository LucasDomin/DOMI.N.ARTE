"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MOMENTOS = [
  { num: "01", label: "Impacto", href: "#momento-1" },
  { num: "02", label: "Manifesto", href: "#momento-2" },
  { num: "03", label: "Obras", href: "#momento-3" },
  { num: "04", label: "Processo", href: "#momento-4" },
];

export default function NavMomento() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "py-4 bg-bg/90 backdrop-blur-md border-b border-border shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="font-display text-xl md:text-2xl tracking-tight text-fg group-hover:text-accent transition-colors duration-500">
            DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          {MOMENTOS.map((m) => (
            <a
              key={m.label}
              href={m.href}
              className="group relative text-[11px] tracking-[0.25em] uppercase font-mono text-fg-muted hover:text-fg transition-colors duration-300 flex items-center gap-2"
            >
              <span className="text-accent text-[9px] opacity-60 group-hover:opacity-100 transition-opacity">
                {m.num}
              </span>
              <span>{m.label}</span>
              <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#momento-5"
          className="group inline-flex items-center gap-2.5 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase font-mono px-6 py-3 rounded-full border border-border-light text-fg hover:border-accent hover:text-accent transition-all duration-500"
        >
          <span>05 — O Convite</span>
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500 group-hover:translate-x-0.5">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </div>
    </motion.header>
  );
}
