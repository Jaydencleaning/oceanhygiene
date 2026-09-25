import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.schoonmaak.title },
  description: pages.schoonmaak.description,
};

export default function SchoonmaakPage() {
  return (
    <>
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-600">
          Totaaloplossing schoonmaak
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ocean-950">
          OCEAN en Jayden Cleaning: één aanspreekpunt, één factuur
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ocean-800/80">
          Voor CEO en directie telt ontzorging. OCEAN levert sanitaire hygiëne en verbruiksartikelen.
          Jayden Cleaning levert de professionele schoonmaak van het pand. Samen: totale ontzorging
          van entree tot toiletgroep.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">Wat dit oplevert voor de directie</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            ["1 aanspreekpunt", "Geen afstemming tussen losse leveranciers. Eén verantwoordelijke lijn."],
            ["1 factuur", "Sanitair, verbruik en schoonmaak in één administratieve stroom."],
            ["Totale ontzorging", "Hygiëne-uitstraling van het gebouw, van mat tot dispenser tot dagelijkse schoonmaak."],
          ].map(([t, d]) => (
            <li key={t} className="border border-ocean-900/10 bg-white p-5">
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-ocean-800/80">{d}</p>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 text-2xl font-semibold">Jayden Cleaning</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ocean-800/80">
          Professionele schoonmaak van kantoren en bedrijfspanden. Bekijk het aanbod op{" "}
          <a href="https://jaydencleaning.nl" className="font-semibold text-ocean-700 underline">
            jaydencleaning.nl
          </a>
          . OCEAN plant de locatie-opname voor sanitair; schoonmaak sluit daarop aan.
        </p>
        <p className="mt-6 text-sm">
          <Link href="/offerte-aanvragen" className="font-semibold text-ocean-700 underline">
            Vraag Offerte Op Maat Aan
          </Link>{" "}
          en vink schoonmaak aan bij de gewenste diensten.
        </p>
      </article>
      <CtaBanner />
    </>
  );
}
