"use client";

import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

const BUDGETS = [
  "R$ 10k – 30k",
  "R$ 30k – 60k",
  "R$ 60k – 100k",
  "R$ 100k+",
];

const TYPES = [
  "Identidade Visual",
  "Motion / Film",
  "Experiência Digital",
  "Direção Criativa",
  "Outro",
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", company: "", email: "", type: "", budget: "", message: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.type) return;
    setState("sending");

    // Envia para nossa própria API — armazenada no banco, visível em
    // /admin → Mensagens. Sem dependência de serviço terceiro.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="py-16 flex flex-col items-start gap-4">
        <div className="w-8 h-px bg-accent" />
        <p className="font-display text-3xl md:text-4xl text-fg leading-tight">
          Mensagem recebida.
        </p>
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-fg-muted">
          Respondemos em até 48h úteis.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Row 1 — Name + Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-muted block">
            Nome *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Seu nome"
            className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm text-fg placeholder:text-fg-dim/40 transition-colors duration-300"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-muted block">
            Empresa
          </label>
          <input
            type="text"
            value={form.company}
            onChange={set("company")}
            placeholder="Nome da empresa"
            className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm text-fg placeholder:text-fg-dim/40 transition-colors duration-300"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-muted block">
          E-mail *
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          placeholder="seu@email.com"
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm text-fg placeholder:text-fg-dim/40 transition-colors duration-300"
        />
      </div>

      {/* Row 2 — Type + Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-muted block">
            Tipo de projeto *
          </label>
          <select
            required
            value={form.type}
            onChange={set("type")}
            className="w-full bg-bg border-b border-border focus:border-accent outline-none py-3 text-sm text-fg transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="" className="bg-bg text-fg-dim">Selecione...</option>
            {TYPES.map(t => (
              <option key={t} value={t} className="bg-bg text-fg">{t}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-muted block">
            Investimento estimado
          </label>
          <select
            value={form.budget}
            onChange={set("budget")}
            className="w-full bg-bg border-b border-border focus:border-accent outline-none py-3 text-sm text-fg transition-colors duration-300 appearance-none cursor-pointer"
          >
            <option value="" className="bg-bg text-fg-dim">Selecione...</option>
            {BUDGETS.map(b => (
              <option key={b} value={b} className="bg-bg text-fg">{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-fg-muted block">
          Contexto do projeto
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Descreva brevemente o desafio ou objetivo..."
          className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm text-fg placeholder:text-fg-dim/40 transition-colors duration-300 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-8 pt-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex items-center gap-5 font-mono text-[10px] tracking-[0.5em] uppercase text-fg hover:text-accent transition-colors duration-500 disabled:opacity-50"
        >
          <span>{state === "sending" ? "Enviando..." : "Enviar"}</span>
          <span className="block w-10 h-px bg-fg-dim group-hover:w-20 group-hover:bg-accent transition-all duration-700" />
        </button>
        <p className="font-mono text-[9px] text-fg-muted/70 tracking-wider">
          Resposta em até 48h úteis
        </p>
      </div>

      {state === "error" && (
        <p className="font-mono text-[9px] tracking-wider text-red-400">
          Erro ao enviar. Tente pelo email abaixo.
        </p>
      )}
    </form>
  );
}
