import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.offerte.title },
  description: pages.offerte.description,
};

export default function OffertePage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-600">
        Locatie-visite-service
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ocean-950">
        Offerte op maat: eerst langs op locatie, daarna de prijs
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-ocean-800/80">
        Vul pandtype, toiletgroepen, medewerkers en gewenste diensten in. OCEAN plant een
        vrijblijvende opname in Nijmegen of de regio. U ontvangt daarna een voorstel met bruikleen
        van dispensers, leveringsritme en tarieven. Gratis dispensers in bruikleen. Tot 20%
        voordeliger dan traditionele aanbieders. Geen wurgcontracten.
      </p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-3 text-sm leading-6 text-ocean-800/80">
          <p className="border border-ocean-900/10 bg-white px-4 py-3">
            Geen verplichting tot afname na de locatie-visite.
          </p>
          <p className="border border-ocean-900/10 bg-white px-4 py-3">
            Sanitair, verbruik, matten en schoonmaak via Jayden Cleaning in één aanvraag.
          </p>
          <p className="border border-ocean-900/10 bg-white px-4 py-3">
            Reactie binnen één werkdag om de opname in te plannen.
          </p>
        </aside>
        <QuoteForm />
      </div>
    </article>
  );
}
