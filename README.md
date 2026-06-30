# DOMI.N.ARTE — Plataforma Autoral

Portfólio cinematográfico + CMS administrativo. Site público artístico em 5
momentos (Impacto → Manifesto → Obras → Processo → Convite) com painel de
curadoria completo em `/admin`.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Drizzle ORM ·
PostgreSQL/Supabase · Framer Motion · Lenis.

---

## Desenvolvimento local

```bash
npm install
cp .env.example .env.local      # ajuste as variáveis
npx drizzle-kit push            # cria as tabelas
npm run dev
```

A primeira chamada a `/api/health` popula o banco com obras de exemplo
(idempotente — só roda se estiver vazio).

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin` (senha = `ADMIN_PASSWORD`)

---

## Deploy na Vercel + Supabase

### 1. Banco de dados (Supabase)
1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **Project Settings → Database → Connection string**, copie a string do
   **pooler de transação** (porta `6543`) e adicione `?pgbouncer=true&connection_limit=1`.
3. Use-a como `DATABASE_URL`.
4. Rode as migrações apontando para o Supabase:
   ```bash
   DATABASE_URL="sua-string-supabase" npx drizzle-kit push
   ```

### 2. Storage de imagens (Supabase Storage)
1. Em **Storage**, crie um bucket **público** chamado `dominarte`.
2. Copie `Project URL`, `anon key` e `service_role key` em
   **Settings → API**.
3. Preencha `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e
   `SUPABASE_SERVICE_ROLE_KEY`.

Sem essas variáveis, uploads caem no modo base64 (apenas dev, limite 2.5MB).

### 3. Vercel
1. Importe o repositório na Vercel.
2. Em **Settings → Environment Variables**, adicione tudo do `.env.example`:
   - `DATABASE_URL`
   - `AUTH_SECRET` → gere com `openssl rand -hex 32`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
     `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`
3. Deploy. O `vercel.json` já define região (gru1/São Paulo) e timeout das
   funções.

---

## Segurança

- **Auth:** sessão via cookie `httpOnly` assinado com HMAC-SHA256 (`AUTH_SECRET`).
  Middleware protege `/admin` e todas as operações de escrita (`POST/PUT/DELETE`)
  nas APIs. Leituras públicas (`GET`) permanecem abertas.
- **Migração para Supabase Auth:** os helpers em `src/lib/auth.ts` e o
  `src/lib/supabase.ts` estão isolados para troca trivial por multi-usuário.

---

## Estrutura

```
src/
├── app/
│   ├── page.tsx              # Site público (5 momentos)
│   ├── work/[slug]/          # Página individual de obra (+ generateMetadata SEO)
│   ├── admin/                # Dashboard + login
│   └── api/                  # auth · projects · config · upload · health
├── components/               # hero parallax, manifesto, obras, processo, etc.
├── db/                       # schema + conexão (SSL automático)
└── lib/                      # auth · supabase · defaults · seed
```
