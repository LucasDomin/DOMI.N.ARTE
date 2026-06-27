"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "dominarte2025";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("dominarte-admin") === "auth") {
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
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-10">
          <div className="text-lg font-black tracking-tight font-display text-fg">
            DOMI<span className="text-accent">.</span>N
            <span className="text-accent">.</span>ARTE
          </div>
          <div className="mt-2 text-xs tracking-[0.3em] uppercase text-fg-dim font-mono">Área Restrita</div>
        </div>

        <label className="block mb-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full bg-transparent border-b border-border py-3 text-fg outline-none focus:border-accent transition-colors"
            autoFocus
          />
        </label>

        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-accent text-white text-xs font-bold tracking-[0.1em] uppercase hover:bg-accent-hover transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
