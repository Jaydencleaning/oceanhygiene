import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteProvider } from "@/lib/site-context";
import { SITE_URL } from "@/lib/content";
import { pages } from "@/lib/seo";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pages.home.title,
    template: "%s | OCEAN Hygiene Solutions",
  },
  description: pages.home.description,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "OCEAN Hygiene Solutions",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" suppressHydrationWarning className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full bg-foam font-sans text-ocean-950">
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
