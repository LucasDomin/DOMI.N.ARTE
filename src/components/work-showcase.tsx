"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/db/schema";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const CAT: Record<string, string> = {
  identidade: "Branding", branding: "Branding", motion: "Motion",
  film: "Film", photography: "Photography", "creative-direction": "Dir. Criativa",
};

const FILTERS = ["Todos", "Branding", "Motion", "Film", "Photography", "Dir. Criativa"];

// ─── Single obra — full-bleed cinematic row ────────────────────────────────────
// Each project takes the full width. Image is massive, text appears on scroll.
// No grid. No cards. Editorial horizontal rhythm.

function Obra({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 10%"] });

  const imgScale  = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);
  const imgY      = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const lineW     = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textOp    = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const textY     = useTransform(scrollYProgress, [0.1, 0.5], [20, 0]);

  const num = String(index + 1).padStart(2, "0");
  const cat = CAT[project.category] || project.category;
  const isEven = index % 2 === 0;

  return (
    <article ref={ref} className="relative border-t border-border/50 group">
      {/* Top rule — animates in on scroll */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-accent origin-left"
        style={{ scaleX: lineW }}
      />

      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} min-h-[70vh]`}>

        {/* Image — 60% */}
        <Link href={`/work/${project.slug}`}
          className="relative lg:w-[60%] aspect-[4/3] lg:aspect-auto overflow-hidden cursor-pointer block">
          <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
            {project.coverImage
              ? <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
              : <div className="w-full h-full" style={{ background: `linear-gradient(135deg, #161412 0%, #0A0908 100%)` }} />
            }
          </motion.div>
          {/* Overlay — darkens on hover */}
          <div className="absolute inset-0 bg-bg/20 group-hover:bg-bg/5 transition-colors duration-700" />

          {/* Number stamp */}
          <div className="absolute top-6 left-6">
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg/40">{num}</span>
          </div>
        </Link>

        {/* Text — 40% */}
        <motion.div
          style={{ opacity: textOp, y: textY }}
          className={`lg:w-[40%] flex flex-col justify-center px-8 md:px-12 lg:px-16 py-12 lg:py-0 ${isEven ? "" : ""}`}
        >
          {/* Category + client */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-accent/40" />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">{cat}</span>
            {project.client && (
              <>
                <div className="w-4 h-px bg-fg-dim/30" />
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">{project.client}</span>
              </>
            )}
          </div>

          {/* Title — large, editorial */}
          <h3 className="font-display text-[clamp(2.5rem,4vw,5.5rem)] leading-[0.88] tracking-[-0.03em] text-fg mb-6">
            {project.title}
          </h3>

          {/* Subtitle */}
          {(project.subtitle || project.description) && (
            <p className="text-sm text-fg-muted leading-relaxed font-light max-w-sm mb-10">
              {project.subtitle || project.description}
            </p>
          )}

          {/* Year */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-4 h-px bg-fg-dim/30" />
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">{project.year || "2025"}</span>
          </div>

          {/* Link */}
          <Link href={`/work/${project.slug}`}
            className="group/link inline-flex items-center gap-4 w-fit">
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg-muted group-hover/link:text-fg transition-colors duration-500">
              Ver Obra
            </span>
            <motion.div
              className="w-8 h-px bg-fg-dim group-hover/link:w-16 group-hover/link:bg-accent transition-all duration-700"
            />
          </Link>
        </motion.div>
      </div>
    </article>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function WorkShowcaseMomento3({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [projects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState("Todos");
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start end", "start start"] });
  const headerY  = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headerOp = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const filtered = projects.filter(p => {
    if (filter === "Todos") return true;
    const c = CAT[p.category] || p.category;
    return c === filter;
  });

  return (
    <section id="momento-3" className="relative">

      {/* Section header — minimal, inline */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOp, y: headerY }}
        className="px-6 md:px-12 lg:px-16 pt-32 pb-16 border-b border-border/30"
      >
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-4">03 / Galeria</span>
            <h2 className="font-display text-[clamp(3rem,6vw,7rem)] leading-none tracking-[-0.04em] text-fg">
              Obras
            </h2>
          </div>
          {/* Filters — horizontal, minimal */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`font-mono text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 relative pb-1 ${
                  filter === f ? "text-fg" : "text-fg-dim hover:text-fg-muted"
                }`}>
                {f}
                {filter === f && (
                  <motion.div layoutId="filter-line" className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Obras list */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          filtered.map((p, i) => (
            <motion.div key={p.id} layout
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <Obra project={p} index={i} />
            </motion.div>
          ))
        ) : (
          <div className="py-32 text-center border-t border-border/30">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg-dim">
              Nenhuma obra nesta categoria
            </p>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
