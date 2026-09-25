"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLockup } from "./BrandLockup";
import { IconClose, IconMenu } from "./icons";

const dienstLinks = [
  { href: "/diensten", label: "Overzicht diensten" },
  { href: "/diensten/sanitair-en-dispensers", label: "Sanitair & dispensers" },
  { href: "/diensten/verbruiksartikelen", label: "Verbruiksartikelen" },
  { href: "/diensten/inloopmatten", label: "Inloopmatten" },
];

const links = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/schoonmaak-samenwerking", label: "Schoonmaak" },
  { href: "/over-ons", label: "Over OCEAN" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dienstenOpen, setDienstenOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ocean-900/8 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-6 sm:py-3">
        <BrandLockup href="/" variant="header" />

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Hoofdnavigatie">
          {links.map((link) =>
            link.href === "/diensten" ? (
              <div key={link.href} className="relative group">
                <Link
                  href="/diensten"
                  className={`text-sm font-medium ${
                    isActive("/diensten") ? "text-ocean-700" : "text-ocean-800/80 hover:text-ocean-700"
                  }`}
                >
                  Diensten
                </Link>
                <div className="invisible absolute left-0 top-full z-20 min-w-56 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="border border-ocean-900/10 bg-white py-2 shadow-lg">
                    {dienstLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-ocean-800 hover:bg-foam"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  isActive(link.href) ? "text-ocean-700" : "text-ocean-800/80 hover:text-ocean-700"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            href="/offerte-aanvragen"
            className="rounded-md bg-ocean-700 px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-800"
          >
            Vraag Offerte Op Maat Aan
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ocean-800/15 text-ocean-800 lg:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-ocean-900/8 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobiel menu">
            {links
              .filter((l) => l.href !== "/diensten")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ocean-800"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            <button
              type="button"
              className="text-left text-sm font-medium text-ocean-800"
              onClick={() => setDienstenOpen((v) => !v)}
            >
              Diensten
            </button>
            {dienstenOpen
              ? dienstLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="pl-3 text-sm text-ocean-800/80"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))
              : null}
            <Link
              href="/offerte-aanvragen"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md bg-ocean-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Vraag Offerte Op Maat Aan
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
