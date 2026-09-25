import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  DEFAULT_LOGO_HEIGHT,
  clampLogoHeight,
  normalizeSiteContent,
  type ContactMessage,
  type QuoteRequest,
  type SiteContent,
} from "./content";

export type CmsState = {
  content: SiteContent;
  logoHeight: number;
  quotes: QuoteRequest[];
  contacts: ContactMessage[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const CMS_FILE = path.join(DATA_DIR, "cms.json");
const INBOX_FILE = path.join(DATA_DIR, "inbox.json");

async function readJson(file: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as unknown;
  } catch {
    return null;
  }
}

function asQuotes(value: unknown): QuoteRequest[] {
  return Array.isArray(value) ? (value as QuoteRequest[]) : [];
}

function asContacts(value: unknown): ContactMessage[] {
  return Array.isArray(value) ? (value as ContactMessage[]) : [];
}

let memory: CmsState | null = null;

export async function readCms(): Promise<CmsState> {
  if (memory) return memory;
  const cms = await readJson(CMS_FILE);
  const inbox = await readJson(INBOX_FILE);
  const cmsObj = cms && typeof cms === "object" ? (cms as Record<string, unknown>) : {};
  const inboxObj = inbox && typeof inbox === "object" ? (inbox as Record<string, unknown>) : {};
  memory = {
    content: normalizeSiteContent(cmsObj.content),
    logoHeight: clampLogoHeight(Number(cmsObj.logoHeight ?? DEFAULT_LOGO_HEIGHT)),
    quotes: asQuotes(inboxObj.quotes),
    contacts: asContacts(inboxObj.contacts),
  };
  return memory;
}

async function writeJson(file: string, value: unknown) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function writeCms(next: CmsState) {
  memory = {
    content: next.content,
    logoHeight: clampLogoHeight(next.logoHeight),
    quotes: next.quotes,
    contacts: next.contacts,
  };
  await writeJson(CMS_FILE, {
    content: memory.content,
    logoHeight: memory.logoHeight,
  });
  await writeJson(INBOX_FILE, {
    quotes: memory.quotes,
    contacts: memory.contacts,
  });
  return memory;
}
