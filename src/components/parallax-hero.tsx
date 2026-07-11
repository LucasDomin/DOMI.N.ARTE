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

// ─── Scene 1: Letterform construction ────────────────────────────────────────
// Narrative: a letter "D" being designed from scratch — the way a type designer
// works. First the grid and baseline appear, then construction lines and circles,
// then the letter stroke itself draws in, finally measurement annotations.
// This directly references identity creation and sets up scenes 2 (system) and 3 (platform).

function Scene1({ p }: { p: MotionValue<number> }) {
  // Scene1: 0→0.46. Letter draws 0.08→0.20, then HOLDS until 0.38, then exits.
  const opacity = useTransform(p, [0, 0.38, 0.46], [1, 1, 0]);
  const scale   = useTransform(p, [0, 0.46], [1, 0.65]);

  const gridOp      = useTransform(p, [0, 0.06], [0, 1]);
  const constructOp = useTransform(p, [0.04, 0.12], [0, 1]);
  const letterPath  = useTransform(p, [0.08, 0.20], [0, 1]); // draws in, then holds
  const annotOp     = useTransform(p, [0.18, 0.28], [0, 1]); // annotations appear after letter complete
  const penOp       = useTransform(p, [0.08, 0.14, 0.20, 0.24], [0, 1, 1, 0]);

  const penX = useTransform(p, [0.08, 0.15, 0.20], [195, 320, 195]);
  const penY = useTransform(p, [0.08, 0.15, 0.20], [80,  220, 360]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute z-10 pointer-events-none flex items-center justify-center mt-16"
    >
      <div className="relative w-[300px] h-[360px] md:w-[400px] md:h-[480px]">
        <svg width="100%" height="100%" viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* ── Layer 1: Typographic grid ── */}
          <motion.g style={{ opacity: gridOp }}>
            {/* Baseline */}
            <line x1="40" y1="380" x2="360" y2="380" stroke="rgba(201,165,108,0.35)" strokeWidth="0.75" />
            {/* Cap height */}
            <line x1="40" y1="80"  x2="360" y2="80"  stroke="rgba(201,165,108,0.25)" strokeWidth="0.5" strokeDasharray="6 4" />
            {/* X-height */}
            <line x1="40" y1="210" x2="360" y2="210" stroke="rgba(201,165,108,0.15)" strokeWidth="0.5" strokeDasharray="3 5" />
            {/* Descender */}
            <line x1="40" y1="420" x2="360" y2="420" stroke="rgba(201,165,108,0.1)"  strokeWidth="0.5" strokeDasharray="2 6" />
            {/* Left margin */}
            <line x1="80"  y1="60" x2="80"  y2="440" stroke="rgba(201,165,108,0.12)" strokeWidth="0.5" strokeDasharray="2 8" />
            {/* Right margin hint */}
            <line x1="320" y1="60" x2="320" y2="440" stroke="rgba(201,165,108,0.08)" strokeWidth="0.5" strokeDasharray="2 8" />

            {/* Grid labels */}
            <text x="42" y="77"  fill="rgba(201,165,108,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="2">CAP</text>
            <text x="42" y="207" fill="rgba(201,165,108,0.3)" fontSize="8" fontFamily="monospace" letterSpacing="2">X</text>
            <text x="42" y="377" fill="rgba(201,165,108,0.5)" fontSize="8" fontFamily="monospace" letterSpacing="2">BASE</text>
          </motion.g>

          {/* ── Layer 2: Construction geometry ── */}
          <motion.g style={{ opacity: constructOp }}>
            {/* Main circle — bowl of the D */}
            <circle cx="200" cy="230" r="150" stroke="rgba(201,165,108,0.12)" strokeWidth="0.75" strokeDasharray="4 4" />
            {/* Inner circle — counter */}
            <circle cx="215" cy="230" r="105" stroke="rgba(201,165,108,0.1)"  strokeWidth="0.5" strokeDasharray="3 5" />
            {/* Optical center axis */}
            <line x1="200" y1="60" x2="200" y2="400" stroke="rgba(201,165,108,0.1)" strokeWidth="0.5" />
            {/* Angle guide — stress axis (calligraphic ~10°) */}
            <line x1="168" y1="80" x2="195" y2="380" stroke="rgba(201,165,108,0.08)" strokeWidth="0.5" strokeDasharray="2 6" />

            {/* Control point nodes */}
            {[
              [80, 80], [80, 380],              // stem top/bottom
              [200, 80], [200, 380],            // top/bottom tangents
              [340, 165], [340, 295],           // right tangents (widest)
              [280, 94], [280, 366],            // upper/lower transitions
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="5" fill="none" stroke="rgba(201,165,108,0.4)" strokeWidth="0.75" />
                <circle cx={cx} cy={cy} r="1.5" fill="rgba(201,165,108,0.6)" />
              </g>
            ))}

            {/* Control handles */}
            <line x1="200" y1="80"  x2="280" y2="94"  stroke="rgba(201,165,108,0.2)" strokeWidth="0.5" />
            <line x1="200" y1="380" x2="280" y2="366" stroke="rgba(201,165,108,0.2)" strokeWidth="0.5" />
            <line x1="280" y1="94"  x2="340" y2="165" stroke="rgba(201,165,108,0.2)" strokeWidth="0.5" />
            <line x1="280" y1="366" x2="340" y2="295" stroke="rgba(201,165,108,0.2)" strokeWidth="0.5" />
          </motion.g>

          {/* ── Layer 3: The letter D stroke — draws in ── */}
          {/* Stem */}
          <motion.line
            x1="80" y1="80" x2="80" y2="380"
            stroke="rgba(245,242,236,0.95)" strokeWidth="28"
            strokeLinecap="round"
            style={{ pathLength: letterPath }}
          />
          {/* Bowl — cubic bezier path */}
          <motion.path
            d="M80,80 L200,80 C310,80 360,150 360,230 C360,310 310,380 200,380 L80,380"
            stroke="rgba(245,242,236,0.95)" strokeWidth="28"
            strokeLinecap="round" strokeLinejoin="round"
            fill="none"
            style={{ pathLength: letterPath }}
          />
          {/* Counter fill — subtle */}
          <motion.path
            d="M108,108 L200,108 C288,108 332,160 332,230 C332,300 288,352 200,352 L108,352 Z"
            fill="rgba(10,9,8,0.85)"
            style={{ opacity: letterPath }}
          />

          {/* ── Layer 4: Measurement annotations ── */}
          <motion.g style={{ opacity: annotOp }}>
            {/* Stem width annotation */}
            <line x1="66" y1="440" x2="94" y2="440" stroke="rgba(201,165,108,0.5)" strokeWidth="0.75" />
            <line x1="66" y1="436" x2="66" y2="444" stroke="rgba(201,165,108,0.5)" strokeWidth="0.75" />
            <line x1="94" y1="436" x2="94" y2="444" stroke="rgba(201,165,108,0.5)" strokeWidth="0.75" />
            <text x="72" y="458" fill="rgba(201,165,108,0.6)" fontSize="7" fontFamily="monospace" letterSpacing="1">28u</text>

            {/* Cap height annotation */}
            <line x1="370" y1="80"  x2="370" y2="380" stroke="rgba(201,165,108,0.3)" strokeWidth="0.75" />
            <line x1="366" y1="80"  x2="374" y2="80"  stroke="rgba(201,165,108,0.3)" strokeWidth="0.75" />
            <line x1="366" y1="380" x2="374" y2="380" stroke="rgba(201,165,108,0.3)" strokeWidth="0.75" />
            <text x="377" y="236" fill="rgba(201,165,108,0.5)" fontSize="7" fontFamily="monospace" letterSpacing="1" transform="rotate(90,377,236)">300u</text>

            {/* Optical weight label */}
            <text x="110" y="238" fill="rgba(201,165,108,0.25)" fontSize="7" fontFamily="monospace" letterSpacing="3">COUNTER</text>

            {/* Glyph ID */}
            <text x="80" y="470" fill="rgba(201,165,108,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="3">D · U+0044 · REGULAR · 1000UPM</text>
          </motion.g>

          {/* ── Pen cursor — moves along the stroke as it draws ── */}
          <motion.g style={{ opacity: penOp }} transform-origin="center">
            <motion.g style={{ x: penX, y: penY }}>
              {/* Pen nib shape */}
              <path d="M0,-10 L4,0 L0,3 L-4,0 Z" fill="rgba(201,165,108,0.9)" />
              <circle cx="0" cy="0" r="2.5" fill="none" stroke="rgba(201,165,108,0.6)" strokeWidth="0.75" />
              {/* Ink dot */}
              <circle cx="0" cy="3" r="1" fill="rgba(201,165,108,1)" />
            </motion.g>
          </motion.g>

        </svg>
      </div>
    </motion.div>
  );
}

// ─── Scene 2: System fragments — emerge from the letterform center ────────────
// Cards start at x:0 y:0 (where the D was) and spread outward.
// Each card starts appearing while letter is still fading — overlap creates
// the feeling that the letter *becomes* the system, not that it disappears.

function Scene2({ p }: { p: MotionValue<number> }) {
  // Staggered entry per card — overlap with Scene1 fade
  // Scene2: 0.42→0.70. Cards emerge from letter center and HOLD in position.
  const aOp = useTransform(p, [0.42, 0.50, 0.66, 0.72], [0, 1, 1, 0]);
  const bOp = useTransform(p, [0.44, 0.52, 0.66, 0.72], [0, 1, 1, 0]);
  const cOp = useTransform(p, [0.46, 0.54, 0.66, 0.72], [0, 1, 1, 0]);
  const dOp = useTransform(p, [0.48, 0.56, 0.66, 0.72], [0, 1, 1, 0]);

  const aX = useTransform(p, [0.42, 0.56], [0, -210]);
  const aY = useTransform(p, [0.42, 0.56], [0, -105]);
  const bX = useTransform(p, [0.44, 0.56], [0,  195]);
  const bY = useTransform(p, [0.44, 0.56], [0, -85]);
  const cX = useTransform(p, [0.46, 0.56], [0,  175]);
  const cY = useTransform(p, [0.46, 0.56], [0,  115]);
  const dX = useTransform(p, [0.48, 0.56], [0, -175]);
  const dY = useTransform(p, [0.48, 0.56], [0,  125]);

  const rA = useTransform(p, [0.42, 0.56], [0, -3]);
  const rB = useTransform(p, [0.44, 0.56], [0,  4]);

  const nodeOp = useTransform(p, [0.42, 0.50, 0.58, 0.68], [0, 1, 1, 0]);
  const nodeS  = useTransform(p, [0.42, 0.50], [0.2, 1]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center mt-16">

      {/* Origin — the letter's core becomes a node */}
      <motion.div
        style={{ opacity: nodeOp, scale: nodeS }}
        className="absolute w-3 h-3 rounded-full bg-accent"
      />
      <motion.div
        style={{ opacity: nodeOp }}
        className="absolute w-8 h-8 rounded-full border border-accent/30"
      />

      {/* Card A — Paleta */}
      <motion.div style={{ x: aX, y: aY, rotate: rA, opacity: aOp }} className="absolute">
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

      {/* Card B — Tipografia */}
      <motion.div style={{ x: bX, y: bY, rotate: rB, opacity: bOp }} className="absolute">
        <div className="w-44 p-4 rounded-xl border border-white/10 shadow-2xl overflow-hidden" style={{ background: "#0F0D0B" }}>
          <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-accent/70 mb-2">Tipografia</p>
          <p className="font-serif text-4xl text-white leading-none tracking-tight">Aa</p>
          <p className="font-mono text-[8px] text-white/30 mt-2">Instrument Serif</p>
        </div>
      </motion.div>

      {/* Card C — Presença */}
      <motion.div style={{ x: cX, y: cY, opacity: cOp }} className="absolute">
        <div className="w-36 p-4 rounded-xl border border-accent/20 shadow-2xl" style={{ background: "#0F0D0B" }}>
          <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest mb-1">Presença</p>
          <p className="font-serif text-3xl text-accent mt-1">∞</p>
          <div className="mt-2 h-0.5 w-full rounded overflow-hidden" style={{ background: "#1E1B17" }}>
            <div className="h-full rounded w-full" style={{ background: "linear-gradient(90deg,#C9A56C,transparent)" }} />
          </div>
        </div>
      </motion.div>

      {/* Card D — Grid */}
      <motion.div style={{ x: dX, y: dY, opacity: dOp }} className="absolute">
        <div className="w-40 h-28 rounded-xl border border-white/10 shadow-2xl p-3 flex flex-col gap-2" style={{ background: "#0F0D0B" }}>
          <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-accent/70 mb-0.5">Grid</p>
          <div className="flex gap-1.5 flex-1">
            {[1,2,3].map(i => <div key={i} className="flex-1 rounded-sm border border-dashed border-white/10" />)}
          </div>
          <div className="h-1 w-full rounded" style={{ background: "#1E1B17" }} />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Scene 3: Editorial platform reveal ──────────────────────────────────────

function Scene3({ p }: { p: MotionValue<number> }) {
  // Scene3: 0.70→1.0. Full hold — platform stays visible to the end.
  const opacity = useTransform(p, [0.70, 0.82, 1], [0, 1, 1]);
  const y       = useTransform(p, [0.70, 0.84], [80, 0]);
  const rotX    = useTransform(p, [0.70, 0.86], [22, 0]);

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
  const s1 = useTransform(p, (v) => v < 0.45 ? 1 : 0.25);
  const s2 = useTransform(p, (v) => v >= 0.45 && v < 0.72 ? 1 : 0.25);
  const s3 = useTransform(p, (v) => v >= 0.72 ? 1 : 0.25);
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

  // Labels match scene timings — each visible while its scene is active
  const text1 = useTransform(p, [0, 0.20, 0.38, 0.46], [1, 1, 1, 0]);
  const text2 = useTransform(p, [0.44, 0.52, 0.64, 0.72], [0, 1, 1, 0]);
  const text3 = useTransform(p, [0.72, 0.82, 1], [0, 1, 1]);
  const glowOp = useTransform(p, [0, 0.5, 1], [0.06, 0.03, 0.14]);
  const scrollHint = useTransform(p, [0, 0.1], [1, 0]);

  return (
    <div ref={ref} className="relative h-[420vh] bg-bg" aria-label="Introdução animada — processo de criação de identidade visual">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" role="presentation" aria-hidden="true">

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
        <SceneLabel num="01" tag="Construção" align="left" opacity={text1}
          title="A Letra que Funda a Marca"
          body="Toda identidade nasce de um gesto. Grid, eixo, peso, contraste — os mesmos princípios do type design são os pilares de uma marca inconfundível." />
        <SceneLabel num="02" tag="Sistema" align="right" opacity={text2}
          title="A Linguagem Visual"
          body="O DNA fragmenta-se em elementos de interface. Tipografia, grade, paleta e micro-interações unificados." />
        <SceneLabel num="03" tag="Plataforma" align="left" opacity={text3}
          title="A Experiência Final"
          body="Editorial digital autoral. Cada obra é uma experiência própria com personalidade visual única." />

        {/* Step indicator — bottom */}
        <ProgressBar p={p} />

        {/* Scroll hint — unmistakable affordance: mouse icon + bouncing chevron + label */}
        <motion.div style={{ opacity: scrollHint }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-40 pointer-events-none">

          {/* Mouse icon with animated scroll wheel dot */}
          <div className="relative w-6 h-10 rounded-full border border-accent/50 flex justify-center pt-2">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-accent"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Bouncing chevron */}
          <motion.svg
            width="14" height="8" viewBox="0 0 14 8" fill="none"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" className="text-accent/70" />
          </motion.svg>

          {/* Explicit label */}
          <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-fg-muted">
            Role para explorar
          </span>
        </motion.div>
      </div>
    </div>
  );
}
