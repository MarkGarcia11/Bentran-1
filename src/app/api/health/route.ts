import { db, ensureSchema, isDbConfigured } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db || !isDbConfigured) {
    return Response.json({ ok: true, database: false });
  }
  try {
    await ensureSchema();
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: true });
  } catch {
    return Response.json({ ok: true, database: false });
  }
}
