"use client";

import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...options }
    );

    io.observe(el);
    el.querySelectorAll<HTMLElement>(".reveal").forEach((n) => io.observe(n));

    return () => io.disconnect();
  }, [options]);

  return ref;
}
