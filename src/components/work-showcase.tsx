"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/db/schema";
import Link from "next/link";
import { SplitLine } from "./split-text";

const CAT: Record<string, string> = {
  identidade: "Branding", branding: "Branding", motion: "Motion",
  film: "Film", photography: "Photography", "creative-direction": "Dir. Criativa",
};

const FILTERS = ["Todos", "Branding", "Motion", "Film", "Photography", "Dir. Criativa"];

function Obra({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // CORRETO: entra na tela em 90%, fica visível o resto todo
    offset: ["start 90%", "end 0%"],
  });

  // Imagem: sutil parallax Y — não some nunca
  const imgY     = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgScale = useTransform(scrollYProgress, [0, 0.2], [1.06, 1.0]);

  // Linha accent no topo — cresce quando entra
  const lineW = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Texto: entra uma vez e fica — threshold pequeno
  const textOp = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const textY  = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  const num = String(index + 1).padStart(2, "0");
  const cat = CAT[project.category] || project.category;
  const isEven = index % 2 === 0;

  return (
    <article ref={ref} className="relative border-t border-border/40 group">
      <motion.div
        className="absolute top-0 left-0 h-px bg-accent origin-left z-10"
        style={{ scaleX: lineW, width: "100%" }}
      />

      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} min-h-[75vh]`}>

        {/* Image */}
        <Link
          href={`/work/${project.slug}`}
          data-cursor="view"
          className="relative lg:w-[58%] aspect-[4/3] lg:aspect-auto overflow-hidden block"
        >
          <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
            {project.coverImage
              ? <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
              : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#161412,#0A0908)" }}>
                  <div className="w-16 h-16 border border-accent/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent/40" />
                  </div>
                </div>
              )
            }
          </motion.div>
          <div className="absolute inset-0 bg-bg/30 group-hover:bg-bg/0 transition-colors duration-700" />
          <span className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.5em] uppercase text-fg/30">{num}</span>
        </Link>

        {/* Text */}
        <motion.div
          style={{ opacity: textOp, y: textY }}
          className="lg:w-[42%] flex flex-col justify-center px-8 md:px-12 lg:px-16 py-14 lg:py-0"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="w-6 h-px bg-accent/50" />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">{cat}</span>
            {project.client && <>
              <span className="w-4 h-px bg-fg-dim/20" />
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">{project.client}</span>
            </>}
          </div>

          <SplitLine
            text={project.title}
            className="font-display text-[clamp(2.8rem,4vw,5.5rem)] leading-[0.88] tracking-[-0.035em] text-fg"
          />

          {(project.subtitle || project.description) && (
            <p className="text-sm text-fg-muted leading-relaxed font-light max-w-sm mt-6 mb-10">
              {project.subtitle || project.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-4">
            {project.year && <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">{project.year}</span>}
            <span className="w-4 h-px bg-fg-dim/20" />
            <Link
              href={`/work/${project.slug}`}
              className="group/lnk inline-flex items-center gap-3 font-mono text-[9px] tracking-[0.5em] uppercase text-fg-muted hover:text-fg transition-colors duration-500"
            >
              Ver Obra
              <span className="block w-6 h-px bg-fg-dim group-hover/lnk:w-12 group-hover/lnk:bg-accent transition-all duration-700" />
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}

export default function WorkShowcaseMomento3({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [projects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState("Todos");
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hScroll } = useScroll({ target: headerRef, offset: ["start 90%", "start 30%"] });
  const headerOp = useTransform(hScroll, [0, 1], [0, 1]);
  const headerY  = useTransform(hScroll, [0, 1], [40, 0]);

  const filtered = projects.filter(p =>
    filter === "Todos" || (CAT[p.category] || p.category) === filter
  );

  return (
    <section id="momento-3">
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOp, y: headerY }}
        className="px-6 md:px-12 lg:px-16 pt-28 pb-14 border-b border-border/30"
      >
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-5">03 / Galeria</span>
            <h2 className="font-display text-[clamp(3.5rem,7vw,8rem)] leading-none tracking-[-0.04em] text-fg">Obras</h2>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`relative font-mono text-[9px] tracking-[0.35em] uppercase pb-1.5 transition-colors duration-300 ${filter === f ? "text-fg" : "text-fg-dim hover:text-fg-muted"}`}>
                {f}
                {filter === f && (
                  <motion.span layoutId="fl" className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {filtered.length > 0
          ? filtered.map((p, i) => (
            <motion.div key={p.id} layout
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <Obra project={p} index={i} />
            </motion.div>
          ))
          : (
            <div className="py-40 text-center border-t border-border/30">
              <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg-dim">Nenhuma obra nesta categoria</span>
            </div>
          )
        }
      </AnimatePresence>
    </section>
  );
}
