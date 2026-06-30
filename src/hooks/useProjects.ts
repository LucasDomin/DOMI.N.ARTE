/**
 * useProjects — Centralizes all project CRUD operations for the admin panel.
 * Extracted from admin/page.tsx to enable separation of concerns and
 * future reuse (e.g. preview panel, dashboard widgets).
 */
"use client";

import { useState, useCallback, useMemo } from "react";
import type { Project } from "@/db/schema";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects?includeDrafts=true");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(
    async (data: Partial<Project>): Promise<Project | null> => {
      try {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Create failed");
        const project: Project = await res.json();
        setProjects((prev) => [project, ...prev]);
        return project;
      } catch {
        return null;
      }
    },
    []
  );

  const updateProject = useCallback(
    async (id: number, data: Partial<Project>): Promise<Project | null> => {
      try {
        const res = await fetch(`/api/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated: Project = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        return updated;
      } catch {
        return null;
      }
    },
    []
  );

  const deleteProject = useCallback(async (id: number): Promise<boolean> => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) return false;
      setProjects((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch {
      return false;
    }
  }, []);

  const duplicateProject = useCallback(
    async (project: Project): Promise<Project | null> => {
      const { id, ...rest } = project;
      const duplicated = {
        ...rest,
        title: `${project.title} (Cópia)`,
        slug: `${project.slug}-copia-${Math.floor(Math.random() * 1000)}`,
        isDraft: true,
      };
      return createProject(duplicated);
    },
    [createProject]
  );

  const togglePublish = useCallback(
    async (project: Project): Promise<void> => {
      await updateProject(project.id, { isDraft: !project.isDraft });
    },
    [updateProject]
  );

  const stats = useMemo(() => {
    return {
      total: projects.length,
      published: projects.filter((p) => !p.isDraft).length,
      drafts: projects.filter((p) => p.isDraft).length,
    };
  }, [projects]);

  return {
    projects,
    loading,
    error,
    stats,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
    togglePublish,
  };
}
