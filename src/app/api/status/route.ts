import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { siteStatus } from "@/db/schema";
import { db, ensureSchema } from "@/db";

export const dynamic = "force-dynamic";

const FALLBACK = {
  availableToday: true,
  currentLocation: "Arlington, VA — between two morning runs", // PLACEHOLDER
  updatedAt: new Date(0).toISOString(),
};

export async function GET() {
  if (!db) return NextResponse.json({ ok: true, stored: false, status: FALLBACK });
  try {
    await ensureSchema();
    const rows = await db.select().from(siteStatus).where(eq(siteStatus.id, 1)).limit(1);
    const row = rows[0];
    return NextResponse.json({
      ok: true,
      stored: true,
      status: row
        ? {
            availableToday: row.availableToday,
            currentLocation: row.currentLocation,
            updatedAt: row.updatedAt.toISOString(),
          }
        : FALLBACK,
    });
  } catch {
    return NextResponse.json({ ok: true, stored: false, status: FALLBACK });
  }
}

export async function PUT(request: Request) {
  let body: { availableToday?: boolean; currentLocation?: string };
  try {
    body = (await request.json()) as { availableToday?: boolean; currentLocation?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!db) {
    return NextResponse.json({
      ok: true,
      stored: false,
      status: { ...FALLBACK, ...body, updatedAt: new Date().toISOString() },
    });
  }

  try {
    await ensureSchema();
    const updated = await db
      .update(siteStatus)
      .set({
        ...(typeof body.availableToday === "boolean"
          ? { availableToday: body.availableToday }
          : {}),
        ...(typeof body.currentLocation === "string"
          ? { currentLocation: body.currentLocation.slice(0, 140) }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(siteStatus.id, 1))
      .returning();

    const row = updated[0];
    return NextResponse.json({
      ok: true,
      stored: true,
      status: row
        ? {
            availableToday: row.availableToday,
            currentLocation: row.currentLocation,
            updatedAt: row.updatedAt.toISOString(),
          }
        : FALLBACK,
    });
  } catch {
    return NextResponse.json({
      ok: true,
      stored: false,
      status: { ...FALLBACK, ...body, updatedAt: new Date().toISOString() },
    });
  }
}
