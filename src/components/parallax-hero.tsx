"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Scene label — always readable, always in front ───────────────────────────
// Rule: text never competes with visuals. Each scene has its own vertical zone.
// Text lives at top-third, visual at center, breathing room enforced.

function SceneLabel({
  num, tag, title, body, align = "left", opacity,
}: {
  num: string; tag: string; title: string; body: string;
  align?: "left" | "right"; opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity }}
      className={`absolute z-30 pointer-events-none top-16 md:top-20
        ${align === "left" ? "left-6 md:left-14 lg:left-20 max-w-[280px] md:max-w-[360px]" : "right-6 md:right-14 lg:right-20 max-w-[280px] md:max-w-[360px] text-right"}`}
    >
      <div className={`flex items-center gap-3 mb-5 ${align === "right" ? "justify-end" : ""}`}>
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent">{num}</span>
        <div className="w-8 h-px bg-accent/40" />
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">{tag}</span>
      </div>
      <h2 className="font-display text-[clamp(2.2rem,4vw,4rem)] leading-[0.88] tracking-[-0.03em] text-fg mb-5">
        {title}
      </h2>
      <p className="text-[11px] text-fg-muted leading-relaxed font-light max-w-xs">
        {body}
      </p>
    </motion.div>
  );
}

// ─── Scene 1: Identity DNA ────────────────────────────────────────────────────
// Purely geometric — no text competing. Visual stays in lower 60% of screen.

function Scene1({ p }: { p: MotionValue<number> }) {
  const scale   = useTransform(p, [0, 0.35], [1.05, 0.5]);
  const opacity = useTransform(p, [0, 0.26, 0.36], [1, 1, 0]);
  const rotate  = useTransform(p, [0, 0.35], [0, 60]);
  const path    = useTransform(p, [0, 0.3], [1, 0]);
  const glow    = useTransform(p, [0, 0.3], [0.12, 0]);

  return (
    <motion.div style={{ scale, rotate, opacity }}
      className="absolute z-10 pointer-events-none flex items-center justify-center mt-16">
      <div className="relative w-[260px] h-[260px] md:w-[380px] md:h-[380px]">
        {/* Ambient glow behind */}
        <motion.div
          style={{ opacity: glow }}
          className="absolute inset-0 rounded-full"
        >
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(201,165,108,0.3) 0%, transparent 70%)" }} />
        </motion.div>
        <svg width="100%" height="100%" viewBox="0 0 380 380" fill="none">
          <motion.circle cx="190" cy="190" r="170" stroke="rgba(201,165,108,0.1)" strokeWidth="0.5" strokeDasharray="3 6" style={{ pathLength: path }} />
          <motion.circle cx="190" cy="190" r="130" stroke="rgba(201,165,108,0.2)" strokeWidth="0.75" style={{ pathLength: path }} />
          <motion.circle cx="190" cy="190" r="90"  stroke="rgba(201,165,108,0.35)" strokeWidth="1" style={{ pathLength: path }} />
          <motion.line x1="190" y1="20" x2="190" y2="360" stroke="rgba(201,165,108,0.15)" strokeWidth="0.5" style={{ pathLength: path }} />
          <motion.line x1="20"  y1="190" x2="360" y2="190" stroke="rgba(201,165,108,0.15)" strokeWidth="0.5" style={{ pathLength: path }} />
          <motion.line x1="80"  y1="80" x2="300" y2="300" stroke="rgba(201,165,108,0.08)" strokeWidth="0.5" style={{ pathLength: path }} />
          <motion.line x1="300" y1="80" x2="80"  y2="300" stroke="rgba(201,165,108,0.08)" strokeWidth="0.5" style={{ pathLength: path }} />
          <motion.polygon points="190,70 252,108 252,188 190,224 128,188 128,108" stroke="rgba(201,165,108,0.5)" strokeWidth="1" fill="none" style={{ pathLength: path }} />
          {/* Vertex nodes */}
          {[[190,70],[252,108],[252,188],[190,224],[128,188],[128,108]].map(([x,y],i) => (
            <motion.circle key={i} cx={x} cy={y} r="3" fill="rgba(201,165,108,0.4)" style={{ opacity: path }} />
          ))}
          <circle cx="190" cy="190" r="5" fill="rgba(201,165,108,0.9)" />
          <circle cx="190" cy="190" r="5" fill="rgba(201,165,108,0.4)" className="animate-ping" />
        </svg>
      </div>
    </motion.div>
  );
}

// ─── Scene 2: Language system fragments ───────────────────────────────────────
// Cards orbit outward from center — high contrast, dark bg on each card

function Scene2({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.22, 0.33, 0.62, 0.70], [0, 1, 1, 0]);
  const aY = useTransform(p, [0.25, 0.65], [100, -100]);
  const aX = useTransform(p, [0.25, 0.65], [-80, -220]);
  const bY = useTransform(p, [0.25, 0.65], [-80, 80]);
  const bX = useTransform(p, [0.25, 0.65], [80, 210]);
  const cY = useTransform(p, [0.25, 0.65], [140, -60]);
  const cX = useTransform(p, [0.25, 0.65], [180, 60]);
  const dY = useTransform(p, [0.25, 0.65], [-120, 50]);
  const dX = useTransform(p, [0.25, 0.65], [-180, -60]);
  const rA = useTransform(p, [0.25, 0.65], [-4, 2]);
  const rB = useTransform(p, [0.25, 0.65], [3, -3]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center mt-16">
      {/* Card A — color palette */}
      <motion.div style={{ x: aX, y: aY, rotate: rA }} className="absolute">
        <div className="w-48 p-4 rounded-xl border border-white/10 shadow-2xl" style={{ background: "#0F0D0B" }}>
          <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-accent/70 mb-3">Paleta Autoral</p>
          <div className="flex gap-1.5 mb-2">
            {["#0A0908","#C9A56C","#F5F2EC","#4A4540","#1E1B17"].map((c,i) => (
              <div key={i} style={{ background: c, border: "0.5px solid rgba(255,255,255,0.08)" }} className="flex-1 h-7 rounded-sm" />
            ))}
          </div>
          <p className="font-mono text-[8px] text-white/30">WARM · CINEMATIC</p>
        </div>
      </motion.div>

      {/* Card B — type */}
      <motion.div style={{ x: bX, y: bY, rotate: rB }} className="absolute">
        <div className="w-44 p-4 rounded-xl border border-white/10 shadow-2xl overflow-hidden" style={{ background: "#0F0D0B" }}>
          <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-accent/70 mb-2">Tipografia</p>
          <p className="font-serif text-4xl text-white leading-none tracking-tight">Aa</p>
          <p className="font-mono text-[8px] text-white/30 mt-2">Instrument Serif</p>
        </div>
      </motion.div>

      {/* Card C — metric */}
      <motion.div style={{ x: cX, y: cY }} className="absolute">
        <div className="w-36 p-4 rounded-xl border border-accent/20 shadow-2xl" style={{ background: "#0F0D0B" }}>
          <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest mb-1">Conversão</p>
          <p className="font-serif text-3xl text-accent mt-1">94%</p>
          <div className="mt-2 h-0.5 w-full rounded overflow-hidden" style={{ background: "#1E1B17" }}>
            <div className="h-full rounded" style={{ width: "94%", background: "#C9A56C" }} />
          </div>
        </div>
      </motion.div>

      {/* Card D — grid */}
      <motion.div style={{ x: dX, y: dY }} className="absolute">
        <div className="w-40 h-28 rounded-xl border border-white/10 shadow-2xl p-3 flex flex-col gap-2" style={{ background: "#0F0D0B" }}>
          <div className="flex gap-1.5 flex-1">
            {[1,2,3].map(i => <div key={i} className="flex-1 rounded-sm border border-dashed border-white/10" />)}
          </div>
          <div className="h-1.5 w-full rounded" style={{ background: "#1E1B17" }} />
          <div className="h-1.5 w-2/3 rounded" style={{ background: "#C9A56C33" }} />
        </div>
      </motion.div>

      {/* Center node */}
      <div className="absolute w-2 h-2 rounded-full border border-accent/60 rotate-45" />
    </motion.div>
  );
}

// ─── Scene 3: Editorial platform reveal ──────────────────────────────────────

function Scene3({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.60, 0.74, 1], [0, 1, 1]);
  const y       = useTransform(p, [0.60, 0.80], [80, 0]);
  const rotX    = useTransform(p, [0.60, 0.85], [22, 0]);

  return (
    <motion.div style={{ opacity, y, rotateX: rotX, perspective: "1200px" }}
      className="absolute z-20 w-full max-w-2xl px-4 md:px-0 pointer-events-none mt-16">
      <div className="w-full rounded-2xl border border-accent/20 shadow-[0_60px_120px_rgba(0,0,0,0.8),0_0_0_0.5px_rgba(201,165,108,0.12)] overflow-hidden"
        style={{ background: "linear-gradient(160deg, #161412 0%, #0A0908 100%)" }}>
        {/* Browser bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-white/25">domi-n-arte.vercel.app</p>
          <div className="w-10 h-px bg-accent/30" />
        </div>
        {/* Nav */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <span className="font-serif text-sm text-white">DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE</span>
          <div className="flex gap-5">
            {["Galeria","Manifesto","Contato"].map(s => (
              <span key={s} className="font-mono text-[8px] tracking-widest uppercase text-white/25">{s}</span>
            ))}
          </div>
        </div>
        {/* Hero */}
        <div className="px-6 py-8">
          <p className="font-mono text-[8px] tracking-[0.5em] uppercase text-accent mb-4">Obra 01 · Branding</p>
          <h3 className="font-serif text-[clamp(1.4rem,3.5vw,2.5rem)] leading-none tracking-tight text-white mb-5">
            Identidade para<br /><em className="text-accent">marcas que lideram</em>
          </h3>
          {/* Faux image */}
          <div className="w-full h-24 rounded-lg border border-white/5 flex items-center justify-center" style={{ background: "#0F0D0B" }}>
            <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent/50" />
            </div>
          </div>
        </div>
        {/* Strip */}
        <div className="grid grid-cols-3 border-t border-white/5">
          {[["Branding","72%"],["Motion","55%"],["Editorial","88%"]].map(([cat,pct]) => (
            <div key={cat} className="px-4 py-3 border-r border-white/5 last:border-r-0">
              <p className="font-mono text-[8px] tracking-widest uppercase text-white/25 mb-1.5">{cat}</p>
              <div className="h-0.5 w-full rounded overflow-hidden" style={{ background: "#1E1B17" }}>
                <div className="h-full rounded bg-accent/60" style={{ width: pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Progress bar — horizontal at bottom ─────────────────────────────────────

function ProgressBar({ p }: { p: MotionValue<number> }) {
  const s1 = useTransform(p, (v) => v < 0.33 ? 1 : 0.25);
  const s2 = useTransform(p, (v) => v >= 0.33 && v < 0.66 ? 1 : 0.25);
  const s3 = useTransform(p, (v) => v >= 0.66 ? 1 : 0.25);
  const labels = [["01","DNA"], ["02","Sistema"], ["03","Plataforma"]];
  const opacities = [s1, s2, s3];

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6">
      {labels.map(([num, label], i) => (
        <motion.div key={num} style={{ opacity: opacities[i] }} className="flex items-center gap-2">
          <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-accent">{num}</span>
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-fg-dim">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.6 });

  const text1 = useTransform(p, [0, 0.18, 0.28], [1, 1, 0]);
  const text2 = useTransform(p, [0.28, 0.38, 0.58, 0.66], [0, 1, 1, 0]);
  const text3 = useTransform(p, [0.66, 0.76, 1], [0, 1, 1]);
  const glowOp = useTransform(p, [0, 0.5, 1], [0.06, 0.03, 0.14]);
  const scrollHint = useTransform(p, [0, 0.06], [1, 0]);

  return (
    <div ref={ref} className="relative h-[500vh] bg-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Ambient glow */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: glowOp }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,165,108,1) 0%, transparent 70%)" }} />
        </motion.div>

        {/* Blueprint grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(rgba(201,165,108,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,108,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* Scenes — visual center */}
        <Scene1 p={p} />
        <Scene2 p={p} />
        <Scene3 p={p} />

        {/* Labels — top zone, never competing with center visuals */}
        <SceneLabel num="01" tag="DNA" align="left" opacity={text1}
          title="A Gênese da Identidade"
          body="Toda marca começa como código geométrico puro. DNA estruturado sobre contrastes e proporções absolutas." />
        <SceneLabel num="02" tag="Sistema" align="right" opacity={text2}
          title="A Linguagem Visual"
          body="O DNA fragmenta-se em elementos de interface. Tipografia, grade, paleta e micro-interações unificados." />
        <SceneLabel num="03" tag="Plataforma" align="left" opacity={text3}
          title="A Experiência Final"
          body="Editorial digital autoral. Cada obra é uma experiência própria com personalidade visual única." />

        {/* Step indicator — bottom */}
        <ProgressBar p={p} />

        {/* Scroll hint */}
        <motion.div style={{ opacity: scrollHint }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 pointer-events-none">
          <motion.div className="w-px h-10 bg-accent/50"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </div>
    </div>
  );
}
