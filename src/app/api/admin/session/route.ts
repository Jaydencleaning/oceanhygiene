import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isAdminRequest } from "@/lib/admin-session";
import { ADMIN_PASSWORD } from "@/lib/content";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export async function GET(request: Request) {
  const ok = await isAdminRequest(request);
  return NextResponse.json({ ok });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const password =
    body && typeof body === "object" && "password" in body ? body.password : null;
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken(), cookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
