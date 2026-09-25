import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import { readCms, writeCms } from "@/lib/cms-store";
import type { QuoteRequest } from "@/lib/content";

export const runtime = "nodejs";

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const payload = body as Record<string, unknown>;
  const quote: QuoteRequest = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    company: asString(payload.company),
    contact: asString(payload.contact),
    email: asString(payload.email),
    phone: asString(payload.phone),
    address: asString(payload.address),
    toilets: asString(payload.toilets),
    buildingType: asString(payload.buildingType),
    toiletGroups: asString(payload.toiletGroups),
    employees: asString(payload.employees),
    servicesWanted: asString(payload.servicesWanted),
    message: asString(payload.message),
  };
  const current = await readCms();
  await writeCms({
    ...current,
    quotes: [quote, ...current.quotes],
  });
  return NextResponse.json(quote, { status: 201 });
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const current = await readCms();
  await writeCms({
    ...current,
    quotes: current.quotes.filter((item) => item.id !== id),
  });
  return NextResponse.json({ ok: true });
}
