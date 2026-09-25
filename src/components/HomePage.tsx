"use client";

import Link from "next/link";
import { CtaBanner } from "./CtaBanner";
import { IconArrow } from "./icons";
import { useSite } from "@/lib/site-context";

const pillars = [
  {
    href: "/diensten/sanitair-en-dispensers",
    title: "Dispensers in bruikleen",
    text: "Handdoek, zeep, toiletpapier, geur en damesverband. Geen capex, plaatsing inbegrepen.",
  },
  {
    href: "/diensten/verbruiksartikelen",
    title: "Verbruiksartikelen",
    text: "Papierwaren, schuimzeep, desinfectie en afvalzakken. Vaste levering, geen lege automaten.",
  },
  {
    href: "/diensten/inloopmatten",
    title: "Inloopmatten",
    text: "Schoonloopmatten met wissel- en wasservice. Vuil blijft bij de deur.",
  },
  {
    href: "/schoonmaak-samenwerking",
    title: "Schoonmaak via Jayden Cleaning",
    text: "Dagelijkse of periodieke schoonmaak. Eén aanspreekpunt met OCEAN, één factuur.",
  },
];

export function HomePage() {
  const { content } = useSite();

  return (
    <>
      <section className="bg-ocean-950 text-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 lg:pt-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-400">
            Voor CEO, directie en facilitair management
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
            {content.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
            {content.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/offerte-aanvragen"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-mint-400 px-6 py-3 text-sm font-semibold text-ocean-950 hover:bg-mint-300"
            >
              Vraag Offerte Op Maat Aan
              <IconArrow className="h-4 w-4" />
            </Link>
            <Link
              href="/diensten"
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/8"
            >
              Bekijk diensten
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-ocean-900/8 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ocean-950 sm:text-3xl">
            Vier pijlers, één leverancier
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ocean-800/75">
            Van dispenser tot schoonmaak: OCEAN dekt sanitaire hygiëne. Jayden Cleaning dekt het
            pand. U stuurt op kosten en continuïteit, niet op losse leveranciers.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="border border-ocean-900/10 bg-foam p-6 hover:border-ocean-700"
              >
                <h3 className="font-semibold text-ocean-950">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ocean-800/80">{pillar.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ocean-700">
                  Meer informatie <IconArrow className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foam py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ocean-950 sm:text-3xl">
            {content.whyTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.usps.map((usp) => (
              <article key={usp.title} className="border border-ocean-900/10 bg-white p-5">
                <p className="text-3xl font-semibold text-ocean-800">{usp.stat}</p>
                <h3 className="mt-2 font-semibold">{usp.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ocean-800/80">{usp.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-6 text-ocean-800/80">
            Organisaties in Nijmegen en regio kiezen OCEAN omdat de opname op locatie voorafgaat aan
            de prijs. Geen catalogusofferte. Facilitair managers houden grip op voorraad; de
            directie op cashflow.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
