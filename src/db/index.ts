import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

/**
 * SSL is required by managed Postgres providers like Supabase, Neon, Railway.
 * We detect non-local hosts and enable SSL automatically. Local dev (127.0.0.1
 * / localhost) connects without SSL.
 */
const isLocal =
  databaseUrl.includes("127.0.0.1") ||
  databaseUrl.includes("localhost") ||
  process.env.DB_SSL === "false";

const globalForDb = globalThis as typeof globalThis & {
  __dominarteDbPool?: Pool;
};

export const pool =
  globalForDb.__dominarteDbPool ??
  new Pool({
    connectionString: databaseUrl,
    ssl: isLocal ? undefined : { rejectUnauthorized: false },
    // Serverless-friendly pool sizing (Vercel functions are short-lived)
    max: isLocal ? 10 : 1,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__dominarteDbPool = pool;
}

export const db = drizzle(pool);
