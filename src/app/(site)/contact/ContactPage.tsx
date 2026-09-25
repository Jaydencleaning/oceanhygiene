"use client";

import { ContactForm } from "@/components/ContactForm";
import { IconMail, IconPhone, IconPin } from "@/components/icons";
import { useSite } from "@/lib/site-context";
import Link from "next/link";

export function ContactPage() {
  const { content } = useSite();

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-600">
        Contact
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ocean-950">
        OCEAN Hygiene Solutions, Nijmegen
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-ocean-800/80">
        Bel, mail of stuur het formulier. Voor een offerte komen wij eerst vrijblijvend langs op
        locatie.{" "}
        <Link href="/offerte-aanvragen" className="font-semibold text-ocean-700 underline">
          Direct een offerte op maat aanvragen
        </Link>
        .
      </p>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-6">
          <p className="flex items-start gap-2">
            <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-ocean-700" />
            <span>
              {content.address}
              <span className="mt-1 block text-ocean-800/70">Van Rosenburgweg 200, 6537 TM Nijmegen</span>
            </span>
          </p>
          <p>
            <a href={`mailto:${content.email}`} className="inline-flex items-center gap-2 font-medium text-ocean-800">
              <IconMail className="h-4 w-4" />
              {content.email}
            </a>
          </p>
          <p>
            <a
              href={`tel:${content.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 font-medium text-ocean-800"
            >
              <IconPhone className="h-4 w-4" />
              {content.phone}
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </article>
  );
}
