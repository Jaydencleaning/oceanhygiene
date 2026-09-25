"use client";

import { FormEvent, useState } from "react";
import { useSite } from "@/lib/site-context";

const buildingTypes = [
  "Kantoor",
  "Productie / industrie",
  "Onderwijs",
  "Zorg",
  "Horeca",
  "Overheid",
  "Retail",
  "Overig",
];

const serviceOptions = [
  "Sanitaire dispensers (bruikleen)",
  "Verbruiksartikelen (papier, zeep, desinfectie, afvalzakken)",
  "Inloopmatten (wissel- en wasservice)",
  "Schoonmaak via Jayden Cleaning",
];

export function QuoteForm() {
  const { addQuote } = useSite();
  const [sent, setSent] = useState(false);
  const [services, setServices] = useState<string[]>([]);

  function toggleService(label: string) {
    setServices((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label],
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const toiletGroups = String(data.get("toiletGroups") || "");
    addQuote({
      company: String(data.get("company") || ""),
      contact: String(data.get("contact") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      address: String(data.get("address") || ""),
      buildingType: String(data.get("buildingType") || ""),
      toiletGroups,
      toilets: toiletGroups,
      employees: String(data.get("employees") || ""),
      servicesWanted: services.join(", "),
      message: String(data.get("message") || ""),
    });
    setServices([]);
    event.currentTarget.reset();
    setSent(true);
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-ocean-800/12 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/20";

  return (
    <form onSubmit={onSubmit} className="border border-ocean-800/10 bg-white p-6 sm:p-8">
      {sent ? (
        <p className="mb-6 border border-mint-400/40 bg-mint-300/30 px-4 py-3 text-sm text-ocean-900">
          Aanvraag ontvangen. We nemen contact op om een vrijblijvende locatie-opname in te plannen.
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Bedrijfsnaam
          <input name="company" required className={fieldClass} />
        </label>
        <label className="text-sm font-medium">
          Contactpersoon
          <input name="contact" required className={fieldClass} />
        </label>
        <label className="text-sm font-medium">
          E-mailadres
          <input name="email" type="email" required className={fieldClass} />
        </label>
        <label className="text-sm font-medium">
          Telefoonnummer
          <input name="phone" type="tel" required className={fieldClass} />
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          Adres / plaats
          <input name="address" required className={fieldClass} />
        </label>
        <label className="text-sm font-medium">
          Type pand
          <select name="buildingType" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Selecteer
            </option>
            {buildingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Aantal toiletgroepen
          <input name="toiletGroups" required placeholder="bijv. 4" className={fieldClass} />
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          Aantal medewerkers op locatie
          <input name="employees" required placeholder="bijv. 85" className={fieldClass} />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">Gewenste diensten / artikelen</legend>
        <div className="mt-3 grid gap-2">
          {serviceOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm font-normal text-ocean-900">
              <input
                type="checkbox"
                className="mt-1 accent-ocean-700"
                checked={services.includes(option)}
                onChange={() => toggleService(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block text-sm font-medium">
        Toelichting
        <textarea
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="Bijzonderheden, vestigingen, huidige leverancier"
        />
      </label>

      <p className="mt-4 text-xs leading-5 text-ocean-800/70">
        Na ontvangst plannen wij een locatie-visite. Pas daarna volgt de offerte. Geen verplichting,
        geen wurgcontract.
      </p>
      <button
        type="submit"
        className="mt-5 w-full rounded-md bg-ocean-700 px-6 py-3 text-sm font-semibold text-white hover:bg-ocean-800"
      >
        Verstuur aanvraag voor locatie-opname
      </button>
    </form>
  );
}
