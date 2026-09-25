"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useSite } from "@/lib/site-context";
import {
  MAX_LOGO_HEIGHT,
  MIN_LOGO_HEIGHT,
  defaultContent,
  type SiteContent,
} from "@/lib/content";
import { compressLogoDataUrl } from "@/lib/logo-image";

export default function AdminPage() {
  const {
    content,
    quotes,
    contacts,
    authenticated,
    hydrated,
    login,
    logout,
    updateContent,
    resetContent,
    deleteQuote,
    deleteContact,
  } = useSite();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<SiteContent>(content);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    const ok = await login(password);
    setError(ok ? "" : "Onjuist wachtwoord.");
    setPassword("");
  }

  async function save() {
    try {
      setError("");
      await updateContent(draft);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Opslaan is niet gelukt. Log opnieuw in en probeer het nog eens.");
    }
  }

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-foam text-sm text-ocean-800">
        Laden…
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-foam px-4">
        <form
          onSubmit={onLogin}
          className="w-full max-w-md rounded-3xl border border-ocean-800/10 bg-white p-8 shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ocean-600">
            Beheer
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-ocean-950">OCEAN admin</h1>
          <p className="mt-2 text-sm text-ocean-800/70">
            Voer het wachtwoord in om teksten, contactgegevens en offertes te beheren.
            Wijzigingen gelden voor alle bezoekers van deze website, op elk apparaat.
          </p>
          <label className="mt-6 block text-sm font-medium text-ocean-900">
            Wachtwoord
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-ocean-800/12 px-3.5 py-2.5 outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/20"
            />
          </label>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-ocean-700 py-2.5 text-sm font-semibold text-white hover:bg-ocean-800"
          >
            Inloggen
          </button>
          <Link href="/" className="mt-4 block text-center text-sm text-ocean-700">
            Terug naar de website
          </Link>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-foam px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ocean-600">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold text-ocean-950">Website beheren</h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-full border border-ocean-800/15 px-4 py-2 text-sm font-medium text-ocean-800"
            >
              Bekijk site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-ocean-900 px-4 py-2 text-sm font-medium text-white"
            >
              Uitloggen
            </button>
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        {saved ? (
          <p className="mt-4 rounded-2xl bg-mint-300/50 px-4 py-3 text-sm text-ocean-900">
            Wijzigingen opgeslagen. Ze zijn zichtbaar op alle apparaten die deze website openen.
          </p>
        ) : null}

        <section className="mt-8 rounded-3xl border border-ocean-800/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-ocean-950">Bedrijfslogo</h2>
          <p className="mt-1 text-sm text-ocean-800/70">
            Upload een logo. Het wordt in de header en footer getoond én als
            bestand op de website bewaard, zodat bezoekers het ook zien. Zonder
            logo verschijnt de tekst OCEAN.
          </p>
          <LogoUpload />
        </section>

        <section className="mt-6 rounded-3xl border border-ocean-800/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-ocean-950">Contactgegevens</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextField
              label="Bedrijfsnaam"
              value={draft.companyName}
              onChange={(v) => setDraft({ ...draft, companyName: v })}
            />
            <TextField
              label="Tagline"
              value={draft.tagline}
              onChange={(v) => setDraft({ ...draft, tagline: v })}
            />
            <TextField
              label="E-mailadres"
              value={draft.email}
              onChange={(v) => setDraft({ ...draft, email: v })}
            />
            <TextField
              label="Telefoonnummer"
              value={draft.phone}
              onChange={(v) => setDraft({ ...draft, phone: v })}
            />
            <div className="sm:col-span-2">
              <TextField
                label="Adresgegevens"
                value={draft.address}
                onChange={(v) => setDraft({ ...draft, address: v })}
              />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-ocean-800/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-ocean-950">Hoofdteksten</h2>
          <div className="mt-4 grid gap-4">
            <TextArea
              label="Hero titel"
              value={draft.heroTitle}
              onChange={(v) => setDraft({ ...draft, heroTitle: v })}
            />
            <TextArea
              label="Hero ondertitel"
              value={draft.heroSubtitle}
              onChange={(v) => setDraft({ ...draft, heroSubtitle: v })}
            />
            <TextField
              label="Titel 'Voor directie'"
              value={draft.whyTitle}
              onChange={(v) => setDraft({ ...draft, whyTitle: v })}
            />
            <TextField
              label="Titel assortiment"
              value={draft.servicesTitle}
              onChange={(v) => setDraft({ ...draft, servicesTitle: v })}
            />
            <TextArea
              label="Intro assortiment"
              value={draft.servicesIntro}
              onChange={(v) => setDraft({ ...draft, servicesIntro: v })}
            />
            <TextField
              label="Titel Jayden Cleaning"
              value={draft.jaydenTitle}
              onChange={(v) => setDraft({ ...draft, jaydenTitle: v })}
            />
            <TextArea
              label="Tekst Jayden Cleaning"
              value={draft.jaydenText}
              onChange={(v) => setDraft({ ...draft, jaydenText: v })}
            />
            <TextArea
              label="Linktekst Jayden Cleaning"
              value={draft.jaydenLinkText}
              onChange={(v) => setDraft({ ...draft, jaydenLinkText: v })}
            />
            <TextField
              label="URL Jayden Cleaning"
              value={draft.jaydenUrl}
              onChange={(v) => setDraft({ ...draft, jaydenUrl: v })}
            />
            <TextField
              label="Titel offerte"
              value={draft.quoteTitle}
              onChange={(v) => setDraft({ ...draft, quoteTitle: v })}
            />
            <TextArea
              label="Intro offerte"
              value={draft.quoteIntro}
              onChange={(v) => setDraft({ ...draft, quoteIntro: v })}
            />
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-ocean-800/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-ocean-950">Directievoordelen (KPI)</h2>
          <div className="mt-4 grid gap-4">
            {draft.usps.map((usp, index) => (
              <div key={index} className="grid gap-3 rounded-2xl bg-foam p-4 sm:grid-cols-3">
                <TextField
                  label={`KPI ${index + 1} cijfer`}
                  value={usp.stat}
                  onChange={(v) => {
                    const usps = [...draft.usps];
                    usps[index] = { ...usps[index], stat: v };
                    setDraft({ ...draft, usps });
                  }}
                />
                <TextField
                  label={`KPI ${index + 1} titel`}
                  value={usp.title}
                  onChange={(v) => {
                    const usps = [...draft.usps];
                    usps[index] = { ...usps[index], title: v };
                    setDraft({ ...draft, usps });
                  }}
                />
                <TextArea
                  label={`KPI ${index + 1} tekst`}
                  value={usp.text}
                  onChange={(v) => {
                    const usps = [...draft.usps];
                    usps[index] = { ...usps[index], text: v };
                    setDraft({ ...draft, usps });
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-ocean-800/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-ocean-950">Assortiment</h2>
          <div className="mt-4 grid gap-4">
            {draft.services.map((service, index) => (
              <div key={index} className="grid gap-3 rounded-2xl bg-foam p-4 sm:grid-cols-2">
                <TextField
                  label={`${service.category} · titel`}
                  value={service.title}
                  onChange={(v) => {
                    const services = [...draft.services];
                    services[index] = { ...services[index], title: v };
                    setDraft({ ...draft, services });
                  }}
                />
                <TextArea
                  label="Tekst"
                  value={service.text}
                  onChange={(v) => {
                    const services = [...draft.services];
                    services[index] = { ...services[index], text: v };
                    setDraft({ ...draft, services });
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={save}
            className="rounded-full bg-ocean-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-ocean-800"
          >
            Opslaan
          </button>
          <button
            type="button"
            onClick={() => {
              resetContent();
              setDraft(defaultContent);
            }}
            className="rounded-full border border-ocean-800/15 px-6 py-2.5 text-sm font-medium text-ocean-800"
          >
            Standaardteksten herstellen
          </button>
        </div>

        <section className="mt-10 rounded-3xl border border-ocean-800/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-ocean-950">
            Ontvangen offerte-aanvragen ({quotes.length})
          </h2>
          {quotes.length === 0 ? (
            <p className="mt-3 text-sm text-ocean-800/70">Nog geen aanvragen.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  className="rounded-2xl border border-ocean-800/10 bg-foam p-4 text-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ocean-950">{quote.company}</p>
                      <p className="text-ocean-800/70">
                        {new Date(quote.createdAt).toLocaleString("nl-NL")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteQuote(quote.id)}
                      className="text-xs font-medium text-red-700"
                    >
                      Verwijderen
                    </button>
                  </div>
                  <dl className="mt-3 grid gap-1 text-ocean-900 sm:grid-cols-2">
                    <div>Contact: {quote.contact}</div>
                    <div>E-mail: {quote.email}</div>
                    <div>Telefoon: {quote.phone}</div>
                    <div>Adres: {quote.address}</div>
                    <div>Pandtype: {quote.buildingType || "—"}</div>
                    <div>Toiletgroepen: {quote.toiletGroups || quote.toilets || "—"}</div>
                    <div>Medewerkers: {quote.employees || "—"}</div>
                    <div className="sm:col-span-2">
                      Diensten: {quote.servicesWanted || "—"}
                    </div>
                    {quote.message ? (
                      <div className="sm:col-span-2">Bericht: {quote.message}</div>
                    ) : null}
                  </dl>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 rounded-3xl border border-ocean-800/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-ocean-950">
            Contactberichten ({contacts.length})
          </h2>
          {contacts.length === 0 ? (
            <p className="mt-3 text-sm text-ocean-800/70">Nog geen berichten.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {contacts.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-ocean-800/10 bg-foam p-4 text-sm"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-ocean-800/70">
                        {new Date(item.createdAt).toLocaleString("nl-NL")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteContact(item.id)}
                      className="text-xs font-medium text-red-700"
                    >
                      Verwijderen
                    </button>
                  </div>
                  <p className="mt-2">
                    {item.email} {item.phone ? `· ${item.phone}` : ""}
                  </p>
                  <p className="mt-2">{item.message}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function LogoUpload() {
  const { logo, logoHeight, updateLogo, updateLogoHeight, clearLogo } = useSite();
  const [error, setError] = useState("");

  function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Kies een afbeeldingsbestand.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) {
        setError("Het bestand kon niet worden gelezen.");
        return;
      }
      void (async () => {
        try {
          const png = await compressLogoDataUrl(result);
          updateLogo(png);
          setError("");
        } catch {
          setError("Het logo kon niet worden verwerkt. Kies een PNG, JPG of SVG.");
        }
      })();
    };
    reader.onerror = () => setError("Het bestand kon niet worden gelezen.");
    reader.readAsDataURL(file);
  }

  return (
    <div className="mt-4 space-y-4">
      <div
        className="flex min-h-28 w-full items-center justify-center overflow-auto rounded-2xl border border-dashed border-ocean-800/20 bg-foam p-4"
        style={{ minHeight: Math.max(112, logoHeight + 32) }}
      >
        {logo ? (
          <img
            src={logo}
            alt="Voorbeeld bedrijfslogo"
            style={{ height: logoHeight, maxHeight: logoHeight }}
            className="w-auto max-w-full object-contain"
          />
        ) : (
          <span className="text-sm text-ocean-800/50">Geen logo ingesteld</span>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <label className="block text-sm font-medium text-ocean-900">
          Logo kiezen
          <input
            type="file"
            accept="image/*"
            className="mt-1.5 block w-full text-sm text-ocean-800 file:mr-3 file:rounded-full file:border-0 file:bg-ocean-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-ocean-800"
            onChange={(e) => {
              onFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>

        <label className="block text-sm font-medium text-ocean-900">
          Logo grootte ({logoHeight}px)
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="range"
              min={MIN_LOGO_HEIGHT}
              max={MAX_LOGO_HEIGHT}
              value={logoHeight}
              onChange={(e) => updateLogoHeight(Number(e.target.value))}
              className="h-2 w-full accent-ocean-700"
            />
            <input
              type="number"
              min={MIN_LOGO_HEIGHT}
              max={MAX_LOGO_HEIGHT}
              value={logoHeight}
              onChange={(e) => updateLogoHeight(Number(e.target.value))}
              className="w-24 rounded-xl border border-ocean-800/12 px-3 py-2 font-normal outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/20"
            />
          </div>
          <span className="mt-1 block text-xs font-normal text-ocean-800/60">
            Hoogte van 30px tot 150px. Op mobiel wordt het logo tot 48px begrensd zodat de navigatie
            netjes blijft.
          </span>
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="button"
          onClick={clearLogo}
          disabled={!logo}
          className="w-fit rounded-full border border-ocean-800/15 px-4 py-2 text-sm font-medium text-ocean-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Logo verwijderen
        </button>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-ocean-900">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-ocean-800/12 px-3.5 py-2.5 font-normal outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/20"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-ocean-900">
      {label}
      <textarea
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-ocean-800/12 px-3.5 py-2.5 font-normal outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/20"
      />
    </label>
  );
}
