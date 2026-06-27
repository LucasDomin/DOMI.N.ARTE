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

export default function ProjectForm({ project, open, onOpenChange, onSubmit }: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    category: "identidade",
    client: "",
    year: "",
    location: "",
    format: "",
    coverImage: "",
    color: "#FF3D00",
    isDraft: false,
  });

  useEffect(() => {
    if (project) {
      setFormData({ ...project });
    } else {
      setFormData({
        title: "",
        subtitle: "",
        slug: "",
        description: "",
        category: "identidade",
        client: "",
        year: "",
        location: "",
        format: "",
        coverImage: "",
        color: "#FF3D00",
        isDraft: false,
      });
    }
  }, [project, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-x-4 top-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] max-h-[85vh] overflow-y-auto bg-bg-elevated border border-border rounded-2xl z-50"
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black tracking-tight font-display text-fg">
                  {project ? "Editar Case" : "Novo Case"}
                </h2>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="text-fg-dim hover:text-fg transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Título</span>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Slug</span>
                    <input
                      type="text"
                      value={formData.slug || ""}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Subtítulo</span>
                  <input
                    type="text"
                    value={formData.subtitle || ""}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Categoria</span>
                    <select
                      value={formData.category || "identidade"}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                    >
                      <option value="identidade">Identidade Visual</option>
                      <option value="web">Sites & Páginas</option>
                      <option value="saas">SaaS & Produtos</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Ano</span>
                    <input
                      type="text"
                      value={formData.year || ""}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Cliente</span>
                    <input
                      type="text"
                      value={formData.client || ""}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Local</span>
                    <input
                      type="text"
                      value={formData.location || ""}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Formato</span>
                  <input
                    type="text"
                    value={formData.format || ""}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">URL da Capa</span>
                  <input
                    type="text"
                    value={formData.coverImage || ""}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Cor de Destaque</span>
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="color"
                      value={formData.color || "#FF3D00"}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-10 h-10 rounded-lg bg-transparent border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color || ""}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Descrição</span>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors resize-none"
                    required
                  />
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-5 py-2.5 rounded-full border border-border text-xs font-bold tracking-[0.1em] uppercase text-fg-dim hover:text-fg hover:border-fg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-accent text-white text-xs font-bold tracking-[0.1em] uppercase hover:bg-accent-hover transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
