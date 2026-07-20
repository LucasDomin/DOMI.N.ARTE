"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SplitLine } from "@/components/split-text";
import NavMomento from "@/components/nav";
import FooterMomento from "@/components/footer";

const VALORES = [
  { n: "01", title: "Identidade como argumento", body: "Design não é estética. É a forma mais precisa de comunicar uma posição. Cada escolha visual é um argumento sobre o que a marca acredita." },
  { n: "02", title: "Rigor tipográfico", body: "Tipografia é a arquitetura invisível de toda comunicação visual. A escolha de um tipo define a personalidade antes que qualquer palavra seja lida." },
  { n: "03", title: "Menos, mais fundo", body: "Recusamos projetos que não permitem aprofundamento. Preferimos poucos trabalhos excepcionais a muitos trabalhos mediocres." },
];

export default function SobreClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "start start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const heroO = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <main className="relative bg-bg min-h-screen selection:bg-accent selection:text-bg">
      <div className="grain" />
      <div className="vignette" />

      {/* Navegação completa e consistente com o resto do site */}
      <NavMomento />

      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-16 pt-40 pb-28 border-b border-border">
        <div className="max-w-[1600px] mx-auto">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-10">
            Sobre o Estúdio
          </span>
          <SplitLine
            text="DOMI.N.ARTE"
            className="font-display text-[clamp(4rem,10vw,13rem)] leading-none tracking-[-0.05em] text-fg"
          />
          <p className="font-display italic text-[clamp(1.2rem,2.5vw,2.5rem)] text-fg-muted mt-6 max-w-3xl leading-relaxed">
            Estúdio de direção criativa com raízes em type design e design editorial. Construímos identidades visuais que resistem ao tempo.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="px-6 md:px-12 lg:px-16 py-28 md:py-40 border-b border-border">
        <div className="max-w-[1600px] mx-auto">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-14">Princípios</span>
          <div className="space-y-0">
            {VALORES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-12 border-t border-border/40 items-baseline"
              >
                <span className="lg:col-span-1 font-mono text-[9px] tracking-[0.4em] uppercase text-accent">{v.n}</span>
                <h3 className="lg:col-span-4 font-display text-[clamp(1.6rem,3vw,3rem)] leading-none tracking-[-0.03em] text-fg">{v.title}</h3>
                <p className="lg:col-span-7 text-sm text-fg-muted leading-relaxed font-light max-w-xl">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-6">Próximo passo</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,7rem)] leading-none tracking-[-0.04em] text-fg">
              Vamos conversar?
            </h2>
          </div>
          <Link
            href="/#momento-5"
            className="group inline-flex items-center gap-5 font-mono text-[10px] tracking-[0.5em] uppercase text-fg-dim hover:text-fg transition-colors duration-500"
          >
            <span>Iniciar projeto</span>
            <span className="w-10 h-px bg-fg-dim group-hover:w-20 group-hover:bg-accent transition-all duration-700" />
          </Link>
        </div>
      </section>

      <FooterMomento />
    </main>
  );
}
