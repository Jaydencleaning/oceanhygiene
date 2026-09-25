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
  ADMIN_PASSWORD,
  AUTH_KEY,
  CONTACTS_KEY,
  CONTENT_KEY,
  DEFAULT_LOGO_HEIGHT,
  LOGO_KEY,
  QUOTES_KEY,
  clampLogoHeight,
  defaultContent,
  isAdminAuthenticated,
  loadContacts,
  loadContent,
  loadLogo,
  loadQuotes,
  saveContacts,
  saveContent,
  saveLogo,
  saveQuotes,
  setAdminAuthenticated,
  type ContactMessage,
  type QuoteRequest,
  type SiteContent,
} from "./content";
import { compressLogoDataUrl, persistPublicLogo } from "./logo-image";

type SiteContextValue = {
  content: SiteContent;
  logo: string;
  logoHeight: number;
  quotes: QuoteRequest[];
  contacts: ContactMessage[];
  hydrated: boolean;
  authenticated: boolean;
  updateContent: (next: SiteContent) => void;
  resetContent: () => void;
  updateLogo: (dataUrl: string) => void;
  updateLogoHeight: (height: number) => void;
  clearLogo: () => void;
  addQuote: (quote: Omit<QuoteRequest, "id" | "createdAt">) => void;
  deleteQuote: (id: string) => void;
  addContact: (message: Omit<ContactMessage, "id" | "createdAt">) => void;
  deleteContact: (id: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [logo, setLogo] = useState("");
  const [logoHeight, setLogoHeight] = useState(DEFAULT_LOGO_HEIGHT);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setContent(loadContent());
    const stored = loadLogo();
    setLogo(stored.dataUrl);
    setLogoHeight(stored.height);
    setQuotes(loadQuotes());
    setContacts(loadContacts());
    setAuthenticated(isAdminAuthenticated());
    setHydrated(true);
    if (stored.dataUrl) {
      void (async () => {
        try {
          const png = stored.dataUrl.startsWith("data:image/png")
            ? stored.dataUrl
            : await compressLogoDataUrl(stored.dataUrl);
          persistPublicLogo(png);
          if (png !== stored.dataUrl) {
            setLogo(png);
            saveLogo({ dataUrl: png, height: stored.height });
          }
        } catch {
          persistPublicLogo(stored.dataUrl);
        }
      })();
    }

    const refreshLogo = () => {
      const next = loadLogo();
      setLogo(next.dataUrl);
      setLogoHeight(next.height);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === CONTENT_KEY) setContent(loadContent());
      if (event.key === null || event.key === LOGO_KEY) refreshLogo();
      if (event.key === null || event.key === QUOTES_KEY) setQuotes(loadQuotes());
      if (event.key === null || event.key === CONTACTS_KEY) setContacts(loadContacts());
      if (event.key === null || event.key === AUTH_KEY) setAuthenticated(isAdminAuthenticated());
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("ocean-logo-change", refreshLogo);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ocean-logo-change", refreshLogo);
    };
  }, []);

  const updateContent = useCallback((next: SiteContent) => {
    setContent(next);
    saveContent(next);
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultContent);
    saveContent(defaultContent);
  }, []);

  const updateLogo = useCallback((dataUrl: string) => {
    setLogo(dataUrl);
    persistPublicLogo(dataUrl);
    setLogoHeight((height) => {
      try {
        saveLogo({ dataUrl, height });
      } catch {
        // Quota: the public file still holds the logo for the site.
      }
      return height;
    });
  }, []);

  const updateLogoHeight = useCallback((height: number) => {
    const nextHeight = clampLogoHeight(height);
    setLogoHeight(nextHeight);
    setLogo((dataUrl) => {
      try {
        saveLogo({ dataUrl, height: nextHeight });
      } catch {
        // Keep the in-memory logo if localStorage is full.
      }
      return dataUrl;
    });
  }, []);

  const clearLogo = useCallback(() => {
    setLogo("");
    persistPublicLogo("");
    setLogoHeight((height) => {
      try {
        saveLogo({ dataUrl: "", height });
      } catch {
        // ignore storage errors on clear
      }
      return height;
    });
  }, []);

  const addQuote = useCallback((quote: Omit<QuoteRequest, "id" | "createdAt">) => {
    setQuotes((prev) => {
      const next = [
        { ...quote, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        ...prev,
      ];
      saveQuotes(next);
      return next;
    });
  }, []);

  const deleteQuote = useCallback((id: string) => {
    setQuotes((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveQuotes(next);
      return next;
    });
  }, []);

  const addContact = useCallback((message: Omit<ContactMessage, "id" | "createdAt">) => {
    setContacts((prev) => {
      const next = [
        { ...message, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        ...prev,
      ];
      saveContacts(next);
      return next;
    });
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveContacts(next);
      return next;
    });
  }, []);

  const login = useCallback((password: string) => {
    const ok = password === ADMIN_PASSWORD;
    if (ok) {
      setAdminAuthenticated(true);
      setAuthenticated(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    setAdminAuthenticated(false);
    setAuthenticated(false);
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
