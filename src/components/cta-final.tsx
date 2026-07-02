"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ConviteMomento5() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Só o título tem parallax — entra de baixo conforme a seção sobe
  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleO = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  // Glow aparece quando seção entra
  const glowOp = useTransform(scrollYProgress, [0, 1], [0, 0.1]);

  return (
    <section
      ref={ref}
      id="momento-5"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 overflow-hidden border-b border-border"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: glowOp }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(201,165,108,1) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(201,165,108,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,108,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto w-full">

        {/* Section tag — sempre visível */}
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">
            05 / Convite
          </span>
        </div>

        {/* Título — parallax de entrada, depois estático */}
        <motion.div style={{ y: titleY, opacity: titleO }}>
          <div className="overflow-hidden mb-1">
            <h2 className="font-display text-[clamp(3rem,8vw,11rem)] leading-[0.88] tracking-[-0.04em] text-fg">
              Vamos criar algo
            </h2>
          </div>
          <div className="overflow-hidden mb-16 md:mb-24">
            <h2 className="font-display italic text-[clamp(3rem,8vw,11rem)] leading-[0.88] tracking-[-0.04em] text-accent">
              impossível de ignorar.
            </h2>
          </div>
        </motion.div>

        {/* Divider — estático */}
        <div className="w-full h-px bg-border/50 mb-16 md:mb-24" />

        {/* Contato — SEM animação de scroll, sempre visível quando na tela */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 md:gap-20">

          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg-dim mb-8">
              Aceitamos apenas parceiros com ambição criativa genuína.
            </p>
            <a
              href="mailto:contato@dominarte.com"
              className="group flex items-center gap-5"
            >
              <span className="font-display text-[clamp(1.4rem,2.8vw,3.2rem)] text-fg group-hover:text-accent transition-colors duration-500">
                contato@dominarte.com
              </span>
              <span className="block w-8 h-px bg-fg-dim group-hover:w-16 group-hover:bg-accent transition-all duration-700 flex-shrink-0" />
            </a>
          </div>

          <div className="flex flex-col items-start md:items-end gap-8 flex-shrink-0">
            <div className="md:text-right">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim mb-2">
                Disponibilidade
              </p>
              <p className="font-display italic text-2xl text-fg">Aberto para Q1 2026</p>
            </div>
            <div className="md:text-right">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim mb-2">
                Localização
              </p>
              <p className="font-display italic text-2xl text-fg">Brasil — Global</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
