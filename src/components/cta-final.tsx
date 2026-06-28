"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { DEFAULT_SITE_CONFIG } from "@/lib/defaults";
import type { SiteConfig } from "@/db/schema";

export default function ConviteMomento5() {
  const ref = useRef<HTMLElement>(null);
  const revealRef = useReveal<HTMLDivElement>();
  const [config, setConfig] = useState<Partial<SiteConfig>>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);

  return (
    <section
      ref={ref}
      id="momento-5"
      className="relative py-48 md:py-80 px-6 md:px-12 lg:px-16 overflow-hidden bg-bg border-b border-border select-none"
    >
      {/* Deep cinematic background presence */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ scale: bgScale }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[1100px] max-h-[1100px] rounded-full bg-radial from-accent/[0.08] via-accent/[0.01] to-transparent blur-[160px]" />
      </motion.div>

      <div ref={revealRef} className="relative z-10 max-w-[1600px] mx-auto text-center">
        <span className="reveal text-[10px] tracking-[0.4em] uppercase text-accent font-mono block">
          Momento 05
        </span>
        <h2 className="reveal mt-2 font-mono text-xs tracking-[0.3em] uppercase text-fg-dim">
          O Convite
        </h2>

        <motion.div style={{ y: titleY }} className="reveal mt-16 md:mt-24">
          <p className="font-display text-[clamp(3.5rem,10vw,11rem)] leading-[0.88] tracking-[-0.03em] text-fg">
            Vamos criar algo <br />
            <span className="italic text-accent">impossível de ignorar.</span>
          </p>
        </motion.div>

        <p
          className="reveal mt-16 text-base md:text-xl text-fg-muted max-w-2xl mx-auto leading-relaxed font-light"
          style={{ transitionDelay: "150ms" }}
        >
          Se sua marca precisa de presença autoral, profundidade conceitual e excelência digital — vamos conversar. Aceitamos apenas parceiros com ambição criativa genuína.
        </p>

        <div
          className="reveal mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-6"
          style={{ transitionDelay: "250ms" }}
        >
          <a
            href={`mailto:${config.contactEmail || "contato@dominiarte.com"}`}
            className="group inline-flex items-center gap-4 px-10 py-6 rounded-full bg-fg text-bg text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent transition-all duration-500 shadow-2xl"
          >
            <span>Iniciar Conversa Privada</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>

          <a
            href="#momento-3"
            className="inline-flex items-center gap-3 px-10 py-6 rounded-full border border-border-light text-xs font-medium tracking-[0.2em] uppercase text-fg-muted hover:text-fg hover:border-accent transition-all duration-500"
          >
            Revisitar Obras
          </a>
        </div>

        {/* Closing details */}
        <div
          className="reveal mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto pt-16 border-t border-border/80"
          style={{ transitionDelay: "350ms" }}
        >
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-2">
              Contato Direto
            </div>
            <a
              href={`mailto:${config.contactEmail || "contato@dominiarte.com"}`}
              className="font-display italic text-2xl text-fg hover:text-accent transition-colors duration-300 block"
            >
              {config.contactEmail || "contato@dominiarte.com"}
            </a>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-2">
              Disponibilidade
            </div>
            <div className="font-display italic text-2xl text-fg">
              {config.contactAvailability || "Aberto para Q1 2026"}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-2">
              Direção Autoral
            </div>
            <div className="font-display italic text-2xl text-fg">
              {config.aboutTitle || "Estúdio DOMI.N.ARTE"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
