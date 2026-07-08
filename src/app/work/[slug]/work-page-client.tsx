"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/db/schema";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

function CinematicHero({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex flex-col justify-end pt-32 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 z-0">
        {project.coverImage ? (
          <motion.img
            src={project.coverImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ scale: imgScale, opacity: imgOpacity }}
          />
        ) : (
          <div className="absolute inset-0 bg-bg-soft/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-[1600px] w-full mx-auto"
      >
        {/* Metadata strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-accent font-mono mb-6"
        >
          {project.client && <span>{project.client}</span>}
          {project.client && project.year && <span className="w-8 h-px bg-accent/40" />}
          {project.year && <span>{project.year}</span>}
          {project.location && (
            <>
              <span className="w-8 h-px bg-accent/40" />
              <span>{project.location}</span>
            </>
          )}
          {project.category && (
            <>
              <span className="w-8 h-px bg-accent/40" />
              <span className="px-3 py-1 rounded-full border border-accent/30 text-accent">
                {project.category}
              </span>
            </>
          )}
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-[9rem] leading-[0.88] tracking-[-0.035em] text-fg max-w-5xl"
          >
            {project.headline || project.title}
          </motion.h1>
        </div>

        {project.subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            className="font-display italic text-xl md:text-3xl text-fg-muted max-w-3xl mt-6 leading-relaxed"
          >
            {project.subheadline}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}

function NarrativeSection({ project }: { project: Project }) {
  const creditsList = (project.credits as { role: string; name: string }[]) || [];
  const awardsList = (project.awards as string[]) || [];

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        {/* Main media */}
        {project.mainVideo ? (
          <div className="aspect-video w-full rounded bg-bg overflow-hidden border border-border shadow-2xl mb-24">
            <iframe
              src={project.mainVideo}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : project.coverImage ? (
          <div className="aspect-[21/9] w-full rounded overflow-hidden border border-border shadow-2xl mb-24 bg-bg">
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Sticky sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-10">
            {project.format && (
              <div>
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-4">Formato</h3>
                <p className="text-sm text-fg font-light">{project.format}</p>
              </div>
            )}
            {project.duration && (
              <div>
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-4">Duração</h3>
                <p className="text-sm text-fg font-light">{project.duration}</p>
              </div>
            )}
            {creditsList.length > 0 && (
              <div>
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-4">Ficha Técnica</h3>
                <ul className="space-y-2">
                  {creditsList.map((credit, i) => (
                    <li key={i} className="text-xs text-fg-muted flex items-center justify-between border-b border-border/40 pb-2">
                      <span className="font-mono text-fg-dim text-[10px] tracking-wider uppercase">{credit.role}</span>
                      <span className="font-light">{credit.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {awardsList.length > 0 && (
              <div>
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-4">Prêmios</h3>
                <ul className="space-y-2">
                  {awardsList.map((award, i) => (
                    <li key={i} className="text-xs text-accent flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Deep narrative */}
          <div className="lg:col-span-8 space-y-16">
            {project.context && (
              <div className="space-y-4">
                <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono">01 · Contexto</h4>
                <p className="font-display text-3xl md:text-4xl text-fg leading-relaxed">{project.context}</p>
              </div>
            )}

            {/* Concept — the creative idea, given the most visual weight */}
            {project.concept && (
              <div className="relative pt-10 pb-2">
                <div className="absolute -left-6 lg:-left-10 top-10 bottom-2 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent" />
                <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono mb-5 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  A Ideia
                </h4>
                <p className="font-display italic text-2xl md:text-3xl lg:text-[2.4rem] text-fg leading-[1.35]">
                  {project.concept}
                </p>
              </div>
            )}

            {project.challenge && (
              <div className="space-y-4 pt-8 border-t border-border">
                <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono">O Desafio</h4>
                <p className="text-base md:text-lg text-fg-muted leading-relaxed font-light">{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div className="space-y-4 pt-8 border-t border-border">
                <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono">A Resolução</h4>
                <p className="text-base md:text-lg text-fg-muted leading-relaxed font-light">{project.solution}</p>
              </div>
            )}
            {project.result && (
              <div className="space-y-4 pt-8 border-t border-border">
                <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono">Resultado</h4>
                <p className="font-display text-2xl md:text-3xl text-fg italic leading-relaxed">{project.result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Categorized image gallery ─────────────────────────────────────────────────
// Groups project stills into named sections: Identidade, Logo, Site, Sistema.
// Each section only renders if it has images. Order follows a fixed narrative
// sequence — from abstract identity to concrete applications.

type Still = { url: string; type: string; order: number };

const TYPE_CONFIG: Record<string, { label: string; num: string; hint: string }> = {
  identidade: { label: "Identidade Visual", num: "01", hint: "Paleta, texturas e direção visual" },
  logo:       { label: "Construção do Logo", num: "02", hint: "Processo e variações do logotipo" },
  site:       { label: "Experiência Digital", num: "03", hint: "Interfaces e telas do produto" },
  sistema:    { label: "Sistema de Marca",    num: "04", hint: "Aplicações e elementos do sistema" },
  // legacy fallbacks from earlier data model
  branding:   { label: "Identidade Visual",   num: "01", hint: "Paleta, texturas e direção visual" },
  component:  { label: "Experiência Digital", num: "03", hint: "Interfaces e telas do produto" },
};

const TYPE_ORDER = ["identidade", "branding", "logo", "site", "component", "sistema"];

function StillsSection({ type, items }: { type: string; items: Still[] }) {
  const config = TYPE_CONFIG[type] ?? { label: type, num: "•", hint: "" };
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="mb-24 md:mb-32 last:mb-0">
      {/* Section header */}
      <div className="flex items-baseline gap-5 mb-10 md:mb-12">
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">{config.num}</span>
        <div className="w-8 h-px bg-accent/40" />
        <h3 className="font-display text-2xl md:text-3xl text-fg tracking-tight">{config.label}</h3>
        {config.hint && (
          <span className="hidden md:inline font-mono text-[9px] tracking-[0.2em] uppercase text-fg-dim ml-auto">
            {config.hint}
          </span>
        )}
      </div>

      {/* Images — first is large, rest form a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {sorted.map((still, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded bg-bg-soft border border-border group shadow-lg ${
              i === 0 && sorted.length > 1 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
            }`}
          >
            <img
              src={still.url}
              alt={`${config.label} — imagem ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StillsGallery({ project }: { project: Project }) {
  const stillsList = (project.stills as Still[]) || [];
  if (stillsList.length === 0) return null;

  // Group by type, preserving a fixed narrative order
  const grouped = new Map<string, Still[]>();
  for (const still of stillsList) {
    const key = still.type || "sistema";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(still);
  }

  const orderedTypes = TYPE_ORDER.filter((t) => grouped.has(t));
  // Include any unrecognized types at the end
  for (const t of grouped.keys()) {
    if (!orderedTypes.includes(t)) orderedTypes.push(t);
  }

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-mono">Galeria do Projeto</span>
          <h2 className="font-display text-4xl md:text-5xl text-fg mt-2">Explorando cada camada</h2>
        </div>

        {orderedTypes.map((type) => (
          <StillsSection key={type} type={type} items={grouped.get(type)!} />
        ))}
      </div>
    </section>
  );
}

function NextProjectGate({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-36 md:py-48 px-6 md:px-12 lg:px-16 border-t border-border bg-bg-card flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-mono">Próxima Obra</span>
        <Link href={`/work/${project.slug}`} className="group block mt-8">
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="font-display text-5xl md:text-7xl lg:text-[7rem] leading-none text-fg tracking-tight group-hover:text-accent transition-colors duration-700"
          >
            {project.title}
          </motion.h2>
          <p className="text-sm text-fg-muted mt-6 font-mono tracking-wider uppercase group-hover:text-fg transition-colors inline-flex items-center gap-2">
            Ver Exposição <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </p>
        </Link>
      </div>
    </section>
  );
}

// ─── Main client component ─────────────────────────────────────────────────────

export default function WorkPageClient({
  project,
  nextProject,
  prevProject,
}: {
  project: Project;
  nextProject: Project | null;
  prevProject: Project | null;
}) {
  return (
    <main className="relative bg-bg min-h-screen selection:bg-accent selection:text-bg">
      <div className="grain" />
      <div className="vignette" />

      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 bg-gradient-to-b from-bg via-bg/80 to-transparent pointer-events-none">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between pointer-events-auto">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-mono text-fg-muted hover:text-fg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Galeria</span>
          </Link>
          <Link href="/" className="font-display text-xl text-fg hover:text-accent transition-colors">
            DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE
          </Link>
        </div>
      </header>

      <CinematicHero project={project} />
      <NarrativeSection project={project} />
      <StillsGallery project={project} />
      {nextProject && <NextProjectGate project={nextProject} />}

      <footer className="relative border-t border-border py-12 px-6 md:px-12 lg:px-16 bg-bg">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-[0.25em] uppercase font-mono text-fg-dim">
          <p>© 2025 DOMI.N.ARTE · ASSINATURA CRIATIVA</p>
          <Link href="/" className="hover:text-fg transition-colors">Voltar ao Início</Link>
        </div>
      </footer>
    </main>
  );
}
