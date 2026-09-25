"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOGO_HEIGHT,
  clampLogoHeight,
  defaultContent,
  loadContent,
  loadContacts,
  loadQuotes,
  saveContacts,
  saveContent,
  saveQuotes,
  setAdminAuthenticated,
  type ContactMessage,
  type QuoteRequest,
  type SiteContent,
} from "./content";
import { persistPublicLogo } from "./logo-image";
import { cmsHeaders, getAdminSecret, setAdminSecret } from "./admin-client";

type SiteContextValue = {
  content: SiteContent;
  logo: string;
  logoHeight: number;
  quotes: QuoteRequest[];
  contacts: ContactMessage[];
  hydrated: boolean;
  authenticated: boolean;
  updateContent: (next: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  updateLogo: (dataUrl: string) => void;
  updateLogoHeight: (height: number) => void;
  clearLogo: () => void;
  addQuote: (quote: Omit<QuoteRequest, "id" | "createdAt">) => void;
  deleteQuote: (id: string) => void;
  addContact: (message: Omit<ContactMessage, "id" | "createdAt">) => void;
  deleteContact: (id: string) => void;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

type CmsPayload = {
  content?: SiteContent;
  logoHeight?: number;
  quotes?: QuoteRequest[];
  contacts?: ContactMessage[];
  authenticated?: boolean;
};

const SiteContext = createContext<SiteContextValue | null>(null);

let lastLocalWrite = 0;

async function fetchCms(): Promise<CmsPayload | null> {
  try {
    const res = await fetch("/api/cms", {
      credentials: "include",
      cache: "no-store",
      headers: cmsHeaders(false),
    });
    if (!res.ok) return null;
    return (await res.json()) as CmsPayload;
  } catch {
    return null;
  }
}

async function putCms(body: { content?: SiteContent; logoHeight?: number }) {
  const res = await fetch("/api/cms", {
    method: "PUT",
    credentials: "include",
    headers: cmsHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("cms-save-failed");
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [logo, setLogo] = useState("");
  const [logoHeight, setLogoHeight] = useState(DEFAULT_LOGO_HEIGHT);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const applyCms = useCallback((payload: CmsPayload) => {
    if (payload.content) {
      setContent(payload.content);
      saveContent(payload.content);
    }
    if (typeof payload.logoHeight === "number") {
      setLogoHeight(clampLogoHeight(payload.logoHeight));
    }
    if (payload.quotes) {
      setQuotes(payload.quotes);
      saveQuotes(payload.quotes);
    }
    if (payload.contacts) {
      setContacts(payload.contacts);
      saveContacts(payload.contacts);
    }
    if (typeof payload.authenticated === "boolean") {
      setAuthenticated(payload.authenticated);
      setAdminAuthenticated(payload.authenticated);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    getAdminSecret();
    void (async () => {
      const remote = await fetchCms();
      if (cancelled) return;
      if (remote?.content) {
        applyCms(remote);
      } else {
        setContent(loadContent());
        setQuotes(loadQuotes());
        setContacts(loadContacts());
      }
      setHydrated(true);
    })();

    const onFocus = () => {
      void fetchCms().then((remote) => {
        if (!remote?.content) return;
        if (Date.now() - lastLocalWrite < 4000) return;
        if (window.location.pathname.startsWith("/admin")) {
          applyCms({
            quotes: remote.quotes,
            contacts: remote.contacts,
            authenticated: remote.authenticated,
          });
          return;
        }
        applyCms(remote);
      });
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [applyCms]);

  const updateContent = useCallback(async (next: SiteContent) => {
    setContent(next);
    saveContent(next);
    lastLocalWrite = Date.now();
    await putCms({ content: next });
  }, []);

  const resetContent = useCallback(async () => {
    setContent(defaultContent);
    saveContent(defaultContent);
    lastLocalWrite = Date.now();
    await putCms({ content: defaultContent });
  }, []);

  const updateLogo = useCallback((dataUrl: string) => {
    setLogo(dataUrl);
    persistPublicLogo(dataUrl);
  }, []);

  const updateLogoHeight = useCallback((height: number) => {
    const nextHeight = clampLogoHeight(height);
    setLogoHeight(nextHeight);
    lastLocalWrite = Date.now();
    void putCms({ logoHeight: nextHeight });
  }, []);

  const clearLogo = useCallback(() => {
    setLogo("");
    persistPublicLogo("");
  }, []);

  const addQuote = useCallback((quote: Omit<QuoteRequest, "id" | "createdAt">) => {
    void (async () => {
      const res = await fetch("/api/cms/quotes", {
        method: "POST",
        credentials: "include",
        headers: cmsHeaders(),
        body: JSON.stringify(quote),
      });
      if (!res.ok) return;
      const created = (await res.json()) as QuoteRequest;
      setQuotes((prev) => {
        const next = [created, ...prev.filter((item) => item.id !== created.id)];
        saveQuotes(next);
        return next;
      });
    })();
  }, []);

  const deleteQuote = useCallback((id: string) => {
    setQuotes((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveQuotes(next);
      return next;
    });
    void fetch(`/api/cms/quotes?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
      headers: cmsHeaders(false),
    });
  }, []);

  const addContact = useCallback((message: Omit<ContactMessage, "id" | "createdAt">) => {
    void (async () => {
      const res = await fetch("/api/cms/contacts", {
        method: "POST",
        credentials: "include",
        headers: cmsHeaders(),
        body: JSON.stringify(message),
      });
      if (!res.ok) return;
      const created = (await res.json()) as ContactMessage;
      setContacts((prev) => {
        const next = [created, ...prev.filter((item) => item.id !== created.id)];
        saveContacts(next);
        return next;
      });
    })();
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveContacts(next);
      return next;
    });
    void fetch(`/api/cms/contacts?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
      headers: cmsHeaders(false),
    });
  }, []);

  const login = useCallback(async (password: string) => {
    const res = await fetch("/api/admin/session", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) return false;
    setAdminSecret(password);
    setAuthenticated(true);
    setAdminAuthenticated(true);
    const local = loadContent();
    const remote = await fetchCms();
    const remoteIsDefault =
      JSON.stringify(remote?.content ?? defaultContent) === JSON.stringify(defaultContent);
    const localIsCustom = JSON.stringify(local) !== JSON.stringify(defaultContent);
    if (remoteIsDefault && localIsCustom) {
      lastLocalWrite = Date.now();
      await putCms({ content: local, logoHeight });
      setContent(local);
      saveContent(local);
    } else if (remote?.content) {
      applyCms(remote);
    }
    const inbox = await fetchCms();
    if (inbox) {
      applyCms({
        quotes: inbox.quotes,
        contacts: inbox.contacts,
        authenticated: true,
        content: remoteIsDefault && localIsCustom ? local : inbox.content,
        logoHeight: inbox.logoHeight,
      });
    }
    return true;
  }, [applyCms, logoHeight]);

  const logout = useCallback(() => {
    setAuthenticated(false);
    setAdminAuthenticated(false);
    setAdminSecret("");
    void fetch("/api/admin/session", { method: "DELETE", credentials: "include" });
  }, []);

  const value = useMemo(
    () => ({
      content,
      logo,
      logoHeight,
      quotes,
      contacts,
      hydrated,
      authenticated,
      updateContent,
      resetContent,
      updateLogo,
      updateLogoHeight,
      clearLogo,
      addQuote,
      deleteQuote,
      addContact,
      deleteContact,
      login,
      logout,
    }),
    [
      content,
      logo,
      logoHeight,
      quotes,
      contacts,
      hydrated,
      authenticated,
      updateContent,
      resetContent,
      updateLogo,
      updateLogoHeight,
      clearLogo,
      addQuote,
      deleteQuote,
      addContact,
      deleteContact,
      login,
      logout,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
