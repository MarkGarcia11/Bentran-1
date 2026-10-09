import { NextResponse } from "next/server";
import { messages, teamRequests } from "@/db/schema";
import { db, ensureSchema } from "@/db";
import { isValidEmail } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Payload = {
  kind?: "message" | "team";
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  topic?: string;
  body?: string;
  teamSize?: string;
  monthlyRides?: string;
  notes?: string;
};

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please add an email so Ben can reply." },
      { status: 400 },
    );
  }

  if (!db) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    await ensureSchema();
    if (payload.kind === "team") {
      const company = (payload.company ?? "").trim();
      if (company.length < 2) {
        return NextResponse.json(
          { ok: false, error: "Please add your company name." },
          { status: 400 },
        );
      }
      await db.insert(teamRequests).values({
        name,
        email,
        company,
        teamSize: payload.teamSize?.trim() || null,
        monthlyRides: payload.monthlyRides?.trim() || null,
        notes: payload.notes?.trim() || payload.body?.trim() || null,
      });
      return NextResponse.json({ ok: true, stored: true });
    }

    await db.insert(messages).values({
      name,
      email,
      phone: payload.phone?.trim() || null,
      company: payload.company?.trim() || null,
      topic: payload.topic?.trim() || null,
      body: (payload.body ?? payload.notes ?? "").trim() || "(no message)",
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: true, stored: false });
  }
}
