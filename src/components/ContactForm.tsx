"use client";

import { FormEvent, useState } from "react";
import { useSite } from "@/lib/site-context";

export function ContactForm() {
  const { addContact } = useSite();
  const [sent, setSent] = useState(false);
  const fieldClass =
    "mt-1.5 w-full rounded-md border border-ocean-800/12 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/20";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addContact({
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
    });
    event.currentTarget.reset();
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="border border-ocean-800/10 bg-white p-6 sm:p-8">
      {sent ? (
        <p className="mb-6 border border-mint-400/40 bg-mint-300/30 px-4 py-3 text-sm">
          Bericht ontvangen. We reageren zo snel mogelijk.
        </p>
      ) : null}
      <label className="block text-sm font-medium">
        Naam
        <input name="name" required className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm font-medium">
        E-mailadres
        <input name="email" type="email" required className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm font-medium">
        Telefoonnummer
        <input name="phone" type="tel" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm font-medium">
        Bericht
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>
      <button
        type="submit"
        className="mt-5 w-full rounded-md bg-ocean-700 px-6 py-3 text-sm font-semibold text-white hover:bg-ocean-800"
      >
        Verstuur bericht
      </button>
    </form>
  );
}
