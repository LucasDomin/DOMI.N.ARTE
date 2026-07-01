"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STATEMENTS = [
  {
    tension: "Imagem não é decoração.",
    resolve: "Imagem constrói percepção.",
  },
  {
    tension: "Movimento não é detalhe.",
    resolve: "Movimento cria presença.",
  },
  {
    tension: "Estética sem intenção é ruído.",
    resolve: "Direção transforma ruído em identidade.",
  },
];

function ManifestoLine({ tension, resolve, index }: {
  tension: string; resolve: string; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 20%"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const op = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity: op }}
      className="py-16 md:py-20 border-b border-border/50 last:border-b-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline">
        <div className="lg:col-span-1">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="lg:col-span-11 space-y-2">
          <p className="font-display text-[clamp(1.8rem,4.5vw,5rem)] leading-[0.92] tracking-[-0.03em] text-fg/40">
            {tension}
          </p>
          <p className="font-display italic text-[clamp(1.8rem,4.5vw,5rem)] leading-[0.92] tracking-[-0.03em] text-fg">
            {resolve}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ManifestoMomento2() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const tagOp = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const tagY  = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  return (
    <section ref={sectionRef} id="momento-2"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-16 border-b border-border overflow-hidden">

      {/* Barely visible large number in background */}
      <div className="absolute top-12 right-8 md:right-16 font-display text-[20rem] leading-none text-fg/[0.015] select-none pointer-events-none font-normal">
        02
      </div>

      <div className="max-w-[1600px] mx-auto">
        {/* Section tag */}
        <motion.div style={{ opacity: tagOp, y: tagY }} className="mb-16 md:mb-24">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">
            Manifesto
          </span>
        </motion.div>

        {/* Statements */}
        <div>
          {STATEMENTS.map((s, i) => (
            <ManifestoLine key={i} {...s} index={i} />
          ))}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="mt-20 md:mt-28 flex items-center gap-8">
          <div className="w-16 h-px bg-accent/40" />
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">
            DOMI.N.ARTE · Estúdio Criativo Autoral · Est. 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}
