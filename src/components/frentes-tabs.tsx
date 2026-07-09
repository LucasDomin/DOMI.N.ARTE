"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const FRENTES = [
  {
    id: "identidade",
    num: "01",
    label: "Identidade Visual",
    short: "Marca",
    title: "Sistemas visuais que fundam presença.",
    body: "Grid tipográfico, paleta, construção de logotipo, papelaria e guidelines. A base de qualquer marca que precisa ser reconhecida antes de ser lida.",
    tags: ["Naming", "Logotipo", "Guidelines", "Papelaria"],
  },
  {
    id: "aplicativos",
    num: "02",
    label: "Aplicativos",
    short: "Produto",
    title: "Interfaces que traduzem marca em uso.",
    body: "Design de produto mobile e web. Fluxos, componentes, design system e prototipagem — a identidade aplicada em cada interação.",
    tags: ["UI/UX", "Design System", "Prototipagem", "Mobile"],
  },
  {
    id: "saas",
    num: "03",
    label: "SaaS",
    short: "Escala",
    title: "Produtos digitais prontos para crescer.",
    body: "Da identidade ao produto funcional. Direção de marca integrada ao desenvolvimento — landing pages, dashboards e sistemas completos.",
    tags: ["Landing Pages", "Dashboards", "Dev + Design", "Growth"],
  },
];

export default function FrentesTabs() {
  const [active, setActive] = useState(0);
  const frente = FRENTES[active];

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-20 md:py-28 border-b border-border">
      <div className="max-w-[1600px] mx-auto">

        {/* Tab selector */}
        <div className="flex flex-wrap items-center gap-2 mb-12 md:mb-16">
          {FRENTES.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className="relative px-6 md:px-8 py-4 md:py-5 group"
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[9px] tracking-[0.3em] transition-colors duration-300 ${
                  active === i ? "text-accent" : "text-fg-dim"
                }`}>
                  {f.num}
                </span>
                <span className={`font-display text-lg md:text-2xl tracking-tight transition-colors duration-300 ${
                  active === i ? "text-fg" : "text-fg-dim group-hover:text-fg-muted"
                }`}>
                  {f.label}
                </span>
              </div>
              {/* Active underline */}
              {active === i && (
                <motion.div
                  layoutId="frente-underline"
                  className="absolute bottom-0 left-6 right-6 md:left-8 md:right-8 h-px bg-accent"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              {active !== i && (
                <div className="absolute bottom-0 left-6 right-6 md:left-8 md:right-8 h-px bg-border/40" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={frente.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end"
          >
            <div className="lg:col-span-7">
              <h3 className="font-display text-[clamp(2rem,4vw,4rem)] leading-[0.95] tracking-[-0.03em] text-fg">
                {frente.title}
              </h3>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm text-fg-muted leading-relaxed font-light">
                {frente.body}
              </p>
              <div className="flex flex-wrap gap-2">
                {frente.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-[0.2em] uppercase text-fg-dim border border-border px-3 py-1.5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
