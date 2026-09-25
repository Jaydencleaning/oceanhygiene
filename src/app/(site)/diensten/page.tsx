import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.diensten.title },
  description: pages.diensten.description,
};

const items = [
  {
    href: "/diensten/sanitair-en-dispensers",
    title: "Sanitair en dispensers",
    text: "Handdoek-, zeep-, toiletpapier- en geurdispensers plus damesverbandcontainers. Bruikleen: geen aanschaf.",
  },
  {
    href: "/diensten/verbruiksartikelen",
    title: "Verbruiksartikelen",
    text: "Toiletpapier, vouwhanddoeken, schuimzeep, desinfectie en afvalzakken. Vaste levering op contract.",
  },
  {
    href: "/diensten/inloopmatten",
    title: "Inloopmatten",
    text: "Schoonloopmatten met professionele wissel- en wasservice. Schone entree, minder slijtage.",
  },
];

export default function DienstenPage() {
  return (
    <>
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-600">
          Diensten & producten
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ocean-950">
          Hygiëneprogramma voor bedrijven: dispensers, verbruik en matten
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ocean-800/80">
          OCEAN is leverancier van sanitaire hygiëne voor B2B in Nijmegen en regio. Eerst een
          vrijblijvende locatie-opname. Daarna bruikleen van dispensers, vaste bevoorrading en
          optioneel schoonmaak via{" "}
          <a href="https://jaydencleaning.nl" className="font-semibold text-ocean-700 underline">
            Jayden Cleaning
          </a>
          .
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-ocean-900/10 bg-white p-6 hover:border-ocean-700"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ocean-800/80">{item.text}</p>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-sm">
          Klaar voor tarieven op uw volumes?{" "}
          <Link href="/offerte-aanvragen" className="font-semibold text-ocean-700 underline">
            Vraag een offerte op maat aan
          </Link>
          .
        </p>
      </article>
      <CtaBanner />
    </>
  );
}
