"use client";

import Link from "next/link";

export default function FooterMomento() {
  return (
    <footer className="relative border-t border-border bg-bg select-none overflow-hidden">
      {/* Giant expressive autoral signature */}
      <div className="px-6 md:px-12 lg:px-16 pt-24 pb-16 overflow-hidden pointer-events-none">
        <div className="max-w-[1600px] mx-auto">
          <div className="font-display font-normal text-[clamp(4.5rem,18vw,20rem)] leading-[0.82] tracking-[-0.04em] text-fg-dim/30 whitespace-nowrap">
            DOMI<span className="text-accent/30">.</span>N<span className="text-accent/30">.</span>ARTE
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-16 py-16 border-t border-border/80">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-6">
              Os 5 Momentos
            </div>
            <ul className="space-y-3 text-xs md:text-sm text-fg-muted font-light">
              <li><a href="#momento-1" className="hover:text-fg transition-colors">01 — Impacto</a></li>
              <li><a href="#momento-2" className="hover:text-fg transition-colors">02 — Manifesto</a></li>
              <li><a href="#momento-3" className="hover:text-fg transition-colors">03 — Obras</a></li>
              <li><a href="#momento-4" className="hover:text-fg transition-colors">04 — Processo</a></li>
              <li><a href="#momento-5" className="hover:text-fg transition-colors">05 — O Convite</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-6">
              Interseção Criativa
            </div>
            <ul className="space-y-3 text-xs md:text-sm text-fg-muted font-light">
              <li>Direção Criativa Autoral</li>
              <li>Instalação & Arte Digital</li>
              <li>Still Movement & Motion</li>
              <li>Storytelling Cinematográfico</li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-6">
              Exposições / Social
            </div>
            <ul className="space-y-3 text-xs md:text-sm text-fg-muted font-light">
              <li><a href="#" className="hover:text-fg transition-colors">Instagram @dominarte</a></li>
              <li><a href="#" className="hover:text-fg transition-colors">Behance / Selected</a></li>
              <li><a href="#" className="hover:text-fg transition-colors">LinkedIn / Executive</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-6">
              Presença
            </div>
            <ul className="space-y-3 text-xs md:text-sm text-fg-muted font-light">
              <li><a href="mailto:contato@dominiarte.com" className="hover:text-accent transition-colors font-display italic text-base">contato@dominiarte.com</a></li>
              <li className="text-fg-dim font-mono text-[11px] pt-1">SÃO PAULO · BRASIL</li>
              <li className="pt-2"><Link href="/admin/login" className="text-[10px] uppercase font-mono tracking-widest text-fg-dim hover:text-fg transition-colors">Acesso Curadoria (Admin)</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-[0.25em] uppercase font-mono text-fg-dim">
          <p>
            © 2025 DOMI.N.ARTE — ASSINATURA CRIATIVA AUTORAL
          </p>
          <p className="flex items-center gap-2">
            <span>OBRA DIGITAL VIVA</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>CINEMA EXPERIMENTAL & BRUTALISMO</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
