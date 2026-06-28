"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { DEFAULT_SITE_CONFIG } from "@/lib/defaults";
import type { SiteConfig } from "@/db/schema";

export default function ManifestoMomento2() {
  const ref = useReveal<HTMLDivElement>();
  const [config, setConfig] = useState<Partial<SiteConfig>>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="momento-2"
      className="relative py-36 md:py-56 px-6 md:px-12 lg:px-16 border-b border-border bg-bg-soft/20"
    >
      <div ref={ref} className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-36">
            <div className="reveal">
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-mono block">
                Momento 02
              </span>
              <h2 className="mt-3 font-mono text-xs tracking-[0.3em] uppercase text-fg-dim">
                {config.aboutTitle || "Manifesto Autoral"}
              </h2>
              <div className="mt-12 hidden lg:block w-8 h-px bg-accent/40" />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            {/* Stanza 1 */}
            {config.manifestoText1 && (
              <div className="reveal">
                <p className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.08] tracking-[-0.025em] text-fg">
                  Imagem não é decoração. <br />
                  <span className="italic text-accent">{config.manifestoText1}</span>
                </p>
              </div>
            )}

            {/* Stanza 2 */}
            {config.manifestoText2 && (
              <div className="reveal" style={{ transitionDelay: "100ms" }}>
                <p className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.08] tracking-[-0.025em] text-fg">
                  Movimento não é detalhe. <br />
                  <span className="italic text-accent">{config.manifestoText2}</span>
                </p>
              </div>
            )}

            {/* Stanza 3 */}
            {config.manifestoText3 && (
              <div className="reveal" style={{ transitionDelay: "200ms" }}>
                <p className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.08] tracking-[-0.025em] text-fg">
                  Estética sem intenção é ruído. <br />
                  <span className="italic text-accent">{config.manifestoText3}</span>
                </p>
              </div>
            )}

            {/* Exposition / Context explanation */}
            <div
              className="reveal pt-12 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              style={{ transitionDelay: "300ms" }}
            >
              <p className="text-sm md:text-base text-fg-muted leading-relaxed font-light">
                {config.aboutText1 || "A DOMI.N.ARTE abandona soluções superficiais e templates previsíveis. Cada obra digital nasce do mergulho em contexto visual, tensão dramática e direção cinematográfica."}
              </p>
              <p className="text-sm md:text-base text-fg-muted leading-relaxed font-light">
                {config.aboutText2 || "Não criamos sites comuns. Projetamos instalações digitais e ecossistemas visuais que impõem autoridade imediata, alto valor percebido e permanência na mente do mercado."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
