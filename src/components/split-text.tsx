"use client";

// Text that reveals line by line via clip-path — not opacity fade.
// Each line has a mask that opens from bottom to top on scroll.
// This is the difference between "animated website" and "editorial experience".

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitLine({ text, className = "", delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 40%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <div ref={ref} className="overflow-hidden leading-none" style={{ marginBottom: "0.05em" }}>
      <motion.div style={{ y }} transition={{ delay }} className={className}>
        {text}
      </motion.div>
    </div>
  );
}

// Multi-line version: splits on \n
export function SplitLines({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div>
      {lines.map((line, i) => (
        <SplitLine key={i} text={line} className={className} delay={i * 0.06} />
      ))}
    </div>
  );
}
