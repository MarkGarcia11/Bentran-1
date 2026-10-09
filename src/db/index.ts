import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sql } from "drizzle-orm";
import * as schema from "./schema";

/**
 * The database is optional at runtime.
 * If DATABASE_URL is missing (or the DB is unreachable) the marketing
 * site still renders and the demo booking flow falls back to the
 * browser's local state — which keeps deploys on Vercel painless.
 */
const databaseUrl = process.env.DATABASE_URL;
export const isDbConfigured = Boolean(databaseUrl);

const globalForDb = globalThis as typeof globalThis & {
  __bntranPool?: Pool;
  __bntranSchemaReady?: Promise<void>;
};

function createDb() {
  if (!databaseUrl) return null;
  const pool =
    globalForDb.__bntranPool ??
    new Pool({
      connectionString: databaseUrl,
      max: 6,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 6_000,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__bntranPool = pool;
  }

  return drizzle(pool, { schema });
}

export const db = createDb();
export type Db = NonNullable<typeof db>;

/**
 * Idempotent DDL so a fresh Postgres (Neon, Supabase, local) works
 * without running `drizzle-kit push` first. Safe to call repeatedly.
 */
async function ensureTables(database: Db) {
  await database.execute(sql`
    create table if not exists "bookings" (
      "id" uuid primary key default gen_random_uuid(),
      "reference" text not null,
      "full_name" text not null,
      "phone" text not null,
      "email" text,
      "trip_date" text not null,
      "trip_time" text not null,
      "return_time" text,
      "pickup" text not null,
      "destination" text not null,
      "trip_type" text not null default 'one-way',
      "passengers" integer not null default 1,
      "vehicle_id" text not null default 'executive-sedan',
      "vehicle_name" text,
      "company" text,
      "flight_number" text,
      "notes" text,
      "status" text not null default 'New',
      "source" text not null default 'web',
      "created_at" timestamp with time zone not null default now(),
      "updated_at" timestamp with time zone not null default now()
    )
  `);
  await database.execute(sql`
    create table if not exists "messages" (
      "id" uuid primary key default gen_random_uuid(),
      "name" text not null,
      "email" text not null,
      "phone" text,
      "company" text,
      "topic" text,
      "body" text not null,
      "handled" boolean not null default false,
      "created_at" timestamp with time zone not null default now()
    )
  `);
  await database.execute(sql`
    create table if not exists "team_requests" (
      "id" uuid primary key default gen_random_uuid(),
      "name" text not null,
      "email" text not null,
      "company" text not null,
      "team_size" text,
      "monthly_rides" text,
      "notes" text,
      "created_at" timestamp with time zone not null default now()
    )
  `);
  await database.execute(sql`
    create table if not exists "site_status" (
      "id" integer primary key default 1,
      "available_today" boolean not null default true,
      "current_location" text not null default 'Arlington, VA',
      "updated_at" timestamp with time zone not null default now()
    )
  `);
  await database.execute(
    sql`insert into "site_status" ("id") values (1) on conflict ("id") do nothing`,
  );
}

export function ensureSchema(): Promise<void> {
  if (!db) return Promise.resolve();
  globalForDb.__bntranSchemaReady ??= ensureTables(db).catch(() => undefined);
  return globalForDb.__bntranSchemaReady;
}
