"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroImpacto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      id="momento-1"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 select-none overflow-hidden"
    >
      {/* Dense cinematic lighting / still movement */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-radial from-accent/[0.07] via-accent/[0.01] to-transparent blur-[140px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      {/* Top minimal metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="relative z-10 flex items-center justify-between text-[10px] md:text-xs tracking-[0.35em] uppercase font-mono text-fg-dim pt-4"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-fg-muted">DOMI.N.ARTE — ASSINATURA CRIATIVA</span>
        </div>
        <span className="hidden sm:inline">SILÊNCIO · TENSÃO · PRESENÇA</span>
      </motion.div>

      {/* Center vast typography (IMPACTO) */}
      <motion.div
        style={{ y, opacity, scale, filter }}
        className="relative z-10 my-auto py-16 md:py-24"
      >
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
          >
            <h1 className="font-display text-[clamp(4.2rem,14vw,16rem)] leading-[0.84] tracking-[-0.035em] text-fg font-normal">
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.5, ease: EASE, delay: 0.15 }}
                  className="block text-fg"
                >
                  Estética
                </motion.span>
              </span>

              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
                  className="block"
                >
                  <span className="italic text-accent font-display">sem intenção</span>
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.5, ease: EASE, delay: 0.45 }}
                  className="block text-fg-dim"
                >
                  é ruído.
                </motion.span>
              </span>
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fold minimal tension */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.0 }}
        className="relative z-10 max-w-[1600px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
      >
        <div className="md:col-span-6 lg:col-span-5">
          <p className="text-sm md:text-base text-fg-muted leading-relaxed font-light">
            Interseção autoral entre direção criativa, arte digital, motion e storytelling cinematográfico.
          </p>
        </div>

        <div className="md:col-span-6 lg:col-span-7 flex md:justify-end">
          <a
            href="#momento-2"
            className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] uppercase font-mono text-fg-muted hover:text-fg transition-colors duration-500 py-2"
          >
            <span>Explorar os 5 Momentos</span>
            <span className="w-8 h-px bg-fg-dim group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
          </a>
        </div>
      </motion.div>

      {/* Subtle bottom border line progression */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
