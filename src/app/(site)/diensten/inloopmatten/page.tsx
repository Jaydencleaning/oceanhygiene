import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.matten.title },
  description: pages.matten.description,
};

export default function MattenPage() {
  return (
    <>
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-600">
          Entree & vloerbeheer
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ocean-950">
          Schoonloopmatten met wissel- en wasservice
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ocean-800/80">
          Professionele inloopmatten voor bedrijven. OCEAN verzorgt plaatsing, wissel en wassen.
          Vuil en vocht blijven buiten. Minder slijtage op vloeren, representatievere entree voor
          bezoekers en personeel.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">Hoe de service werkt</h2>
        <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-ocean-800/80">
          <li>Opname op locatie: entrees, looproutes, seizoensbelasting.</li>
          <li>Matten op maat of standaardformaten, afhankelijk van de deur.</li>
          <li>Vaste wissel: schone mat in, vuile mat mee naar de wasserij.</li>
          <li>Geen eenmalige aankoop die na een seizoen is versleten.</li>
        </ul>
        <h2 className="mt-12 text-2xl font-semibold">Combineer met hygiëne en schoonmaak</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ocean-800/80">
          Matten horen bij de eerste indruk van het pand. Koppel ze aan{" "}
          <Link href="/diensten/sanitair-en-dispensers" className="font-semibold text-ocean-700 underline">
            sanitaire dispensers
          </Link>{" "}
          en de{" "}
          <Link href="/schoonmaak-samenwerking" className="font-semibold text-ocean-700 underline">
            schoonmaaksamenwerking met Jayden Cleaning
          </Link>
          .{" "}
          <Link href="/offerte-aanvragen" className="font-semibold text-ocean-700 underline">
            Offerte op maat
          </Link>{" "}
          na locatie-visite.
        </p>
      </article>
      <CtaBanner />
    </>
  );
}
