"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "view" | "drag";

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness: 400, damping: 35, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 400, damping: 35, mass: 0.3 });

  // Trailing dot — slower spring
  const dotX = useSpring(rawX, { stiffness: 150, damping: 22, mass: 0.5 });
  const dotY = useSpring(rawY, { stiffness: 150, damping: 22, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='view']")) {
        setMode("view");
      } else if (t.closest("[data-cursor='drag']")) {
        setMode("drag");
      } else {
        setMode("default");
      }
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [visible, rawX, rawY]);

  // Hide on touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) setIsTouch(true);
  }, []);

  if (isTouch) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Main circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:  mode === "view" ? 64 : mode === "drag" ? 48 : 12,
          height: mode === "view" ? 64 : mode === "drag" ? 48 : 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full h-full rounded-full bg-white" />

        {/* View label */}
        {mode === "view" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center font-mono text-[7px] tracking-[0.3em] uppercase text-black font-medium"
          >
            Ver
          </motion.span>
        )}
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && mode === "default" ? 0.4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-1 h-1 rounded-full bg-white" />
      </motion.div>
    </>
  );
}
