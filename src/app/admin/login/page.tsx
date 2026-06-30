"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Senha incorreta");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="grain" />
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm relative z-10"
      >
        <div className="mb-14 text-center">
          <div className="font-display text-3xl text-fg mb-3">
            DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE
          </div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-fg-dim font-mono">
            Painel de Curadoria
          </div>
        </div>

        <label className="block mb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono">Senha de acesso</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full bg-transparent border-b border-border-light py-3 text-fg outline-none focus:border-accent transition-colors"
            autoFocus
            disabled={loading}
          />
        </label>

        {error && <p className="text-xs text-red-400 mb-4 font-mono">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-fg text-bg text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent transition-colors disabled:opacity-50"
        >
          {loading ? "Verificando…" : "Entrar"}
        </button>

        <p className="mt-8 text-center text-[9px] tracking-[0.2em] uppercase text-fg-dim font-mono">
          Sessão protegida · Cookie httpOnly assinado
        </p>
      </motion.form>
    </div>
  );
}
