"use client";

import Link from "next/link";
import { useState } from "react";
import { PUBLIC_LOGO_SRC } from "@/lib/logo-image";
import { useSite } from "@/lib/site-context";
import type { CSSProperties } from "react";

type BrandLockupProps = {
  href?: string;
  variant?: "header" | "footer";
};

export function BrandLockup({ href = "/", variant = "header" }: BrandLockupProps) {
  const { logo, logoHeight, hydrated } = useSite();
  const isFooter = variant === "footer";
  const [fileFailed, setFileFailed] = useState(false);
  const src = logo || (fileFailed ? "" : PUBLIC_LOGO_SRC);
  const showWordmark = hydrated && !src;
  const logoStyle = {
    height: logoHeight,
    maxHeight: logoHeight,
  } as CSSProperties;

  return (
    <Link
      href={href}
      aria-label="OCEAN Hygiene Solutions"
      className="relative flex min-w-0 max-w-[min(72vw,280px)] shrink items-center"
    >
      {showWordmark ? (
        <span
          className={`text-lg font-extrabold tracking-[0.18em] ${
            isFooter ? "text-white" : "text-ocean-800"
          }`}
        >
          OCEAN
        </span>
      ) : src ? (
        <img
          src={src}
          alt="OCEAN Hygiene Solutions, sanitaire hygiëne voor bedrijven"
          style={logoStyle}
          className={`w-auto max-w-full object-contain object-left max-sm:!h-12 max-sm:!max-h-12 ${
            isFooter ? "rounded-md bg-white px-1.5 py-0.5" : ""
          }`}
          onError={() => {
            if (!logo) setFileFailed(true);
          }}
        />
      ) : (
        <span
          aria-hidden
          className="inline-block h-12 w-36 max-w-full"
          style={logoStyle}
        />
      )}
    </Link>
  );
}
