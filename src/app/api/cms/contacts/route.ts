import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import { readCms, writeCms } from "@/lib/cms-store";
import type { ContactMessage } from "@/lib/content";

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
  const message: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: asString(payload.name),
    email: asString(payload.email),
    phone: asString(payload.phone),
    message: asString(payload.message),
  };
  const current = await readCms();
  await writeCms({
    ...current,
    contacts: [message, ...current.contacts],
  });
  return NextResponse.json(message, { status: 201 });
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const current = await readCms();
  await writeCms({
    ...current,
    contacts: current.contacts.filter((item) => item.id !== id),
  });
  return NextResponse.json({ ok: true });
}
