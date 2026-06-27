"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import ParallaxHero from "@/components/parallax-hero";
import Loader from "@/components/loader";
import { useReveal } from "@/hooks/useReveal";
import { ArrowUpRight, ArrowRight, Palette, Globe, Boxes } from "lucide-react";
import type { Project } from "@/db/schema";

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <span className="text-white font-black text-sm font-display">D</span>
          </div>
          <span className="text-sm font-black tracking-tight text-fg font-display">
            DOMI.N.ARTE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: "Sobre", href: "#sobre" },
            { label: "Frentes", href: "#frentes" },
            { label: "Cases", href: "#cases" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-[12px] tracking-[0.08em] text-fg-muted hover:text-fg transition-colors duration-300"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] uppercase px-5 py-2.5 rounded-full border border-border text-fg hover:border-accent hover:text-accent transition-all duration-300"
        >
          Contato <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.header>
  );
}

function IntroSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="relative py-32 md:py-48 px-6 md:px-10 border-b border-border">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <p className="text-[11px] tracking-[0.4em] uppercase text-accent font-mono mb-6">
              Sobre o Estúdio
            </p>
          </div>
          <div className="lg:col-span-8">
            <p className="reveal text-2xl md:text-3xl lg:text-4xl font-light leading-[1.25] text-fg">
              Criamos <span className="text-accent font-medium">sistemas de design</span> que unem identidade visual, sites de alta performance e produtos SaaS. Cada projeto é uma extensão da marca — não uma peça isolada.
            </p>
            <p className="reveal text-base md:text-lg text-fg-muted mt-8 max-w-2xl leading-relaxed" style={{ transitionDelay: "120ms" }}>
              Trabalhamos com startups e empresas que entendem que design não é decoração, mas infraestrutura competitiva. Da estratégia ao código, entregamos marcas digitais completas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FrentesSection() {
  const ref = useReveal<HTMLDivElement>();

  const frentes = [
    {
      number: "01",
      title: "Identidade Visual",
      description: "Logos, paletas, tipografia, manuais de marca e sistemas visuais completos. Construímos o DNA da marca para que ela se reconheça em qualquer superfície.",
      icon: Palette,
      color: "accent",
    },
    {
      number: "02",
      title: "Sites & Páginas",
      description: "Landing pages, sites institucionais e e-commerces desenvolvidos em Next.js. Performance impecável, SEO otimizado e conversão no centro das decisões.",
      icon: Globe,
      color: "fg",
    },
    {
      number: "03",
      title: "SaaS & Produtos",
      description: "Dashboards, plataformas e aplicativos complexos. Design systems, arquitetura de informação e UX que reduz atrito em produtos de alto volume.",
      icon: Boxes,
      color: "accent",
    },
  ];

  return (
    <section id="frentes" className="relative py-32 md:py-40 px-6 md:px-10">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <p className="reveal text-[11px] tracking-[0.4em] uppercase text-accent font-mono mb-4">
              Frentes de Atuação
            </p>
            <h2 className="reveal text-4xl md:text-6xl lg:text-7xl font-black tracking-tight font-display text-fg" style={{ transitionDelay: "80ms" }}>
              Três frentes.<br />
              <span className="text-fg-dim">Um sistema.</span>
            </h2>
          </div>
          <p className="reveal text-sm text-fg-muted max-w-sm leading-relaxed" style={{ transitionDelay: "160ms" }}>
            Não vendemos entregáveis avulsos. Vendemos continuidade: a mesma marca, a mesma linguagem, do manual ao produto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
          {frentes.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-bg p-8 md:p-10 min-h-[420px] flex flex-col transition-colors duration-500 hover:bg-bg-elevated"
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-fg-dim font-mono">
                    {f.number}
                  </span>
                  <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/10`}>
                    <Icon className={`w-4 h-4 ${f.color === "accent" ? "text-accent" : "text-fg"}`} />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black tracking-tight font-display text-fg mb-4">
                  {f.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed flex-1">
                  {f.description}
                </p>

                <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-fg-dim group-hover:text-accent transition-colors duration-300">
                  Explorar <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  const categoryColors: Record<string, string> = {
    identidade: "text-accent",
    web: "text-fg",
    saas: "text-accent",
  };

  const categoryLabels: Record<string, string> = {
    identidade: "Identidade",
    web: "Web",
    saas: "SaaS",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bg-elevated border border-border mb-6">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-soft">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Boxes className="w-7 h-7 text-accent/40" />
            </div>
          </div>
        )}

        <motion.div
          className="absolute inset-0 bg-bg/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-6"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-3">
            {project.client || "Projeto Independente"} — {project.year || "2025"}
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-fg text-center font-display mb-3">
            {project.title}
          </h3>
          <p className="text-sm text-fg-muted text-center max-w-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-accent font-bold">
            Ver Case <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-fg group-hover:text-accent transition-colors duration-300 font-display">
            {project.title}
          </h3>
          <p className="text-xs text-fg-dim mt-1">
            {project.subtitle || project.client || "Projeto Independente"}
          </p>
        </div>
        <span className={`text-[10px] tracking-[0.2em] uppercase font-mono ${categoryColors[project.category] || "text-fg-dim"}`}>
          {categoryLabels[project.category] || project.category}
        </span>
      </div>
    </motion.article>
  );
}

function CasesSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("todos");
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  const filtered = filter === "todos" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="cases" className="relative py-32 md:py-40 px-6 md:px-10 border-t border-border">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="reveal text-[11px] tracking-[0.4em] uppercase text-accent font-mono mb-4">
              Cases Selecionados
            </p>
            <h2 className="reveal text-4xl md:text-6xl font-black tracking-tight font-display text-fg" style={{ transitionDelay: "80ms" }}>
              Trabalhos <span className="text-fg-dim">recentes</span>
            </h2>
          </div>

          <div className="reveal flex flex-wrap gap-2" style={{ transitionDelay: "160ms" }}>
            {["todos", "identidade", "web", "saas"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-[11px] tracking-[0.1em] uppercase font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-accent text-white"
                    : "bg-transparent text-fg-dim border border-border hover:border-fg-muted hover:text-fg"
                }`}
              >
                {cat === "todos" ? "Todos" : cat === "identidade" ? "Identidade" : cat === "web" ? "Web" : "SaaS"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useReveal<HTMLDivElement>();
  const steps = [
    { num: "01", title: "Discovery", desc: "Imersão no negócio, público e objetivos. Mapeamos o terreno antes de desenhar." },
    { num: "02", title: "Estratégia", desc: "Definimos direção criativa, posicionamento visual e arquitetura do projeto." },
    { num: "03", title: "Design", desc: "Iteramos conceitos, sistemas visuais e interfaces até a solução final." },
    { num: "04", title: "Build", desc: "Implementação em código, handoff para devs e ajustes de performance." },
  ];

  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 border-t border-border">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <p className="reveal text-[11px] tracking-[0.4em] uppercase text-accent font-mono mb-4">
              Como Trabalhamos
            </p>
            <h2 className="reveal text-4xl md:text-5xl font-black tracking-tight font-display text-fg" style={{ transitionDelay: "80ms" }}>
              Processo claro.<br />
              <span className="text-fg-dim">Resultado sólido.</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group grid grid-cols-12 gap-4 py-8 border-b border-border hover:bg-bg-elevated/30 transition-colors duration-300 -mx-4 px-4"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-2xl font-black text-fg-dim/40 font-display group-hover:text-accent/60 transition-colors duration-300">
                      {step.num}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="text-xl md:text-2xl font-black text-fg font-display">{step.title}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-7 md:col-start-6">
                    <p className="text-sm text-fg-muted leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.95, 1]);

  return (
    <section id="contato" className="relative py-40 md:py-56 px-6 md:px-10 border-t border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <motion.div style={{ scale }} className="max-w-5xl mx-auto text-center relative z-10">
        <p className="text-[11px] tracking-[0.4em] uppercase text-accent font-mono mb-8">
          Disponível para novos projetos
        </p>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight font-display text-fg mb-8">
          Vamos criar<br />
          <span className="text-fg-dim">juntos.</span>
        </h2>
        <p className="text-base md:text-lg text-fg-muted max-w-xl mx-auto mb-12 leading-relaxed">
          Se você tem uma marca para construir, um site para lançar ou um produto para escalar, vamos conversar.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:contato@dominiarte.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-white text-sm font-bold tracking-wide hover:bg-accent-hover transition-all duration-300"
          >
            Iniciar Projeto
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#cases"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-fg text-sm font-bold tracking-wide hover:border-fg-muted transition-all duration-300"
          >
            Ver Cases
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-black text-sm font-display">D</span>
            </div>
            <span className="text-sm font-black tracking-tight text-fg font-display">DOMI.N.ARTE</span>
          </Link>

          <div className="flex items-center gap-8 text-xs text-fg-dim">
            <a href="#" className="hover:text-fg transition-colors">Instagram</a>
            <a href="#" className="hover:text-fg transition-colors">Behance</a>
            <a href="#" className="hover:text-fg transition-colors">LinkedIn</a>
            <Link href="/admin" className="hover:text-fg transition-colors">Admin</Link>
          </div>

          <p className="text-xs text-fg-dim">
            © 2025 DOMI.N.ARTE
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  const onLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={onLoaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative bg-bg min-h-screen">
          <div className="grain" />
          <Navigation />
          <ParallaxHero />
          <IntroSection />
          <FrentesSection />
          <CasesSection />
          <ProcessSection />
          <CTASection />
          <Footer />
        </main>
      )}
    </>
  );
}
