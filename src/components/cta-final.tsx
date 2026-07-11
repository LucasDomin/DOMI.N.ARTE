"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ContactForm from "./contact-form";

export default function ConviteMomento5() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleO = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const glowOp = useTransform(scrollYProgress, [0, 1], [0, 0.1]);

  return (
    <section
      ref={ref}
      id="momento-5"
      className="relative px-6 md:px-12 lg:px-16 py-20 md:py-28 overflow-hidden border-b border-border"
    >
      {/* Ambient glow */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: glowOp }}>
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,165,108,1) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Blueprint grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(201,165,108,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,108,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto">

        {/* Section tag */}
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-accent">
            05 / Contato
          </span>
        </div>

        {/* Two-column layout: title left, form right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">

          {/* Left — title + meta */}
          <motion.div style={{ y: titleY, opacity: titleO }}>
            <div className="overflow-hidden mb-1">
              <h2 className="font-display text-[clamp(2.8rem,5vw,7rem)] leading-[0.88] tracking-[-0.04em] text-fg">
                Vamos construir
              </h2>
            </div>
            <div className="overflow-hidden mb-10">
              <h2 className="font-display italic text-[clamp(2.8rem,5vw,7rem)] leading-[0.88] tracking-[-0.04em] text-accent">
                algo real.
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-fg-muted mb-2">
                  Disponibilidade
                </p>
                <p className="font-display italic text-xl text-fg">Aceitando projetos para Q3 2026</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-fg-muted mb-2">
                  Investimento mínimo
                </p>
                <p className="font-display italic text-xl text-fg">A partir de R$ 15.000</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-fg-muted mb-2">
                  Localização
                </p>
                <p className="font-display italic text-xl text-fg">Brasil — Atendimento global</p>
              </div>
              <div className="pt-4 border-t border-border/40">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-fg-muted mb-2">
                  Prefere e-mail direto?
                </p>
                <a
                  href="mailto:ola@dominarte.com.br"
                  className="font-display text-lg text-fg hover:text-accent transition-colors duration-500"
                >
                  ola@dominarte.com.br
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — qualification form */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-fg-muted mb-8">
              Preencha abaixo — respondemos em até 48h úteis.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
