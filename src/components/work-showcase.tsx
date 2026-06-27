"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/db/schema";
import { useReveal } from "@/hooks/useReveal";

const CATEGORY_LABELS: Record<string, string> = {
  identidade: "Identidade Visual Autoral",
  web: "Direção & Experiência Web",
  saas: "Produto Digital & Ecossistema",
};

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
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-bg-soft img-hover group shadow-2xl">
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
              <span className="px-3.5 py-1.5 rounded-full bg-bg/80 backdrop-blur-md border border-border-light text-accent">
                Obra {number}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-bg/80 backdrop-blur-md border border-border-light text-fg-muted hidden sm:inline-block">
                {CATEGORY_LABELS[project.category] || project.category}
              </span>
            </div>
          </div>
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
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  Contexto
                </dt>
                <dd className="text-xs md:text-sm text-fg/90 leading-relaxed font-light">
                  {project.context}
                </dd>
              </div>
            )}

            {project.concept && (
              <div>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-2 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  Conceito
                </dt>
                <dd className="text-xs md:text-sm text-fg/90 leading-relaxed font-light">
                  {project.concept}
                </dd>
              </div>
            )}

            {project.direction && (
              <div>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-2 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  Direção
                </dt>
                <dd className="text-xs md:text-sm text-fg/90 leading-relaxed font-light">
                  {project.direction}
                </dd>
              </div>
            )}

            {project.result && (
              <div>
                <dt className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-2 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  Resultado
                </dt>
                <dd className="text-xs md:text-sm text-fg/90 leading-relaxed font-light">
                  {project.result}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </article>
  );
}

export default function WorkShowcaseMomento3() {
  const [projects, setProjects] = useState<Project[]>([]);
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  return (
    <section id="momento-3" className="relative border-b border-border">
      {/* Exposição Header */}
      <div className="px-6 md:px-12 lg:px-16 pt-36 md:pt-48 pb-16">
        <div ref={ref} className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
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
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <p
                className="reveal text-xs md:text-sm text-fg-muted max-w-xs leading-relaxed font-light"
                style={{ transitionDelay: "200ms" }}
              >
                Cada trabalho concebido como uma galeria. Apresentação orientada a fundamento dramático, execução cirúrgica e alto impacto comercial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exposição de Obras */}
      <div className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-[1600px] mx-auto">
          {projects.map((project, i) => (
            <ObraExposicao key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
