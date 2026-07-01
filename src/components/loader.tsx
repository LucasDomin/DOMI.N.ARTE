"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// The letters of the brand, split for individual animation
const BRAND_CHARS = ["D", "O", "M", "I", ".", "N", ".", "A", "R", "T", "E"];
const ACCENT_IDX = [4, 6]; // indices of "."

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"count" | "reveal" | "exit">("count");
  const [count, setCount] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const progressMv = useMotionValue(0);
  const smoothProgress = useSpring(progressMv, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      progressMv.set(eased);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Stage 2: reveal brand name letter by letter
        setStage("reveal");
        let i = 0;
        const revealInterval = setInterval(() => {
          i++;
          setVisibleChars(i);
          if (i >= BRAND_CHARS.length) {
            clearInterval(revealInterval);
            setTimeout(() => {
              setStage("exit");
              setTimeout(onComplete, 1000);
            }, 600);
          }
        }, 60);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete, progressMv]);

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="grain" />

          {/* Animated radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: stage === "reveal" ? 1 : 0 }}
            transition={{ duration: 1.5, ease: EASE }}
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,165,108,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Counter — large, typographic */}
          <AnimatePresence mode="wait">
            {stage === "count" && (
              <motion.div
                key="counter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span
                  className="font-display text-[clamp(7rem,20vw,16rem)] leading-none tracking-[-0.04em] text-fg select-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {String(count).padStart(3, "0")}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Brand reveal */}
          <AnimatePresence>
            {stage === "reveal" && (
              <motion.div
                key="brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                {BRAND_CHARS.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={
                      i < visibleChars
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 24, filter: "blur(8px)" }
                    }
                    transition={{ duration: 0.6, ease: EASE }}
                    className={`font-display text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-[-0.03em] ${
                      ACCENT_IDX.includes(i) ? "text-accent" : "text-fg"
                    }`}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar — thin, at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border overflow-hidden">
            <motion.div
              className="h-full bg-accent origin-left"
              style={{ scaleX: smoothProgress }}
            />
          </div>

          {/* Discipline line */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="w-8 h-px bg-fg-dim/30" />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-fg-dim">
              Direção Criativa
            </span>
            <div className="w-8 h-px bg-fg-dim/30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
