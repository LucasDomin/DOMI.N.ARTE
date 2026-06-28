"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/db/schema";
import { ArrowLeft, ArrowUpRight, Palette, Globe, Boxes } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SingleWorkPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const slug = params.slug;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch target project
    fetch(`/api/projects/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    // Fetch all for navigation
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllProjects(data.filter((p) => !p.isDraft));
        }
      })
      .catch(() => {});
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-12 h-px bg-border-light overflow-hidden relative">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent"
          />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl text-fg mb-4">Obra não encontrada</h1>
        <p className="text-sm text-fg-muted mb-8">Esta obra não existe ou ainda não foi publicada pelo curador.</p>
        <Link href="/" className="px-6 py-3 rounded-full bg-accent text-bg text-xs font-bold tracking-widest uppercase">
          Voltar para galeria
        </Link>
      </div>
    );
  }

  // Next/prev projects
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = currentIndex !== -1 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const stillsList = (project.stills as { url: string; type: string; order: number }[]) || [];
  const creditsList = (project.credits as { role: string; name: string }[]) || [];
  const awardsList = (project.awards as string[]) || [];

  return (
    <main className="relative bg-bg min-h-screen selection:bg-accent selection:text-bg">
      <div className="grain" />
      <div className="vignette" />

      {/* Dynamic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 bg-gradient-to-b from-bg via-bg/80 to-transparent">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-mono text-fg-muted hover:text-fg transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar à Galeria</span>
          </Link>

          <Link href="/" className="font-display text-xl text-fg hover:text-accent transition-colors">
            DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE
          </Link>
        </div>
      </header>

      {/* Cinematic Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pt-32 pb-16 px-6 md:px-12 lg:px-16">
        {/* Cover background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt=""
              className="w-full h-full object-cover opacity-30 blur-[2px]"
            />
          ) : (
            <div className="absolute inset-0 bg-bg-soft/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] w-full mx-auto">
          <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-accent font-mono mb-6">
            <span>{project.client}</span>
            <span className="w-8 h-px bg-accent/40" />
            <span>{project.year}</span>
            {project.location && (
              <>
                <span className="w-8 h-px bg-accent/40" />
                <span>{project.location}</span>
              </>
            )}
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-9xl leading-[0.9] tracking-[-0.03em] text-fg mb-4 max-w-5xl">
            {project.headline || project.title}
          </h1>

          {project.subheadline && (
            <p className="font-display italic text-xl md:text-3xl text-fg-muted max-w-3xl mt-6 leading-relaxed">
              {project.subheadline}
            </p>
          )}
        </div>
      </section>

      {/* Main Narrative Sections */}
      <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-border bg-bg-soft/20">
        <div className="max-w-[1600px] mx-auto">
          {/* Main Media Showcase */}
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
            <div className="aspect-[21/9] w-full rounded bg-bg overflow-hidden border border-border shadow-2xl mb-24">
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            </div>
          ) : null}

          {/* Narrative Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Overview Left Side */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-10">
              <div>
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-4">
                  Suporte / Formato
                </h3>
                <p className="text-sm text-fg font-light">{project.format || "—"}</p>
              </div>

              {project.duration && (
                <div>
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-4">
                    Cronograma / Duração
                  </h3>
                  <p className="text-sm text-fg font-light">{project.duration}</p>
                </div>
              )}

              {creditsList.length > 0 && (
                <div>
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-4">
                    Ficha Técnica / Créditos
                  </h3>
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
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-4">
                    Reconhecimento / Prêmios
                  </h3>
                  <ul className="space-y-2">
                    {awardsList.map((award, i) => (
                      <li key={i} className="text-xs text-accent flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Deep Narrative Right Side */}
            <div className="lg:col-span-8 space-y-16">
              {/* Contexto */}
              {project.context && (
                <div className="space-y-4">
                  <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono">
                    01 · Contexto & Cenário
                  </h4>
                  <p className="font-display text-3xl md:text-4xl text-fg leading-relaxed">
                    {project.context}
                  </p>
                </div>
              )}

              {/* Desafio */}
              {project.challenge && (
                <div className="space-y-4 pt-8 border-t border-border">
                  <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono">
                    02 · O Desafio
                  </h4>
                  <p className="text-base md:text-lg text-fg-muted leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* Solução */}
              {project.solution && (
                <div className="space-y-4 pt-8 border-t border-border">
                  <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono">
                    03 · A Resolução Estratégica
                  </h4>
                  <p className="text-base md:text-lg text-fg-muted leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Resultado */}
              {project.result && (
                <div className="space-y-4 pt-8 border-t border-border">
                  <h4 className="text-[11px] tracking-[0.35em] uppercase text-accent font-mono">
                    04 · Impacto & Resultado
                  </h4>
                  <p className="font-display text-2xl md:text-3xl text-fg italic leading-relaxed">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image / Video Gallery Grid (Momento 3 Stills) */}
      {stillsList.length > 0 && (
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-border bg-bg">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-16">
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-mono">
                Exposição de Ativos
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-fg mt-2">
                Ativos de Marca & Interfaces
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {stillsList.map((still, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded bg-bg-soft border border-border group shadow-lg ${
                    index % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={still.url}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent pointer-events-none" />
                  <span className="absolute bottom-6 left-6 text-[10px] tracking-[0.25em] uppercase text-fg/80 font-mono bg-bg/85 px-3 py-1.5 rounded-full border border-border-light">
                    {still.type === "branding" ? "Ativo de Identidade" : still.type === "component" ? "Componente de UI" : "Tela do Produto"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Next Project Curated Gate */}
      {nextProject && (
        <section className="relative py-36 md:py-48 px-6 md:px-12 lg:px-16 border-t border-border bg-bg-card flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-mono">
              Próxima Obra
            </span>
            <Link href={`/work/${nextProject.slug}`} className="group block mt-8">
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-fg tracking-tight hover:text-accent transition-colors duration-500">
                {nextProject.title}
              </h2>
              <p className="text-sm text-fg-muted mt-4 font-mono tracking-wider uppercase group-hover:text-fg transition-colors">
                Ver Exposição <ArrowUpRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative border-t border-border py-12 px-6 md:px-12 lg:px-16 bg-bg">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-[0.25em] uppercase font-mono text-fg-dim">
          <p>© 2025 DOMI.N.ARTE · ASSINATURA CRIATIVA</p>
          <Link href="/" className="hover:text-fg transition-colors">
            Voltar ao Início
          </Link>
        </div>
      </footer>
    </main>
  );
}
