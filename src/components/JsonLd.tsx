"use client";

import { SITE_URL } from "@/lib/content";
import { useSite } from "@/lib/site-context";

export function JsonLd() {
  const { content } = useSite();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "OCEAN Hygiene Solutions",
        url: SITE_URL,
        email: content.email,
        telephone: content.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Van Rosenburgweg 200",
          postalCode: "6537 TM",
          addressLocality: "Nijmegen",
          addressCountry: "NL",
        },
        sameAs: [content.jaydenUrl],
      },
      {
        "@type": "LocalBusiness",
        name: "OCEAN Hygiene Solutions",
        url: SITE_URL,
        telephone: content.phone,
        email: content.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Van Rosenburgweg 200",
          postalCode: "6537 TM",
          addressLocality: "Nijmegen",
          addressCountry: "NL",
        },
        areaServed: "Nijmegen en regio",
        description:
          "Sanitaire hygiëne voor bedrijven: dispensers in bruikleen, verbruiksartikelen en inloopmatten. Samenwerking met Jayden Cleaning.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
