import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.sanitair.title },
  description: pages.sanitair.description,
};

const items = [
  {
    title: "Handdoekdispensers",
    text: "Papier- en stofrolautomaat, sensor of handmatig. Bruikleen: levering en plaatsing zonder aanschafkosten.",
  },
  {
    title: "Zeep- en desinfectiedispensers",
    text: "Schuimzeep, vloeibare zeep, handdesinfectie en no-touch systemen. Dosering die verspilling beperkt.",
  },
  {
    title: "Toiletpapierdispensers",
    text: "Duo-rol, doprol en jumbo-rol. Minder wisselmomenten, minder storingen op de werkvloer.",
  },
  {
    title: "Luchtverfrissing",
    text: "Automatische geurdispensers voor een neutrale, continue geurbeleving in sanitaire ruimtes.",
  },
  {
    title: "Damesverbandcontainers",
    text: "Contactloze sensor, geurneutralisatie, vervanging en afvoer volgens contract.",
  },
];

export default function SanitairPage() {
  return (
    <>
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-600">
          Dispensers bruikleen B2B
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ocean-950">
          Sanitaire dispensers in bruikleen: geen investering, wel continuïteit
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ocean-800/80">
          OCEAN plaatst handdoek-, zeep-, toiletpapier- en geurdispensers plus
          damesverbandcontainers bij bedrijven in Nijmegen en regio. Hardware blijft van OCEAN. U
          betaalt het verbruik, niet de automaten. Tot 20% voordeliger dan traditionele
          aanbieders, zonder wurgcontracten.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">Assortiment dispensers</h2>
        <div className="mt-6 divide-y divide-ocean-900/10 border border-ocean-900/10 bg-white">
          {items.map((item) => (
            <section key={item.title} className="px-5 py-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ocean-800/80">{item.text}</p>
            </section>
          ))}
        </div>
        <h2 className="mt-12 text-2xl font-semibold">Locatie-visite vooraf</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ocean-800/80">
          Wij komen eerst vrijblijvend langs. Aantal toiletgroepen, looproutes en gebruik bepalen
          welk systeem past. Daarna volgt de offerte. Combineer met{" "}
          <Link href="/diensten/verbruiksartikelen" className="font-semibold text-ocean-700 underline">
            verbruiksartikelen
          </Link>{" "}
          en{" "}
          <Link href="/schoonmaak-samenwerking" className="font-semibold text-ocean-700 underline">
            schoonmaak via Jayden Cleaning
          </Link>
          .
        </p>
        <p className="mt-6 text-sm">
          <Link href="/offerte-aanvragen" className="font-semibold text-ocean-700 underline">
            Vraag Offerte Op Maat Aan
          </Link>
        </p>
      </article>
      <CtaBanner />
    </>
  );
}
