"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const items = {
  identidade: [
    { x: -28, y: -18, blur: 0,   scale: 1.0, content: "A" },
    { x:  24, y: -22, blur: 1,   scale: 0.8, content: "●" },
    { x: -18, y:  20, blur: 2,   scale: 0.6, content: "□" },
    { x:  30, y:  16, blur: 0,   scale: 1.1, content: "∞" },
  ],
  web: [
    { x: -32, y: -14, blur: 0,   scale: 1.0, type: "browser" },
    { x:  26, y: -20, blur: 1,   scale: 0.75, type: "mobile" },
    { x: -22, y:  22, blur: 2,   scale: 0.55, type: "cursor" },
    { x:  28, y:  14, blur: 0,   scale: 0.9, type: "window" },
  ],
  saas: [
    { x: -26, y: -16, blur: 0,   scale: 1.0, type: "chart" },
    { x:  30, y: -18, blur: 1,   scale: 0.7, type: "metric" },
    { x: -20, y:  24, blur: 2,   scale: 0.5, type: "radial" },
    { x:  24, y:  18, blur: 0,   scale: 0.85, type: "bars" },
  ],
};

function WebShape({ type }: { type: string }) {
  if (type === "browser") {
    return (
      <div className="w-48 h-32 md:w-64 md:h-40 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden">
        <div className="h-6 border-b border-[#1f1f1f] flex items-center gap-1.5 px-3">
          <div className="w-2 h-2 rounded-full bg-[#333]" />
          <div className="w-2 h-2 rounded-full bg-[#333]" />
        </div>
        <div className="p-4 space-y-2">
          <div className="h-2 w-2/3 bg-[#1f1f1f] rounded" />
          <div className="h-2 w-1/2 bg-[#1f1f1f] rounded" />
          <div className="mt-3 h-12 rounded-lg bg-gradient-to-r from-accent/20 to-transparent" />
        </div>
      </div>
    );
  }
  if (type === "mobile") {
    return (
      <div className="w-16 h-28 md:w-20 md:h-36 rounded-[18px] border border-[#2a2a2a] bg-[#0a0a0a]/80 p-2">
        <div className="h-full rounded-[12px] bg-[#111] flex flex-col gap-1.5 p-2">
          <div className="h-1.5 w-3/4 bg-[#222] rounded" />
          <div className="h-1.5 w-1/2 bg-[#222] rounded" />
          <div className="mt-auto h-10 rounded bg-accent/15" />
        </div>
      </div>
    );
  }
  if (type === "cursor") {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-fg">
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.44 0 .66-.53.35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <div className="w-40 h-24 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a]/60 p-3">
      <div className="h-1.5 w-16 bg-accent/40 rounded mb-2" />
      <div className="grid grid-cols-3 gap-2 h-12">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded bg-[#161616]" />
        ))}
      </div>
    </div>
  );
}

function SaaSShape({ type }: { type: string }) {
  if (type === "chart") {
    return (
      <div className="w-52 h-36 md:w-72 md:h-44 rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a]/80 p-5">
        <div className="flex items-end justify-between h-full gap-2 pb-2">
          {[35, 55, 40, 75, 50, 85, 65, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-accent/40 to-accent/10"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (type === "metric") {
    return (
      <div className="w-36 h-24 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a]/80 p-4 flex flex-col justify-between">
        <div className="text-[10px] uppercase tracking-[0.2em] text-fg-dim">MRR</div>
        <div className="text-2xl font-black text-fg font-display">$128K</div>
        <div className="text-[10px] text-accent">+24.8%</div>
      </div>
    );
  }
  if (type === "radial") {
    return (
      <div className="w-24 h-24 rounded-full border-4 border-[#1f1f1f] border-t-accent/60 flex items-center justify-center">
        <span className="text-[10px] text-fg-dim font-mono">68%</span>
      </div>
    );
  }
  return (
    <div className="w-44 h-28 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a]/60 p-4 space-y-2">
      <div className="h-1.5 w-full bg-[#1a1a1a] rounded" />
      <div className="h-1.5 w-4/5 bg-[#1a1a1a] rounded" />
      <div className="h-1.5 w-2/3 bg-accent/30 rounded" />
      <div className="h-1.5 w-5/6 bg-[#1a1a1a] rounded" />
    </div>
  );
}

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.8,
  });

  // Hero text
  const heroOpacity = useTransform(smooth, [0, 0.18], [1, 0]);
  const heroY        = useTransform(smooth, [0, 0.18], [0, -90]);
  const heroScale    = useTransform(smooth, [0, 0.18], [1, 0.92]);

  // Identidade section
  const identOpacity = useTransform(smooth, [0.12, 0.22, 0.38, 0.48], [0, 1, 1, 0]);
  const identScale   = useTransform(smooth, [0.12, 0.22, 0.38, 0.48], [0.85, 1, 1, 0.92]);
  const identY       = useTransform(smooth, [0.12, 0.22, 0.38, 0.48], [60, 0, 0, -60]);

  // Web section
  const webOpacity = useTransform(smooth, [0.42, 0.52, 0.68, 0.78], [0, 1, 1, 0]);
  const webScale   = useTransform(smooth, [0.42, 0.52, 0.68, 0.78], [0.85, 1, 1, 0.92]);
  const webY       = useTransform(smooth, [0.42, 0.52, 0.68, 0.78], [60, 0, 0, -60]);

  // SaaS section
  const saasOpacity = useTransform(smooth, [0.72, 0.82, 1], [0, 1, 1]);
  const saasScale   = useTransform(smooth, [0.72, 0.82, 1], [0.85, 1, 1]);
  const saasY       = useTransform(smooth, [0.72, 0.82, 1], [60, 0, 0]);

  // Background depth
  const bgY = useTransform(smooth, [0, 1], ["0%", "30%"]);
  const gridOpacity = useTransform(smooth, [0, 0.5], [0.4, 0.08]);

  // Progress line
  const lineWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg-elevated"
          style={{ y: bgY }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />

        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: gridOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </motion.div>

        {/* Progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border z-50">
          <motion.div className="h-full bg-accent" style={{ width: lineWidth }} />
        </div>

        {/* HERO */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6"
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        >
          <div className="overflow-hidden mb-4">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-fg-dim font-mono"
            >
              Estúdio de Design · 2025
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.85] tracking-[-0.05em] font-display text-fg"
            >
              DOMI
              <span className="text-accent">.</span>N
              <span className="text-accent">.</span>
              ARTE
            </motion.h1>
          </div>

          <div className="overflow-hidden mt-6">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-fg-muted max-w-md mx-auto leading-relaxed"
            >
              Identidade visual, sites e produtos SaaS desenhados como um sistema contínuo.
            </motion.p>
          </div>
        </motion.div>

        {/* IDENTIDADE */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: identOpacity, scale: identScale, y: identY }}
        >
          <div className="relative w-full max-w-6xl h-[60vh] flex items-center justify-center">
            {items.identidade.map((item, i) => (
              <motion.div
                key={i}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${50 + item.x}%`,
                  top: `${50 + item.y}%`,
                  x: "-50%",
                  y: "-50%",
                  filter: `blur(${item.blur}px)`,
                  scale: item.scale,
                }}
              >
                <div
                  className={`text-[12vw] md:text-[8vw] font-black font-display select-none ${
                    item.content === "●" || item.content === "∞"
                      ? "text-accent/30"
                      : item.content === "□"
                      ? "text-stroke text-fg-dim/40"
                      : "text-fg/90"
                  }`}
                >
                  {item.content}
                </div>
              </motion.div>
            ))}
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3 font-mono">01</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight font-display text-fg">
                Identidade Visual
              </h2>
              <p className="mt-3 text-fg-muted text-sm md:text-base max-w-md mx-auto">
                Marcas que traduzem essência em forma, cor e movimento.
              </p>
            </div>
          </div>
        </motion.div>

        {/* WEB */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: webOpacity, scale: webScale, y: webY }}
        >
          <div className="relative w-full max-w-6xl h-[60vh] flex items-center justify-center">
            {items.web.map((item, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${50 + item.x}%`,
                  top: `${50 + item.y}%`,
                  x: "-50%",
                  y: "-50%",
                  filter: `blur(${item.blur}px)`,
                  scale: item.scale,
                }}
              >
                <WebShape type={item.type} />
              </motion.div>
            ))}
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3 font-mono">02</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight font-display text-fg">
                Sites & Páginas
              </h2>
              <p className="mt-3 text-fg-muted text-sm md:text-base max-w-md mx-auto">
                Experiências digitais rápidas, acessíveis e que convertem.
              </p>
            </div>
          </div>
        </motion.div>

        {/* SAAS */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: saasOpacity, scale: saasScale, y: saasY }}
        >
          <div className="relative w-full max-w-6xl h-[60vh] flex items-center justify-center">
            {items.saas.map((item, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${50 + item.x}%`,
                  top: `${50 + item.y}%`,
                  x: "-50%",
                  y: "-50%",
                  filter: `blur(${item.blur}px)`,
                  scale: item.scale,
                }}
              >
                <SaaSShape type={item.type} />
              </motion.div>
            ))}
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3 font-mono">03</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight font-display text-fg">
                SaaS & Produtos
              </h2>
              <p className="mt-3 text-fg-muted text-sm md:text-base max-w-md mx-auto">
                Dashboards e plataformas complexas com UX intuitiva.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
