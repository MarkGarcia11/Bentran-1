import { NextResponse } from "next/server";
import { eq, or, sql } from "drizzle-orm";
import { bookings } from "@/db/schema";
import { db, ensureSchema } from "@/db";
import { STATUSES, type BookingStatus } from "@/lib/booking";

export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Accept either the row id (uuid) or the human reference (BN-2026-0001). */
function whereClause(id: string) {
  return UUID.test(id)
    ? or(eq(bookings.id, id), eq(bookings.reference, id))
    : eq(bookings.reference, id);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: { status?: string };
  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const status = body.status as BookingStatus | undefined;
  if (!status || !STATUSES.includes(status)) {
    return NextResponse.json(
      { ok: false, error: `Status must be one of: ${STATUSES.join(", ")}.` },
      { status: 400 },
    );
  }

  if (!db) {
    return NextResponse.json({ ok: true, stored: false, id, status });
  }

  try {
    await ensureSchema();
    await db.update(bookings).set({ status, updatedAt: sql`now()` }).where(whereClause(id));
    return NextResponse.json({ ok: true, stored: true, id, status });
  } catch {
    return NextResponse.json({ ok: true, stored: false, id, status });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!db) return NextResponse.json({ ok: true, stored: false });
  try {
    await ensureSchema();
    await db.delete(bookings).where(whereClause(id));
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: true, stored: false });
  }
}
