"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitLine } from "./split-text";

const STEPS = [
  { n: "01", title: "Imersão",     body: "Mergulho obsessivo no silêncio entre os concorrentes. Mapeamos as tensões não ditas para projetar a direção exata." },
  { n: "02", title: "Conceito",    body: "Tradução de premissas abstratas em arquitetura visual severa. Paletas, hierarquias tipográficas, fundamento de movimento." },
  { n: "03", title: "Construção",  body: "Engenharia criativa sem concessões. Código imersivo, captação autoral, interfaces com valor de marca inegociável." },
  { n: "04", title: "Refinamento", body: "Ajuste milimétrico de contraste, curvas de aceleração e performance. O trabalho só termina quando a presença é inconfundível." },
];

function Step({ step }: { step: typeof STEPS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // CORRETO: entra e fica
    offset: ["start 88%", "end 5%"],
  });

  const op   = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 1]);
  const x    = useTransform(scrollYProgress, [0, 0.2], [-28, 0]);
  const lineH = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div ref={ref} style={{ opacity: op, x }}
      className="relative flex gap-10 md:gap-16 py-12 md:py-16 border-t border-border/40 group">
      {/* Vertical line — grows down */}
      <div className="relative flex-shrink-0 w-px self-stretch">
        <div className="absolute inset-0 bg-border/40" />
        <motion.div className="absolute top-0 left-0 w-full bg-accent origin-top" style={{ scaleY: lineH }} />
      </div>

      <div className="flex-shrink-0 pt-0.5">
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">{step.n}</span>
      </div>

      <div className="flex-1 min-w-0">
        <SplitLine
          text={step.title}
          className="font-display text-[clamp(2.5rem,5vw,6.5rem)] leading-none tracking-[-0.04em] text-fg"
        />
        <p className="text-sm text-fg-muted leading-relaxed font-light max-w-md mt-5">{step.body}</p>
      </div>

      <div className="hidden lg:block flex-shrink-0 self-center pointer-events-none select-none">
        <span className="font-display text-[8rem] leading-none text-fg/[0.025]">{step.n}</span>
      </div>
    </motion.div>
  );
}

export default function ProcessMomento4() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 40%"] });
  const headOp = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headY  = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <section ref={ref} id="momento-4"
      className="relative px-6 md:px-12 lg:px-16 py-20 md:py-28 border-b border-border overflow-hidden">
      <div className="absolute top-10 right-6 font-display text-[16rem] leading-none text-fg/[0.018] select-none pointer-events-none">04</div>
      <div className="max-w-[1600px] mx-auto">
        <motion.div style={{ opacity: headOp, y: headY }} className="mb-4">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-5">04 / Processo</span>
          <h2 className="font-display text-[clamp(3.5rem,7vw,8rem)] leading-none tracking-[-0.04em] text-fg">Método</h2>
        </motion.div>
        {STEPS.map(s => <Step key={s.n} step={s} />)}
      </div>
    </section>
  );
}
