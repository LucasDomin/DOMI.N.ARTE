"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ADMIN_PASSWORD = "dominarte2025";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("dominarte-admin") === "auth") {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("dominarte-admin", "auth");
      router.replace("/admin");
    } else {
      setError("Senha incorreta");
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
        className="w-full max-w-sm"
      >
        <div className="mb-14 text-center">
          <div className="font-display text-2xl text-fg mb-3">
            DOMI<span className="text-accent">.</span>N<span className="text-accent">.</span>ARTE
          </div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-fg-dim font-mono">
            Área Restrita
          </div>
        </div>

        <label className="block mb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-fg-dim font-mono">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full bg-transparent border-b border-border-light py-3 text-fg outline-none focus:border-accent transition-colors"
            autoFocus
          />
        </label>

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-fg text-bg text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-accent transition-colors"
        >
          Entrar
        </button>
      </motion.form>
    </div>
  );
}
