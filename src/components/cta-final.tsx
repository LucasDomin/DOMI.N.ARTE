"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ConviteMomento5() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const titleY   = useTransform(scrollYProgress, [0, 1], [80, -20]);
  const glowOp   = useTransform(scrollYProgress, [0, 0.6], [0, 0.12]);
  const lineW    = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const contactY = useTransform(scrollYProgress, [0.3, 0.9], [40, 0]);
  const contactO = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);

  return (
    <section ref={ref} id="momento-5"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 overflow-hidden border-b border-border">

      {/* Ambient glow — same language as parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: glowOp }}>
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(201,165,108,1) 0%, transparent 70%)" }} />
      </motion.div>

      {/* Blueprint grid — same as parallax */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "linear-gradient(rgba(201,165,108,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,108,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="relative z-10 max-w-[1600px] mx-auto w-full">

        {/* Section tag */}
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">05 / Convite</span>
        </div>

        {/* Main title — full viewport width */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            style={{ y: titleY }}
            className="font-display text-[clamp(3.5rem,9vw,12rem)] leading-[0.84] tracking-[-0.04em] text-fg">
            Vamos criar algo
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-16 md:mb-24">
          <motion.h2
            style={{ y: titleY }}
            transition={{ delay: 0.05 }}
            className="font-display italic text-[clamp(3.5rem,9vw,12rem)] leading-[0.84] tracking-[-0.04em] text-accent">
            impossível de ignorar.
          </motion.h2>
        </div>

        {/* Animated divider */}
        <motion.div className="w-full h-px bg-border/50 origin-left mb-16 md:mb-24" style={{ scaleX: lineW }} />

        {/* Contact block */}
        <motion.div style={{ y: contactY, opacity: contactO }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 md:gap-20">

          <div className="space-y-3">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg-dim mb-6">
              Aceitamos apenas parceiros com ambição criativa genuína.
            </p>
            <a href="mailto:contato@dominarte.com"
              className="group flex items-center gap-4">
              <span className="font-display text-[clamp(1.5rem,3vw,3.5rem)] text-fg group-hover:text-accent transition-colors duration-500">
                contato@dominarte.com
              </span>
              <div className="w-8 h-px bg-fg-dim group-hover:w-16 group-hover:bg-accent transition-all duration-700 flex-shrink-0" />
            </a>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 flex-shrink-0">
            <div className="text-right">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim mb-1">Disponibilidade</p>
              <p className="font-display italic text-xl text-fg">Aberto para Q1 2026</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim mb-1">Localização</p>
              <p className="font-display italic text-xl text-fg">Brasil — Global</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
