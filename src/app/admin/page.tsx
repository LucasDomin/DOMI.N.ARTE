"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectForm from "@/components/admin/project-form";
import ImageManager from "@/components/admin/image-manager";
import type { Project } from "@/db/schema";

export default function AdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imageManagerProject, setImageManagerProject] = useState<Project | null>(null);

  useEffect(() => {
    if (localStorage.getItem("dominarte-admin") !== "auth") {
      router.replace("/admin/login");
    }
  }, [router]);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreate = async (data: Partial<Project>) => {
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
  };

  const handleUpdate = async (data: Partial<Project>) => {
    if (!editingProject) return;
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
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deletar este projeto permanentemente?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const handleCreateNew = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("dominarte-admin");
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-border sticky top-0 z-40 bg-bg/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-black tracking-tight font-display text-fg">
              DOMI.N.ARTE
            </Link>
            <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">/ Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-fg-dim hover:text-fg transition-colors">Ver site</Link>
            <button onClick={handleLogout} className="text-xs text-fg-dim hover:text-accent transition-colors">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono mb-2">Casos</p>
            <h1 className="text-3xl font-black tracking-tight font-display text-fg">Portfólio</h1>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-5 py-2.5 rounded-full bg-accent text-white text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-accent-hover transition-colors"
          >
            + Novo Case
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-bg-elevated animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="border border-border rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-bg-elevated border-b border-border">
                  <tr>
                    <th className="text-left py-4 px-6 text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono font-normal">Projeto</th>
                    <th className="text-left py-4 px-6 text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono font-normal hidden md:table-cell">Categoria</th>
                    <th className="text-left py-4 px-6 text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono font-normal hidden md:table-cell">Ano</th>
                    <th className="text-right py-4 px-6 text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono font-normal">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-border last:border-b-0 hover:bg-bg-elevated/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-fg font-display">{project.title}</div>
                        <div className="text-xs text-fg-dim">{project.client || "—"}</div>
                      </td>
                      <td className="py-4 px-6 text-xs text-fg-muted capitalize hidden md:table-cell">{project.category}</td>
                      <td className="py-4 px-6 text-xs text-fg-muted hidden md:table-cell">{project.year || "—"}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => setImageManagerProject(project)}
                            className="text-[10px] tracking-[0.1em] uppercase text-fg-dim hover:text-accent transition-colors"
                          >
                            Imagens
                          </button>
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-[10px] tracking-[0.1em] uppercase text-fg-dim hover:text-accent transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-[10px] tracking-[0.1em] uppercase text-fg-dim hover:text-red-500 transition-colors"
                          >
                            Deletar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>

      <ProjectForm
        project={editingProject}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={editingProject ? handleUpdate : handleCreate}
      />

      {imageManagerProject && (
        <ImageManager
          project={imageManagerProject}
          onClose={() => setImageManagerProject(null)}
          onUpdate={fetchProjects}
        />
      )}
    </div>
  );
}
