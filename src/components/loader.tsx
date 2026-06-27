"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExit(true);
          setTimeout(onComplete, 600);
        }, 200);
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg font-black tracking-tight font-display"
            >
              DOMI<span className="text-accent">.</span>N
              <span className="text-accent">.</span>ARTE
            </motion.div>
          </div>

          <div className="mt-8 w-40 h-[2px] bg-border overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-fg-dim">
            {Math.round(progress * 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
