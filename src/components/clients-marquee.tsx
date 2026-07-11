"use client";

import { useEffect, useState } from "react";
import type { Client } from "@/db/schema";

// ─── Infinite auto-scrolling logo bar ──────────────────────────────────────────
// Pure CSS animation (GPU-accelerated, no JS ticking). Pauses on hover via
// animation-play-state. List is duplicated once for a seamless loop.

function LogoItem({ client }: { client: Client }) {
  const content = client.logoUrl ? (
    <img
      src={client.logoUrl}
      alt={client.name}
      className="h-10 md:h-14 w-auto object-contain grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
    />
  ) : (
    <span className="font-display text-2xl md:text-3xl text-fg-muted opacity-60 group-hover:opacity-100 group-hover:text-fg transition-all duration-500 whitespace-nowrap">
      {client.name}
    </span>
  );

  const className = "group flex items-center justify-center px-10 md:px-16 flex-shrink-0";

  if (client.link) {
    return (
      <a href={client.link} target="_blank" rel="noopener noreferrer" className={className} data-cursor="view">
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}

export default function ClientsMarquee() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setClients(data); })
      .catch(() => {});
  }, []);

  if (clients.length === 0) return null;

  const duration = Math.max(18, clients.length * 3.5);

  return (
    <section className="relative py-14 md:py-18 border-y border-border/30 overflow-hidden bg-bg-soft/10">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll ${duration}s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      {/* Label */}
      <div className="px-6 md:px-12 lg:px-16 mb-6">
        <div className="max-w-[1600px] mx-auto flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-fg-muted">
            Marcas que confiaram no processo
          </span>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-bg to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-bg to-transparent" />

        <div className="marquee-track flex items-center w-max">
          {[...clients, ...clients].map((c, i) => (
            <LogoItem key={`${c.id}-${i}`} client={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
