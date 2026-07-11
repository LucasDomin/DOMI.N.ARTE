"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Full-bleed section divider with a large number that moves on scroll.
// Creates the feeling of a magazine turning pages — not a website scrolling.

export default function SectionTransition({ number, label }: { number: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const numX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const numOp = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const lineW = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <div ref={ref} className="relative h-32 md:h-44 overflow-hidden border-t border-border/30 select-none pointer-events-none flex items-center">
      {/* Moving number */}
      <motion.span
        style={{ x: numX, opacity: numOp }}
        className="absolute left-6 md:left-12 font-display text-[clamp(5rem,14vw,12rem)] leading-none tracking-[-0.05em] text-fg/[0.06]"
      >
        {number}
      </motion.span>

      {/* Label */}
      <motion.span
        style={{ opacity: numOp }}
        className="absolute right-6 md:right-12 font-mono text-[9px] tracking-[0.5em] uppercase text-fg-muted"
      >
        {label}
      </motion.span>

      {/* Animated line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-accent/30 origin-left"
        style={{ scaleX: lineW, width: "100%" }}
      />
    </div>
  );
}
