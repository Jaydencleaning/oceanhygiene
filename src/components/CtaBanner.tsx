"use client";

import Link from "next/link";
import { IconArrow } from "./icons";

export function CtaBanner({
  title = "Eerst op locatie, daarna de offerte.",
  text = "OCEAN komt vrijblijvend langs, neemt toiletgroepen, volumes en looproutes op, en stuurt een voorstel met tarieven, leveringsritme en bruikleen van dispensers.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-ocean-950 py-14 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">{text}</p>
        </div>
        <Link
          href="/offerte-aanvragen"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-mint-400 px-5 py-3 text-sm font-semibold text-ocean-950 hover:bg-mint-300"
        >
          Vraag Offerte Op Maat Aan
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
