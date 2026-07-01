"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const LINKS = [
  { label: "Galeria", href: "#momento-3" },
  { label: "Manifesto", href: "#momento-2" },
  { label: "Processo", href: "#momento-4" },
];

export default function NavMomento() {
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setSolid(v > 60));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: solid ? "rgba(10,9,8,0.92)" : "transparent",
        backdropFilter: solid ? "blur(16px)" : "none",
        borderBottom: solid ? "0.5px solid rgba(30,27,23,1)" : "0.5px solid transparent",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span className="font-display text-lg tracking-tight text-fg group-hover:text-accent transition-colors duration-500">
            DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href}
              className="relative font-mono text-[10px] tracking-[0.3em] uppercase text-fg-dim hover:text-fg transition-colors duration-300 group">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#momento-5"
          className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-fg-dim hover:text-accent transition-colors duration-300">
          <span>Contato</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" />
          </svg>
        </a>
      </div>
    </motion.header>
  );
}
