import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_PASSWORD } from "./content";

export const ADMIN_COOKIE = "ocean-admin";

export function adminToken() {
  return createHash("sha256").update(`ocean:${ADMIN_PASSWORD}`).digest("hex");
}

export async function isAdminRequest(request?: Request) {
  if (request?.headers.get("x-ocean-admin") === ADMIN_PASSWORD) return true;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminToken();
}

export async function requireAdmin(request?: Request) {
  if (await isAdminRequest(request)) return null;
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}
