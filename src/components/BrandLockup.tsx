"use client";

import Link from "next/link";
import { useSite } from "@/lib/site-context";
import type { CSSProperties } from "react";

type BrandLockupProps = {
  href?: string;
  variant?: "header" | "footer";
};

export function BrandLockup({ href = "/", variant = "header" }: BrandLockupProps) {
  const { logo, logoHeight, hydrated } = useSite();
  const isFooter = variant === "footer";
  const logoStyle = { "--logo-h": `${logoHeight}px` } as CSSProperties;
  const imgClass = `h-[var(--logo-h)] max-h-[var(--logo-h)] w-auto max-w-full object-contain object-left max-sm:h-[min(var(--logo-h),3rem)] max-sm:max-h-[min(var(--logo-h),3rem)] ${
    isFooter ? "rounded-md bg-white px-1.5 py-0.5" : ""
  }`;

  return (
    <Link
      href={href}
      aria-label="OCEAN Hygiene Solutions"
      className="relative flex min-w-0 max-w-[min(72vw,280px)] shrink items-center"
    >
      {!hydrated ? (
        <span
          aria-hidden
          style={logoStyle}
          className="inline-block h-[var(--logo-h)] w-36 max-w-full max-sm:h-[min(var(--logo-h),3rem)]"
        />
      ) : logo ? (
        <img
          src={logo}
          alt="OCEAN Hygiene Solutions, sanitaire hygiëne voor bedrijven"
          style={logoStyle}
          className={imgClass}
        />
      ) : (
        <span
          className={`text-lg font-extrabold tracking-[0.18em] ${
            isFooter ? "text-white" : "text-ocean-800"
          }`}
        >
          OCEAN
        </span>
      )}
    </Link>
  );
}
