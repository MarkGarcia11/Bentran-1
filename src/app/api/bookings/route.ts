import { NextResponse } from "next/server";
import { desc, eq, sql } from "drizzle-orm";
import { bookings } from "@/db/schema";
import { db, ensureSchema } from "@/db";
import { EMPTY_DRAFT, type BookingDraft } from "@/lib/booking";
import { generateReference } from "@/lib/utils";

export const dynamic = "force-dynamic";

type BookingResponse = {
  id: string;
  reference: string;
  status: string;
  createdAt: string;
} & BookingDraft;

function map(row: typeof bookings.$inferSelect): BookingResponse {
  return {
    id: row.id,
    reference: row.reference,
    fullName: row.fullName,
    phone: row.phone,
    email: row.email ?? "",
    date: row.tripDate,
    time: row.tripTime,
    returnTime: row.returnTime ?? "",
    pickup: row.pickup,
    destination: row.destination,
    tripType: (row.tripType as BookingDraft["tripType"]) ?? "one-way",
    passengers: row.passengers,
    vehicleId: row.vehicleId,
    company: row.company ?? "",
    flightNumber: row.flightNumber ?? "",
    notes: row.notes ?? "",
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function GET() {
  if (!db) {
    return NextResponse.json({ ok: false, reason: "database-not-configured", bookings: [] });
  }
  try {
    await ensureSchema();
    const rows = await db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(100);
    return NextResponse.json({ ok: true, bookings: rows.map(map) });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      reason: error instanceof Error ? error.message : "database-error",
      bookings: [],
    });
  }
}

export async function POST(request: Request) {
  let payload: Partial<BookingDraft>;
  try {
    payload = (await request.json()) as Partial<BookingDraft>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const draft: BookingDraft = { ...EMPTY_DRAFT, ...payload };

  if (!draft.fullName?.trim() || !draft.pickup?.trim() || !draft.destination?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, pickup and destination are required." },
      { status: 400 },
    );
  }

  if (!db) {
    // No database configured — still hand back a reference so the demo works.
    return NextResponse.json({
      ok: true,
      stored: false,
      booking: {
        id: `local-${Date.now()}`,
        reference: generateReference(null),
        status: "New",
        createdAt: new Date().toISOString(),
        ...draft,
      },
    });
  }

  try {
    await ensureSchema();
    const countRows = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(bookings);
    const nextSeq = (countRows[0]?.count ?? 0) + 1;
    const reference = generateReference(nextSeq);

    const inserted = await db
      .insert(bookings)
      .values({
        reference,
        fullName: draft.fullName.trim(),
        phone: draft.phone.trim(),
        email: draft.email?.trim() || null,
        tripDate: draft.date,
        tripTime: draft.time,
        returnTime: draft.returnTime || null,
        pickup: draft.pickup.trim(),
        destination: draft.destination.trim(),
        tripType: draft.tripType,
        passengers: draft.passengers,
        vehicleId: draft.vehicleId,
        vehicleName: null,
        company: draft.company?.trim() || null,
        flightNumber: draft.flightNumber?.trim() || null,
        notes: draft.notes?.trim() || null,
        status: "New",
        source: "web",
      })
      .returning();

    const row = inserted[0];
    if (!row) throw new Error("insert-failed");

    return NextResponse.json({ ok: true, stored: true, booking: map(row) });
  } catch (error) {
    return NextResponse.json({
      ok: true,
      stored: false,
      reason: error instanceof Error ? error.message : "database-error",
      booking: {
        id: `local-${Date.now()}`,
        reference: generateReference(null),
        status: "New",
        createdAt: new Date().toISOString(),
        ...draft,
      },
    });
  }
}
