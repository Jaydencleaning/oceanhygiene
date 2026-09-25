import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.verbruik.title },
  description: pages.verbruik.description,
};

const items = [
  {
    title: "Papierwaren",
    text: "Toiletpapier 2-laags, 3-laags en gerecycled. Vouwhanddoekjes, keukenrollen en poetsrollen, afgestemd op volume.",
  },
  {
    title: "Zeep en desinfectie",
    text: "Schuimzeepvullingen, desinfectiegel en -sprays. Passend op de geplaatste dispensers.",
  },
  {
    title: "Afvalzakken",
    text: "Pedaalemmerzakjes, containerzakken en biologisch afbreekbare opties. Vaste specificatie, vaste voorraad.",
  },
];

export default function VerbruikPage() {
  return (
    <>
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-600">
          Toiletpapier en zeep leverancier bedrijven
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ocean-950">
          Verbruiksartikelen met gegarandeerde vaste levering
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ocean-800/80">
          OCEAN bevoorraadt bedrijven in Nijmegen en regio met toiletpapier, zeep, desinfectie en
          afvalzakken. Vaste ritmes op contract: uw organisatie komt niet zonder te zitten. Scherpe
          tarieven, geen wurgcontracten.
        </p>
        <h2 className="mt-12 text-2xl font-semibold">Wat we leveren</h2>
        <div className="mt-6 divide-y divide-ocean-900/10 border border-ocean-900/10 bg-white">
          {items.map((item) => (
            <section key={item.title} className="px-5 py-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ocean-800/80">{item.text}</p>
            </section>
          ))}
        </div>
        <h2 className="mt-12 text-2xl font-semibold">Past op uw dispensers</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ocean-800/80">
          Het verbruik sluit aan op{" "}
          <Link href="/diensten/sanitair-en-dispensers" className="font-semibold text-ocean-700 underline">
            dispensers in bruikleen
          </Link>
          . Geen mix van merken die niet passen. Offerte na locatie-opname:{" "}
          <Link href="/offerte-aanvragen" className="font-semibold text-ocean-700 underline">
            vraag offerte op maat aan
          </Link>
          .
        </p>
      </article>
      <CtaBanner />
    </>
  );
}
