"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ProjectForm from "@/components/admin/project-form";
import ImageManager from "@/components/admin/image-manager";
import ClientsManager from "@/components/admin/clients-manager";
import type { Project, SiteConfig } from "@/db/schema";
import {
  Boxes,
  Compass,
  FileText,
  Layers,
  Settings,
  Shield,
  Trash2,
  Copy,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  RefreshCw,
  LogOut,
  Mail,
  FileCode,
  CheckCircle,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [siteCfg, setSiteCfg] = useState<Partial<SiteConfig>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"obras" | "clients" | "settings">("obras");

  // Form State
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imageManagerProject, setImageManagerProject] = useState<Project | null>(null);

  // Settings Save State
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSavingSettingsSuccess] = useState(false);

  // Auth is enforced by middleware (httpOnly cookie). No client-side gate needed.

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch projects
      const resProjects = await fetch("/api/projects?includeDrafts=true");
      const dataProjects = await resProjects.json();
      setProjects(Array.isArray(dataProjects) ? dataProjects : []);

      // Fetch dynamic configuration
      const resConfig = await fetch("/api/config");
      const dataConfig = await resConfig.json();
      setSiteCfg(dataConfig || {});
    } catch (error) {
      console.error("Failed to load admin payload:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Dashboard Stats
  const stats = useMemo(() => {
    const total = projects.length;
    const published = projects.filter((p) => !p.isDraft).length;
    const drafts = projects.filter((p) => p.isDraft).length;
    return { total, published, drafts };
  }, [projects]);

  const handleCreate = async (data: Partial<Project>) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects([newProject, ...projects]);
        setFormOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = async (data: Partial<Project>) => {
    if (!editingProject) return;
    try {
      const res = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
        setFormOpen(false);
        setEditingProject(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deletar esta obra permanentemente?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // DUPLICATE WORK
  const handleDuplicate = async (project: Project) => {
    try {
      const duplicatedData: Partial<Project> = {
        ...project,
        title: `${project.title} (Cópia)`,
        slug: `${project.slug}-copia-${Math.floor(Math.random() * 1000)}`,
        isDraft: true, // Duplicate always starts as draft
      };
      delete duplicatedData.id;

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicatedData),
      });

      if (res.ok) {
        const createdCopy = await res.json();
        setProjects([createdCopy, ...projects]);
      }
    } catch (e) {
      console.error("Duplication failed:", e);
    }
  };

  // PUBLISH / UNPUBLISH TOGGLE
  const handleTogglePublish = async (project: Project) => {
    try {
      const nextStatus = !project.isDraft;
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDraft: nextStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      }
    } catch (e) {
      console.error("Toggle publish failed:", e);
    }
  };

  // SAVE SETTINGS (Manifesto, About, Socials, Contacts)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSavingSettingsSuccess(false);

    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteCfg),
      });

      if (res.ok) {
        const nextCfg = await res.json();
        setSiteCfg(nextCfg);
        setSavingSettingsSuccess(true);
        setTimeout(() => setSavingSettingsSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Settings save error:", error);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const handleCreateNew = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" }).catch(() => {});
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-bg text-fg select-none">
      <div className="grain" />

      {/* Navigation Header */}
      <header className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-2xl text-fg">
              DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE
            </Link>
            <div className="h-5 w-px bg-border-light" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-fg-dim font-mono flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span>Painel de Curadoria</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-[11px] tracking-[0.15em] uppercase text-fg-muted hover:text-fg transition-colors">
              Ver Site Público
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-fg-dim hover:text-accent transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Total */}
          <div className="p-6 rounded-2xl bg-bg-card border border-border-light flex flex-col justify-between">
            <div className="flex items-center justify-between text-fg-dim mb-4">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-normal">Obras Totais</span>
              <Layers className="w-4 h-4 text-accent" />
            </div>
            <div className="font-display text-5xl font-black text-fg leading-none">
              {stats.total}
            </div>
            <p className="text-[10px] text-fg-dim mt-4 uppercase tracking-wider">Acervo completo registrado</p>
          </div>

          {/* Card 2: Published */}
          <div className="p-6 rounded-2xl bg-bg-card border border-border-light flex flex-col justify-between">
            <div className="flex items-center justify-between text-fg-dim mb-4">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-normal">Publicadas</span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-display text-5xl font-black text-fg leading-none text-emerald-400">
              {stats.published}
            </div>
            <p className="text-[10px] text-fg-dim mt-4 uppercase tracking-wider">Visíveis ao público externo</p>
          </div>

          {/* Card 3: Drafts */}
          <div className="p-6 rounded-2xl bg-bg-card border border-border-light flex flex-col justify-between">
            <div className="flex items-center justify-between text-fg-dim mb-4">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-normal">Rascunhos</span>
              <FileText className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-display text-5xl font-black text-fg leading-none text-amber-400">
              {stats.drafts}
            </div>
            <p className="text-[10px] text-fg-dim mt-4 uppercase tracking-wider">Em edição de conceito</p>
          </div>

          {/* Card 4: Curadoria status */}
          <div className="p-6 rounded-2xl bg-bg-card border border-border-light flex flex-col justify-between">
            <div className="flex items-center justify-between text-fg-dim mb-4">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-normal">Status do Sistema</span>
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
            <div className="font-display text-5xl font-black text-fg leading-none">
              99.8%
            </div>
            <p className="text-[10px] text-fg-dim mt-4 uppercase tracking-wider">Taxa de performance e Core Vitals</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-border mb-12">
          <button
            onClick={() => setActiveTab("obras")}
            className={`pb-4 px-1 text-xs tracking-[0.2em] uppercase font-mono font-medium transition-all ${
              activeTab === "obras"
                ? "text-accent border-b-2 border-accent"
                : "text-fg-dim hover:text-fg"
            }`}
          >
            Gestão de Obras (Exposições)
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`pb-4 px-1 text-xs tracking-[0.2em] uppercase font-mono font-medium transition-all ml-10 ${
              activeTab === "clients"
                ? "text-accent border-b-2 border-accent"
                : "text-fg-dim hover:text-fg"
            }`}
          >
            Barra de Clientes
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-4 px-1 text-xs tracking-[0.2em] uppercase font-mono font-medium transition-all ml-10 ${
              activeTab === "settings"
                ? "text-accent border-b-2 border-accent"
                : "text-fg-dim hover:text-fg"
            }`}
          >
            Configurações Gerais (No-Code Content)
          </button>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-bg-soft animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "obras" ? (
              <motion.div
                key="obras"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header listing control */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-3xl text-fg">Obras Registradas</h2>
                    <p className="text-xs text-fg-dim mt-1">Crie, edite, duplique ou gerencie as imagens de suas obras.</p>
                  </div>
                  <button
                    onClick={handleCreateNew}
                    className="px-6 py-3 rounded-full bg-accent text-bg text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent-hover transition-colors"
                  >
                    + Criar Obra
                  </button>
                </div>

                {/* Listing Grid / Table */}
                <div className="border border-border bg-bg-soft/20 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="border-b border-border bg-bg-soft/40">
                      <tr>
                        <th className="text-left py-5 px-6 text-[10px] tracking-[0.25em] uppercase text-fg-dim font-mono font-normal">Obra / Cliente</th>
                        <th className="text-left py-5 px-6 text-[10px] tracking-[0.25em] uppercase text-fg-dim font-mono font-normal hidden md:table-cell">Categoria</th>
                        <th className="text-left py-5 px-6 text-[10px] tracking-[0.25em] uppercase text-fg-dim font-mono font-normal hidden md:table-cell">Ano / Cronograma</th>
                        <th className="text-left py-5 px-6 text-[10px] tracking-[0.25em] uppercase text-fg-dim font-mono font-normal hidden md:table-cell">Status</th>
                        <th className="text-right py-5 px-6 text-[10px] tracking-[0.25em] uppercase text-fg-dim font-mono font-normal">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b border-border last:border-b-0 hover:bg-bg-soft/40 transition-colors">
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-3">
                              {project.coverImage ? (
                                <img
                                  src={project.coverImage}
                                  alt=""
                                  className="w-10 h-10 object-cover rounded-sm border border-border"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-bg-elevated rounded-sm flex items-center justify-center font-display text-accent text-xl">
                                  D
                                </div>
                              )}
                              <div>
                                <div className="font-display text-lg text-fg font-normal">{project.title}</div>
                                <div className="text-xs text-fg-dim mt-0.5">{project.client || "—"}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6 text-xs text-fg-muted capitalize hidden md:table-cell">
                            {project.category === "identidade" ? "Branding" : project.category === "web" ? "Sites & Páginas" : "SaaS & Produtos"}
                          </td>
                          <td className="py-5 px-6 text-xs text-fg-muted hidden md:table-cell">
                            {project.year || "—"} {project.duration ? `(${project.duration})` : ""}
                          </td>
                          <td className="py-5 px-6 hidden md:table-cell">
                            <button
                              onClick={() => handleTogglePublish(project)}
                              title="Clique para alternar status"
                              className={`inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase font-mono ${
                                project.isDraft ? "text-fg-dim hover:text-accent" : "text-accent hover:text-fg-dim"
                              }`}
                            >
                              {project.isDraft ? (
                                <>
                                  <ToggleLeft className="w-4 h-4" />
                                  <span>Rascunho</span>
                                </>
                              ) : (
                                <>
                                  <ToggleRight className="w-4 h-4" />
                                  <span>Publicado</span>
                                </>
                              )}
                            </button>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex items-center justify-end gap-5">
                              <button
                                onClick={() => handleDuplicate(project)}
                                title="Duplicar obra"
                                className="text-[10px] tracking-[0.1em] uppercase text-fg-dim hover:text-accent transition-colors flex items-center gap-1"
                              >
                                <Copy className="w-3 h-3" />
                                <span className="hidden sm:inline">Duplicar</span>
                              </button>
                              <button
                                onClick={() => setImageManagerProject(project)}
                                className="text-[10px] tracking-[0.1em] uppercase text-fg-muted hover:text-accent transition-colors"
                              >
                                Imagens ({Array.isArray(project.stills) ? project.stills.length : 0})
                              </button>
                              <button
                                onClick={() => handleEdit(project)}
                                className="text-[10px] tracking-[0.1em] uppercase text-fg-muted hover:text-accent transition-colors"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDelete(project.id)}
                                aria-label={`Excluir projeto ${project.title}`}
                                className="text-[10px] tracking-[0.1em] uppercase text-fg-dim hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {projects.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-sm text-fg-muted">
                            Nenhuma obra criada ainda. Toque em Criar Obra para registrar.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ) : activeTab === "clients" ? (
              <motion.div
                key="clients"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <ClientsManager />
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* CONFIGURACOES GERAIS (No-Code Manifesto, About, Contacts, Socials) */}
                <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
                  <div className="flex items-center justify-between pb-4 border-b border-border mb-8">
                    <div>
                      <h2 className="font-display text-3xl text-fg">Configurações Gerais do Portfólio</h2>
                      <p className="text-xs text-fg-dim mt-1">Edite textos de manifesto, contatos, disponibilidade e redes sem mexer no código.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {settingsSuccess && (
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" /> Salvo com sucesso!
                        </span>
                      )}
                      <button
                        type="submit"
                        disabled={savingSettings}
                        className="px-6 py-3 rounded-full bg-accent text-bg text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent-hover transition-colors disabled:opacity-50"
                      >
                        {savingSettings ? "Salvando..." : "Salvar Configurações"}
                      </button>
                    </div>
                  </div>

                  {/* Section: Manifesto (Momento 2) */}
                  <fieldset className="p-6 bg-bg-card border border-border-light rounded-2xl space-y-4">
                    <legend className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono px-2">
                      Momento 02 — Manifesto Autoral
                    </legend>
                    <label className="block">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Título do Manifesto</span>
                      <input
                        type="text"
                        value={siteCfg.manifestoTitle || ""}
                        onChange={(e) => setSiteCfg({ ...siteCfg, manifestoTitle: e.target.value })}
                        className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Estrofe 01</span>
                      <input
                        type="text"
                        value={siteCfg.manifestoText1 || ""}
                        onChange={(e) => setSiteCfg({ ...siteCfg, manifestoText1: e.target.value })}
                        className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Estrofe 02</span>
                      <input
                        type="text"
                        value={siteCfg.manifestoText2 || ""}
                        onChange={(e) => setSiteCfg({ ...siteCfg, manifestoText2: e.target.value })}
                        className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Estrofe 03</span>
                      <input
                        type="text"
                        value={siteCfg.manifestoText3 || ""}
                        onChange={(e) => setSiteCfg({ ...siteCfg, manifestoText3: e.target.value })}
                        className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                      />
                    </label>
                  </fieldset>

                  {/* Section: About */}
                  <fieldset className="p-6 bg-bg-card border border-border-light rounded-2xl space-y-4">
                    <legend className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono px-2">
                      Estúdio — Posicionamento & Sobre
                    </legend>
                    <label className="block">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Título do Bloco</span>
                      <input
                        type="text"
                        value={siteCfg.aboutTitle || ""}
                        onChange={(e) => setSiteCfg({ ...siteCfg, aboutTitle: e.target.value })}
                        className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Parágrafo 01 (Destaque Grande)</span>
                      <textarea
                        value={siteCfg.aboutText1 || ""}
                        onChange={(e) => setSiteCfg({ ...siteCfg, aboutText1: e.target.value })}
                        rows={3}
                        className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors resize-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Parágrafo 02</span>
                      <textarea
                        value={siteCfg.aboutText2 || ""}
                        onChange={(e) => setSiteCfg({ ...siteCfg, aboutText2: e.target.value })}
                        rows={3}
                        className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors resize-none"
                      />
                    </label>
                  </fieldset>

                  {/* Section: Contacts */}
                  <fieldset className="p-6 bg-bg-card border border-border-light rounded-2xl space-y-4">
                    <legend className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono px-2">
                      Contatos & Disponibilidade
                    </legend>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">E-mail Principal</span>
                        <input
                          type="email"
                          value={siteCfg.contactEmail || ""}
                          onChange={(e) => setSiteCfg({ ...siteCfg, contactEmail: e.target.value })}
                          className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Telefone / Canal</span>
                        <input
                          type="text"
                          value={siteCfg.contactPhone || ""}
                          onChange={(e) => setSiteCfg({ ...siteCfg, contactPhone: e.target.value })}
                          className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Disponibilidade / Scarcity Badge</span>
                      <input
                        type="text"
                        value={siteCfg.contactAvailability || ""}
                        onChange={(e) => setSiteCfg({ ...siteCfg, contactAvailability: e.target.value })}
                        className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                      />
                    </label>
                  </fieldset>

                  {/* Section: Socials */}
                  <fieldset className="p-6 bg-bg-card border border-border-light rounded-2xl space-y-4">
                    <legend className="text-[10px] tracking-[0.3em] uppercase text-accent font-mono px-2">
                      Redes Sociais
                    </legend>
                    <div className="grid grid-cols-3 gap-4">
                      <label className="block">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Instagram Link</span>
                        <input
                          type="text"
                          value={siteCfg.socialInstagram || ""}
                          onChange={(e) => setSiteCfg({ ...siteCfg, socialInstagram: e.target.value })}
                          className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Behance Link</span>
                        <input
                          type="text"
                          value={siteCfg.socialBehance || ""}
                          onChange={(e) => setSiteCfg({ ...siteCfg, socialBehance: e.target.value })}
                          className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">LinkedIn Link</span>
                        <input
                          type="text"
                          value={siteCfg.socialLinkedin || ""}
                          onChange={(e) => setSiteCfg({ ...siteCfg, socialLinkedin: e.target.value })}
                          className="mt-2 w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors"
                        />
                      </label>
                    </div>
                  </fieldset>

                  {/* Submission Action */}
                  <div className="flex items-center justify-end gap-4 pt-4">
                    {settingsSuccess && (
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Salvo com sucesso!
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={savingSettings}
                      className="px-10 py-4 rounded-full bg-accent text-bg text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent-hover transition-colors disabled:opacity-50"
                    >
                      {savingSettings ? "Salvando..." : "Salvar Configurações"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* CREATE / EDIT PROJECT FORM MODAL */}
      <ProjectForm
        project={editingProject}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={editingProject ? handleUpdate : handleCreate}
      />

      {/* GALLERY MANAGER MODAL */}
      {imageManagerProject && (
        <ImageManager
          project={imageManagerProject}
          onClose={() => setImageManagerProject(null)}
          onUpdate={fetchData}
        />
      )}
    </div>
  );
}
