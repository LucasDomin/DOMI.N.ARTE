"use client";

import Link from "next/link";

// AÇÃO NECESSÁRIA: substituir os hrefs com suas URLs reais de redes sociais
const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/dominarte" },
  { label: "Behance",   href: "https://behance.net/dominarte" },
  { label: "LinkedIn",  href: "https://linkedin.com/company/dominarte" },
];

export default function FooterMomento() {
  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Typographic signature */}
      <div className="px-6 md:px-12 lg:px-16 pt-16 pb-0 overflow-hidden pointer-events-none select-none">
        <div className="max-w-[1600px] mx-auto">
          <div className="font-display text-[clamp(5rem,20vw,22rem)] leading-[0.78] tracking-[-0.05em] text-fg/[0.04] whitespace-nowrap">
            DOMI<span className="text-accent/[0.04]">.</span>N<span className="text-accent/[0.04]">.</span>ARTE
          </div>
        </div>
      </div>

      {/* Strip */}
      <div className="px-6 md:px-12 lg:px-16 py-10 border-t border-border/30">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <Link href="/" className="font-display text-sm text-fg/60 hover:text-fg transition-colors">
              DOMI<span className="text-accent/60">.</span>N<span className="text-accent/60">.</span>ARTE
            </Link>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-fg-muted">
              © {new Date().getFullYear()} · Todos os direitos reservados
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[9px] tracking-[0.35em] uppercase text-fg-muted hover:text-fg transition-colors duration-300">
                {s.label}
              </a>
            ))}
            <Link href="/sobre"
              className="font-mono text-[9px] tracking-[0.35em] uppercase text-fg-muted hover:text-fg transition-colors duration-300">
              Sobre
            </Link>
            <Link href="/admin/login"
              className="font-mono text-[9px] tracking-[0.35em] uppercase text-fg-dim/30 hover:text-fg-dim transition-colors duration-300">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
