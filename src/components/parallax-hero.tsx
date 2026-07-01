"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Sub-scene components ──────────────────────────────────────────────────────

function SceneLabel({
  index,
  tag,
  title,
  body,
  align = "left",
  opacity,
}: {
  index: string;
  tag: string;
  title: string;
  body: string;
  align?: "left" | "right";
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity }}
      className={`absolute top-1/2 -translate-y-1/2 max-w-[320px] pointer-events-none z-30 
        ${align === "left" ? "left-8 md:left-16" : "right-8 md:right-16 text-right"}`}
    >
      <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent mb-5">
        {index} / {tag}
      </p>
      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.9] tracking-[-0.03em] text-fg mb-6">
        {title}
      </h2>
      <p className="text-[11px] md:text-xs text-fg-muted leading-relaxed font-light">
        {body}
      </p>
    </motion.div>
  );
}

// Scene 1: Identity DNA — pure geometry dissolving
function Scene1({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 0.35], [1, 0.55]);
  const opacity = useTransform(progress, [0, 0.28, 0.38], [1, 1, 0]);
  const rotate = useTransform(progress, [0, 0.35], [0, 90]);
  // SVG stroke animation via correct approach (pathLength)
  const ringStroke = useTransform(progress, [0, 0.3], [1, 0]);
  const innerOpacity = useTransform(progress, [0, 0.15, 0.3], [0, 1, 0.3]);

  return (
    <motion.div
      style={{ scale, rotate, opacity }}
      className="absolute z-20 pointer-events-none flex items-center justify-center"
    >
      <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer orbital ring */}
          <motion.circle
            cx="180" cy="180" r="160"
            stroke="rgba(201,165,108,0.15)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            style={{ pathLength: ringStroke }}
          />
          <motion.circle
            cx="180" cy="180" r="120"
            stroke="rgba(201,165,108,0.25)"
            strokeWidth="0.75"
            style={{ pathLength: ringStroke }}
          />
          <motion.circle
            cx="180" cy="180" r="80"
            stroke="rgba(201,165,108,0.4)"
            strokeWidth="1"
            style={{ pathLength: ringStroke }}
          />

          {/* Cross-hairs */}
          <motion.line
            x1="180" y1="20" x2="180" y2="340"
            stroke="rgba(201,165,108,0.2)" strokeWidth="0.5"
            style={{ pathLength: ringStroke }}
          />
          <motion.line
            x1="20" y1="180" x2="340" y2="180"
            stroke="rgba(201,165,108,0.2)" strokeWidth="0.5"
            style={{ pathLength: ringStroke }}
          />
          <motion.line
            x1="67" y1="67" x2="293" y2="293"
            stroke="rgba(201,165,108,0.12)" strokeWidth="0.5"
            style={{ pathLength: ringStroke }}
          />
          <motion.line
            x1="293" y1="67" x2="67" y2="293"
            stroke="rgba(201,165,108,0.12)" strokeWidth="0.5"
            style={{ pathLength: ringStroke }}
          />

          {/* Hexagon */}
          <motion.polygon
            points="180,60 246,100 246,180 180,220 114,180 114,100"
            stroke="rgba(201,165,108,0.5)"
            strokeWidth="1"
            fill="none"
            style={{ pathLength: ringStroke }}
          />

          {/* Inner detail */}
          <motion.g style={{ opacity: innerOpacity }}>
            <circle cx="180" cy="180" r="6" fill="rgba(201,165,108,0.9)" />
            <circle cx="180" cy="60" r="3" fill="rgba(201,165,108,0.4)" />
            <circle cx="246" cy="100" r="3" fill="rgba(201,165,108,0.4)" />
            <circle cx="246" cy="180" r="3" fill="rgba(201,165,108,0.4)" />
            <circle cx="180" cy="220" r="3" fill="rgba(201,165,108,0.4)" />
            <circle cx="114" cy="180" r="3" fill="rgba(201,165,108,0.4)" />
            <circle cx="114" cy="100" r="3" fill="rgba(201,165,108,0.4)" />
          </motion.g>

          {/* Coordinate label */}
          <text
            x="180" y="310"
            textAnchor="middle"
            fill="rgba(201,165,108,0.3)"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="4"
          >
            ID_GENESIS · 2025
          </text>
        </svg>

        {/* Pulsing core glow */}
        <div className="absolute w-3 h-3 rounded-full bg-accent/80 animate-ping" />
        <div className="absolute w-3 h-3 rounded-full bg-accent" />
      </div>
    </motion.div>
  );
}

// Scene 2: Floating UI components fragmenting outward
function Scene2({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.22, 0.32, 0.62, 0.7], [0, 1, 1, 0]);

  const a_y = useTransform(progress, [0.25, 0.65], [120, -120]);
  const a_x = useTransform(progress, [0.25, 0.65], [-160, -280]);

  const b_y = useTransform(progress, [0.25, 0.65], [-100, 100]);
  const b_x = useTransform(progress, [0.25, 0.65], [140, 260]);

  const c_y = useTransform(progress, [0.25, 0.65], [160, -80]);
  const c_x = useTransform(progress, [0.25, 0.65], [200, 80]);

  const d_y = useTransform(progress, [0.25, 0.65], [-140, 60]);
  const d_x = useTransform(progress, [0.25, 0.65], [-200, -100]);

  const cardRotA = useTransform(progress, [0.25, 0.65], [-3, 2]);
  const cardRotB = useTransform(progress, [0.25, 0.65], [2, -4]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
      {/* Card A: color swatch */}
      <motion.div style={{ x: a_x, y: a_y, rotate: cardRotA }} className="absolute">
        <div className="w-52 p-4 rounded-lg bg-bg-card border border-border-light shadow-xl">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-fg-dim mb-3">Paleta Principal</p>
          <div className="flex gap-2">
            {["#0A0908", "#C9A56C", "#F5F2EC", "#1E1B17", "#8B8580"].map((c, i) => (
              <div key={i} className="flex-1 rounded" style={{ height: 32, background: c, border: "0.5px solid rgba(255,255,255,0.1)" }} />
            ))}
          </div>
          <p className="font-mono text-[9px] text-accent mt-2">Warm · Cinematic · Authorial</p>
        </div>
      </motion.div>

      {/* Card B: type specimen */}
      <motion.div style={{ x: b_x, y: b_y, rotate: cardRotB }} className="absolute">
        <div className="w-56 p-4 rounded-lg bg-bg-card border border-border-light shadow-xl overflow-hidden">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-fg-dim mb-2">Tipografia</p>
          <p className="font-display text-3xl text-fg leading-tight tracking-tight">Aa</p>
          <p className="font-mono text-[10px] text-fg-muted mt-1">Instrument Serif · Inter · JetBrains</p>
        </div>
      </motion.div>

      {/* Card C: grid wireframe */}
      <motion.div style={{ x: c_x, y: c_y }} className="absolute">
        <div className="w-44 h-32 rounded-lg border border-dashed border-accent/30 bg-bg-soft/60 p-3 flex flex-col gap-2 shadow-xl">
          <div className="h-3 w-2/3 bg-accent/20 rounded" />
          <div className="flex gap-1.5 flex-1">
            {[1,2,3].map(i => (
              <div key={i} className="flex-1 rounded border border-border-light/50 border-dashed" />
            ))}
          </div>
          <div className="h-2 w-full bg-border-light rounded" />
        </div>
      </motion.div>

      {/* Card D: metric */}
      <motion.div style={{ x: d_x, y: d_y }} className="absolute">
        <div className="w-36 p-3 rounded-lg bg-bg-card border border-accent/20 shadow-xl">
          <p className="font-mono text-[9px] text-fg-dim uppercase tracking-widest">Conversão</p>
          <p className="font-display text-2xl text-accent mt-1">94%</p>
          <div className="mt-2 h-0.5 w-full bg-border rounded overflow-hidden">
            <div className="h-full w-[94%] bg-accent rounded" />
          </div>
        </div>
      </motion.div>

      {/* Center crosshair */}
      <div className="absolute w-3 h-3 border border-accent/40 rotate-45" />
    </motion.div>
  );
}

// Scene 3: Final — the editorial platform assembled
function Scene3({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.6, 0.75, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.6, 0.8], [60, 0]);
  const rotX = useTransform(progress, [0.6, 0.85], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y, rotateX: rotX, perspective: "1200px" }}
      className="absolute z-20 w-full max-w-3xl px-6 pointer-events-none"
    >
      {/* Platform preview — editorial interface */}
      <div
        className="w-full rounded-xl border border-accent/20 bg-bg-card shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_0.5px_rgba(201,165,108,0.15)]"
        style={{ background: "linear-gradient(135deg, #161412 0%, #0A0908 100%)" }}
      >
        {/* Nav bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <span className="font-display text-sm text-fg">DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE</span>
          <div className="flex items-center gap-3">
            {["Galeria", "Manifesto", "Contato"].map(s => (
              <span key={s} className="font-mono text-[9px] tracking-widest uppercase text-fg-dim">{s}</span>
            ))}
          </div>
          <div className="w-6 h-px bg-accent" />
        </div>

        {/* Hero area */}
        <div className="px-6 pt-8 pb-6">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-accent mb-3">Obra 01 · Branding</p>
          <h3 className="font-display text-[clamp(1.5rem,4vw,3rem)] leading-none tracking-tight text-fg mb-4">
            Identidade para<br />
            <em>marcas que lideram</em>
          </h3>
          <div className="w-full h-28 rounded-lg bg-bg-soft border border-border flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-accent/60" />
            </div>
          </div>
        </div>

        {/* Work strip */}
        <div className="grid grid-cols-3 gap-px border-t border-border overflow-hidden rounded-b-xl">
          {["Branding", "Motion", "Editorial"].map((cat, i) => (
            <div key={cat} className="px-4 py-3 bg-bg-soft/40">
              <p className="font-mono text-[8px] tracking-widest uppercase text-fg-dim mb-1">{cat}</p>
              <div className="h-1.5 w-full bg-border rounded overflow-hidden">
                <div
                  className="h-full bg-accent/60 rounded"
                  style={{ width: `${[72, 55, 88][i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Progress dots (extracted to avoid hooks-in-loop) ─────────────────────────
function ProgressDot({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const opacity = useTransform(progress, (v) => {
    if (index === 0) return v < 0.33 ? 1 : 0.25;
    if (index === 1) return v >= 0.33 && v < 0.66 ? 1 : 0.25;
    return v >= 0.66 ? 1 : 0.25;
  });
  const height = useTransform(progress, (v) => {
    if (index === 0) return v < 0.33 ? 24 : 12;
    if (index === 1) return v >= 0.33 && v < 0.66 ? 24 : 12;
    return v >= 0.66 ? 24 : 12;
  });
  return <motion.div style={{ opacity, height }} className="w-px bg-accent" />;
}

function ProgressDots({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-40">
      {[0, 1, 2].map((i) => <ProgressDot key={i} progress={progress} index={i} />)}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.6,
  });

  // Scene text opacities
  const text1 = useTransform(progress, [0, 0.15, 0.28], [1, 1, 0]);
  const text2 = useTransform(progress, [0.28, 0.38, 0.58, 0.66], [0, 1, 1, 0]);
  const text3 = useTransform(progress, [0.66, 0.78, 1], [0, 1, 1]);

  // Background glow intensity
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.08, 0.04, 0.18]);
  const glowScale = useTransform(progress, [0, 1], [1, 1.4]);

  // Scroll indicator
  const indicatorOpacity = useTransform(progress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-bg">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Background ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ scale: glowScale, opacity: glowOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,165,108,1) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Blueprint grid — very subtle */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,165,108,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,108,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Scene 1 */}
        <Scene1 progress={progress} />

        {/* Scene 2 */}
        <Scene2 progress={progress} />

        {/* Scene 3 */}
        <Scene3 progress={progress} />

        {/* Scene labels */}
        <SceneLabel
          index="01"
          tag="DNA"
          title="A Gênese da Identidade"
          body="Toda marca começa como código geométrico puro. Desenhamos o sistema original — DNA estruturado sobre contrastes e proporções absolutas."
          align="left"
          opacity={text1}
        />
        <SceneLabel
          index="02"
          tag="Sistema"
          title="A Linguagem Visual"
          body="O DNA fragmenta-se em elementos de interface. Tipografia, grade, paleta e micro-interações unificados sob uma única assinatura."
          align="right"
          opacity={text2}
        />
        <SceneLabel
          index="03"
          tag="Plataforma"
          title="A Experiência Final"
          body="A conclusão inevitável: marca integrada ao produto. Editorial digital autoral onde cada obra é uma experiência própria."
          align="left"
          opacity={text3}
        />

        {/* Progress indicator — right side vertical */}
        <ProgressDots progress={progress} />

        {/* Scroll prompt */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-40"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-accent/60 to-transparent animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg-dim">Scroll</span>
        </motion.div>
      </div>
    </div>
  );
}
