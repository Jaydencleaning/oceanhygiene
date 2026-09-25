import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.over.title },
  description: pages.over.description,
};

export default function OverOnsPage() {
  return (
    <>
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-600">
          Over OCEAN
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ocean-950">
          Hygiene Solutions vanuit Nijmegen, voor organisaties die grip willen
        </h1>
        <h2 className="mt-12 text-2xl font-semibold">Ons verhaal</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ocean-800/80">
          OCEAN levert sanitaire hygiëne aan bedrijven. Geen winkel, geen consumentenmerk: een
          B2B-dienst voor facilitair management en directie. Vanuit Van Rosenburgweg 200 in Nijmegen
          bedienen we locaties in de regio. Zusterrelatie met Jayden Cleaning voor wie ook de
          schoonmaak wil onderbrengen.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">Aanpak op locatie</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-ocean-800/80">
          Wij komen eerst vrijblijvend langs. Toiletgroepen, medewerkersaantal, looproutes en
          huidige hardware bepalen het voorstel. Pas daarna tarieven, leveringsritme en bruikleen.
          Geen brochure van de plank.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">Kernwaarden</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            ["Scherpe tarieven", "Tot 20% voordeliger dan traditionele aanbieders, door dosering en inkoop."],
            ["Snelle service", "Vaste ritten, korte lijnen vanuit Nijmegen, geen callcenterketen."],
            ["Geen wurgcontracten", "Flexibele looptijden. U zit niet jaren vast aan een ongunstig tarief."],
          ].map(([t, d]) => (
            <li key={t} className="border border-ocean-900/10 bg-white p-5">
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-ocean-800/80">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm">
          <Link href="/contact" className="font-semibold text-ocean-700 underline">
            Contact
          </Link>{" "}
          of direct{" "}
          <Link href="/offerte-aanvragen" className="font-semibold text-ocean-700 underline">
            offerte op maat
          </Link>
          .
        </p>
      </article>
      <CtaBanner />
    </>
  );
}
