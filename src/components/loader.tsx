"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const duration = 2400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExit(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
        >
          <div className="grain" />

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl md:text-3xl tracking-tight text-fg"
          >
            DOMI<span className="text-accent">.</span>N
            <span className="text-accent">.</span>ARTE
          </motion.div>

          {/* Progress line */}
          <div className="mt-12 w-48 md:w-64 h-px bg-border-light overflow-hidden">
            <motion.div
              className="h-full bg-accent origin-left"
              style={{ scaleX: progress }}
            />
          </div>

          {/* Counter */}
          <div className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-fg-dim">
            {String(Math.round(progress * 100)).padStart(3, "0")}
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] uppercase text-fg-dim">
            Carregando experiência
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
