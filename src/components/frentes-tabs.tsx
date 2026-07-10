"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Icons — same visual language as the parallax hero (thin gold strokes,
// geometric construction lines, control points). Each icon represents the
// discipline through the same "type design" DNA established in Scene 1.

function IconIdentidade({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 40 44" fill="none">
      {/* Baseline + cap height guides */}
      <line x1="4" y1="6" x2="36" y2="6" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.35" />
      <line x1="4" y1="38" x2="36" y2="38" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      {/* Letterform D — same construction as parallax */}
      <path d="M10,6 L10,38 M10,6 L20,6 C30,6 32,16 32,22 C32,28 30,38 20,38 L10,38"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Control nodes */}
      <circle cx="10" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="32" cy="22" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="10" cy="38" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function IconAplicativos({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 40 44" fill="none">
      {/* Phone frame */}
      <rect x="10" y="4" width="20" height="36" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Screen content — component blocks */}
      <line x1="14" y1="11" x2="26" y2="11" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <rect x="14" y="16" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
      <line x1="14" y1="28" x2="22" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="14" y1="31" x2="26" y2="31" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Home indicator */}
      <line x1="17" y1="36" x2="23" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      {/* Control node */}
      <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function IconSaaS({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 40 44" fill="none">
      {/* Dashboard frame */}
      <rect x="4" y="8" width="32" height="26" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Browser dots */}
      <circle cx="8" cy="11.5" r="0.75" fill="currentColor" opacity="0.5" />
      <circle cx="10.5" cy="11.5" r="0.75" fill="currentColor" opacity="0.5" />
      {/* Growth chart line */}
      <path d="M8,28 L14,22 L19,25 L26,14 L32,17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="26" cy="14" r="1.5" fill="currentColor" opacity="0.7" />
      {/* Baseline */}
      <line x1="8" y1="30" x2="32" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="1.5 1.5" />
      {/* Bottom tick — depth */}
      <line x1="4" y1="38" x2="36" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

const FRENTES = [
  {
    id: "identidade",
    num: "01",
    label: "Identidade Visual",
    Icon: IconIdentidade,
    title: "Sistemas visuais que fundam presença.",
    body: "Grid tipográfico, paleta, construção de logotipo, papelaria e guidelines.",
    tags: ["Naming", "Logotipo", "Guidelines", "Papelaria"],
  },
  {
    id: "aplicativos",
    num: "02",
    label: "Aplicativos",
    Icon: IconAplicativos,
    title: "Interfaces que traduzem marca em uso.",
    body: "Design de produto mobile e web. Fluxos, componentes e design system.",
    tags: ["UI/UX", "Design System", "Prototipagem", "Mobile"],
  },
  {
    id: "saas",
    num: "03",
    label: "SaaS",
    Icon: IconSaaS,
    title: "Produtos digitais prontos para crescer.",
    body: "Da identidade ao produto funcional — direção de marca integrada ao desenvolvimento.",
    tags: ["Landing Pages", "Dashboards", "Dev + Design", "Growth"],
  },
];

export default function FrentesTabs() {
  const [active, setActive] = useState(0);
  const frente = FRENTES[active];
  const ActiveIcon = frente.Icon;

  return (
    <section className="relative px-6 md:px-12 lg:px-16 py-24 md:py-32 border-b border-border overflow-hidden">
      {/* Ambient background glow — same language as parallax */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(201,165,108,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,108,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto">

        {/* Section tag */}
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-10 md:mb-14">
          Frentes de Atuação
        </span>

        {/* ── Tab blocks — big cards with icon ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-16 md:mb-20">
          {FRENTES.map((f, i) => {
            const isActive = active === i;
            return (
              <button
                key={f.id}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-4 md:gap-5 p-5 md:p-7 rounded-xl border transition-all duration-500 text-left group ${
                  isActive
                    ? "border-accent/50 bg-accent/[0.04]"
                    : "border-border hover:border-border-light bg-transparent"
                }`}
              >
                {/* Icon block */}
                <div
                  className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg border flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "border-accent/40 text-accent bg-accent/[0.06]"
                      : "border-border text-fg-dim group-hover:text-fg-muted group-hover:border-border-light"
                  }`}
                >
                  <f.Icon size={26} />
                </div>

                <div className="min-w-0">
                  <span className={`font-mono text-[8px] tracking-[0.3em] block mb-1.5 transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-fg-dim"
                  }`}>
                    {f.num}
                  </span>
                  <span className={`font-display text-xl md:text-2xl tracking-tight leading-none block transition-colors duration-300 ${
                    isActive ? "text-fg" : "text-fg-dim group-hover:text-fg-muted"
                  }`}>
                    {f.label}
                  </span>
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="frente-dot"
                    className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-accent"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Content panel — large icon illustration + text ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={frente.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Large icon illustration — left */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-2xl border border-accent/20 flex items-center justify-center bg-accent/[0.02]">
                {/* Corner ticks — blueprint style */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-accent/30" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-accent/30" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-accent/30" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-accent/30" />
                <ActiveIcon size={72} />
              </div>
            </div>

            {/* Text content — right */}
            <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <h3 className="font-display text-[clamp(2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.03em] text-fg">
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
