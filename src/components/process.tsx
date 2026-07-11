"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { n: "01", title: "Imersão",     body: "Mergulho no silêncio entre concorrentes. Mapeamos tensões não ditas." },
  { n: "02", title: "Conceito",    body: "Premissas abstratas viram arquitetura visual. Paleta, tipografia, movimento." },
  { n: "03", title: "Construção",  body: "Engenharia criativa sem concessões. Código, captação, interfaces." },
  { n: "04", title: "Refinamento", body: "Ajuste milimétrico de contraste e performance até a presença ser inconfundível." },
];

// ─── Single step card — compact, interactive ───────────────────────────────────
function StepCard({ step, index, hovered, setHovered }: {
  step: typeof STEPS[0];
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const isActive = hovered === index;
  const isDimmed = hovered !== null && hovered !== index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      animate={{ opacity: isDimmed ? 0.4 : 1 }}
      className="relative p-6 md:p-7 rounded-xl border cursor-default group"
      style={{
        borderColor: isActive ? "rgba(201,165,108,0.4)" : "var(--color-border)",
        background: isActive ? "rgba(201,165,108,0.03)" : "transparent",
        transition: "border-color 0.4s ease, background 0.4s ease",
      }}
    >
      {/* Number + connecting dot */}
      <div className="flex items-center justify-between mb-8">
        <span
          className="font-mono text-[10px] tracking-[0.4em] transition-colors duration-300"
          style={{ color: isActive ? "#C9A56C" : "var(--color-fg-muted)" }}
        >
          {step.n}
        </span>
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          animate={{
            backgroundColor: isActive ? "#C9A56C" : "var(--color-border-light)",
            scale: isActive ? 1.3 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-[1.85rem] leading-tight tracking-tight text-fg mb-3">
        {step.title}
      </h3>

      {/* Body */}
      <p className="text-[13px] text-fg-muted leading-relaxed font-light">
        {step.body}
      </p>

      {/* Bottom accent line — grows on hover */}
      <motion.div
        className="absolute bottom-0 left-6 right-6 md:left-7 md:right-7 h-px bg-accent origin-left"
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </motion.div>
  );
}

export default function ProcessMomento4() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 40%"] });
  const headOp = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headY  = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} id="momento-4"
      className="relative px-6 md:px-12 lg:px-16 py-16 md:py-20 border-b border-border overflow-hidden">
      <div className="absolute top-6 right-6 font-display text-[12rem] leading-none text-fg/[0.015] select-none pointer-events-none">04</div>

      <div className="max-w-[1600px] mx-auto">
        {/* Header — compact, inline */}
        <motion.div style={{ opacity: headOp, y: headY }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-accent">04 / Processo</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-none tracking-[-0.04em] text-fg">Método</h2>
          </div>
          <p className="text-xs text-fg-muted font-light max-w-xs">
            Quatro movimentos, uma direção. Cada etapa constrói sobre a anterior.
          </p>
        </motion.div>

        {/* Grid — 2 cols mobile-md, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
      </div>
    </section>
  );
}
