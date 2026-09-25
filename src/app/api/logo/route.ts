import { unlink, writeFile } from "fs/promises";
import path from "path";

const LOGO_FILE = path.join(process.cwd(), "public", "logo.png");
const MAX_BYTES = 1_500_000;

function pngFromDataUrl(dataUrl: unknown): Buffer | null {
  if (typeof dataUrl !== "string") return null;
  const match = /^data:image\/png;base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl);
  if (!match) return null;
  const buffer = Buffer.from(match[1].replace(/\s/g, ""), "base64");
  if (buffer.length < 8 || buffer.length > MAX_BYTES) return null;
  if (buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") return null;
  return buffer;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  const dataUrl =
    body && typeof body === "object" && "dataUrl" in body ? body.dataUrl : null;
  const buffer = pngFromDataUrl(dataUrl);
  if (!buffer) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  try {
    await writeFile(LOGO_FILE, buffer);
    return Response.json({ src: "/logo.png" });
  } catch {
    return Response.json({ src: null }, { status: 200 });
  }
}

export async function DELETE() {
  try {
    await unlink(LOGO_FILE);
  } catch {
    // already missing
  }
  return Response.json({ ok: true });
}
