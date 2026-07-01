import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const isLocal =
  !databaseUrl ||
  databaseUrl.includes("127.0.0.1") ||
  databaseUrl.includes("localhost") ||
  process.env.DB_SSL === "false";

const globalForDb = globalThis as typeof globalThis & {
  __dominarteDbPool?: Pool | null;
};

function createPool(): Pool | null {
  if (!databaseUrl) return null;
  return new Pool({
    connectionString: databaseUrl,
    ssl: isLocal ? undefined : { rejectUnauthorized: false },
    max: isLocal ? 10 : 1,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

export const pool: Pool | null =
  globalForDb.__dominarteDbPool !== undefined
    ? globalForDb.__dominarteDbPool
    : createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__dominarteDbPool = pool;
}

export const db = pool ? drizzle(pool) : null;
