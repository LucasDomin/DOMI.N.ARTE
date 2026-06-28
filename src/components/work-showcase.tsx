"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/db/schema";
import { useReveal } from "@/hooks/useReveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  identidade: "Branding",
  branding: "Branding",
  motion: "Motion",
  film: "Film",
  photography: "Photography",
  "creative-direction": "Creative Direction",
};

const FILTER_CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "branding", label: "Branding" },
  { id: "motion", label: "Motion" },
  { id: "film", label: "Film" },
  { id: "photography", label: "Photography" },
  { id: "creative-direction", label: "Creative Direction" },
];

function ObraExposicao({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isReverse = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <article
      ref={ref}
      className="relative py-24 md:py-36 border-t border-border first:border-t-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        {/* Gallery Image (Editorial 7 col) */}
        <div className={`lg:col-span-7 ${isReverse ? "lg:order-2" : ""}`}>
          <Link href={`/work/${project.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-sm bg-bg-soft img-hover group shadow-2xl cursor-pointer">
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-bg-card to-bg-soft" />
              )}
            </motion.div>

            {/* Cinematic overlay vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent pointer-events-none" />

            {/* Exhibition Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-fg font-mono">
              <span className="px-3.5 py-1.5 rounded-full bg-bg/85 backdrop-blur-md border border-border-light text-accent">
                Obra {number}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-bg/85 backdrop-blur-md border border-border-light text-fg-muted">
                {CATEGORY_LABELS[project.category] || project.category}
              </span>
            </div>
          </Link>
        </div>

        {/* Storytelling Narrative (5 col) */}
        <div className={`lg:col-span-5 ${isReverse ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
          <div className="flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase text-fg-dim font-mono mb-8">
            <span className="text-fg-muted">{project.client || "Obra Autoral"}</span>
            <span className="w-6 h-px bg-fg-dim" />
            <span>{project.year || "2025"}</span>
          </div>

          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.96] tracking-[-0.02em] text-fg mb-6">
            {project.title}
          </h3>

          <p className="text-sm md:text-base text-fg-muted leading-relaxed mb-10 max-w-md font-light">
            {project.subtitle || project.description}
          </p>

          {/* 4 Pillars: Contexto, Conceito, Direção, Resultado */}
          <dl className="space-y-7 pt-6 border-t border-border">
            {project.context && (
              <div>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Contexto
                </dt>
                <dd className="text-xs md:text-sm text-fg/90 leading-relaxed font-light">
                  {project.context}
                </dd>
              </div>
            )}

            {project.challenge && (
              <div>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Desafio
                </dt>
                <dd className="text-xs md:text-sm text-fg/90 leading-relaxed font-light">
                  {project.challenge}
                </dd>
              </div>
            )}

            {project.solution && (
              <div>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Solução
                </dt>
                <dd className="text-xs md:text-sm text-fg/90 leading-relaxed font-light">
                  {project.solution}
                </dd>
              </div>
            )}

            {project.result && (
              <div>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Resultado
                </dt>
                <dd className="text-xs md:text-sm text-fg/90 leading-relaxed font-light">
                  {project.result}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-10">
            <Link
              href={`/work/${project.slug}`}
              className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase font-mono text-fg hover:text-accent transition-colors duration-300"
            >
              <span>Explorar Estudo de Caso</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WorkShowcaseMomento3() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("todos");
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data.filter((p) => !p.isDraft));
        }
      })
      .catch(() => {});
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (filter === "todos") return true;

    // Check category mapping (supporting 'identidade' mapping to 'branding' search for consistency)
    const cat = project.category.toLowerCase();
    if (filter === "branding") return cat === "branding" || cat === "identidade";

    return cat === filter;
  });

  return (
    <section id="momento-3" className="relative border-b border-border">
      {/* Exposição Header */}
      <div className="px-6 md:px-12 lg:px-16 pt-36 md:pt-48 pb-12">
        <div ref={ref} className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="reveal text-[10px] tracking-[0.4em] uppercase text-accent font-mono block">
                Momento 03
              </span>
              <h2
                className="reveal mt-4 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-[-0.025em] text-fg"
                style={{ transitionDelay: "100ms" }}
              >
                Obras & <br />
                <span className="italic text-accent">Selected Work</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:flex lg:flex-col lg:items-end lg:justify-end">
              <p
                className="reveal text-xs md:text-sm text-fg-muted max-w-sm leading-relaxed font-light mb-6 text-left lg:text-right"
                style={{ transitionDelay: "200ms" }}
              >
                Cada trabalho concebido como uma galeria. Navegue pelas obras ou filtre pela disciplina criativa correspondente abaixo.
              </p>

              {/* Advanced Interactive Filters */}
              <div className="reveal flex flex-wrap gap-2 justify-start lg:justify-end" style={{ transitionDelay: "250ms" }}>
                {FILTER_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-[10px] tracking-[0.1em] uppercase font-mono transition-all duration-300 ${
                      filter === cat.id
                        ? "bg-accent text-bg border-accent"
                        : "bg-transparent text-fg-muted border border-border hover:border-fg-muted hover:text-fg"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exposição de Obras */}
      <div className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ObraExposicao project={project} index={i} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-24 border border-dashed border-border rounded-xl">
                <p className="text-sm text-fg-muted font-light font-mono uppercase tracking-widest">Nenhuma obra encontrada nesta categoria.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
