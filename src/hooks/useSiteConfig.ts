/**
 * useSiteConfig — Manages site configuration (manifesto, about, contacts, socials).
 */
"use client";

import { useState, useCallback } from "react";
import type { SiteConfig } from "@/db/schema";

type SaveStatus = "idle" | "saving" | "success" | "error";

export function useSiteConfig() {
  const [config, setConfig] = useState<Partial<SiteConfig>>({});
  const [status, setStatus] = useState<SaveStatus>("idle");

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setConfig(data || {});
    } catch {
      // silently ignore — config is optional
    }
  }, []);

  const updateField = useCallback(
    <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const saveConfig = useCallback(
    async (overrides?: Partial<SiteConfig>): Promise<boolean> => {
      setStatus("saving");
      try {
        const res = await fetch("/api/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...config, ...overrides }),
        });
        if (!res.ok) throw new Error("Save failed");
        const saved = await res.json();
        setConfig(saved);
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
        return true;
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
        return false;
      }
    },
    [config]
  );

  return { config, status, fetchConfig, updateField, saveConfig };
}
