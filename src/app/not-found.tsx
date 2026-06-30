"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-bg flex flex-col items-center justify-center px-6 selection:bg-accent selection:text-bg">
      <div className="grain" />
      <div className="vignette" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-8"
        >
          404 · Obra não catalogada
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
            className="font-display text-[clamp(5rem,20vw,18rem)] leading-[0.84] tracking-[-0.04em] text-fg"
          >
            404
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          className="text-sm text-fg-muted font-light max-w-sm mx-auto leading-relaxed mb-12"
        >
          Esta obra não existe ou ainda não foi publicada pelo curador. O silêncio também é uma forma de presença.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase font-mono text-fg-muted hover:text-fg transition-colors duration-500"
          >
            <span className="w-8 h-px bg-fg-dim group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
            <span>Voltar à galeria</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
