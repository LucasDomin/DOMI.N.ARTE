"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  // 1. SEQUENCE 1: DNA (Branding / Identity) — 0% to 30%
  // The emblem starts massive, scales down, untangles, and lines start floating
  const emblemScale = useTransform(smoothScroll, [0, 0.3], [1.3, 0.5]);
  const emblemRotate = useTransform(smoothScroll, [0, 0.35], [0, 180]);
  const emblemOpacity = useTransform(smoothScroll, [0, 0.28, 0.38], [1, 0.9, 0]);
  
  // Dissolving specific components of the vector logo
  const circleRadius = useTransform(smoothScroll, [0, 0.3], [60, 140]);
  const innerGridGap = useTransform(smoothScroll, [0, 0.3], [1, 40]);
  const linesLength = useTransform(smoothScroll, [0, 0.25], [1, 0]);

  // 2. SEQUENCE 2: TRANSMISSION (Web Layout Componentization) — 25% to 65%
  // The shattered geometric elements turn into wireframe web elements floating
  const webOpacity = useTransform(smoothScroll, [0.22, 0.32, 0.62, 0.7], [0, 1, 1, 0]);
  const webScale = useTransform(smoothScroll, [0.22, 0.32, 0.62, 0.7], [0.8, 1, 1, 0.9]);
  
  // Floating components with different parallax speeds (y transforms)
  const buttonY = useTransform(smoothScroll, [0.25, 0.65], [180, -180]);
  const buttonX = useTransform(smoothScroll, [0.25, 0.65], [-120, -320]);
  
  const codeY = useTransform(smoothScroll, [0.25, 0.65], [-150, 150]);
  const codeX = useTransform(smoothScroll, [0.25, 0.65], [150, 320]);

  const gridY = useTransform(smoothScroll, [0.25, 0.65], [220, -100]);
  const gridX = useTransform(smoothScroll, [0.25, 0.65], [260, 120]);

  const sliderY = useTransform(smoothScroll, [0.25, 0.65], [-200, 80]);
  const sliderX = useTransform(smoothScroll, [0.25, 0.65], [-260, -140]);

  // 3. SEQUENCE 3: SAAS / PRODUCT — 60% to 100%
  // The floating wireframes assemble into a real, glowing, perspective 3D mockup
  const productOpacity = useTransform(smoothScroll, [0.58, 0.72, 1], [0, 1, 1]);
  const productScale = useTransform(smoothScroll, [0.58, 0.72, 1], [0.75, 1, 1]);
  const productRotateX = useTransform(smoothScroll, [0.6, 0.85], [25, 0]);
  const productRotateY = useTransform(smoothScroll, [0.6, 0.85], [-15, 0]);
  const productY = useTransform(smoothScroll, [0.6, 0.85], [120, 0]);

  // General background progression (Monochrome -> Neon Golden Glow)
  const bgGlowOpacity = useTransform(smoothScroll, [0, 0.5, 1], [0.15, 0.05, 0.45]);
  const bgGlowScale = useTransform(smoothScroll, [0, 1], [1, 1.3]);

  // Explanatory texts for the sequence
  const step1TextOpacity = useTransform(smoothScroll, [0, 0.15, 0.25], [1, 1, 0]);
  const step2TextOpacity = useTransform(smoothScroll, [0.28, 0.38, 0.58, 0.65], [0, 1, 1, 0]);
  const step3TextOpacity = useTransform(smoothScroll, [0.68, 0.78, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#030202]">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Dynamic Space Background & Grids */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{ scale: bgGlowScale }}
        >
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(201, 165, 108, ${bgGlowOpacity.get() * 0.4}) 0%, transparent 60%)`,
              opacity: bgGlowOpacity
            }}
          />
          <div className="absolute inset-0 noise-bg opacity-[0.03]" />
          {/* Scientific blueprint coordinate lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} />
        </motion.div>

        {/* SEQUENCE 1: DNA (0% - 30%) */}
        <motion.div
          style={{
            scale: emblemScale,
            rotate: emblemRotate,
            opacity: emblemOpacity,
          }}
          className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Highly intricate geometric emblem representing brand DNA */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Outer blueprint ring */}
            <motion.div 
              style={{ width: circleRadius, height: circleRadius }}
              className="absolute rounded-full border border-accent/25 border-dashed"
            />
            
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" className="text-accent">
              {/* Outer matrix nodes */}
              <motion.circle cx="110" cy="110" r="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <motion.circle cx="110" cy="110" r="70" stroke="currentColor" strokeWidth="0.75" />
              
              {/* Shattering crosshairs */}
              <motion.line x1="110" y1="10" x2="110" y2="210" stroke="currentColor" strokeWidth="0.5" style={{ strokeDashoffset: linesLength }} />
              <motion.line x1="10" y1="110" x2="210" y2="110" stroke="currentColor" strokeWidth="0.5" style={{ strokeDashoffset: linesLength }} />
              
              {/* Hexagon core */}
              <polygon points="110,50 162,80 162,140 110,170 58,140 58,80" stroke="currentColor" strokeWidth="1" strokeDasharray={`${innerGridGap.get()}`} />
              
              {/* Core golden node */}
              <circle cx="110" cy="110" r="12" fill="currentColor" className="animate-pulse" />
            </svg>
            
            {/* Monospace coordinates */}
            <span className="absolute bottom-2 text-[9px] font-mono text-accent/50 tracking-[0.3em]">
              SYS.DNA_GENESIS.v2025
            </span>
          </div>
        </motion.div>

        {/* SEQUENCE 2: TRANSMISSION / COMPONENT MORPH (25% - 65%) */}
        <motion.div
          style={{ opacity: webOpacity, scale: webScale }}
          className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
        >
          {/* Component 1: Action vector */}
          <motion.div style={{ x: buttonX, y: buttonY }} className="absolute">
            <div className="px-6 py-3 rounded-md bg-bg-card border border-accent/30 text-accent font-mono text-[10px] tracking-widest flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span>BTN.EXECUTE_ACTION</span>
              <span className="text-fg-dim">#001</span>
            </div>
          </motion.div>

          {/* Component 2: Scientific matrix coordinates */}
          <motion.div style={{ x: codeX, y: codeY }} className="absolute">
            <div className="w-64 p-4 rounded-lg bg-bg-soft border border-border-light font-mono text-[9px] leading-relaxed text-fg-muted">
              <div className="text-accent mb-1">// TRANSMITTING PROTOCOL</div>
              <div><span className="text-fg-dim">const</span> genesis = dna.morph();</div>
              <div>grid.apply(genesis.geometry);</div>
              <div className="text-emerald-400 mt-2">STATUS: COMPILING_INTERFACE</div>
            </div>
          </motion.div>

          {/* Component 3: Layout mesh */}
          <motion.div style={{ x: gridX, y: gridY }} className="absolute">
            <div className="w-48 h-32 rounded-lg border border-border bg-bg-soft/40 p-3 flex flex-col justify-between">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent/40" />
                <div className="w-12 h-2 bg-border-light rounded" />
              </div>
              <div className="grid grid-cols-3 gap-1.5 h-12">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded border border-border-light border-dashed bg-bg/40" />
                ))}
              </div>
              <div className="h-1.5 w-full bg-border-light rounded" />
            </div>
          </motion.div>

          {/* Component 4: Metric slider */}
          <motion.div style={{ x: sliderX, y: sliderY }} className="absolute">
            <div className="w-40 p-3 rounded-lg border border-accent/20 bg-bg-card flex flex-col gap-2">
              <span className="text-[8px] font-mono text-fg-dim uppercase tracking-wider">Scale Factor</span>
              <div className="h-1 w-full bg-border-light rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-[70%] bg-accent rounded-full" />
                <div className="absolute left-[70%] -top-1 w-3 h-3 rounded-full bg-accent" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* SEQUENCE 3: HIGH-FIDELITY PRODUCT REVELATION (60% - 100%) */}
        <motion.div
          style={{
            opacity: productOpacity,
            scale: productScale,
            rotateX: productRotateX,
            rotateY: productRotateY,
            y: productY,
          }}
          className="absolute z-20 w-full max-w-4xl px-6 flex flex-col items-center justify-center perspective-1000"
        >
          {/* Beautiful floating 3D perspective dashboard screen representing the SaaS product */}
          <div className="w-full rounded-2xl border border-accent/30 bg-bg-card p-4 md:p-6 shadow-[0_32px_90px_rgba(201,165,108,0.1)]">
            {/* Browser top-bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-light" />
                <div className="w-2.5 h-2.5 rounded-full bg-border-light" />
                <span className="text-[10px] text-fg-dim font-mono ml-3 uppercase tracking-widest">
                  sys.dashboard_active_v1
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-accent-soft text-[9px] text-accent font-mono uppercase tracking-widest">
                LIVE PRODUCTION
              </span>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 space-y-4">
                {/* Graph */}
                <div className="p-4 rounded-xl bg-bg border border-border h-48 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-fg-muted tracking-wider uppercase font-mono">
                    <span>Performance Matrix</span>
                    <span className="text-accent">99.2 FPS</span>
                  </div>
                  <div className="h-28 flex items-end gap-1.5 pt-4">
                    {[35, 60, 42, 85, 55, 90, 75, 95, 68, 80].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded bg-gradient-to-t from-accent/30 to-accent"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-bg border border-border">
                    <span className="text-[9px] text-fg-dim uppercase tracking-wider font-mono">Total Nodes</span>
                    <div className="text-xl font-bold font-display text-fg mt-1">1,240</div>
                  </div>
                  <div className="p-4 rounded-xl bg-bg border border-border">
                    <span className="text-[9px] text-fg-dim uppercase tracking-wider font-mono">Latency</span>
                    <div className="text-xl font-bold font-display text-accent mt-1">1.2ms</div>
                  </div>
                </div>
              </div>

              {/* Sidebar metrics */}
              <div className="md:col-span-4 space-y-4">
                <div className="p-4 rounded-xl bg-bg border border-border space-y-3">
                  <div className="text-[10px] text-fg-dim uppercase tracking-wider font-mono">Active Systems</div>
                  {[
                    { label: "Identity Grid", val: "Active" },
                    { label: "WebGL Prism", val: "Compiling" },
                    { label: "SaaS API Sync", val: "Sync" },
                  ].map((sys, i) => (
                    <div key={i} className="flex items-center justify-between text-xs pb-1.5 border-b border-border-light last:border-0 last:pb-0">
                      <span className="text-fg-muted font-light">{sys.label}</span>
                      <span className="text-[10px] font-mono text-accent">{sys.val}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-accent text-bg flex flex-col justify-between h-32">
                  <span className="text-[10px] text-bg/60 uppercase tracking-widest font-mono">Deployment</span>
                  <div>
                    <div className="font-display text-3xl font-black leading-none">Ready</div>
                    <p className="text-[10px] text-bg/80 mt-1 font-mono uppercase tracking-wider">Ready to distribute</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SEQUENTIAL EXPLANATORY FLOATING LABELS (On Left/Right sides) */}
        {/* Step 1: Branding */}
        <motion.div
          style={{ opacity: step1TextOpacity }}
          className="absolute left-6 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 max-w-sm pointer-events-none z-30"
        >
          <span className="text-accent text-xs font-mono tracking-[0.4em] uppercase block mb-3">01 // DNA</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-fg leading-none">
            A Gênese da Identidade
          </h2>
          <p className="text-xs md:text-sm text-fg-muted leading-relaxed font-light mt-4">
            Toda marca começa como um código geométrico elementar. Desenhamos o sistema original — o DNA estruturado sobre contrastes e proporções puras.
          </p>
        </motion.div>

        {/* Step 2: Web */}
        <motion.div
          style={{ opacity: step2TextOpacity }}
          className="absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 max-w-sm pointer-events-none z-30 text-left md:text-right"
        >
          <span className="text-accent text-xs font-mono tracking-[0.4em] uppercase block mb-3">02 // EVOLUTION</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-fg leading-none">
            A Conversão Web
          </h2>
          <p className="text-xs md:text-sm text-fg-muted leading-relaxed font-light mt-4 md:ml-auto">
            O DNA se fragmenta em preceitos de interface. Transformamos a linguagem visual em grades flutuantes, tipografia severa e micro-interações em Next.js.
          </p>
        </motion.div>

        {/* Step 3: SaaS / Product */}
        <motion.div
          style={{ opacity: step3TextOpacity }}
          className="absolute left-6 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 max-w-sm pointer-events-none z-30"
        >
          <span className="text-accent text-xs font-mono tracking-[0.4em] uppercase block mb-3">03 // PRODUCT</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-fg leading-none">
            O Produto SaaS
          </h2>
          <p className="text-xs md:text-sm text-fg-muted leading-relaxed font-light mt-4">
            A conclusão inevitável: a marca integrada ao ecossistema final. Painéis, dashboards e sistemas de alta performance unificados sob a mesma assinatura.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
