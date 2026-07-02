"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitLine } from "./split-text";

const STATEMENTS = [
  { tension: "Imagem não é decoração.",        resolve: "Imagem constrói percepção."        },
  { tension: "Movimento não é detalhe.",        resolve: "Movimento cria presença."           },
  { tension: "Estética sem intenção é ruído.",  resolve: "Direção transforma ruído em identidade." },
];

function ManifestoLine({ tension, resolve, index }: { tension: string; resolve: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // CORRETO: entra visível, fica visível
    offset: ["start 85%", "end 10%"],
  });
  const op = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 1]);
  const y  = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity: op, y }}
      className="py-14 md:py-18 border-b border-border/40 last:border-b-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-baseline">
        <div className="lg:col-span-1 flex items-center gap-3 mb-2 lg:mb-0">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">{String(index + 1).padStart(2,"0")}</span>
        </div>
        <div className="lg:col-span-11">
          {/* Tension — muted */}
          <div className="overflow-hidden">
            <p className="font-display text-[clamp(1.6rem,3.8vw,4.5rem)] leading-[0.9] tracking-[-0.03em] text-fg/30">
              {tension}
            </p>
          </div>
          {/* Resolve — bold reveal */}
          <SplitLine
            text={resolve}
            className="font-display italic text-[clamp(1.6rem,3.8vw,4.5rem)] leading-[0.9] tracking-[-0.03em] text-fg"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ManifestoMomento2() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 40%"] });
  const tagOp = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const tagY  = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <section ref={ref} id="momento-2"
      className="relative px-6 md:px-12 lg:px-16 py-28 md:py-44 border-b border-border overflow-hidden">
      <div className="absolute top-10 right-6 md:right-14 font-display text-[18rem] leading-none text-fg/[0.018] select-none pointer-events-none">02</div>
      <div className="max-w-[1600px] mx-auto">
        <motion.div style={{ opacity: tagOp, y: tagY }} className="mb-14 md:mb-20">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">02 / Manifesto</span>
        </motion.div>
        {STATEMENTS.map((s, i) => <ManifestoLine key={i} {...s} index={i} />)}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="mt-20 flex items-center gap-6">
          <div className="w-12 h-px bg-accent/30" />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">
            DOMI.N.ARTE · Est. 2025
          </span>
        </motion.div>
      </div>
    </section>
  );
}
