"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import type { Project } from "@/db/schema";
import Link from "next/link";
import WorkEmpty from "./work-empty";

const EASE = [0.16, 1, 0.3, 1] as const;

const CAT: Record<string, string> = {
  identidade: "Branding", branding: "Branding", motion: "Motion",
  film: "Film", photography: "Photography", "creative-direction": "Dir. Criativa",
};

const FILTERS = ["Todos", "Branding", "Motion", "Film", "Photography", "Dir. Criativa"];

// ─── Hover preview — image follows cursor on desktop ─────────────────────────
function ObraListItem({
  project, index, isActive, onEnter, onLeave,
}: {
  project: Project; index: number; isActive: boolean;
  onEnter: () => void; onLeave: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");
  const cat = CAT[project.category] || project.category;

  return (
    <Link href={`/work/${project.slug}`}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      className="group block border-t border-border/40 relative"
      data-cursor="view"
    >
      <div className="flex items-center justify-between py-7 md:py-9 px-0 gap-6">
        {/* Left: num + title */}
        <div className="flex items-baseline gap-6 md:gap-10 flex-1 min-w-0">
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg-dim/50 flex-shrink-0 w-8">
            {num}
          </span>
          <h3 className={`font-display text-[clamp(1.8rem,3.5vw,4.5rem)] leading-none tracking-[-0.035em] transition-colors duration-500 truncate ${isActive ? "text-accent" : "text-fg"}`}>
            {project.title}
          </h3>
        </div>

        {/* Right: meta */}
        <div className="hidden md:flex items-center gap-10 flex-shrink-0">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">
            {cat}
          </span>
          {project.client && (
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-fg-dim/60">
              {project.client}
            </span>
          )}
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-fg-dim/40">
            {project.year || "2025"}
          </span>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className={`transition-all duration-500 ${isActive ? "translate-x-1 -translate-y-1 opacity-100 text-accent" : "opacity-0 text-fg-dim"}`}
          >
            <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Animated line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-accent origin-left"
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ width: "100%" }}
      />
    </Link>
  );
}

// ─── Floating image preview — follows active item ─────────────────────────────
function FloatingPreview({ project }: { project: Project | null }) {
  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[38%] aspect-[4/3] rounded overflow-hidden pointer-events-none z-10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#161412,#0A0908)" }}>
              <div className="w-12 h-12 border border-accent/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-accent/40" />
              </div>
            </div>
          )}
          {/* Overlay with category */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5">
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-accent">
              {CAT[project.category] || project.category}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Featured obra — full viewport cinematic ──────────────────────────────────
// Concept: cinema letterbox. Image fills 100vw × 90vh.
// Title is massive, overlaid at the bottom like movie credits.
// On scroll: image scales subtly, title reveals from below clip-mask.
// No grid. No sidebar. No split. Pure image + typography.

function FeaturedObra({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Parallax layers — each moves at different speed
  const imgY     = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.3], [1.08, 1.0]);
  const titleY   = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  // Reveal: enters from bottom, stays
  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 20%"],
  });
  const revealOp  = useTransform(enterProgress, [0, 0.4], [0, 1]);
  const metaOp    = useTransform(enterProgress, [0.3, 0.7], [0, 1]);

  const cat = CAT[project.category] || project.category;

  return (
    <article ref={ref} className="relative overflow-hidden group">

      {/* ── Full-viewport image ── */}
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        className="block relative w-full overflow-hidden"
        style={{ height: "90vh" }}
      >
        {/* Parallax image */}
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-[-10%] will-change-transform"
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: "linear-gradient(160deg,#1A1612 0%,#0A0908 100%)" }}
            />
          )}
        </motion.div>

        {/* Cinema letterbox bars — top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[45%] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(10,9,8,0.97) 0%, rgba(10,9,8,0.7) 40%, transparent 100%)" }}
        />

        {/* ── Overlaid content ── */}
        <motion.div style={{ opacity: revealOp }}
          className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 md:pb-16">

          {/* Meta strip — top left */}
          <motion.div style={{ opacity: metaOp }}
            className="absolute top-8 left-6 md:left-12 lg:left-16 flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg/60">{cat}</span>
            {project.client && (
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg/40">
                — {project.client}
              </span>
            )}
          </motion.div>

          {/* Index — top right */}
          <motion.span style={{ opacity: metaOp }}
            className="absolute top-8 right-6 md:right-12 lg:right-16 font-mono text-[9px] tracking-[0.5em] uppercase text-fg/30">
            01
          </motion.span>

          {/* ── Massive title — slides up from below ── */}
          <div className="overflow-hidden mb-6">
            <motion.h3
              style={{ y: titleY }}
              className="font-display text-[clamp(3.5rem,8vw,11rem)] leading-[0.84] tracking-[-0.045em] text-fg"
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Bottom strip: subtitle + CTA */}
          <motion.div style={{ opacity: metaOp }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            {(project.subtitle || project.description) && (
              <p className="text-sm text-fg/50 font-light max-w-md leading-relaxed">
                {project.subtitle || project.description}
              </p>
            )}
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg/40">
                {project.year || "2025"}
              </span>
              <span className="w-px h-4 bg-fg/20" />
              <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent group-hover:text-fg transition-colors duration-500">
                Ver Obra →
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </article>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function WorkShowcaseMomento3({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [projects] = useState<Project[]>(initialProjects);
  const [filter, setFilter]     = useState("Todos");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hScroll } = useScroll({ target: headerRef, offset: ["start 90%", "start 30%"] });
  const headerOp = useTransform(hScroll, [0, 1], [0, 1]);
  const headerY  = useTransform(hScroll, [0, 1], [40, 0]);

  const filtered = projects.filter(p =>
    filter === "Todos" || (CAT[p.category] || p.category) === filter
  );

  const featured = filtered[0] ?? null;
  const rest     = filtered.slice(1);
  const activeProject = activeIdx !== null ? rest[activeIdx] ?? null : null;

  return (
    <section id="momento-3">

      {/* Header */}
      <motion.div ref={headerRef} style={{ opacity: headerOp, y: headerY }}
        className="px-6 md:px-12 lg:px-16 pt-28 pb-14 border-b border-border/30">
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
                {filter === f && <motion.span layoutId="fl" className="absolute bottom-0 left-0 right-0 h-px bg-accent" />}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WorkEmpty />
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* Featured — first project, full cinematic */}
            {featured && <FeaturedObra project={featured} />}

            {/* Rest — typographic list with hover preview */}
            {rest.length > 0 && (
              <div className="border-t border-border/40">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative">

                  {/* Floating preview — desktop only */}
                  <div className="hidden lg:block">
                    <FloatingPreview project={activeProject} />
                  </div>

                  {/* List */}
                  <div className="lg:pr-[42%]">
                    {rest.map((p, i) => (
                      <ObraListItem
                        key={p.id}
                        project={p}
                        index={i + 1}
                        isActive={activeIdx === i}
                        onEnter={() => setActiveIdx(i)}
                        onLeave={() => setActiveIdx(null)}
                      />
                    ))}
                    {/* Final border */}
                    <div className="border-t border-border/40" />
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
