"use client";

import Link from "next/link";
import { BrandLockup } from "./BrandLockup";
import { IconMail, IconPhone, IconPin } from "./icons";
import { useSite } from "@/lib/site-context";

const footerNav = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/diensten/sanitair-en-dispensers", label: "Dispensers" },
  { href: "/diensten/verbruiksartikelen", label: "Verbruiksartikelen" },
  { href: "/diensten/inloopmatten", label: "Inloopmatten" },
  { href: "/schoonmaak-samenwerking", label: "Schoonmaak" },
  { href: "/over-ons", label: "Over OCEAN" },
  { href: "/offerte-aanvragen", label: "Offerte op maat" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const { content } = useSite();
  const year = 2026;

  return (
    <footer className="bg-ocean-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <BrandLockup href="/" variant="footer" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            Sanitaire hygiëne voor organisaties in Nijmegen en regio. Dispensers in bruikleen, vaste
            bevoorrading, optioneel schoonmaak via Jayden Cleaning.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-white/75 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-mint-300">Contact</p>
          <p className="flex items-start gap-2 text-white/80">
            <IconPin className="mt-0.5 h-4 w-4 shrink-0" />
            {content.address}
          </p>
          <a href={`mailto:${content.email}`} className="flex items-center gap-2 text-white/80 hover:text-white">
            <IconMail className="h-4 w-4" />
            {content.email}
          </a>
          <a
            href={`tel:${content.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            <IconPhone className="h-4 w-4" />
            {content.phone}
          </a>
          <a href={content.jaydenUrl} target="_blank" rel="noreferrer" className="block text-white/80 hover:text-white">
            Jayden Cleaning
          </a>
          <Link href="/admin" className="block text-white/35 hover:text-white/70">
            Beheer
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        © {year} {content.companyName} · Hygiene Solutions · Van Rosenburgweg 200, Nijmegen
      </div>
    </footer>
  );
}
