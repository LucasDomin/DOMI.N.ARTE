"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, GripVertical, Eye, EyeOff, Plus, Upload } from "lucide-react";
import type { Client } from "@/db/schema";

// ─── Single row: editable name, logo, link, order, visibility ────────────────
function ClientRow({
  client,
  onUpdate,
  onDelete,
}: {
  client: Client;
  onUpdate: (id: number, data: Partial<Client>) => void;
  onDelete: (id: number) => void;
}) {
  const [local, setLocal] = useState(client);
  const [uploading, setUploading] = useState(false);

  useEffect(() => setLocal(client), [client]);

  const commit = (field: keyof Client, value: unknown) => {
    setLocal((l) => ({ ...l, [field]: value }));
  };

  const save = () => {
    onUpdate(client.id, {
      name: local.name,
      logoUrl: local.logoUrl,
      link: local.link,
    });
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        commit("logoUrl", data.url);
        onUpdate(client.id, { logoUrl: data.url });
      }
    } catch {
      // silent fail — user can retry
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-soft/20 border border-border group">
      <GripVertical className="w-4 h-4 text-fg-dim/40 flex-shrink-0 cursor-grab" />

      {/* Logo preview + upload */}
      <div className="relative flex-shrink-0">
        <label className="w-14 h-14 rounded-lg bg-bg-elevated border border-border flex items-center justify-center cursor-pointer overflow-hidden hover:border-accent/50 transition-colors">
          {local.logoUrl ? (
            <img src={local.logoUrl} alt="" className="w-full h-full object-contain p-1.5" />
          ) : (
            <Upload className="w-4 h-4 text-fg-dim" />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
        </label>
        {uploading && (
          <div className="absolute inset-0 bg-bg/80 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 border border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Name */}
      <input
        type="text"
        value={local.name}
        onChange={(e) => commit("name", e.target.value)}
        onBlur={save}
        placeholder="Nome do cliente"
        className="flex-1 min-w-0 bg-transparent border-b border-border focus:border-accent outline-none py-1.5 text-sm text-fg placeholder:text-fg-dim/40 transition-colors"
      />

      {/* Link */}
      <input
        type="url"
        value={local.link ?? ""}
        onChange={(e) => commit("link", e.target.value)}
        onBlur={save}
        placeholder="https://..."
        className="flex-1 min-w-0 bg-transparent border-b border-border focus:border-accent outline-none py-1.5 text-sm text-fg-muted placeholder:text-fg-dim/40 transition-colors font-mono"
      />

      {/* Visibility toggle */}
      <button
        onClick={() => onUpdate(client.id, { visible: !client.visible })}
        title={client.visible ? "Ocultar da barra" : "Mostrar na barra"}
        className="flex-shrink-0 text-fg-dim hover:text-accent transition-colors"
      >
        {client.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(client.id)}
        className="flex-shrink-0 text-fg-dim hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main manager ──────────────────────────────────────────────────────────────
export default function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/clients?includeHidden=true");
      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch {
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Novo Cliente", logoUrl: "", link: "", order: clients.length }),
      });
      const created = await res.json();
      setClients((prev) => [...prev, created]);
    } catch {
      // silent
    }
  };

  const handleUpdate = async (id: number, data: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    try {
      await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // revert on failure could be added here
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remover este cliente da lista?")) return;
    setClients((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`/api/clients/${id}`, { method: "DELETE" });
    } catch {
      // silent
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h2 className="font-display text-3xl text-fg">Barra de Clientes</h2>
          <p className="text-xs text-fg-dim mt-1">
            Logos exibidos na barra rolante da home. Clique na logo para trocar a imagem.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent-hover transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar Cliente
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[72px] rounded-xl bg-bg-soft animate-pulse border border-border" />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border rounded-xl">
          <p className="text-sm text-fg-muted mb-4">Nenhum cliente cadastrado ainda.</p>
          <button
            onClick={handleCreate}
            className="text-xs font-mono tracking-[0.2em] uppercase text-accent hover:text-fg transition-colors"
          >
            + Adicionar o primeiro
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {clients.map((c) => (
            <ClientRow key={c.id} client={c} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <p className="text-[10px] text-fg-dim font-mono pt-2">
        Dica: deixe o campo de link vazio se não quiser que a logo seja clicável. Logos ocultas (ícone de olho fechado) não aparecem na barra pública.
      </p>
    </div>
  );
}
