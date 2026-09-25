import { NextResponse } from "next/server";
import { isAdminRequest, requireAdmin } from "@/lib/admin-session";
import { clampLogoHeight, normalizeSiteContent } from "@/lib/content";
import { readCms, writeCms } from "@/lib/cms-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const state = await readCms();
  const admin = await isAdminRequest(request);
  return NextResponse.json({
    content: state.content,
    logoHeight: state.logoHeight,
    quotes: admin ? state.quotes : [],
    contacts: admin ? state.contacts : [],
    authenticated: admin,
  });
}

export async function PUT(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
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
  const current = await readCms();
  try {
    const next = await writeCms({
      ...current,
      content:
        "content" in payload ? normalizeSiteContent(payload.content) : current.content,
      logoHeight:
        "logoHeight" in payload
          ? clampLogoHeight(Number(payload.logoHeight))
          : current.logoHeight,
    });
    return NextResponse.json({
      content: next.content,
      logoHeight: next.logoHeight,
    });
  } catch {
    return NextResponse.json(
      { error: "save-failed", content: current.content, logoHeight: current.logoHeight },
      { status: 503 },
    );
  }
}
