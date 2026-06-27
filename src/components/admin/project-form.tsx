"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/db/schema";

interface ProjectFormProps {
  project?: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Project>) => void;
}

const EMPTY: Partial<Project> = {
  title: "",
  subtitle: "",
  slug: "",
  description: "",
  context: "",
  concept: "",
  direction: "",
  result: "",
  category: "identidade",
  client: "",
  year: "",
  location: "",
  duration: "",
  format: "",
  coverImage: "",
  color: "#C9A56C",
  isDraft: false,
  featured: false,
};

export default function ProjectForm({ project, open, onOpenChange, onSubmit }: ProjectFormProps) {
  const [data, setData] = useState<Partial<Project>>(EMPTY);

  useEffect(() => {
    setData(project ? { ...project } : EMPTY);
  }, [project, open]);

  const update = <K extends keyof Project>(key: K, value: Project[K] | string | boolean) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/85 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-x-4 top-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[680px] max-h-[90vh] overflow-y-auto bg-bg-card border border-border-light rounded-2xl z-50 shadow-2xl"
          >
            <form onSubmit={submit} className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <div>
                  <h2 className="font-display text-2xl text-fg">
                    {project ? "Editar Obra" : "Nova Obra"}
                  </h2>
                  <p className="text-xs text-fg-muted mt-1">
                    Defina Contexto, Conceito, Direção e Resultado para compor a exposição.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="text-fg-dim hover:text-fg text-xl px-2"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Identification */}
                <Section title="Identificação">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Título">
                      <input
                        type="text"
                        value={data.title || ""}
                        onChange={(e) => update("title", e.target.value)}
                        className={inputClass}
                        required
                      />
                    </Field>
                    <Field label="Slug (URL)">
                      <input
                        type="text"
                        value={data.slug || ""}
                        onChange={(e) => update("slug", e.target.value)}
                        className={inputClass}
                        required
                      />
                    </Field>
                  </div>
                  <Field label="Subtítulo">
                    <input
                      type="text"
                      value={data.subtitle || ""}
                      onChange={(e) => update("subtitle", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </Section>

                {/* Meta */}
                <Section title="Metadados">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Categoria">
                      <select
                        value={data.category || "identidade"}
                        onChange={(e) => update("category", e.target.value)}
                        className={inputClass}
                      >
                        <option value="identidade">Identidade Visual</option>
                        <option value="web">Experiência Web</option>
                        <option value="saas">SaaS & Produto Digital</option>
                      </select>
                    </Field>
                    <Field label="Ano">
                      <input
                        type="text"
                        value={data.year || ""}
                        onChange={(e) => update("year", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Cliente / Organização">
                      <input
                        type="text"
                        value={data.client || ""}
                        onChange={(e) => update("client", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Localização">
                      <input
                        type="text"
                        value={data.location || ""}
                        onChange={(e) => update("location", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Duração">
                      <input
                        type="text"
                        value={data.duration || ""}
                        onChange={(e) => update("duration", e.target.value)}
                        className={inputClass}
                        placeholder="ex: 12 semanas"
                      />
                    </Field>
                    <Field label="Formato / Suporte">
                      <input
                        type="text"
                        value={data.format || ""}
                        onChange={(e) => update("format", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <Field label="URL da Imagem Principal">
                    <input
                      type="text"
                      value={data.coverImage || ""}
                      onChange={(e) => update("coverImage", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </Section>

                {/* Narrative (Momento 3) */}
                <Section title="Narrativa da Obra (Exposição)">
                  <Field label="Resumo / Sinopse">
                    <textarea
                      value={data.description || ""}
                      onChange={(e) => update("description", e.target.value)}
                      rows={2}
                      className={inputClass + " resize-none"}
                      required
                    />
                  </Field>
                  <Field label="Contexto">
                    <textarea
                      value={data.context || ""}
                      onChange={(e) => update("context", e.target.value)}
                      rows={3}
                      className={inputClass + " resize-none"}
                      placeholder="Qual o cenário, tensão ou desafio inicial da marca?"
                    />
                  </Field>
                  <Field label="Conceito">
                    <textarea
                      value={data.concept || ""}
                      onChange={(e) => update("concept", e.target.value)}
                      rows={3}
                      className={inputClass + " resize-none"}
                      placeholder="Qual a ideia central e analogia criativa?"
                    />
                  </Field>
                  <Field label="Direção">
                    <textarea
                      value={data.direction || ""}
                      onChange={(e) => update("direction", e.target.value)}
                      rows={3}
                      className={inputClass + " resize-none"}
                      placeholder="Qual a tradução visual, sensorial e estética executada?"
                    />
                  </Field>
                  <Field label="Resultado">
                    <textarea
                      value={data.result || ""}
                      onChange={(e) => update("result", e.target.value)}
                      rows={3}
                      className={inputClass + " resize-none"}
                      placeholder="Conquistas, percepção gerada, números ou consolidação."
                    />
                  </Field>
                </Section>

                {/* Flags */}
                <Section title="Curadoria">
                  <div className="flex items-center gap-8 pt-1">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.featured || false}
                        onChange={(e) => update("featured", e.target.checked)}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className="text-sm text-fg-muted">Obra em Destaque</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.isDraft || false}
                        onChange={(e) => update("isDraft", e.target.checked)}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className="text-sm text-fg-muted">Rascunho (Oculto)</span>
                    </label>
                  </div>
                </Section>
              </div>

              <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-6 py-3 rounded-full border border-border-light text-[11px] font-medium tracking-[0.15em] uppercase text-fg-muted hover:text-fg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-fg text-bg text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent transition-colors"
                >
                  Salvar Obra
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4 pt-2">
      <legend className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono mb-2">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
