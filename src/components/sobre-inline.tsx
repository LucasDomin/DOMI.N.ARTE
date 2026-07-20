"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SplitLine } from "./split-text";

const EASE = [0.16, 1, 0.3, 1] as const;

const VALORES = [
  { n: "01", title: "Identidade como argumento", body: "Cada escolha visual é um argumento sobre o que a marca acredita." },
  { n: "02", title: "Rigor tipográfico", body: "A escolha de um tipo define a personalidade antes da palavra ser lida." },
  { n: "03", title: "Menos, mais fundo", body: "Poucos trabalhos excepcionais. Nunca muitos trabalhos medianos." },
];

export default function SobreInline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 40%"] });
  const headOp = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headY  = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <section ref={ref} id="momento-sobre"
      className="relative px-6 md:px-12 lg:px-16 py-16 md:py-20 border-b border-border overflow-hidden">

      {/* Ghost number background — same language as other sections */}
      <div className="absolute top-8 right-6 font-display text-[14rem] leading-none text-fg/[0.018] select-none pointer-events-none">
        S
      </div>

      <div className="max-w-[1600px] mx-auto">
        <motion.div style={{ opacity: headOp, y: headY }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12 md:mb-14">

          {/* Left — tag + title + short intro */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-accent">Sobre</span>
            </div>
            <SplitLine
              text="Direção com raízes em type design."
              className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-fg"
            />
          </div>

          {/* Right — supporting text */}
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="text-sm text-fg-muted leading-relaxed font-light max-w-lg mb-6">
              Um estúdio independente que trata proporção, peso e contraste como argumentos —
              não escolhas estéticas. Da tipografia à experiência digital, cada projeto começa
              pela mesma pergunta: o que essa marca precisa provar?
            </p>
            <Link
              href="mailto:ola@dominarte.com.br"
              className="group inline-flex items-center gap-3 w-fit font-mono text-[9px] tracking-[0.5em] uppercase text-fg-muted hover:text-fg transition-colors duration-500"
            >
              Conheça o processo
              <span className="w-6 h-px bg-fg-dim group-hover:w-12 group-hover:bg-accent transition-all duration-700" />
            </Link>
          </div>
        </motion.div>

        {/* Compact values strip — 3 across */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {VALORES.map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="p-5 rounded-xl border border-border"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] text-accent block mb-3">{v.n}</span>
              <h3 className="font-display text-lg text-fg leading-tight mb-2">{v.title}</h3>
              <p className="text-xs text-fg-muted leading-relaxed font-light">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
