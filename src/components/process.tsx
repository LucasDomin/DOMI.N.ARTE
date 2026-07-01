"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  { n: "01", title: "Imersão",     body: "Mergulho obsessivo no silêncio entre os concorrentes. Mapeamos as tensões não ditas para projetar a direção exata." },
  { n: "02", title: "Conceito",    body: "Tradução de premissas abstratas em arquitetura visual severa. Paletas, hierarquias tipográficas, fundamento de movimento." },
  { n: "03", title: "Construção",  body: "Engenharia criativa sem concessões. Código imersivo, captação autoral, interfaces com valor de marca inegociável." },
  { n: "04", title: "Refinamento", body: "Ajuste milimétrico de contraste, curvas de aceleração e performance. O trabalho só termina quando a presença é inconfundível." },
];

function Step({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const op  = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const x   = useTransform(scrollYProgress, [0, 0.6], [-24, 0]);
  const lh  = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <motion.div ref={ref} style={{ opacity: op, x }} className="relative flex gap-10 md:gap-16 py-12 md:py-16 border-t border-border/50 group">
      {/* Animated vertical line on left */}
      <div className="relative flex-shrink-0 w-px self-stretch">
        <div className="absolute inset-0 bg-border/50" />
        <motion.div className="absolute top-0 left-0 w-full bg-accent origin-top" style={{ scaleY: lh }} />
      </div>

      {/* Number */}
      <div className="flex-shrink-0 pt-1">
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">{step.n}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-[clamp(2.5rem,5vw,6rem)] leading-none tracking-[-0.04em] text-fg mb-6 group-hover:text-fg transition-colors">
          {step.title}
        </h3>
        <p className="text-sm text-fg-muted leading-relaxed font-light max-w-lg">
          {step.body}
        </p>
      </div>

      {/* Large ghost number */}
      <div className="hidden lg:block flex-shrink-0 self-center">
        <span className="font-display text-[8rem] leading-none text-fg/[0.03] select-none">
          {step.n}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProcessMomento4() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const headOp = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const headY  = useTransform(scrollYProgress, [0, 0.5], [30, 0]);

  return (
    <section ref={sectionRef} id="momento-4"
      className="relative px-6 md:px-12 lg:px-16 py-32 md:py-48 border-b border-border">

      {/* Ghost large number background */}
      <div className="absolute top-16 right-8 font-display text-[16rem] leading-none text-fg/[0.02] select-none pointer-events-none">
        04
      </div>

      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div style={{ opacity: headOp, y: headY }} className="mb-6 md:mb-8">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-4">
            04 / Processo
          </span>
          <h2 className="font-display text-[clamp(3rem,6vw,7rem)] leading-none tracking-[-0.04em] text-fg">
            Método
          </h2>
        </motion.div>

        {/* Steps */}
        <div>
          {STEPS.map((s, i) => <Step key={s.n} step={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
