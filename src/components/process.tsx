"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

const STEPS = [
  {
    number: "01",
    title: "Imersão",
    tagline: "Entender contexto, marca e intenção.",
    details:
      "Mergulho obsessivo no histórico visual, no silêncio entre os concorrentes e na ambição real dos stakeholders. Mapeamos as tensões não ditas para projetar a direção exata.",
  },
  {
    number: "02",
    title: "Conceito",
    tagline: "Construir linguagem visual e direção.",
    details:
      "Tradução de premissas abstratas em arquitetura visual severa. Definimos paletas monocromáticas de precisão, hierarquias tipográficas e fundamento dramático de movimento.",
  },
  {
    number: "03",
    title: "Construção",
    tagline: "Transformar visão em execução.",
    details:
      "Engenharia criativa sem concessões. Desenvolvimento de código Next.js imersivo, captação autoral e design de interfaces focado em conversão e valor de marca inegociável.",
  },
  {
    number: "04",
    title: "Refinamento",
    tagline: "Polir obsessivamente até excelência.",
    details:
      "Ajuste milimétrico de contraste, velocidade de curvas de aceleração e performance de infraestrutura. O trabalho só termina quando a presença gerada se torna inconfundível.",
  },
];

export default function ProcessMomento4() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="momento-4"
      className="relative py-36 md:py-56 px-6 md:px-12 lg:px-16 border-b border-border bg-bg"
    >
      <div ref={ref} className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-32 items-end">
          <div className="lg:col-span-8">
            <span className="reveal text-[10px] tracking-[0.4em] uppercase text-accent font-mono block">
              Momento 04
            </span>
            <h2
              className="reveal mt-4 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-[-0.025em] text-fg"
              style={{ transitionDelay: "100ms" }}
            >
              Gênese & <br />
              <span className="italic text-accent">Processo Criativo</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <p
              className="reveal text-xs md:text-sm text-fg-muted max-w-xs leading-relaxed font-light"
              style={{ transitionDelay: "200ms" }}
            >
              Uma metodologia limpa, rigorosa e altamente estruturada para conceber obras digitais que resistem ao teste do tempo.
            </p>
          </div>
        </div>

        {/* 4 Steps Exposition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-border pt-8 hover:border-accent/60 transition-colors duration-500 flex flex-col justify-between min-h-[280px] bg-bg-soft/10 p-6 md:p-8 rounded-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent font-medium">
                    {step.number} — ETAPA
                  </span>
                  <span className="w-8 h-px bg-border group-hover:bg-accent transition-colors duration-500" />
                </div>

                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-fg tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="font-display italic text-lg md:text-xl text-accent mb-6">
                  {step.tagline}
                </p>
              </div>

              <p className="text-xs md:text-sm text-fg-muted leading-relaxed font-light pt-6 border-t border-border-light">
                {step.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
