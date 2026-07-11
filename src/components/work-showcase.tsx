"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/db/schema";
import Link from "next/link";
import WorkEmpty from "./work-empty";

const CAT: Record<string, string> = {
  identidade: "Branding", branding: "Branding", motion: "Motion",
  film: "Film", photography: "Photography", "creative-direction": "Dir. Criativa",
};

const FILTERS = ["Todos", "Branding", "Motion", "Film", "Photography", "Dir. Criativa"];

// Layout alternates between 3 title positions to avoid visual monotony
// while keeping the same cinematic full-viewport concept
type TitlePos = "bottom-left" | "bottom-center" | "bottom-right";
const TITLE_POSITIONS: TitlePos[] = ["bottom-left", "bottom-center", "bottom-right"];

// ─── Single cinematic obra — full viewport ────────────────────────────────────
function CinematicObra({
  project,
  index,
  titlePos,
}: {
  project: Project;
  index: number;
  titlePos: TitlePos;
}) {
  const ref = useRef<HTMLElement>(null);
  const num = String(index + 1).padStart(2, "0");
  const cat = CAT[project.category] || project.category;

  // Parallax on scroll through
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY     = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imgScale = useTransform(scrollYProgress, [0, 0.25], [1.06, 1.0]);

  // Reveal on enter
  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ["start 92%", "start 15%"],
  });
  const fadeIn = useTransform(enter, [0, 0.35], [0, 1]);
  const titleY = useTransform(enter, [0, 0.5], [50, 0]);
  const metaOp = useTransform(enter, [0.2, 0.6], [0, 1]);

  // Title alignment based on position variant
  const titleAlign =
    titlePos === "bottom-center"
      ? "items-center text-center"
      : titlePos === "bottom-right"
      ? "items-end text-right"
      : "items-start text-left";

  const metaAlign =
    titlePos === "bottom-center"
      ? "justify-center"
      : titlePos === "bottom-right"
      ? "justify-end"
      : "justify-start";

  return (
    <article ref={ref} className="relative group">
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        className="block relative w-full overflow-hidden"
        style={{ height: "92vh" }}
      >
        {/* ── Parallax image ── */}
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-[-8%] will-change-transform"
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            // Elegant placeholder when no image
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(160deg, #161412 0%, #0A0908 100%)` }}>
              <div className="opacity-10">
                <svg width="120" height="144" viewBox="0 0 120 144" fill="none">
                  <line x1="24" y1="24" x2="24" y2="120" stroke="#C9A56C" strokeWidth="1" />
                  <line x1="24" y1="24" x2="60" y2="24" stroke="#C9A56C" strokeWidth="1" />
                  <path d="M60,24 C105,24 108,60 108,72 C108,84 105,120 60,120" stroke="#C9A56C" strokeWidth="1" fill="none" />
                  <line x1="24" y1="120" x2="60" y2="120" stroke="#C9A56C" strokeWidth="1" />
                </svg>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Gradient vignette — heavier at bottom ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,9,8,0.3) 0%, transparent 25%, transparent 45%, rgba(10,9,8,0.6) 65%, rgba(10,9,8,0.96) 100%)",
          }}
        />

        {/* ── Top meta bar ── */}
        <motion.div
          style={{ opacity: metaOp }}
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-16 pt-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/60">
              {cat}
            </span>
            {project.client && (
              <>
                <span className="font-mono text-[9px] text-white/30">—</span>
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/40">
                  {project.client}
                </span>
              </>
            )}
          </div>
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/25">
            {num}
          </span>
        </motion.div>

        {/* ── Bottom content ── */}
        <motion.div
          style={{ opacity: fadeIn }}
          className={`absolute bottom-0 left-0 right-0 z-20 flex flex-col ${titleAlign} px-6 md:px-12 lg:px-16 pb-10 md:pb-14`}
        >
          {/* Title — never truncated, wraps naturally */}
          <div className="overflow-hidden mb-5 w-full">
            <motion.h3
              style={{ y: titleY }}
              className="font-display text-[clamp(3rem,7vw,10rem)] leading-[0.86] tracking-[-0.04em] text-white"
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Subtitle + year/CTA */}
          <motion.div
            style={{ opacity: metaOp }}
            className={`flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-end w-full ${metaAlign}`}
          >
            {(project.subtitle || project.description) && (
              <p className="text-[13px] text-white/45 font-light max-w-sm leading-relaxed">
                {project.subtitle || project.description}
              </p>
            )}
            <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
              {project.year && (
                <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/30">
                  {project.year}
                </span>
              )}
              <span className="w-px h-3 bg-white/20" />
              <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent group-hover:text-white transition-colors duration-500">
                Ver Obra →
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Link>

      {/* Thin separator line between projects */}
      <div className="h-px bg-border/30" />
    </article>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function WorkShowcaseMomento3({
  initialProjects = [],
}: {
  initialProjects?: Project[];
}) {
  const [projects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState("Todos");

  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hScroll } = useScroll({
    target: headerRef,
    offset: ["start 90%", "start 30%"],
  });
  const headerOp = useTransform(hScroll, [0, 1], [0, 1]);
  const headerY  = useTransform(hScroll, [0, 1], [40, 0]);

  const filtered = projects.filter(
    (p) => filter === "Todos" || (CAT[p.category] || p.category) === filter
  );

  return (
    <section id="momento-3">
      {/* ── Section header ── */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOp, y: headerY }}
        className="px-6 md:px-12 lg:px-16 pt-28 pb-14 border-b border-border/30"
      >
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent block mb-5">
              03 / Galeria
            </span>
            <h2 className="font-display text-[clamp(3.5rem,7vw,8rem)] leading-none tracking-[-0.04em] text-fg">
              Obras
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative font-mono text-[9px] tracking-[0.35em] uppercase pb-1.5 transition-colors duration-300 ${
                  filter === f ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {f}
                {filter === f && (
                  <motion.span
                    layoutId="fl"
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Projects ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WorkEmpty />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((p, i) => (
              <CinematicObra
                key={p.id}
                project={p}
                index={i}
                titlePos={TITLE_POSITIONS[i % TITLE_POSITIONS.length]}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
