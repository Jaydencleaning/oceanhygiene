"use client";

import Link from "next/link";
import { useSite } from "@/lib/site-context";
import type { CSSProperties } from "react";

type BrandLockupProps = {
  href?: string;
  variant?: "header" | "footer";
};

export function BrandLockup({ href = "/", variant = "header" }: BrandLockupProps) {
  const { logo, logoHeight } = useSite();
  const isFooter = variant === "footer";
  const logoStyle = { "--logo-h": `${logoHeight}px` } as CSSProperties;

  return (
    <Link
      href={href}
      className="flex min-w-0 max-w-[min(72vw,280px)] shrink items-center"
    >
      {logo ? (
        <img
          src={logo}
          alt="OCEAN Hygiene Solutions, sanitaire hygiëne voor bedrijven"
          style={logoStyle}
          className={`h-[var(--logo-h)] max-h-[var(--logo-h)] w-auto max-w-full object-contain object-left max-sm:h-[min(var(--logo-h),3rem)] max-sm:max-h-[min(var(--logo-h),3rem)] ${
            isFooter ? "rounded-md bg-white px-1.5 py-0.5" : ""
          }`}
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
