import { createHash } from "crypto";
import { cookies } from "next/headers";
import { ADMIN_PASSWORD } from "./content";

export const ADMIN_COOKIE = "ocean-admin";

export function adminToken() {
  return createHash("sha256").update(`ocean:${ADMIN_PASSWORD}`).digest("hex");
}

export async function isAdminRequest() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminToken();
}

export async function requireAdmin() {
  if (await isAdminRequest()) return null;
  return Response.json({ error: "unauthorized" }, { status: 401 });
}
