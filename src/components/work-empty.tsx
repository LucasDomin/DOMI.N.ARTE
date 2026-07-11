"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WorkEmpty() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-24 md:py-32 border-t border-border/30">
      <div className="max-w-[1600px] mx-auto">
        <div className="max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Geometric placeholder — D letter wireframe */}
            <svg width="80" height="96" viewBox="0 0 80 96" fill="none" className="mb-10 opacity-30">
              <line x1="16" y1="16" x2="16" y2="80" stroke="#C9A56C" strokeWidth="0.75" />
              <line x1="16" y1="16" x2="40" y2="16" stroke="#C9A56C" strokeWidth="0.75" />
              <path d="M40,16 C70,16 72,46 72,48 C72,50 70,80 40,80" stroke="#C9A56C" strokeWidth="0.75" fill="none" />
              <line x1="16" y1="80" x2="40" y2="80" stroke="#C9A56C" strokeWidth="0.75" />
              {/* Grid lines */}
              <line x1="0" y1="88" x2="80" y2="88" stroke="#C9A56C" strokeWidth="0.3" strokeDasharray="2 4" />
              <line x1="0" y1="16" x2="80" y2="16" stroke="#C9A56C" strokeWidth="0.3" strokeDasharray="2 4" />
            </svg>

            <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-accent mb-6">
              Galeria em construção
            </p>
            <p className="font-display text-[clamp(2rem,4vw,4rem)] leading-none tracking-tight text-fg mb-6">
              Os projetos estão<br />
              <em className="text-fg-muted">a caminho.</em>
            </p>
            <p className="text-sm text-fg-muted leading-relaxed font-light mb-10 max-w-sm">
              Estamos documentando os trabalhos recentes com o cuidado que cada projeto merece. Volte em breve.
            </p>
            <Link
              href="/#momento-5"
              className="group inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.5em] uppercase text-fg-muted hover:text-fg transition-colors duration-500"
            >
              <span>Iniciar conversa</span>
              <span className="w-8 h-px bg-fg-muted group-hover:w-16 group-hover:bg-accent transition-all duration-700" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
