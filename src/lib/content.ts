export type UspItem = {
  stat: string;
  title: string;
  text: string;
};

export type ServiceItem = {
  category: string;
  title: string;
  text: string;
};

export type SiteContent = {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  whyTitle: string;
  usps: UspItem[];
  servicesTitle: string;
  servicesIntro: string;
  services: ServiceItem[];
  jaydenTitle: string;
  jaydenText: string;
  jaydenLinkText: string;
  jaydenUrl: string;
  quoteTitle: string;
  quoteIntro: string;
};

export type QuoteRequest = {
  id: string;
  createdAt: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  toilets: string;
  buildingType: string;
  toiletGroups: string;
  employees: string;
  servicesWanted: string;
  message: string;
};

export type ContactMessage = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const ADMIN_PASSWORD = "Ocean2026!";
export const AUTH_KEY = "ocean-admin-auth";
export const CONTENT_KEY = "ocean-site-content-v2";
export const QUOTES_KEY = "ocean-quote-requests";
export const CONTACTS_KEY = "ocean-contact-messages";
export const LOGO_KEY = "ocean-site-logo";
export const SITE_URL = "https://oceanhygiene.nl";

export const defaultContent: SiteContent = {
  companyName: "OCEAN",
  tagline: "Hygiene Solutions",
  email: "info@oceanhygiene.nl",
  phone: "024 - XX XX XXX",
  address: "Van Rosenburgweg 200, 6537 TM Nijmegen",
  heroTitle: "Sanitaire hygiëne zonder investering, zonder onderbreking.",
  heroSubtitle:
    "OCEAN ontzorgt CEO, directie en facilitair management: dispensers in bruikleen, vaste bevoorrading en één aanspreekpunt. Scherpere tarieven dan traditionele leveranciers, meetbaar in continuïteit en uitstraling van uw pand.",
  whyTitle: "Wat dit oplevert voor de directie",
  usps: [
    {
      stat: "0%",
      title: "Investeringskosten",
      text: "Alle dispensers worden kosteloos geleverd, geplaatst en in bruikleen gehouden. Geen capex, geen afschrijving op hardware.",
    },
    {
      stat: "24/7",
      title: "Gegarandeerde continuïteit",
      text: "Vaste leveringsmomenten op contract. Uw organisatie komt niet zonder papier, zeep of desinfectie te zitten.",
    },
    {
      stat: "20%",
      title: "Tot 20% kostenbesparing",
      text: "Scherpere tarieven en efficiënter doseringsgebruik dan traditionele aanbieders. Geen langdurige wurgcontracten.",
    },
    {
      stat: "1",
      title: "Aanspreekpunt voor sanitair én schoonmaak",
      text: "OCEAN plus Jayden Cleaning: hygiëneservice en dagelijkse of periodieke schoonmaak. Eén factuur, één verantwoordelijke.",
    },
  ],
  servicesTitle: "Assortiment dispensers, verbruiksartikelen en service",
  servicesIntro:
    "Volledig overzicht van wat wij leveren en bevoorraden. Opname op locatie, daarna een passende mix van systemen en verbruik. Alles op vaste tijden, met voorraadzekerheid.",
  services: [
    {
      category: "dispensers",
      title: "Handdoekdispensers",
      text: "Papier- en stofrolautomaat. Sensorgestuurd of handmatig. Bruikleen: levering en plaatsing zonder aanschafkosten.",
    },
    {
      category: "dispensers",
      title: "Zeep- & desinfectiedispensers",
      text: "Schuimzeep, vloeibare zeep, handdesinfectie en automatische no-touch systemen. Juiste dosering, minder verspilling.",
    },
    {
      category: "dispensers",
      title: "Toiletpapierdispensers",
      text: "Duo-rolhouder, doprol-dispensers en jumbo-rolsystemen. Minder wisselmomenten, minder storingen op de werkvloer.",
    },
    {
      category: "dispensers",
      title: "Luchtverfrissing",
      text: "Automatische geurdispensers voor een continue, neutrale geurbeleving in sanitaire ruimtes.",
    },
    {
      category: "dispensers",
      title: "Damesverbandcontainers",
      text: "Hygiënische afvalbakken met contactloze sensor en geurneutralisatie. Inclusief vervanging en afvoer volgens contract.",
    },
    {
      category: "verbruik",
      title: "Papierwaren",
      text: "Toiletpapier 2-laags, 3-laags en gerecycled. Vouwhanddoekjes, keukenrollen en poetsrollen. Afgestemd op volume en gebruik.",
    },
    {
      category: "verbruik",
      title: "Zeep & hygiëne",
      text: "Schuimzeepvullingen, desinfectiegel en desinfectiesprays. Passend op de geplaatste dispensers, zodat u niet mix-and-match hoeft te kopen.",
    },
    {
      category: "verbruik",
      title: "Afvalbeheer",
      text: "Afvalzakken in alle formaten: pedaalemmerzakjes, containerzakken en biologisch afbreekbare opties. Vaste voorraad, vaste specificatie.",
    },
    {
      category: "entree",
      title: "Schoon- & inloopmatten",
      text: "Professionele matten met vaste wissel- en wasservice. Vuil en vocht blijven buiten. Minder slijtage op vloeren, schonere entree.",
    },
  ],
  jaydenTitle: "Totaalontzorging: sanitair plus schoonmaak",
  jaydenText:
    "Unieke combinatie: OCEAN voor sanitaire hygiëneservice en verbruiksartikelen, Jayden Cleaning voor dagelijkse of periodieke schoonmaak van het pand. Eén aanspreekpunt, één factuur, één kwaliteitslijn voor de uitstraling van uw gebouw.",
  jaydenLinkText: "Bekijk de schoonmaakdienst van Jayden Cleaning",
  jaydenUrl: "https://jaydencleaning.nl",
  quoteTitle: "Aanvraag voor uw locatie",
  quoteIntro:
    "Wij komen langs, nemen sanitaire ruimtes, volumes en looproutes op, en sturen een offerte met tarieven, leveringsritme en bruikleen van dispensers. Geen vrijblijvende brochure, een werkbaar voorstel.",
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeContent(base: SiteContent, incoming: Partial<SiteContent>): SiteContent {
  return {
    ...base,
    ...incoming,
    usps: base.usps.map((item, i) => ({ ...item, ...incoming.usps?.[i] })),
    services: base.services.map((item, i) => ({ ...item, ...incoming.services?.[i] })),
  };
}

function scrubCompetitorNames<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/\s*zoals CWS/gi, "")
      .replace(/dan CWS/gi, "dan de concurrentie")
      .replace(/\bCWS\b/gi, "de concurrentie") as T;
  }
  if (Array.isArray(value)) return value.map((item) => scrubCompetitorNames(item)) as T;
  if (isObject(value)) {
    const next: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      next[key] = scrubCompetitorNames(nested);
    }
    return next as T;
  }
  return value;
}

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = window.localStorage.getItem(CONTENT_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as unknown;
    if (!isObject(parsed)) return defaultContent;
    return scrubCompetitorNames(
      mergeContent(defaultContent, parsed as Partial<SiteContent>),
    );
  } catch {
    return defaultContent;
  }
}

export function saveContent(content: SiteContent) {
  window.localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
}

export function loadQuotes(): QuoteRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(QUOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as QuoteRequest[]) : [];
  } catch {
    return [];
  }
}

export function saveQuotes(quotes: QuoteRequest[]) {
  window.localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

export function loadContacts(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CONTACTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as ContactMessage[]) : [];
  } catch {
    return [];
  }
}

export function saveContacts(messages: ContactMessage[]) {
  window.localStorage.setItem(CONTACTS_KEY, JSON.stringify(messages));
}

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function setAdminAuthenticated(value: boolean) {
  if (value) window.localStorage.setItem(AUTH_KEY, "1");
  else window.localStorage.removeItem(AUTH_KEY);
}

export const DEFAULT_LOGO_HEIGHT = 46;
export const MIN_LOGO_HEIGHT = 30;
export const MAX_LOGO_HEIGHT = 150;

export type LogoState = {
  dataUrl: string;
  height: number;
};

export function clampLogoHeight(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_LOGO_HEIGHT;
  return Math.min(MAX_LOGO_HEIGHT, Math.max(MIN_LOGO_HEIGHT, Math.round(value)));
}

export function loadLogo(): LogoState {
  if (typeof window === "undefined") {
    return { dataUrl: "", height: DEFAULT_LOGO_HEIGHT };
  }
  try {
    const raw = window.localStorage.getItem(LOGO_KEY);
    if (!raw) return { dataUrl: "", height: DEFAULT_LOGO_HEIGHT };
    if (raw.startsWith("data:")) {
      return { dataUrl: raw, height: DEFAULT_LOGO_HEIGHT };
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!isObject(parsed)) return { dataUrl: "", height: DEFAULT_LOGO_HEIGHT };
    const dataUrl = typeof parsed.dataUrl === "string" ? parsed.dataUrl : "";
    const height = clampLogoHeight(Number(parsed.height));
    return { dataUrl, height };
  } catch {
    return { dataUrl: "", height: DEFAULT_LOGO_HEIGHT };
  }
}

export function saveLogo(state: LogoState) {
  window.localStorage.setItem(
    LOGO_KEY,
    JSON.stringify({
      dataUrl: state.dataUrl,
      height: clampLogoHeight(state.height),
    }),
  );
  window.dispatchEvent(new Event("ocean-logo-change"));
}
