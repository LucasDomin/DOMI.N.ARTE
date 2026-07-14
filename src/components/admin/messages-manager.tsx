"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import type { ContactSubmission } from "@/db/schema";

function timeAgo(date: string | Date): string {
  const d = new Date(date);
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60) return `${diffMin}min atrás`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h atrás`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 30) return `${diffD}d atrás`;
  return d.toLocaleDateString("pt-BR");
}

function MessageCard({
  msg,
  onToggleRead,
  onDelete,
}: {
  msg: ContactSubmission;
  onToggleRead: (id: number, read: boolean) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div
      className={`p-5 rounded-xl border transition-colors ${
        msg.read ? "border-border bg-transparent" : "border-accent/30 bg-accent/[0.03]"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-lg text-fg">{msg.name}</h3>
            {msg.company && (
              <span className="text-xs text-fg-muted font-mono">· {msg.company}</span>
            )}
            {!msg.read && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            )}
          </div>
          <a href={`mailto:${msg.email}`} className="text-xs text-accent hover:underline font-mono">
            {msg.email}
          </a>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[10px] text-fg-muted font-mono whitespace-nowrap">
            {msg.createdAt ? timeAgo(msg.createdAt) : ""}
          </span>
          <button
            onClick={() => onToggleRead(msg.id, !msg.read)}
            aria-label={msg.read ? "Marcar como não lida" : "Marcar como lida"}
            className="text-fg-muted hover:text-accent transition-colors"
          >
            {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onDelete(msg.id)}
            aria-label={`Excluir mensagem de ${msg.name}`}
            className="text-fg-muted hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {msg.type && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-fg-muted border border-border px-2 py-1 rounded">
            {msg.type}
          </span>
        )}
        {msg.budget && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 px-2 py-1 rounded">
            {msg.budget}
          </span>
        )}
      </div>

      {msg.message && (
        <p className="text-sm text-fg-muted leading-relaxed">{msg.message}</p>
      )}
    </div>
  );
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleToggleRead = async (id: number, read: boolean) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
    } catch {
      // optimistic update stands
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir esta mensagem permanentemente?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
    } catch {
      // silent
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h2 className="font-display text-3xl text-fg">
            Mensagens{unreadCount > 0 && <span className="text-accent"> ({unreadCount})</span>}
          </h2>
          <p className="text-xs text-fg-muted mt-1">
            Envios do formulário de contato do site.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-bg-soft animate-pulse border border-border" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border rounded-xl">
          <p className="text-sm text-fg-muted">Nenhuma mensagem recebida ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <MessageCard key={m.id} msg={m} onToggleRead={handleToggleRead} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
