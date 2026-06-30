"use client";

import { useReveal } from "@/hooks/useReveal";

export default function ManifestoMomento2() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="momento-2"
      className="relative py-48 md:py-72 px-6 md:px-12 lg:px-16 border-b border-border"
    >
      <div ref={ref} className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-4 lg:sticky lg:top-36 self-start">
            <div className="reveal">
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-mono">
                Momento 02
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-32 md:space-y-44">
            <div className="reveal">
              <p className="font-display text-4xl md:text-6xl lg:text-7xl text-fg leading-[1.1] tracking-[-0.025em]">
                Imagem não é decoração.
              </p>
              <p className="mt-4 font-display italic text-3xl md:text-5xl lg:text-6xl text-accent leading-[1.15]">
                Imagem constrói percepção.
              </p>
            </div>

            <div className="reveal" style={{ transitionDelay: "120ms" }}>
              <p className="font-display text-4xl md:text-6xl lg:text-7xl text-fg leading-[1.1] tracking-[-0.025em]">
                Movimento não é detalhe.
              </p>
              <p className="mt-4 font-display italic text-3xl md:text-5xl lg:text-6xl text-accent leading-[1.15]">
                Movimento cria presença.
              </p>
            </div>

            <div className="reveal" style={{ transitionDelay: "240ms" }}>
              <p className="font-display text-4xl md:text-6xl lg:text-7xl text-fg leading-[1.1] tracking-[-0.025em]">
                Estética sem intenção é ruído.
              </p>
              <p className="mt-4 font-display italic text-3xl md:text-5xl lg:text-6xl text-accent leading-[1.15]">
                Direção transforma ruído em identidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
